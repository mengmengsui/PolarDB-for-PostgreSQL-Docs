# 更新镜像版本

修改 configmap postgresql-1-0-minor-version-info-rwo-image-open

```shell
kubectl -n kube-system edit configmap postgresql-1-0-minor-version-info-rwo-image-open
```

示例如下，更新您需要修改的镜像版本。

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

字段说明：

| 字段           | 字段解释       |
| -------------- | -------------- |
| pgEngineImage  | DB 引擎镜像    |
| pgManagerImage | manager 镜像   |
| pfsdImage      | pfsd 镜像      |
| pfsdToolImage  | pfsd tool 镜像 |

### 