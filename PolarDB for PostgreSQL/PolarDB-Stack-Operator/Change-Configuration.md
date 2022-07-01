# 变更配置

通过变更配置来修改您的实例的规格。

***步骤：***

1. 修改您已经创建好的 cluster

```shell
kubectl edit mpdcluster your-cluster-name
```

2. 修改 classInfoModifyTo.className 字段为您想要变更成的规格名称。

字段说明：

| 字段                        | 字段解释                                                     |
| --------------------------- | ------------------------------------------------------------ |
| classInfoModifyTo.className | 变更配置后的规格名称，与您配置的 instance_level_config 中 classKey 对应 |

***示例：***

```yaml
spec:   
  classInfoModifyTo:
    className: polar.o.x4.large
```

***状态验证：***

- 变更配置过程中 clusterStatus 会变为 ModifyClass

```yaml
[root@dbm-01 ~]# kubectl get mpdclusters.mpd.polardb.aliyun.com mpdcluster-sample-1 -o yaml | grep clusterStatus
  clusterStatus: ModifyClass
```

- 变更配置完成后 clusterStatus 重新变为 Running

```yaml
[root@dbm-01 ~]# kubectl get mpdclusters.mpd.polardb.aliyun.com mpdcluster-sample-1 -o yaml | grep clusterStatus
  clusterStatus: Running
```
