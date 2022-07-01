# 一键安装

## 前置条件

### 硬件要求

| 需求项     | 最低配置                                                     |
| ---------- | ------------------------------------------------------------ |
| 机器数     | 3台                                                          |
| 服务器架构 | 支持x86架构和ARM架构                                         |
| 硬盘       | 系统盘使用SSD，容量300 GB以上；两块单独的NVMe （每块容量 200GB 以上，生产环境建议 1TB 以上），一块作为管控数据存储盘，一块作为redline数据盘，分别挂载在 /disk1 /disk2 目录下 |
| 存储       | 共享存储，分布式存储或者 SAN，要求支持 SCSI 或者 NVME 协议，支持 PR 锁，已挂载到所有机器上。`multipath -ll`可以看到您的共享盘 |

### 软件要求

| 需求项    | 要求    |
| ---- | ------- |
| docker    | 无      |
| kubenetes | 1.14.8+ |
| root 密码 | 服务器的root密码需要保持一致，且可免密操作 |
| 时钟同步 | 操作系统中已经配置NTP时钟同步 |

## 环境要求

1. 一键安装仅支持 CentOS系统
2. 已经安装好 Docker 和 Kubernetes
3. 已经安装好元数据库，并且可以通过 IP + port 的形式连通，数据库类型目前仅支持 MySQL
4. 每台机器互相之间已经配置好免密 ssh
5. 已经安装好 helm

## 修改配置

默认配置为 env.yaml，您需要修改为您自己环境的信息，格式示例如下：

```
dbm_hosts:
  - ip: 10.0.0.77
    name: dbm-01
  - ip: 10.0.0.78
    name: dbm-02
  - ip: 10.0.0.79
    name: dbm-03
network:
  interface: eth0
k8s:
  host: 10.0.0.77
  port: 6443
metabase:
  host: 10.0.0.77
  port: 3306
  user: polar
  password: password
  type: mysql
  version: 8.0.26
```

字段说明：

| 字段              | 含义                           | 要求                   |
| ----------------- | ------------------------------ | ---------------------- |
| dbm_hosts.ip      | 可以访问到您三台主机的 IP 地址 | -                      |
| dbm_hosts.name    | 您三台机器的主机名             | -                      |
| network.interface | 您的网口名称                   | 通过 ifconfig 查询得到 |
| k8s.host          | 您的 k8s apiserver IP 地址     | -                      |
| k8s.port          | 您的 k8s apiserver port        | -                      |
| metabase.host     | 您的元数据库 IP 地址           | -                      |
| metabase.port     | 您的元数据库 port，            | -                      |
| metabase.user     | 您的元数据库用户名             | -                      |
| metabase.password | 您的元数据库登录密码           | -                      |
| metabase.type     | 您的元数据库类型               | 目前仅支持 mysql       |
| metabase.version  | 您的元数据库版本号             | -                      |

## 安装

克隆工程

```shell
git clone https://github.com/ApsaraDB/PolarDB-Stack-Operator.git
```

按上述说明修改配置 

```shell
vim env.yaml
```

运行安装脚本

```shell
./install.sh
```

如无错误则表示安装成功

## 创建 DB 集群

1. 创建 PVC ，调用接口，示例如下，IP 需要换成您的主机 IP 。

```shell
curl -X POST "http://10.0.0.77:2002/pvcs" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"name\": \"pvc-32ze341nncwlczm47bsre\", \"namespace\": \"default\", \"need_format\": true, \"volume_id\": \"32ze341nncwlczm47bsre\", \"volume_type\": \"lun\"}"
```

2. 查看 PVC 是否创建成功。

```plain
kubectl get pvc 
```

3. 创建实例集群，将前面创建的 PVC name 填入您的集群配置。

```shell
apiVersion: mpd.polardb.aliyun.com/v1
kind: MPDCluster
metadata:
  name: mpdcluster-sample-2
  namespace: default
spec:
  operatorName: polar-mpd
  dbClusterType: share
  followerNum: 1
  classInfo:
    className: polar.o.x4.medium
  classInfoModifyTo:
    className: ""
  versionCfg:
    versionName: image-open
  netCfg:
    engineStartPort: 5780
  shareStore:
    drive: "pvc"
    sharePvcNamespace: "default"
    sharePvcName: "pvc-32ze341nncwlczm47bsre"
    diskQuota: "300000"
    volumeId: "32ze341nncwlczm47bsre"
    volumeType: "multipath"
```

