# PolarDB for PostgreSQL简介

PolarDB for PostgreSQL（下文简称为 PolarDB）是一款阿里云自主研发的云原生关系型数据库产品，100% 兼容 PostgreSQL，高度兼容Oracle语法；采用基于 Shared-Storage 的存储计算分离架构，具有极致弹性、毫秒级延迟、HTAP 的能力和高可靠、高可用、弹性扩展等企业级数据库特性。同时，PolarDB 具有大规模并行计算能力，可以应对OLTP与OLAP混合负载。

1. 极致弹性：存储与计算能力均可独立地横向扩展。
   - 当计算能力不够时，可以单独扩展计算集群，数据无需复制。
   - 当存储容量或 I/O 不够时，可以单独扩展存储集群，而不中断业务。
2. 毫秒级延迟：
   - WAL 日志存储在共享存储上，RW 到所有 RO 之间仅复制 WAL 的元数据。
   - 独创的 *LogIndex* 技术，实现了 Lazy 回放和 Parallel 回放，理论上最大程度地缩小了 RW 和 RO 节点间的延迟。
3. HTAP 能力：基于 Shared-Storage 的分布式并行执行框架，加速在 OLTP 场景下的 OLAP 查询。一套 OLTP 型的数据，可支持 2 套计算引擎：
   - 单机执行引擎：处理高并发的 TP 型负载。
   - 分布式执行引擎：处理大查询的 AP 型负载。

PolarDB 还支持时空、GIS、图像、向量、搜索、图谱等多模创新特性，应对企业对数据处理日新月异的需求。

PolarDB 支持多种部署形态：单机本地部署、存储计算分离部署、X-Paxos三节点部署。

> **注意**
>
> PolarDB 后续默认和稳定分支为 POLARDB_11_STABLE 分支（支持基于 Shared-Storage 的存储计算分离的形态）。另外，除了上述 Shared-Storage 云原生的模式，PolarDB 还支持以 Shared-Nothing 模式部署，详见[**distributed**](https://github.com/ApsaraDB/PolarDB-for-PostgreSQL/blob/distributed/README.md)分支（对应之前的 master 分支）。
