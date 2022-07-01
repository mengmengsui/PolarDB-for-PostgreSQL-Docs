# 修改引擎参数（刷参）

修改您创建实例的引擎参数。

***步骤：***

1. 查看参数，参数保存在名称为 ${your-cluster-name}-user-params 的 configmap 中。

```plain
kubectl edit cm your-cluster-name-user-params
```

2. 编辑您想要修改的参数，参数取值范围见附录，如：

```plain
checkpoint_timeout: '{"name":"checkpoint_timeout","value":"300","updateTime":"2021-09-29T07:28:59Z","inoperative_value":""}'
```

3. 您可以修改 value 字段为您想要的值，同时更新 updateTime 为当前时间，由于参数更新会校验 updateTime，因此请务必更新 updateTime 字段。

4. 修改完成上述的 configmap，编辑您的 cluster 并设置刷参操作。

```shell
kubectl edit mpdcluster your-cluster-name
```

添加如下字段，字段说明：

| 字段                             | 字段说明                 |
| -------------------------------- | ------------------------ |
| metadata.annotations.flushParams | 设置为 true 表示需要刷参 |

***示例：***

```yaml
metadata:
  annotations:
    flushParams: "true"
```
