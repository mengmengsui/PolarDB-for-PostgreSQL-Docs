# 术语表（持续更新ing）

| 中文                 | 英文                                                         | 缩写 | 备注                                             |
| -------------------- | ------------------------------------------------------------ | ---- | ------------------------------------------------ |
| 原子性               | atomicity                                                    |      |                                                  |
| 预写日志             | Write Ahead Logging                                          | WAL  |                                                  |
| 自由空间页           | Page Free Space                                              | PFS  | 内部PFS还专指PolarDB File System                 |
| 共识服务             | consensus service                                            |      |                                                  |
| 存储计算分离         | compute is decoupled from storage                            |      |                                                  |
| 共享存储             | Shared-Storage                                               |      |                                                  |
| 无共享               | Shared-Nothing                                               |      | 中文文档保留Shared-Nothing即可                   |
| 主机客户网           | host client network                                          |      |                                                  |
| 浮动IP               | floating IP address                                          |      |                                                  |
| 一读多写的数据库集群 | database cluster consisting of a primary node and at least one read-only node |      |                                                  |
| 连接串               | connection string                                            |      |                                                  |
| 数据库节点迁移       | database node migration                                      |      |                                                  |
| 存在性补偿           | existence compensation                                       |      |                                                  |
| 秒级延迟             | millisecond-level latency                                    |      |                                                  |
| HTAP                 | Hybrid Transactional/Analytical Processing                   | HTAP |                                                  |
| 并行回放             | parallel replay                                              |      |                                                  |
| 大规模并行处理       | Massively Parallel Processing                                | MPP  |                                                  |
| 联机分析处理         | Online Analytical Processing                                 | OLAP |                                                  |
| 联机事务处理         | Online Transaction Processing                                | OLTP |                                                  |
| 高并发               | high concurrency                                             |      |                                                  |
| 多模数据库           | multi-model database                                         |      |                                                  |
| 时空                 | spatio-temporal                                              |      |                                                  |
| N副本                | N copies                                                     |      |                                                  |
| 未来页面             | future page                                                  |      |                                                  |
| 过去页面             | outdated page                                                |      |                                                  |
| 刷脏                 | flush dirty pages                                            |      |                                                  |
| 全量回归测试         | full regression test                                         |      |                                                  |
| SSH免密登录          | passwordless SSH login                                       |      |                                                  |
| 块（存储）设备       | block (storage) device                                       |      |                                                  |
| 逻辑卷               | logical volume                                               | LV   |                                                  |
| 缓冲区管理           | buffer management                                            |      |                                                  |
| 数据一致性           | data consistency                                             |      |                                                  |
| 低延迟复制           | low-latency replication                                      |      |                                                  |
| 分布式优化器         | distributed optimizer                                        |      |                                                  |
| 算子并行化           | parallelism of operators                                     |      |                                                  |
| 数据倾斜             | data skew                                                    |      |                                                  |
| 事务一致性           | transactional consistency                                    |      |                                                  |
| 加速比               | speedup                                                      |      |                                                  |
| 一致性位点           | consistent LSN                                               |      |                                                  |
| 日志序列号           | log sequence number                                          | LSN  |                                                  |
| 并行刷脏             | parallel flushing                                            |      |                                                  |
| 热点页               | hot buffer                                                   |      |                                                  |
| 状态机               | state machine                                                |      |                                                  |
| 工作流引擎           | workflow engine                                              |      |                                                  |
| 状态转移             | state transition                                             |      |                                                  |
| 变配                 | change specification                                         |      | 与公有云表述保持一致                             |
| 状态转换表           | state-transition table                                       |      |                                                  |
| 时序图               | sequence diagram                                             |      |                                                  |
| 将数据持久化         | persist the data                                             |      |                                                  |
| 元数据库             | metadatabase                                                 |      |                                                  |
| 无锁跳表             | locked-free skiplist                                         |      |                                                  |
| 主备延迟高           | The latency of data replication between the primary instance and the secondary instance is high. |      |                                                  |
| 读写分离             | read/write splitting                                         |      |                                                  |
| 倒排索引             | inverted index                                               |      |                                                  |
| 索引分裂             | index block split                                            |      |                                                  |
| 流复制               | streaming replication                                        |      |                                                  |
| 调谐                 | reconcile/reconciliation                                     |      |                                                  |
| 终态                 | final state                                                  |      |                                                  |
| 存储扩容             | expand the storage capacity                                  |      |                                                  |
| 持久卷               | Persistent Volume                                            | PV   | 中文可以保持英文表述，对有技术背景的读者更加直观 |
| 持久卷声明           | Persistent Volume Claim                                      | PVC  | 中文可以保持英文表述，对有技术背景的读者更加直观 |
| 映射关系             | mapping relationship                                         |      |                                                  |
| 时序数据库           | time series database                                         |      |                                                  |
| 数据仓库             | data warehouse                                               |      |                                                  |
| 非易失性存储器       | Nonvolatile Memory                                           | NVM  |                                                  |
| 卷完整点             | Volume Complete LSN                                          | VCL  |                                                  |
| 一致性点             | Consistent Point LSNs                                        | CPLs |                                                  |
| 卷持久点             | Volume Durable LSN                                           | VDL  |                                                  |
| 远程直接数据存取     | Remote Direct Memory Access                                  | RDMA |                                                  |
| 多版本并发控制       | Multi-Version Concurrency Control                            | MVCC |                                                  |
| 故障转移             | Failover                                                     |      |                                                  |
| 写时复制             | copy-on-write                                                | COW  |                                                  |