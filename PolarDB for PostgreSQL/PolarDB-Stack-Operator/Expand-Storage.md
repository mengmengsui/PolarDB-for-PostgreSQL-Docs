# 存储扩容

扩容您数据库使用的磁盘。

执行前，您需要先将您的磁盘扩容。

修改您已经创建好的 cluster

```shell
kubectl edit mpdcluster your-cluster-name
```

添加如下字段，字段说明：

| 字段                               | 字段说明                 |
| ---------------------------------- | ------------------------ |
| metadata.annotations.extendStorage | 设置为 true 表示扩展存储 |

修改如下字段为您扩容后想要的大小，字段说明：

| 字段                      | 字段说明                                                     |
| ------------------------- | ------------------------------------------------------------ |
| spec.shareStore.diskQuota | 您的数据库引擎能使用的磁盘大小，单位是 M，由于 pfs 每 10G 为一个单位，每次扩容只能扩 10G 的倍数 |

示例：

```yaml
metadata:
  annotations:
    extendStorage: "true"
```
