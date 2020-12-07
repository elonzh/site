# Celery 是如何路由消息的


[Celery](https://github.com/celery/celery/) 作为 Python 世界中使用最广泛的分布式任务队列工具, 提供了非常方便灵活的配置方式, 但有时候也容易给人带来困扰, 这边文章从原理和代码出发, 来给大家讲明白 Celery 的任务是如何分发出去的.

## 高级消息队列协议(AMQP)

整个 Celery 是基于 [AMQP](https://zh.wikipedia.org/wiki/%E9%AB%98%E7%BA%A7%E6%B6%88%E6%81%AF%E9%98%9F%E5%88%97%E5%8D%8F%E8%AE%AE) 实现的, 了解 AMQP 是了解 Celery 如何将任务分发出去的前提. 这里推荐一篇文章 [AMQP 0-9-1 Model Explained](https://www.rabbitmq.com/tutorials/amqp-concepts.html).

从这篇文章我们能得到有几个需要知道的重点:

1. Queue 声明时会与 Exchange 进行 binding, 可能会 binding 多个 Exchange,
2. 所有的消息发布时要带上 exchange 和 routine_key, 到达 Exchange 后, Exchange 根据 exchange_type 和 binding 分发消息至相应的队列.
3. AMQP 的 Exchange 有四种类型, 每个类型都有预定义的 Exchange, 类型为 direct 且名称为空的 exchange 是一个默认的 Exchange, 所有的队列在创建时都会自动将队列名设置为 routing_key 并与该 exchange 进行绑定.

## Celery 是怎么分发一个任务的

分发一个任务, 就是根据配置, 带上 exchange 和 routine_key 发送一条消息, 从代码层面, 注意分成两个阶段:

1. `Celery.send_task`: 根据任务信息, 根据 [task_routes](http://docs.celeryproject.org/en/latest/userguide/configuration.html#task-routes) 配置取路由, 然后构造消息, 调用 `amqp.send_task_message`

https://github.com/celery/celery/blob/v4.3.0/celery/app/base.py#L723

```python
        options = router.route(
            options, route_name or name, args, kwargs, task_type)
```

2. `Celery.amqp.send_task_message`: 处理默认的路由行为并发送消息

https://github.com/celery/celery/blob/v4.3.0/celery/app/amqp.py#L485

```python
def send_task_message(producer, name, message,
                        exchange=None, routing_key=None, queue=None,
                        event_dispatcher=None,
                        retry=None, retry_policy=None,
                        serializer=None, delivery_mode=None,
                        compression=None, declare=None,
                        headers=None, exchange_type=None, **kwargs):
    retry = default_retry if retry is None else retry
    headers2, properties, body, sent_event = message
    if headers:
        headers2.update(headers)
    if kwargs:
        properties.update(kwargs)

    qname = queue
    if queue is None and exchange is None:
        queue = default_queue
    if queue is not None:
        if isinstance(queue, string_t):
            qname, queue = queue, queues[queue]
        else:
            qname = queue.name

    if delivery_mode is None:
        try:
            delivery_mode = queue.exchange.delivery_mode
        except AttributeError:
            pass
        delivery_mode = delivery_mode or default_delivery_mode

    if exchange_type is None:
        try:
            exchange_type = queue.exchange.type
        except AttributeError:
            exchange_type = 'direct'

    # convert to anon-exchange, when exchange not set and direct ex.
    if (not exchange or not routing_key) and exchange_type == 'direct':
        exchange, routing_key = '', qname
    elif exchange is None:
        # not topic exchange, and exchange not undefined
        # 当指定 `queue` 且 exchange type 等于 `direct`,
        # Celery 发送消息时会将 exchange 设置为空, 同时 routing_key 设置为队列名
        # 这时候会利用到 AMQP 的 default exchange
        exchange = queue.exchange.name or default_exchange
        routing_key = routing_key or queue.routing_key or default_rkey
    ...
    ret = producer.publish(
        body,
        exchange=exchange,
        routing_key=routing_key,
        serializer=serializer or default_serializer,
        compression=compression or default_compressor,
        retry=retry, retry_policy=_rp,
        delivery_mode=delivery_mode, declare=declare,
        headers=headers2,
        **properties
    )
```

可能有同学会问, 既然是处理默认的路由行为, 为什么没有使用到 [task_default_exchange](https://docs.celeryproject.org/en/v4.3.0/userguide/configuration.html#std:setting-task_default_exchange)
, [task_default_queue](https://docs.celeryproject.org/en/v4.3.0/userguide/configuration.html#std:setting-task_default_queue), [task_default_routing_key](https://docs.celeryproject.org/en/v4.3.0/userguide/configuration.html#task-default-routing-key) 这些配置呢?

答案在 `Celery.amqp` 加载队列的逻辑里,

https://github.com/celery/celery/blob/v4.3.0/celery/app/amqp.py#L126

```python
def _add(self, queue):
    if not queue.routing_key:
        if queue.exchange is None or queue.exchange.name == '':
            queue.exchange = self.default_exchange
        queue.routing_key = self.default_routing_key
    ...
```

当一个 Queue 加载的时候, 如果没有提供 exchange 和 routing_key, 会填充默认的配置.

但实际上一个 Queue 是可以有多个 binding 的, `Queue.exchange`, `Queue.routing_key` 只是提供的一个简便写法. Queue 的实例初始化函数如下:

https://github.com/celery/kombu/blob/4.6.7/kombu/entity.py#L567

```python
def __init__(self, name='', exchange=None, routing_key='',
                channel=None, bindings=None, on_declared=None,
                **kwargs):
    super(Queue, self).__init__(**kwargs)
    self.name = name or self.name
    if isinstance(exchange, str):
        self.exchange = Exchange(exchange)
    elif isinstance(exchange, Exchange):
        self.exchange = exchange
    self.routing_key = routing_key or self.routing_key
    self.bindings = set(bindings or [])
    self.on_declared = on_declared

    # allows Queue('name', [binding(...), binding(...), ...])
    if isinstance(exchange, (list, tuple, set)):
        self.bindings |= set(exchange)
    if self.bindings:
        self.exchange = None

    # exclusive implies auto-delete.
    if self.exclusive:
        self.auto_delete = True
    self.maybe_bind(channel)
```

以上的行为会导致, 在没有 `task_routes` 配置的情况下, 当你的 task 指定了 queue , 但是 Queue 的定义没有设置 exchange, routing_key 属性, 可能就会导致不符合期望的行为.

关于指定 task 的路由, 可以参考官方文档 [Specifying task destination](http://docs.celeryproject.org/en/v4.3.0/userguide/routing.html#specifying-task-destination).

