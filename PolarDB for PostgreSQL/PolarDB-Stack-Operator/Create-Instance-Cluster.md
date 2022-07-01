# 创建实例集群

通过创建实例集群，您可以通过访问该集群访问到您的数据库。

***步骤：***

1. 根据您的需求配置实例集群的 yaml，并且通过 kubectl 使之生效。

```shell
kubectl apply -f your-cluster.yaml
```

字段说明：

| 字段                    | 字段解释                                                     |
| ----------------------- | ------------------------------------------------------------ |
| operatorName            | 您使用的 operator 名称，默认为 polar-mpd，可以在您的 operator 启动参数中使用 --filter-operator-name 参数配置 |
| dbClusterType           | 表示存储类型为共享存储                                       |
| followerNum             | 需要创建几个 ro 节点                                         |
| classInfo.className     | 实例规格名称，与您配置的 instance_level_config 中 classKey 对应，如 polar.o.x4.medium，您可以搜索 all.yaml 找到全部配置 |
| versionCfg.versionName  | 对应镜像配置 configmap postgresql-1-0-minor-version-info-rwo-${versionCfg.versionName} 的后缀，image-open 为 all.yaml 中自带的示例配置 |
| netCfg.engineStartPort  | 创建数据库服务所使用的端口                                   |
| shareStore.sharePvcName | 您已经创建好的 PVC 名称                                      |
| shareStore.volumeId     | 您 PVC 对应共享盘的 wwid，该盘须支持 scsi 或 nvme 协议       |
| shareStore.diskQuota    | 您的数据库引擎能使用的磁盘大小，单位是 M，由于 pfs 每 10G 为一个单位，每次扩容只能扩 10G 的倍数 |

***示例：***

```yaml
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

验证结果：

2. clusterStatus: Running 表示创建成功

```shell
[root@dbm-01 ~]# kubectl get mpdclusters.mpd.polardb.aliyun.com your-cluster-name -o yaml | grep clusterStatus
  clusterStatus: Running
```
