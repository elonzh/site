# Peeweext 日期时间戳精度丢失问题


## 现象

在查看数据时发现部分数据库时间字段存在精度丢失的问题

## 技术原理

Peeweext 提供了高精度的 DATETIME 类型支持, 但是其实现是通过对`MySQLDatabase`, `PostgresqlDatabase` 字段类型映射打补丁实现的

```python
# peeweext.fields.py

pw.MySQLDatabase.field_types.update({'DATETIME': 'DATETIME(6)'})
pw.PostgresqlDatabase.field_types.update({'DATETIME': 'TIMESTAMPTZ'})


class DatetimeTZField(pw.Field):
    field_type = 'DATETIME'
```

但问题在于, 虽然 `field_types` 是类属性, 但是`Database` 在实例化时会复制一份而不是直接使用, 这就导致一旦 `Database` 在打补丁之前实例化, 后续 `DATETIME` 类型就丢失精度了

```python
# peewee.Database
class Database(_callable_context_manager):
    context_class = Context
    field_types = {}
    operations = {}

    ...

    def __init__(self, database, thread_safe=True, autorollback=False,
                 field_types=None, operations=None, autocommit=None,
                 autoconnect=True, **kwargs):
        # 此处的 merge_dict 会复制一份
        self._field_types = merge_dict(FIELD, self.field_types)
        self._operations = merge_dict(OP, self.operations)
        if field_types:
            self._field_types.update(field_types)
        if operations:
            self._operations.update(operations)
```

而通过查看 Peeweext 初始化逻辑发现导入顺序确实是有问题的

```python
# peeweext.sea/flask.Peeweext
class Peeweext:
    def __init__(self, ns='PW_'):
        self.ns = ns

    def init_app(self, app):
        config = app.config.get_namespace(self.ns)
        conn_params = config.get('conn_params', {})
        self.database = db_url.connect(config['db_url'], **conn_params)
        self.model_class = import_string(
            config.get('model', 'peeweext.model.Model'))
        self._try_setup_celery()
```

注意这里 `database` 是在 `model_class` 导入前实例化的,
`peeweext.model` 导入了 `peeweext.fields` 才会会触发打补丁

因此数据库中可能会存在时间字段精度丢失问题

需要注意的是, 如果 extension 被初始化了两次再被使用就不会有问题了, 因为第一次初始化时会触发打补丁, 第二次初始化 `database` 中的 `_field_types` 就是正确的了.

调用 `create_app` 多次或者多个 extension 指向同一个实例(`pwdb = pwshard = Peeweext(ns="PWSHARD_")`)都会使其多次初始化

当然这并不是正确的做法, 只是给出部分字段精度是正确的原因

## 解决方案

1. 业务方检查数据库相关字段是否是正确的, 以及评估精度丢失对业务的影响
2. 框架进行更新修补相关问题
3. 业务方使用新版的框架

### Peeweext 修复方案

#### 方案 1: 仍然打补丁

初始化 `Peeweext.database` 逻辑移至导入 `model_class` 之后, 即:

```python
class Peeweext:
    def init_app(self, app):
        ...
        self.model_class = import_string(
            config.get('model', 'peeweext.model.Model'))
        self.database = db_url.connect(config['db_url'], **conn_params)
        ....
```

1. 虽然仍然能够打补丁成功, 但实际上允许自定义 `Model` 的功能没有什么意义了, 因为一旦使用自定义的 `Model`, 补丁又要失效了
2. 打补丁本身不是一个好的模式
3. 这个修复方案最简单, 代价最小

#### 方案 2: 取消打补丁

取消打补丁, 将 `DatetimeTZField` 改为高精度类型, 重载 `ddl_datatype` 使其能适配在不同数据库下的表现, 所有需要高精度时间的字段使用此字段

实际上 peewee 自带了一个高精度时间戳的字段实现 `TimestampField`, 使用这个字段也未尝不可

