# 小版本升级

小版本升级将您的数据库集群所使用的镜像版本升级。

***步骤：***

1. 创建一个新的镜像配置，内容修改为您需要升级的镜像版本，使用 kubectl 使之生效。

字段说明：

| 字段           | 字段解释       |
| -------------- | -------------- |
| pgEngineImage  | DB 引擎镜像    |
| pgManagerImage | manager 镜像   |
| pfsdImage      | pfsd 镜像      |
| pfsdToolImage  | pfsd tool 镜像 |

```yaml
apiVersion: v1
data:
  name: image-open
  pfsdImage: polardb/pfsd:1.2.41-20211018
  pfsdToolImage: polardb/pfsd_tool:1.2.41-20211018
  pgClusterManagerImage: polardb/polardb-cluster-manager:latest
  pgEngineImage: polardb/polardb_pg_engine_release:11beta2.20210910.d558886c.20211018195123
  pgManagerImage: polardb/polardb_pg_manager:20211018195123.9ae43314
kind: ConfigMap
metadata:
  labels:
    configtype: minor_version_info
    dbClusterMode: WriteReadMore
    dbType: PostgreSQL
    dbVersion: "1.0"
  name: postgresql-1-0-minor-version-info-rwo-image-open
  namespace: kube-system
```

2. 修改您已经创建好的 cluster

```shell
kubectl edit mpdcluster your-cluster-name
```

3. 修改 versionCfgModifyTo.versionName 字段为您想要变更成的版本配置名称，添加如下字段，字段说明：

| 字段                           | 字段解释      |
| ------------------------------ | ------------- |
| versionCfgModifyTo.versionName | 如 image-open |

***示例：***

```yaml
spec: 
  versionCfgModifyTo:
    versionName: your-new-config-name
```
