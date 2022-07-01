# RW迁移

将您的 rw 节点迁移到另外一台机器上。

> **注意：**节点迁移只能迁移到没有集群实例的节点，否则会发生端口冲突。

***操作步骤：***

1. 修改您已经创建好的 cluster

```shell
kubectl edit mpdcluster your-cluster-name
```

2. 添加如下字段，字段说明：

| 字段                         | 字段解释                                                     |
| ---------------------------- | ------------------------------------------------------------ |
| metadata.annotations.migrate | 形式为 ${insId}&#124;${targetNode}，如 7601&#124;dbm-02，insId 表示您当前 rw 节点 ID，targetNode 表示您想要迁移到的机器名，可以通过 kubectl get node 获得 |

***示例：***

```yaml
metadata:
  annotations:
    migrate: 7601|dbm-02
```

***状态验证：***

迁移中

```yaml
[root@dbm-01 ~]# kubectl get mpdclusters.mpd.polardb.aliyun.com your-cluster-name -o yaml | grep clusterStatus
  clusterStatus: MigrateRw
```

迁移完成

```yaml
[root@dbm-01 ~]# kubectl get mpdclusters.mpd.polardb.aliyun.com your-cluster-name -o yaml | grep clusterStatus
  clusterStatus: Running
```


