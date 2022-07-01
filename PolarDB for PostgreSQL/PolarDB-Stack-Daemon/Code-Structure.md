# 代码结构

PolarDB Stack Daemon工程采用cobra.Command形式启动程序， 主要由一些定时任务和http服务组成， 工程代码结构启动部分在目录cmd， 业务代码在polar-controller-manager目录。

polar-controller-manager目录主要由以下子目录组成：

- port_usage目录：主要执行端口扫描，将本机上端口已占用情况汇总到configmap中；
- core_version目录：程序启动时会扫描一次本机上内核小版本的image信息，之后根据API调用会再次执行内核小版本image扫描，并汇总到指定configmap；
- db_log_monitor目录： 数据库引擎日志清理的代码；
- node_net_status目录： 主要定时更新k8s node condition状态，包括NodeClientIP、NodeClientNetworkUnavailable、 NodeRefreshFlag， 其中NodeClientIP condition会存储客户网IP信息，供给数据库与cm或者代理直接通信使用；
- bizapis目录：对外提供的restful服务，具体实现在该目下service中， servcie目录中可调用其他目录对应的实现函数。