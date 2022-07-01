# 添加RO

增加一个 ro 节点。

**注意：**需要保证您有空余的机器，否则会端口冲突。

***步骤：***

1. 修改您已经创建好的 cluster

```shell
kubectl edit mpdcluster your-cluster-name
```

2. 添加字段，字段说明：

| 字段        | 字段说明             |
| ----------- | -------------------- |
| followerNum | 添加后总共的 ro 数量 |

***示例：***

```yaml
spec:
  followerNum: 2
```
