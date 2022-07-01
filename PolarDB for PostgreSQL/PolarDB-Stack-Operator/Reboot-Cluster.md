# 重启集群

重启您的整个数据库集群。

***步骤：***

1. 修改您已经创建好的 cluster

```shell
kubectl edit mpdcluster your-cluster-name
```

2. 添加如下字段，字段说明：

| 字段                                | 字段解释                     |
| ----------------------------------- | ---------------------------- |
| metadata.annotations.restartCluster | 设置为 true 表示需要重启集群 |

示例：

```yaml
metadata:
  annotations:
    restartCluster: "true"
```
