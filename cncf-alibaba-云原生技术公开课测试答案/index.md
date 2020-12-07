# CNCF × Alibaba 云原生技术公开课测试答案


https://edu.aliyun.com/roadmap/cloudnative

### 第 1 讲：第一堂 “云原生” 课

#### 3. (单选) 我编写的容器化应用，会将日志文件写在某路径写死的目录里。请问这破坏了云原生理念了吗

正确答案： B. 是

### 第 2 讲：容器基本概念

#### 5. 已运行 docker run -d -t —name demo ubuntu top 命令, 是否可以在 demo 这个容器内部停止容器

- A. 是
- B. 否

正确答案： B

#### 8. 已运行 docker run -d -t —name demo ubuntu top 和 docker run --name demo-x --pid container:demo ubuntu ps 命令，是否可以在 demo-x 容器内部停止容器

- A. 是
- B. 否
正确答案： A

### 第 3 讲：Kubernetes 核心概念

#### 3. Scheduler 的主要功能是________

- A. Pod 的在 Node 上的放置
- B. Pod 的生命周期管理
- C. Node 上具体的资源分配
- D. Node 的生命周期管理

正确答案： A

#### 10. 属于 Node 上的基本组件有________

- A. Kubelet
- B. Kube-proxy
- C. Controller Manager
- D. Container runtime engine

正确答案： A B D

### 第 4 讲：理解 Pod 和容器设计模式

#### 3. 一个 Pod 里 Infra Container 的启动顺序是

- A. 无所谓
- B. 最后一个
- C. 先于主业务容器启动即可
- D. 第一个

正确答案： D

#### 8. 如果没有 Pod 概念，但我要用多个容器模拟 Pod 的话，可能需要做哪些工作

- A. resource hoarding
- B. 乐观调度
- C. 共享这些容器的 Network Namespace
- D. 设置 Affinity 约束

正确答案： A B C D

#### 9. 关于 Google Borg 论文论述正确的是

- A. 应用互相之间往往相互独立，毫不相关
- B. 应用互相之间往往存在协作关系
- C. 很多应用需要部署永远部署在同一台机器上
- D. Google 在进行应用开发的过程中，天生就具备微服务的概念

正确答案： B C D

### 第 5 讲：应用编排与管理 - 核心原理

#### 1. Controller 中的 workerqueue 中可以存放什么内容

- A. Namespace 名 + pod 名
- B. Namespace 名 + pod 名 + 事件的类型
- C. Pod 的列表
- D. Pod 对象的指针

正确答案： A

#### 2. Controller 中的 object store 默认以什么作为索引

- A. 对象的 label
- B. 对象的 annotation
- C. 对象的 namespace
- D. 对象的名字

正确答案： C

#### 7. 在 controller 的 event handler 中， 不适合执行的操作是

- A. 根据资源的 ownerreference 找到资源的创建者
- B. 判断资源信息，对于不关心的对象， 直接返回
- C. 在 workqueue 中加入资源
- D. 执行控制器的实际处理工作

正确答案： D

#### 8. 下列关于 controller 中 workqueue 描述不正确的

- A. 因为 workqueue 具备去重功能，可以往 workqueue 中反复加入资源
- B. 为了加速 controller 的处理，可以往 workqueue 中加入资源的指针
- C. 一个控制器的 workqueue 一般只存储一种类型资源的名字
- D. 对于处理 node 的控制器，可以只在 workqueue 中加入节点的名字而不包括命名空间

正确答案： B

#### 10. 以下不是声明式的 API 设计

- A. 创建一个容器的 API 是 POST /containers/create，请求参数是容器的各种规格， 返回系统生成的容器 id
- B. 删除一个容器的 API 是 DELETE /containers/<containerid>, 返回一个异步删除的工单号，可以根据工单号查询删除进度
- C. 给应用扩容的 API 是 PUT /containers/create?increaseReplicas=1， 参数指定扩容的增量容器数量
- D. 更新一个容器镜像的 API 是 PATCH /containers/<containerid>?image=nginx, 返回的是容器新的目标状态

正确答案： A B C

### 第 6 讲：应用编排与管理 - Deployment

#### 2. 关于 MaxUnavailable 以下说法正确的是：

- A. MaxUnavailable 不可以设置为 0，否则无法发布
- B. MaxUnavailable 可以设置超过 replicas
- C. MaxUnavailable 可以和 MaxSurge 同时设置为 0
- D. MaxUnavailable 可以设置超过 100%

正确答案： B

#### 8. Deployment 与 ReplicaSet 的关系与以下哪组资源最像

- A. Pod 与 Node
- B. Pod 与 Container
- C. ReplicaSet 与 Pod
- D. Deployment 与 Pod

正确答案： C

#### 9. 以下关于 Deployment 的说法正确的有哪些

- A. Deployment 下 running 的 Pod 数量可能大于 replicas 数量
- B. Deployment 更新镜像时一定会创建一个 ReplicaSet
- C. 用 kubectl rollout undo 命令回滚 Deployment，不会创建新的 ReplicaSet
- D. 滚动发布的时候 MaxUnavailable 和 MaxSurge 可以同时设为 0

正确答案： A C

#### 10. 指定 Deployment 回滚到某个历史版本执行成功的过程中，不会发生以下哪些事件：

- A. Pod 创建和销毁
- B. ReplicaSet 创建和销毁
- C. Deployment 期望数量变化
- D. Deployment template 变化

正确答案： B C

### 第 7 讲：应用编排与管理 - Job 和 DaemonSet

#### 9. 使用哪些标签能让 daemonset 的 pod 只运行在某些节点

- A. .spec.template.spec.nodeSelector
- B. .spec.template.spec.affinity
- C. Taints and Tolerations
- D. matchExpressions

正确答案： A B

> A Pod Template in a DaemonSet must have a RestartPolicy equal to Always, or be unspecified, which defaults to Always.

### 第 8 讲：应用配置管理

#### 6. 当节点磁盘空间不足时，Pod 被驱逐的顺序为: BestEffort 先于 Burstable

正确答案： 正确

#### 10. 如下哪些方式创建的 Pod 可以使用 ConfigMap

- A. Kubectl
- B. Dashboard
- C. kubelet mainifests
- D. kubelet url

正确答案： A B

ConfigMap 使用注意点

1. ConfigMap 文件大小限制：1MB（etcd 的要求）
2. Pod 只能引用相同 Namespace 中的 ConfigMap
3．Pod 引用的 ConfigMap 不存在时，Pod 无法创建成功。即 Pod 创建前需要先创建好 ConfigMap
4. 使用 envFrom 从 ConfigMap 来配置环境变量时，如果 ConfigMap 中的某些 key 被认为无效（比如 key 名称中带有数字），该环境变量将不会注入容器，但是 Pod 可以正常创建。
5. 只有通过 k8s api 创建的 pod 才能使用 ConfigMap, 其他方式创建的 pod（如 manifest 创建的 pod) 不能使用 ConfigMap

### 第 9 讲：应用存储和持久化数据卷 - 核心知识

#### 5. 在 Pod 中声明使用 volume 需要配置哪些字段

- A. .spec.volumes
- B. .spec.initContainers.volumeMounts
- C. .spec.containers.volumeMounts

正确答案： A B C

#### 6. 在 Pod 中声明使用 volume 常见类型

- A. 本地存储
- B. 网络存储
- C. Projected Volume(投射卷)
- D. PVC+PV 持久化存储

正确答案： A B C D

### 第 10 讲：应用存储和持久化数据卷 - 存储快照与拓扑调度

#### 3. 下面在 Kube-Scheduler 中结合 Pod 中声明的 PVCs 选择 Node 过程描述正确的有

- A. Pod 中已经 Bound 的 PVCs 在 Kube-Scheduler 不做处理
- B. Pod 中所有 UnBound 的 PVCs 会先找到能匹配的 PV 列表，并 check PV 的 NodeAffinity 与 Node Labals 中的拓扑信息是否匹配
- C. Pod 中需要 Dynamic Provisioning PV 的 PVCs，check StorageClass .allowedTopologies 与 Node Labels 中的拓扑信息是否匹配

正确答案： C

#### 4. Kubernetes 中为了支持存储拓扑调度相关组件做的改变有

- A. PersistentVolumeController 支持 PVC 与 PV 的 delay binding
- B. 动态创建 PV 的 csi-provisioner 支持将第一个使用 PV 的 Pod 待运行 Node 的拓扑信息以及 StorageClass .allowedTopologies 传递给创建存储的 Driver
- C. Kube-Scheduler 结合 Pod 使用的 PVCs，预分配的 PV Node Affinity 以及 StorageClass .allowedTopologies 选择合适的 Node

正确答案： A B C

#### 5. 下列有关使用存储拓扑调度时对 StorageClass 的配置正确的有

- A. 需要通过设置. volumeBindingMode: WaitForFirstConsumer 来声明 PVC 延时处理
- B. 可以通过. allowedTopologies 限制动态生成的 PV 的拓扑限制，拓扑限制会写到动态生成的 PV .spec.nodeAffinity 中
- C. 可以干预哪些需要使用该 StorageClass 动态生成 PV 对象的 PVC 的使用方 Pod 的可调度的 Node

正确答案： A B C

#### 7. 可以限制 PV 对象可被访问拓扑位置限制的地方

- A. StorageClass: .allowedTopologies
- B. PV: .spec.nodeAffinity
- C. Node: .metadata.labels

正确答案： A B

#### 8. 下列有关如何使用存储拓扑调度的说法正确的有

- A. 声明 delay binding 的 StorageClass 对象（.volumeBindingMode=WaitForFirstConsumer）
- B. PVC 对象. spec.storageClassName 指定为声明了 delay binding 的 StorageClass 对象
- C. 在静态（预）创建的 PV 上的. spec.nodeAffinity 添加对使用该 PV 的 Pod 所在 Node 拓扑限制
- D. 在需要动态创建的 PV 所使用的 StorageClass 的. allowedTopologies 中限制动态创建的存储能被使用的拓扑限制

正确答案： A B C D

#### 9. 使用存储快照功能需要用到哪些 Kubernetes API 资源对象

- A. VolumeSnapshot
- B. VolumeSnapshotClass
- C. VolumeSnapshotContent
- D. PersistentVolumeClaim

正确答案： A B C D

### 第 11 讲：可观测性——你的应用健康吗

#### 4. Readiness Probe 可以解决应用启动慢造成访问异常的问题。

正确

错误

正确答案： 正确

#### 7. 当 Pod 处在 Pending 的时候，可能是由于如下哪个问题造成的。

- A. 资源不足，造成无法调度
- B. Pod 尚未进入调度阶段
- C. Pod 调度失败
- D. Pod 正在拉取镜像

正确答案： A B D

#### 9. 以下哪个关于 Liveness Probe 的描述是错误的

- A. Liveness Probe 是就绪探针
- B. Liveness Probe 是存活探针
- C. Livenss Probe 和 Readiness Probe 的探测方式是一致的
- D. Liveness Probe 主要面向有状态服务

正确答案： A D

### 第 12 讲：可观测性——监控与日志

#### 2. 以下哪个不是 Prometheus 的优势

- A. Prometheus 的采集性能优越
- B. Prometheus 的采集方式丰富
- C. Prometheus 的接入方式简单
- D. Prometheus 的插件丰富

正确答案： A

### 第 13 讲：Kubernetes 网络概念及策略控制

#### 1. 影响容器网络性能最关键的因素是哪个

- A. IP 地址管理方式
- B. 是否使用隧道技术
- C. 网络拓扑路径
- D. 底层网络性能

正确答案： C

#### 3. 哪种容器网络方案是普适性最高的默认选择

- A. Flannel-vxLan
- B. Flannel-host gw
- C. Canal
- D. Calico

正确答案： A

#### 5. net namespace 拥有完全独立隔离的网络环境。

正确

错误

正确答案： 错误

相关知识点： 不准确，协议栈代码是公用的，很多 systemctl 可控参数并没有独立

#### 6. Kubernetes 的 Pod 只能有且只能配置 1 个 IP 地址。

正确

错误

正确答案： 错误

相关知识点： 不准确，可以有多个 IP 地址，只是上报给 CNI 结果时候，只能报一个

#### 7. Kubernetes network policy 只支持 TCP/UDP 作为协议字段值。

正确

错误

相关知识点： 还支持 stcp（alpha 特性）

正确答案： 错误

#### 8. Kubernetes 容器网络方案实现上，禁止任何形式的地址转换（NAT）。

正确

错误

相关知识点： 可以使用 NAT 作为实现手段，不能被 Pod-APP 感知

#### 9. Kubernetes 基本网络模型需要符合哪些条件

- A. 所有 Pod 可以与其他 Pod 直接通信，无需显式使用 NAT
- B. 所有 Node 可以与所有 Pod 直接通信，无需显式使用 NAT
- C. Pod 可见的 IP 地址确为其他 Pod 与其通信时所用，无需显式转换

正确答案： A B C

#### 10. Kubernetes 网络方案需要考虑哪些需要达成的连通性目标

- A. 容器与容器间的通信
- B. Pod 与 Pod 之间的通信
- C. Pod 与 Service 间的通信
- D. 外部世界与 Service 间的通信

正确答案： A B C D

### 第 14 讲：Kubernetes Services

#### 5. 创建 LoadBalancer 类型的 Service 会自动创建和绑定外部 LoadBalancer 到节点映射的 NodePort 上。

正确

错误

正确答案： 正确

#### 8. Pod 可以直接用 Service 名来访问同一个集群里的 Service，不管 Pod 和 Service 在不在一个 Namespace。

正确

错误

正确答案： 错误

### 第 15 讲：深入剖析 Linux 容器

#### 3. docker 在宿主机上最多可以创建多少个容器

- A. 1000
- B. 和宿主机的 cpu/memory 资源有关系
- C. 不一定

正确答案： C

#### 4. 宿主机上能否看见容器内的进程

- A. 不能，因为容器有自己的 pid namespace，隔离了宿主机上的进程可见性
- B. 能，只是容器内外看到的进程 pid 不一样

正确答案： B

#### 7. 运行 docker stop $container 命令停止一个容器后，容器的相关文件还在吗

- A. 在，stop 只是停止了进程，文件等内容还是在宿主机上的
- B. 不在，进程消失了，容器全部都不见了

正确答案： A

#### 8. 已运行 docker run -d -t --name demo ubuntu top 和 docker run --name demo-x --pid container:demo ubuntu ps 命令，是否可以在 demo-x 容器内停止容器

正确

错误

正确答案： 正确

#### 9. 已运行 docker run -d -t --name demo ubuntu top 命令, 是否在 demo 这个容器内部停止容器

正确

错误

正确答案： 错误

#### 10. 已运行 docker run -d -t --name demo ubuntu top 和 docker run --name demo-x --pid container:demo ubuntu ps 命令，如果 demo 容器退出了，正在运行的 demo-x 容器是否会退出

正确

错误

正确答案：正确

### 理解 etcd 的核心设计思想

#### 6. etcd 集群中存在 3 个 server 时，重启其中一个 server 完全不会影响服务。

正确

错误

正确答案： 错误

#### 9. 关于 etcd lease，以下说法正确的是

- A. etcd 创建 lease 对象时，需要指定一个时间作为其超时时间。
- B. lease 对象被创建后，超过设定的时间一定会被系统自动回收。
- C. 将 key 关联到 lease 对象上，当 lease 对象超时后，key 会被系统自动回收。
- D. etcd 支持将多个 key 关联到同一个 lease 对象上，从而大幅降低刷新 lease 的性能开销。

正确答案： A C D

### 第 17 讲：深入理解 etcd - etcd 性能优化实践

#### 5. etcd 满足了 CAP 原理中的哪些特性

- A. CA
- B. CP
- C. AP
- D. CAP

正确答案： B

#### 8. 以下说法正确的是

- A. 新的 etcd 采用了 segregated hashmap 算法管理 freelist
- B. freelist 是内部已存储数据页面的集合
- C. 采用新的页面管理算法后，etcd 存储数据量大幅度提升
- D. compact 删除历史数据不会影响 etcd 性能

正确答案： A C

freelist 是内部存储被释放的数据页面的集合

#### 10. 关于 etcd lease，以下说法正确的是

- A. 新版本的 etcd 对 lease 处理进行了优化
- B. etcd 中可以存有大量的 lease
- C. etcd 切换 leader 后，lease 会丢失
- D. etcd 切换 leader 后，原有 lease ttl 信息会不准

正确答案： A D

https://github.com/etcd-io/etcd/issues/9395

> It is needed since only the leader records TTL for performance reasons. It wont be changed.
We should document it though. But if you expect the leader changes much more frequent than lease can expire, you have to either make your cluster more reliable or shorter the lease.

### 第 18 讲：Kubernetes 调度和资源管理

#### 1. 挑选一个合适节点作为抢占节点的策略当中，哪个因素是排在第一位的考虑因素

- A. 破环 PDB 最少的节点
- B. Pods 优先级加和最小的节点
- C. Pods 数目最少的节点
- D. 最近启动 Pod 的节点

正确答案: A

#### 7. 在资源列表中 1.5Gi 内存也可以用以下哪个方式表达

- A. 1500m
- B. 1500Mi
- C. 1536m
- D. 1536Mi

正确答案： D

#### 10. 下列哪种 request/limit 使用方式代表创建 Burstable 的 Pod

- A. CPU/Memery 都填了，但 request<limit
- B. 只填了 CPU 资源的 request，Memory 资源 request 和 limit 都没填
- C. CPU 和 Memory 资源都没填，但填了 GPU 的 request
- D. 只填了 CPU/Memory，且 request=limit

正确答案： A B C

### 第 19 讲：调度器的调度流程和算法介绍

#### 1. 下列关于打分器（prioritize）的作用描述不正确的是

- A. 能用来确保 Pod 之间的亲和部署
- B. 用来尽量满足 Pod 和 Node 亲和部署
- C. 支持 Pod 在节点上尽量打散
- D. 可以用来支持 Pod 尽量调度到已有此镜像的节点

正确答案： A

#### 4. 以下扩展点哪个是 scheduler extender 不支持的

- A. filter
- B. prioritize
- C. bind
- D. prebind

正确答案： D

#### 6. 调度节点选择的逻辑是

- A. 随机选择节点用于过滤
- B. 优先把一个 Zone 的节点过滤完之后，再选择下一个 Zone
- C. 选择节点按照 Zone 分组进行 RoundRobine 选择，使得取样模板在 zone 上更均衡

正确答案： C

### 第 20 讲：GPU 管理和 Device Plugin 工作机制

#### 1.Device Plugin 的 AllocateResponse 中可以接收如下哪些参数

- A. devices
- B. mounts
- C. envs
- D. cpus

正确答案： A B C(试卷说是单选, 题目有问题)

#### 2.Device Plugin 中 API 可以用来反映设备健康状况的方法名称是

- A. Allocate
- B. Register
- C. ListAndWatch
- D. PreStartContainer

正确答案： C

#### 3.Kubernetes 是从哪个版本开始支持 Device Plugin

- A. 1.8
- B. 1.9
- C. 1.10
- D. 1.11

正确答案： A

https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.8.md#kubelet

#### 4. 使用 Kubernetes 管理 GPU 资源可以利用 Kubernetes 的统一调度能力，使资源使用方能够用即申请，完即释放，从而盘活整个 GPU 资源池。

- 正确
- 错误

正确答案： 正确

#### 5. 如果需要构建 GPU 容器镜像，必须要在镜像里安装英伟达驱动、CUDA 库。

- 正确
- 错误

正确答案： 错误, 驱动由宿主机提供, 通过挂载给容器使用

#### 6. 必须要使用 Nvidia Docker 才能运行 GPU 容器。

- 正确
- 错误

正确答案： 错误

#### 7. 可以通过 nvidia.com/gpu=0.5 申请 GPU。

- 正确
- 错误

正确答案： 错误

#### 8.Device Plugin 机制只能支持 Nvidia GPU，而无法支持 AMD GPU。

- 正确
- 错误

正确答案： 错误

#### 9. 当前 Kubernetes 先可以支持复杂场景的 GPU 调度，比如 GPU 精细调度，具体来说可以调度彼此间有 NVLink 连接的两个 GPU 卡。

- 正确
- 错误

正确答案： 错误

#### 10.Kubernetes 通过哪些内部机制支持 GPU 管理

- A. CNI Plugin
- B. Device Plugin
- C. Extended Plugin
- D. Cloud Provider

正确答案: B C

### 第 21 讲：Kubernetes 存储架构及插件使用

#### 1. 下面哪个不是 CSI CRD 定义的对象

A. PVC

B. CSIDriver

C. CSINode

D. VolumeAttachment

正确答案: A

#### 2. 关于 Volume 的 Provision、Attach、Mount 操作，下面说法错误的是

- A. PV controller 只能负责 Provision 操作
- B. AD Controller 只能负责 Attach 操作
- C. Volume Manager 只能负责 Mount 操作

正确答案: C

#### 3. 关于存储卷回收策略，下面说法错误的是

- A. Retain 模式：PVC 删除后，PV 依然存在
- B. 动态生成的 PV，默认为 Retain 模式
- C. Delete 模式：PVC 删除后，PV 同时被删除
- D. Recycle 模式：PVC 删除后，PV 可再次使用

正确答案: B

#### 4. 关于 Kubernetes VolumePlugin，下面说法错误的是

- A. Volume Plugin 分为 In-Tree、Out-Of-Tree 两种类型
- B. In-Tree 类型插件，和 Kubernetes 融合度高，是社区推荐的使用方式
- C. Out-Of-Tree 类型插件，解耦了编排系统和存储服务，是社区推荐的使用方式
- D. VolumePlugin 是 Kubernetes 对存储卷访问的接口抽象

正确答案: B

#### 5. 关于 Flexvolume 接口，下面说法正确的是

- A. Attach 接口一定会被调用
- B. ExpandVolumeDevice 实现文件系统扩容
- C. 所有接口都必须实现
- D. MountDevice 接口实现设备挂载到 Global 目录

正确答案： D

#### 6. 关于 Flexvolume、CSI，下面说法正确的有

- A. 相比 Flexvolume，CSI 能提供更好的安全能力
- B. Flexvolume 是非容器化部署，依赖难以解决
- C. CSI、Flexvolume 都只能支持 Kubernetes 平台
- D. CSI 通过容器化部署，是社区推荐的插件方案

正确答案： A B D

#### 7. 关于 Flexvolume，下面说法正确的有

- A. Flexvolume 可以支持 Attach 操作
- B. Flexvolume 是一个守护进程
- C. Flexvolume 可以支持 Provision 操作
- D. Flexvolume 是运行在主机空间的程序

正确答案： A D

#### 8. 关于 CSI 组件，下面说法正确的有

- A. PV Controller 调用 External Provisioner 实现创建数据卷功能
- B. 有些存储类型可以不部署 External Attacher
- C. Kubelet 直接调用 CSI Plugin 实现数据卷的 Mount/Unmount 操作
- D. CSI Controller Server 和 CSI Node Server 每个节点都需要部署

正确答案： B C

#### 9. 关于 pv、pvc 绑定，下面说法正确的有

- A. 必须 Access Modes 相同的 pv、pvc 才可以绑定
- B. PVC 定义的 Capacity 必须等于 PV 的 Capacity 才可以绑定
- C. 可以通过 Selector 配置特定的 PVC、PV 绑定
- D. PVC 找不到匹配的 PV 时，才会触发 Provisioner 创建 PV

正确答案： C D

#### 10. 关于 CSI，下面说法正确的有

- A. CSI 以容器方式部署
- B. CSI-Provisioner 需要部署成 DaemonSet 模式
- C. CSI Plugin 通过本地 Socket 与 kubelet 通信
- D. CSI 只是针对 Kubernetes 设计的存储接口

正确答案： A C

### 第 22 讲：有状态应用编排：StatefulSet

#### 1. 通过 StatefulSet 不能实现以下哪个功能

- A. 应用扩缩容
- B. 应用发布回滚
- C. 应用重启
- D. 应用副本数量维持

正确答案： C

#### 2. 创建 StatefulSet spec 中的 template 字段，用处不包括

- A. 声明 Pod 容器的挂载目录
- B. 声明 Pod 需要的 pvc 模板
- C. 指定镜像版本
- D. 指定 Pod 容器重启策略

正确答案： B

#### 3. 以下哪个是 StatefulSet 中要填写 serviceName 的根本原因

- A. 有状态应用必须配置 service
- B. 通过 headless service 来为 StatefulSet 提供服务
- C. 通过 headless service 来为 StatefulSet 的每个 Pod 提供唯一 hostname
- D. 通过 headless service 来提高有状态服务的性能

正确答案： C

#### 4. 如果 StatefulSet 的 podManagementPolicy 设置为 Parallel，则下列哪个说法错误

- A. 不再严格按照顺序 Ready 的方式串行创建 Pod
- B. 不再严格按照倒序串行缩容 Pod
- C. 不再严格按照倒序串行升级 Pod
- D. podManagementPolicy 是可选字段，yaml 中可以不填

正确答案： C

#### 5. 以下关于 ControllerRevision 历史版本说法正确的是

- A. 所有历史版本都会作为 ControllerRevision 保留
- B. pod label 中的 controller-revision-hash 与对应版本 ControllerRevision name 一致
- C. revisionHistoryLimit 字段不设置默认没有数量限制
- D. 更新了 StatefulSet spec 中字段，就会创建一个新的 ControllerRevision

正确答案： B

#### 6. 以下哪个不可能是名为 nginx-web 的 StatefulSet 扩容出来的 pod/pvc name

- A. nginx-web-1
- B. nginx-web-15
- C. tmp-nginx-web-3
- D. nginx-web-tmp-1

正确答案： D

#### 7. 通过配置 StatefulSet，可以使每个 Pod 对应一个独立的 PVC，也可以使所有 Pod 共用一个 PVC。

- 正确
- 错误

正确答案： 正确

#### 8. 关于 StatefulSet 中的 volumeClaimTemplates，下列说法错误的有哪些

- A. 创建出的 PVC name，就是 volumeClaimTemplates 中的 metadata.name 加一个 order 序号
- B. 如果设置了 volumeClaimTemplates，那么每次创建 Pod 之前都会发生 PVC 创建
- C. volumeClaimTemplates 里能设置多个 PVC 模板
- D. 如果不设置 volumeClaimTemplates，那么 StatefulSet 创建出的 Pod 就无法使用 PVC

正确答案： A B D

#### 9. 以下关于 StatefulSet 和 Deployment 的区别说法正确的有哪些

- A. StatefulSet 的 Pod 能使用 PVC，Deployment 的 Pod 不能
- B. StatefulSet 有的发布能力，Deployment 都有
- C. StatefulSet 发布前后 Pod name 不变，而 Deployment 会变
- D. StatefulSet 直接操作管理 Pod 资源，而 Deployment 则不会

正确答案： C D

#### 10. 一个 replicas=10、partition=8 的 StatefulSet，在某一个时刻 status 可能处于以下哪些状态

- A. currentReplicas:8 updatedReplicas: 2
- B. currentReplicas:9 updatedReplicas: 1
- C. currentReplicas:10 updatedReplicas: 10
- D. currentReplicas:6 updatedReplicas: 2

正确答案： A B C D

### 第 23 讲：Kubernetes API 编程范式

#### 1.Kubernetes CRD 是在哪个版本被引入的

- A. 1.6
- B. 1.7
- C. 1.8
- D. 1.9

正确答案： B

#### 2. 自定义资源使用什么字段来嵌套其他子资源

- A. status
- B. subresource
- C. spec
- D. metadata

正确答案： B

#### 3. 自定义资源能够具备自己的状态字段吗

- A. 能
- B. 不能

正确答案： A

#### 4.Kubernetes 自定义资源一般指的是

- A. CRD
- B. 扩展 APIServer

#### 5.CRD 必须配合 controller 才能有效果。

- 正确
- 错误

正确答案： 正确

#### 6.Kubernetes 自定义资源出现的原因是什么

- A. 用户自定义资源需求比较多
- B. Kubernetes 原生资源无法满足需求
- C. Kubernetes APIServer 扩展比较复杂
- D. 用户对 Kubernetes 架构不满意

正确答案： A B C

#### 7.Kubernetes CRD 可以和内置资源共享什么资源

- A. kubectl
- B. RBAC
- C. Deployment
- D. Pod

正确答案： A B

#### 8.Controller 通过（ ）来同时处理多个对象的请求

- A. Queue
- B. Worker
- C. Handler
- D. Manager

正确答案： A B

#### 9. 关于 Controller 的描述，以下正确的有

- A. Controller 是 Kubernetes 的大脑
- B. Controller 来完成具体的 CRD 操作
- C. Controller 完成全部的 CRD 功能
- D. Controller 必须配合 CRD 才能完成功能

正确答案： A B

#### 10.Controller 一般具备哪几个函数来接受请求

- A. AddFunc
- B. UpdateFunc
- C. DeleteFunc
- D. PopFunc

正确答案： A B C

### 第 24 讲：Kubernetes API 编程利器：Operator 和 Operator Framework

#### 1. 在 webhook 业务逻辑中，下列哪些行为是不建议的

- A. 设置缺省值
- B. 校验字段正确性
- C. 调用外部 api
- D. 处理非 CRD 对象

正确答案： C

#### 2. 在 controller 入队逻辑中，下列哪些行为是不建议的

- A. 查询 CRD 对象
- B. 查询 CRD 关联对象
- C. 根据对象字段做入队过滤
- D. 处理业务逻辑

正确答案： D

#### 3. 大多数情况下只能工作在主备模式的是

- A. apiserver
- B. validating webhook
- C. mutating webhook
- D. controller

正确答案： D

#### 4.controller 入队逻辑针对可能丢失事件的正确处理方法是什么

- A. 无论什么事件都尽量入队
- B. 给相关对象增加 finalizer
- C. 定时轮询资源对象
- D. 同一个事件入队多次

正确答案： B

#### 5.webhook 只能拦截处理 CRD 对象。

- 正确
- 错误

正确答案： 错误

####　6.controller Reconcile 主循环返回错误会入队重试。

- 正确
- 错误

正确答案： 正确

#### 7.operator 模式中，webhook 组件和 controller 组件都是必须的。

- 正确
- 错误

正确答案： 错误

#### 8.controller 的入队逻辑只取决于 CRD 的状态变化。

- 正确
- 错误

正确答案： 错误

#### 9. 下列哪些设计是不可取的

- A. controller 主循环函数不幂等
- B. controller 实时更新 CRD status 信息
- C. 开发的多个 mutating webhook 有顺序依赖
- D. validating webhook 依赖 mutating webhook 先执行

正确答案： A C

#### 10. 下面哪种失败会导致 pod 创建失败

- A. pod validating webhook 失败
- B. pod mutating webhook 失败
- C. pod controller 业务逻辑失败
- D. pod controller 更新状态失败

正确答案： A B

### 第 25 讲：Kubernetes 网络模型进阶

#### 1.Flannel-HostGW 方案精髓，是选以下哪个网卡上的 IP，做非本地节点网段的 GW

- A. CNI
- B. Node-NIC
- C. Remote-CNI0
- D. Remote-Node-Nic

相关知识点： 对端网段选对端 node 网卡 IP 做 GW

正确答案： D

#### 2. 不通过 Nodeport 接口，外部无法调用 Kubernetes 的 Service。

- 正确
- 错误

相关知识点： 还有其他办法，比如在某个节点插入外网卡，变成路由节点

正确答案： 错误

#### 3. 容器里面必须有网络设备才能叫容器网络。

- 正确
- 错误

相关知识点： 还可以有用户态路径方案

正确答案： 错误

#### 4. 常见的网络五元组元素包含 4 层协议类型号。

- 正确
- 错误

正确答案： 正确

#### 5.Ingress 机制就是来替换 Service 的。

- 正确
- 错误

相关知识点： 不是，其实更好的辅助组件，更好对接 Service

正确答案： 错误

#### 6.Pod 能且只能支持网络空间共享。

- 正确
- 错误

相关知识点： 还可以支持 ipc 等空间，可选

正确答案： 错误

#### 7.Iptables 类型的 network policy 可以通杀一切带 Bridge 的容器网络数据方案。

- 正确
- 错误

相关知识点： Bridge 不使能 br-call-Iptables 功能，则不能起作用

正确答案： 错误

#### 8.Underlay 方案全面优于 Overlay 方案，可以完全替代。

- 正确
- 错误

相关知识点： 不是，要看场景

正确答案： 错误

#### 9. 有了 Service，云厂商的负载均衡服务不再有用武之地。

- 正确
- 错误

相关知识点： 不是，云厂商 LB 服务是 Servier 的最佳前端

正确答案： 错误

#### 10.Docker 的桥接网络优势是什么

- A. 天然集成在 Docker 引擎中
- B. 与外部网络完全解耦
- C. 能完美支持 Kubernetes 网络模型
- D. Bridge 是内核最通用稳定的虚拟设备之一

正确答案： A B D

### 第 26 讲：理解 CNI 和 CNI 插件

#### 1.Kubernetes 的网络插件接口是什么

- A. CNI
- B. CSI
- C. CNM
- D. CRI

正确答案： A

#### 2. 以下哪个不是路由模式的 CNI 插件

- A. flannel-hostgw
- B. calico-bgp
- C. contiv
- D. flannel-alivpc

正确答案： C

#### 3. 在虚拟化的环境中一般选择哪种类型的网络插件

- A. Overlay
- B. Underlay
- C. 路由

正确答案： A

#### 4.Kubernetes 通过 GRPC 接口调用网络插件。

- 正确
- 错误

正确答案： 错误

#### 5.Overlay 模式实现的网络插件性能损失较大。

- 正确
- 错误

正确答案： 正确

#### 6.Overlay 模式对底层网络环境要求小。

- 正确
- 错误

正确答案： 正确

#### 7.CNI 插件一般由 Daemon 和 Binary 两部分组成。

- 正确
- 错误

正确答案： 正确

#### 8.CNI 插件要负责的事情包括

- A. 给 Pod 配置网卡和 IP 等网络配置
- B. 配置 K8S Service 的负载均衡
- C. 配置 Network Policy
- D. 打通 Pod 间网络的访问

正确答案： A C D

#### 9. 以下哪个是 Underlay 网络模式的特点

- A. 性能好
- B. Pod 创建速度快
- C. 对底层网络无要求
- D. 可以和集群外资源互联互通

正确答案： A D

#### 10. 下列哪些可以作为打通 Node 间网络通道的手段

- A. Overlay 隧道
- B. VPC 路由表
- C. IP 按 Node 分段
- D. BGP 路由

正确答案： A B D

### 第 27 讲：Kubernetes 安全之访问控制

#### 1. 下列哪个选项不属于 Kubernetes API 请求流程

- A. authentication
- B. authorization
- C. autoscaling
- D. admission control

正确答案： C

#### 2. 在 x509 证书认证中，下列哪个字段会被 apiserver 作为用户模型中的用户 (user)

- A. Issuer –> O
- B. Issuer -> CN
- C. Subject -> O
- D. Subject -> CN

正确答案： D

#### 3. 以下哪种说法是错误的

- A. service account 是 Kubernetes 中唯一能够通过 API 方式管理的 apiserver 访问凭证
- B. 对于已经创建的 pod，我们可以更新其已经挂载的 service account 内容
- C. 用户可以通过 API 创建自定义名称的 service account
- D. 当一个 namespace 创建完成后，会同时在该 namespace 下生成名为 default 的一个 Service Account 和对应的 secret 实例

正确答案： B

#### 4. 如果我们没有设置 KUBECONFIG 变量，kubectl 客户端还会尝试从下列哪个路径读取 kubeconfig 配置

- A. $HOME/.kube/config
- B. $HOME/.config/kubeconfig
- C. $HOME/.config/userconfig
- D. $HOME/.kube/user

正确答案： A

#### 5. 下列哪种认证方式是安全上不推荐的方式

- A. Basic 认证
- B. x509 证书认证
- C. OpenID Connect 认证
- D. Service Account 认证

正确答案： A

#### 6. 下列哪个组件配置参数用于调整 Kubernetes 中 CertificateSigningRequest 实例签发证书的过期时间

- A. kube-apiserver -> tls-cert-file
- B. kube-apiserver -> client-ca-file
- C. kube-controller-manager -> experimental-cluster-signing-duration
- D. kubelet -> rotate-certificates

正确答案： C

#### 7.RBAC 中集群角色 ClusterRole 可以绑定到 namespace 中的一个具体的 object 实例。

- 正确
- 错误

正确答案： 错误

#### 8. 在一个 RoleBinding 实例中，一个绑定只能指定唯一的 Role。

- 正确
- 错误

正确答案： 正确

#### 9. 下列关于 RBAC 的说法，哪些是正确的

- A. RBAC 策略模型中的 Subjects 可能包含开发人员，管理员，系统组件进程或是 pod 进程
- B. RBAC 策略模型中的对象资源在 k8s 集群中指 Pod，Deployment 等各类 API 资源
- C. RBAC 策略模型中的 Verbs 包括 list，watch，put 等
- D. RBAC 策略模型中的角色可以对 k8s subresources（比如 nodes/status） 进行绑定

正确答案： A B D

#### 10. 为了请求主体能够有权使用 kubectl exec –it pod-test bash，在主体绑定的角色模板中需要加入如下哪些策略

- A. deployment： create
- B. pods： get
- C. service：create
- D. pod/exec：create

正确答案： B D

### 第 28 讲：容器运行时接口 CRI

#### 1.Kubernetes 中，crictl 是什么

- A. CRI 接口的性能测试工具
- B. 操作 CRI 接口的命令行工具
- C. CRI 接口的功能正确性测试工具

正确答案： B

#### 2.Kubernetes 的容器运行时接口英文简写是什么

- A. CNI
- B. CSI
- C. CRI

正确答案： C

#### 3.Kubernetes 中，rkt 是什么

- A. 是一种容器运行时
- B. 是一种网络插件
- C. 是一个调度器

正确答案： A

#### 4.Kubelet 与 CRI 之间通过什么协议进行通信

- A. gRPC
- B. HTTP/RESTful API
- C. UDP

正确答案： A

#### 5.CRI-O 是哪个公司的开源产品

- A. Google
- B. Red Hat
- C. Vmware
- D. AWS

正确答案： B

#### 6. 在 CRI 的实现过程中，需要进行 CNI 操作。

- 正确
- 错误

相关知识点： 创建和删除 POD 的时候，需要调用 CNI 设置网络

正确答案： 正确

#### 7.PauseContainer 是一个 CRI 接口。

- 正确
- 错误

相关知识点： Kubernetes 不支持 pause 语义

正确答案： 错误

#### 8.gRPC 协议的优点是

- A. 高性能
- B. 有多种语言的实现
- C. 可以自动生成接口代码
- D. 支持双向流数据

正确答案： A B C D

#### 9.CRI 有哪几类接口

- A. Sandbox
- B. Container
- C. Image
- D. Storage

相关知识点： 存储不属于 CRI 的范畴

正确答案： A B C

#### 10. 如何对 CRI 进行拓展

- A. 直接修改 CRI 接口定义
- B. 通过 annotation 传递自定义字段，在容器运行时的实现里识别
- C. 修改 controller-manager 代码

正确答案： A B

### 第 29 讲：安全容器运行时

#### 1.Kata Containers 从哪个版本开始支持 shim-v2 的

- A. 1.2
- B. 1.5
- C. 1.6
- D. 1.9

相关知识点： 这个幻灯片里没有，但讲课的时候提了，这个应该很难记住

正确答案： B

#### 2.virtio-fs 应用了哪项技术可以跨沙箱共享只读内存

A. DDX

B. DAX

C. SGX

D. DFX

相关知识点： DAX，为非易失内存开发的技术

正确答案： B

#### 3.Kata Containers 项目是哪年宣布的

- A. 2015
- B. 2016
- C. 2017
- D. 2018

正确答案： C

#### 4.gVisor 是用什么语言编写的

- A. Go
- B. Rust
- C. Kotlin
- D. Scala

相关知识点： Go, Go 语言和 gVisor 都来自 G 开头的 Google

正确答案： A

#### 5.gVisor 把什么操作交给 Gofer 进程来进行

- A. Go 代码执行
- B. 冷门系统调用
- C. 内存管理
- D. 文件操作

相关知识点： 最常见的是文件的 open 操作

正确答案： D

#### 6. 在使用 Kata Containers 的时候，一个 Pod 里面可以有几个容器

- A. 只能有一个
- B. 可以有若干个 init container 和一个应用 container
- C. 可以有一个 container 和一个 sidecar
- D. 可以有多个 container

正确答案： D

#### 7. 安全容器和 runC 都可以运行 OCI Image。

- 正确
- 错误

相关知识点： 是的，都支持 OCI 规范

正确答案： 正确

#### 8. 最早的容器技术 Solaris Zone 在上个世纪的 1999 年就出现了。

- 正确
- 错误

相关知识点： 可能还在脑子里吧，1999 年出现的是 FreeBSD Jail

正确答案： 错误

#### 9.Kata Containers 目前可以支持下列哪些虚拟机监视器（VMM）

- A. VMWare
- B. Qemu
- C. Xen
- D. Hyper-V
- E. Firecracker

正确答案： B E

#### 10. 下列哪种机制被 gVisor 用来拦截容器的 syscall

- A. ptrace
- B. KVM
- C. dtrace
- D. strace
- E. JVM

相关知识点： 其他几个都是过来陪跑的，但是这个需要拓展学习以下

正确答案： A B

### 第 30 讲：理解 RuntimeClass 与使用多容器运行时

#### 1. 以下哪段配置表示 containerd 的默认容器运行时

- A. plugins.cri.containerd.runtimes.runc
- B. plugins.cri.containerd.runtimes.runv
- C. plugins.cri.containerd.default_runtime

正确答案： C

#### 2.Kubernetes 哪个版本引入了 RuntimeClass

- A. 1.10
- B. 1.12
- C. 1.14
- D. 1.16

正确答案： B

#### 3. 删除 RuntimeClass 后，对已有的 Pod Overhead 有影响吗

- A. 无
- B. 有
- C. 需要根据上下文判断

正确答案： A

#### 4. 如果使用 RuntimeClass 的 Overhead，需要开启哪个 admisson

- A. ResourceQUota admission
- B. RuntimeClass admisson
- C. PodOverhead admission

正确答案： B

#### 5.Pod Overhead 支持手动配置或更改。

- 正确
- 错误

正确答案： 错误

#### 6.RuntimeClass 是 cluster 级别的资源。

- 正确
- 错误

正确答案： 正确

#### 7. 在没有配置 node label 的情况下，只要 Pod 引用的 RuntimeClass 配置了 Scheduling，Pod 就一定会被调度到有对应容器运行时的节点上。

- 正确
- 错误

正确答案： 错误

#### 8. 哪些容器运行时是基于 CRI 实现的

- A. gVisor
- B. rkt
- C. kata
- D. docker

正确答案： A C

#### 9.Pod Overhead 会影响哪些功能

- A. HPA
- B. Pod 调度
- C. ResourceQuota
- D. Kubelet Pod 驱逐

正确答案： B C D

#### 10. 以下哪些是 Kubernetes v1.16 版本新增特性

- A. Pod Overhead
- B. Handler
- C. Scheduling

正确答案： A C

