# 基本原理

PolarDB-ImageBuilder通过 `image.py` 脚本打镜像，该脚本读取 `image.yml` 配置文件，决定要打哪些镜像，是否要push等。

`image.yml`配置文件的格式如下：

```yaml
---
images:
# 共有3个镜像相关的配置，分别为引擎镜像（本地测试用）、引擎镜像（发布用）和管理镜像。请根据打镜像的用途，调整相关参数。

# 引擎镜像（本地测试用）
  - id: polardb_pg_engine_test
  	# id为该镜像的标识。管理镜像根据此id引用引擎镜像。可使用默认值，也可自定义。镜像id不允许重复。
    type: engine
    # 镜像类型，当前取值支持engine和manager，分别对应引擎镜像和管理镜像。引擎镜像是管理镜像的基础镜像。
    build_image_name: polardb_pg/polardb_pg_engine_test
    # build目标镜像全名。可使用默认值，也可自定义。
    build_image_dockerfile: ./docker/Dockerfile.pg.engine.test
    # build目标镜像使用的Dockerfile，包括其文件名以及在本项目的具体路径。
    engine_repo: https://github.com/ApsaraDB/PolarDB-for-PostgreSQL.git
    # PolarDB for PostgreSQL开源数据库的github地址。
    engine_branch: main
    # PolarDB for PostgreSQL开源数据库的github分支。
    engine_config_template: src/backend/utils/misc/postgresql.conf.sample
    # PolarDB for PostgreSQL开源数据库目录中参数模板的位置。
    push: false
    # 打完镜像是否自动push到镜像仓库。如果是发布镜像的话，需要push，本地测试则不需要push。
    enable: true
    # 是否build该镜像

# 引擎镜像（发布用），参数说明同上
  - id: polardb_pg_engine_release
    type: engine
    build_image_name: polardb_pg/polardb_pg_engine_release
    build_image_dockerfile: ./docker/Dockerfile.pg.engine.release
    engine_repo: https://github.com/ApsaraDB/PolarDB-for-PostgreSQL.git
    engine_branch: main
    engine_config_template: src/backend/utils/misc/postgresql.conf.sample
    push: true
    enable: false

#管理镜像
  - id: polardb_pg_manager
    # id为该镜像的标识。管理镜像根据此id引用引擎镜像。可使用默认值，也可自定义。镜像id不允许重复。
    type: manager
    # 镜像类型，当前取值支持engine和manager，分别对应引擎镜像和管理镜像。
    build_image_name: polardb_pg/polardb_pg_manager
    # build目标镜像全名。可使用默认值，也可自定义。
    build_image_dockerfile: ./docker/Dockerfile.manager
    # build目标镜像使用的Dockerfile，包括其文件名以及在本项目的具体路径。
    engine_image_id: polardb_pg_engine_release
    # 该manager镜像需要对应的引擎镜像id。引擎镜像是管理镜像的基础镜像。
    push: false
    # 打完镜像是否自动push到镜像仓库，如果是发布镜像的话，需要push，本地测试则不需要push。
    enable: true
    # 是否build该镜像
```

当前`image.yml`有三个镜像的配置：

1. 引擎镜像（本地测试用），默认id为polardb_pg_engine_test。
2. 引擎镜像（本地测试用），默认id为polardb_pg_engine_release。
3. 管理镜像，默认id为polardb_pg_manager。

`image.py`打镜像的流程和原理如下，因为管理镜像依赖引擎镜像，所以会先打所有引擎镜像，再打管理镜像。

1. 根据`image.yml`中**engine_repo** 和 **engine_branch** 的配置，将PolarDB for PostgreSQL内核对应分支的代码pull下来。
2. 根据`image.yml`中**engine_config_template**的配置，拷贝PolarDB for PostgreSQL内核中的参数模板到本地（rootfs目录下），作为postgresql.conf。
3. 执行`docker build`命令开始打镜像，先打test或release引擎镜像，然后再打管理镜像。
4. 根据`image.yml`中**push**的配置，若为enable，则将打好的镜像push到镜像仓库。