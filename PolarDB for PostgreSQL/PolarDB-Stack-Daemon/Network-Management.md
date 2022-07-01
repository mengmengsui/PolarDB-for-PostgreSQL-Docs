# 网络管理

PolarDB Stack Daemon（下文简称为ps-daemon）是阿里云DBaaS混合云产品PolarStack中负责主机上的组件，会在每台主机上运行，主要负责以下操作：

1. 端口扫描：定期扫描所在主机的端口占用情况，为数据库引擎以及其他组件分配端口提供基础数据。
2. 内核镜像版本扫描：识别所在机器上内核版本的可用性，为数据库恢复和创建数据库时指定特定版本提供基础数据。
3. 数据库日志清理：基于共享存储的一写多读数据库数据存储在共享存储上，数据库日志存储在主机的本地盘上，定期按照标准清理本地盘上的日志是保证主机与数据库长期稳定运行的必要措施
4. 节点网络情况与主机情况收集：定时查询所在主机客户网网络情况，更新指定node condition，为数据库引擎、一些多读数据库代理提供连接所需的IP信息与网络状态信息。

> PolarDB Stack Daemon后续默认分支为main分支。