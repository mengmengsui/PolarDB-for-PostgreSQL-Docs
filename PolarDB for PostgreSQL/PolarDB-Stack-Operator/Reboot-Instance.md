# 重启实例

将您数据库集群中的某一个节点重启。

***步骤：***

1. 修改您已经创建好的 cluster 。

```shell
kubectl edit mpdcluster your-cluster-name
```

2. 添加如下字段，字段说明：

| 字段                            | 字段解释                                                     |
| ------------------------------- | ------------------------------------------------------------ |
| metadata.annotations.restartIns | 您想要重启的数据库实例 ID，ID 在 status.dbInstanceStatus 中列出，为一个数字 |

***示例：***

```yaml
metadata:
  annotations:
    restartIns: "7503"
```
