# 读写切换

将您数据库集群的 ro 节点切换为 rw 节点。

***步骤：***

1. 修改您已经创建好的 cluster。

```shell
kubectl edit mpdcluster your-cluster-name
```

2. 添加如下字段，字段说明：

| 字段                          | 字段解释                                                     |
| ----------------------------- | ------------------------------------------------------------ |
| metadata.annotations.switchRw | 需要切换为 rw 节点的 ro 节点 ID，ID 在 status.dbInstanceStatus 中列出 |

***示例：***

```yaml
metadata:
  annotations:
    switchRw: "7614"
```

***状态验证：***

正在切换中

```yaml
[root@dbm-01 ~]# kubectl get mpdclusters.mpd.polardb.aliyun.com your-cluster-name -o yaml | grep clusterStatus
  clusterStatus: SwitchRw
```
