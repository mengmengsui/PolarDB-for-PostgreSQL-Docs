# 完整重建

重建您的数据库集群。

***步骤：***

1. 修改您已经创建好的 cluster

```shell
kubectl edit mpdcluster your-cluster-name
```

2. 添加如下字段，字段说明：

| 字段                              | 字段说明                     |
| --------------------------------- | ---------------------------- |
| metadata.annotations.forceRebuild | 设置为 true 表示需要重建集群 |

***示例：***

```yaml
metadata:
  annotations:
    forceRebuild: "true"
```

***状态检查：***

正在重建中

```shell
[root@dbm-01 ~]# kubectl get mpdclusters.mpd.polardb.aliyun.com your-cluster-name -o yaml | grep clusterStatus
  clusterStatus: Rebuild
```

重建完成

```shell
[root@dbm-01 ~]# kubectl get mpdclusters.mpd.polardb.aliyun.com your-cluster-name -o yaml | grep clusterStatus
  clusterStatus: Running
```
