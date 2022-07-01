# 创建PVC

创建的 PVC 是作为您数据库集群的存储使用。

**字段说明：**

| 字段      | 字段解释                                                     |
| --------- | ------------------------------------------------------------ |
| IP        | 存储管理 pod 所在的机器 IP，如 10.0.0.77                     |
| name      | 所要创建的 PVC 名称，如 pvc-32ze341nncwlczm47bsre            |
| volume_id | 共享存储的 wwid，该盘须支持 scsi 或 nvme 协议，如 32ze341nncwlczm47bsre |

***示例：***

```shell
curl -X POST "http://${IP}:2002/pvcs" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"name\": \"${name}\", \"namespace\": \"default\", \"need_format\": true, \"volume_id\": \"${volume_id}\", \"volume_type\": \"lun\"}"
```

返回如下所示即为创建成功

```shell
{"workflow_id":"7cc5191d-803f-4ea5-8eb1-92e5437a52e9"}
```

创建成功后您可以查看 k8s 找到您刚刚创建的 PVC

```shell
kubectl get pvc 
```
