# 部署开源PolarDB for PostgreSQL三节点实例

本节介绍基于开源版PolarDB for PostgreSQL部署三节点实例的实践方法。

## 编译PolarDB for PostgreSQL源码
编译环境准备，请参见[搭建基于单机本地存储的实例](../PolarDB-for-PostgreSQL/Local-Storage-Instance.md)。
代码编译（增加`--with-dma`编译选项代表编译三节点版本）。

```bash
polardb_build.sh -m --with-dma
```
## 部署Leader节点
设置环境变量，目录可以根据自己环境进行设置。
```bash
export POLARBIN=/home/polardb/polardb_pg/data/tmp_basedir_polardb_pg_1100_bld/bin
export PGDATA=/home/polardb/polardb_pg/data/tmp_master_dir_polardb_pg_1100_bld
export POLARDATA=/home/polardb/polardb_pg/data/tmp_datadir_polardb_pg_1100_bld
export PGPORT=8432
export PATH=$POLARBIN:$PATH
```
### 初始化节点
> **说明**：初始化节点的方式与单机版的方式相同。

```bash
initdb -U polardb -D $PGDATA/
mkdir $POLARDATA
polar-initdb.sh $PGDATA/ $POLARDATA/ localfs
```
### 修改DMA配置
polar_dma.conf会在initdb初始化结束后自动生成，如果不存在可自行新建。
修改$PGDATA/polar_dma.conf配置文件，包括：开启polar_enable_dma；配置polar_dma_repl_user和polar_dma_repl_passwd（用户WAL传输流复制的用户名密码，可为initdb的用户名或后续自建的流复制用户）；其他参数根据需要修改。

#### $PGDATA/polar_dma.conf
```bash
polar_enable_dma = on # DMA功能总开关
polar_dma_repl_user = 'replicator' # WAL传输用户，后续创建的replicator用户
polar_dma_repl_passwd = 'replicator' # WAL传输用户密码，后续创建replicator用户所设密码
```
#### $PGDATA/postgresql.conf
```bash
hot_standby = on # 开启备机读功能

polar_logindex_mem_size = 0 # 关闭logindex功能
polar_enable_wal_prefetch = off # 关闭wal prefetch功能
polar_enable_lazy_checkpoint = off
polar_enable_xlog_buffer = off # 关闭xlog buffer功能，DMA不支持
polar_enable_copy_buffer = off # 关闭copy buffer，本地盘模式不需要
polar_enable_persisted_buffer_pool = off # 关闭持久化buffer pool功能
listen_addresses = '*'

polar_enable_shared_storage_mode = on
polar_vfs.localfs_test_mode = on
polar_datadir='file-dio://${POLARDATA}'
# 举例: polar_datadir='file-dio:///home/polardb/polardb_pg/data/tmp_datadir_polardb_pg_1100_bld'
```
#### $PGDATA/pg_hba.conf
```bash
echo 'host replication all 0.0.0.0/0 md5' >> $PGDATA/pg_hba.conf
echo 'host all all  0.0.0.0/0 md5' >> $PGDATA/pg_hba.conf
```
### 初始化DMA节点元数据
配置为单节点集群；实例启动成功后，修改完DMA元数据后退出。其中$PGDATA、$HOST（本机IP）和$PGPORT需要修改为实际值。polar_dma_members_info指定的是IP和PostgreSQL本身的server port，consensus层通信端口自动为该端口+10000，后续所有集群修改都是指定PostgreSQL本身的port。
```bash
postgres -D $PGDATA/ -c polar_dma_init_meta=ON -c polar_dma_members_info="$HOST:$PGPORT@1"
```
### 启动节点
> **说明**：与单机模式相同。启动成功后，DMA集群仅包含当前节点。

```bash
pg_ctl -D $PGDATA/ start -l ./master.log
```
### 创建复制用户和统计插件
```bash
psql -d postgres -p$PGPORT -c"create role replicator with superuser login password 'replicator';"
psql -d postgres -p$PGPORT -c"create extension if not exists polar_monitor;"
psql -d postgres -p$PGPORT -c "CREATE USER aurora WITH SUPERUSER LOGIN NOCREATEDB NOCREATEROLE PASSWORD 'aurora' CONNECTION LIMIT 5"
```
如果执行语句返回如下错误：

`ERROR:  cannot execute CREATE ROLE in a read-only transactio`

说明数据库还在启动过程中，请等待5秒再次尝试。

## 配置Follower/Learner节点
该过程包括新建follower节点或者重搭follower节点。
设置环境变量，目录可以根据自己环境进行设置。

```bash
export POLARBIN=/home/polardb/polardb_pg/data/tmp_basedir_polardb_pg_1100_bld/bin
export PGDATA=/home/polardb/polardb_pg/data/tmp_master_dir_polardb_pg_1100_bld
export POLARDATA=/home/polardb/polardb_pg/data/tmp_datadir_polardb_pg_1100_bld
export PGPORT=8432
export PATH=$POLARBIN:$PATH
```
### 初始化节点
通过pg_basebackup复制数据或者copy整个data目录，建立follower节点。

```bash
pg_basebackup -h <master_ip> -p <master_port> -U replicator -D $PGDATA -X stream --progress --write-recovery-conf -v
```
### 初始化元数据
先配置为learner角色节点，之后再将节点加入集群。
```bash
postgres -D $PGDATA/ -c polar_dma_init_meta=ON -c polar_dma_learners_info="$HOST:$PGPORT"
```
### 修改DMA配置
修改$PGDATA/polar_dma.conf配置文件：修改其中的polar_dma_repl_appname参数。

```bash
polar_dma_repl_appname = 'standby_$HOST_$PGPORT' # $HOST用int32表示
```

### 启动节点
> **说明**：与单机版启动方式相同。第一次启动成功后，将该节点加入DMA集群，之后可直接启动。

```bash
pg_ctl -D $PGDATA/ start
$POLARBIN/pg_ctl -D $PGDATA/ start -l ./follower1.log
```
### 加入集群
在leader节点执行SQL命令增加节点。

```bash
alter system dma add follower '$HOST:$PGPORT';
alter system dma add follower '172.17.204.138:8432';
```
## 配置Logger节点
该过程包括新建Logger节点或者重搭Logger节点。
### 设置环境变量
设置环境变量，目录可以根据自己环境进行设置。
```bash
export POLARBIN=/home/polardb/polardb_pg/data/tmp_basedir_polardb_pg_1100_bld/bin
export PGDATA=/home/polardb/polardb_pg/data/tmp_master_dir_polardb_pg_1100_bld
export POLARDATA=/home/polardb/polardb_pg/data/tmp_datadir_polardb_pg_1100_bld
export PGPORT=8432
export PATH=$POLARBIN:$PATH
```
### 获取主节点system_identifier
```bash
psql -U replicator -h <master_ip> -p <master_port> -t polardb_admin -c "select system_identifier from pg_control_system();"
```
### 初始化节点
> **说明**：与单机版方式相同，启动节点创建复制用户和polar_monitor插件，必要时创建其他管控用户。

```bash
initdb -U polardb -D $PGDATA/ -i <system_identifier>
mkdir $POLARDATA
polar-initdb.sh $PGDATA/ $POLARDATA/ localfs
```
### 修改配置文件
在$PGDATA/postgresql.conf文件做如下设置：
```bash
hot_standby = on # 开启备机读功能

polar_logindex_mem_size = 0 # 关闭logindex功能
polar_enable_wal_prefetch = off # 关闭wal prefetch功能
polar_enable_lazy_checkpoint = off
polar_enable_xlog_buffer = off # 关闭xlog buffer功能，DMA不支持
polar_enable_copy_buffer = off # 关闭copy buffer，本地盘模式不需要
polar_enable_persisted_buffer_pool = off # 关闭持久化buffer pool功能
listen_addresses = '*'

polar_enable_shared_storage_mode = on
polar_vfs.localfs_test_mode = on
polar_datadir='file-dio://${POLARDATA}'
# 举例: polar_datadir='file-dio:///home/polardb/polardb_pg/data/tmp_datadir_polardb_pg_1100_bld'
```
### 启动数据库，创建复制用户和polar_monitor插件
```bash
pg_ctl -D $PGDATA/ start -l logger.log
psql -d postgres -p$PGPORT -c"create extension if not exists polar_monitor;"
psql -d postgres -p$PGPORT -c"create role replicator with superuser login password 'replicator';"
psql -d postgres -p$PGPORT -c"CREATE USER aurora WITH SUPERUSER LOGIN NOCREATEDB NOCREATEROLE PASSWORD 'aurora' CONNECTION LIMIT 5"
pg_ctl -D $PGDATA/ stop
```
### 修改$PGDATA/recovery.conf文件中的配置
```bash
polar_datamax_mode = standalone
```
### 修改DMA配置
polar_dma.conf会在initdb初始化结束后自动生成，如果不存在可自行新建。

修改$PGDATA/polar_dma.conf配置文件，包括：开启polar_enable_dma；配置polar_dma_repl_user和polar_dma_repl_passwd（用户WAL传输流复制的用户名密码，可为initdb的用户名或后续自建的流复制用户）；其他参数根据需要修改。

其他配置参数详见本节末附录：DMA配置参数列表。

```bash
polar_enable_dma = on # DMA功能总开关
polar_dma_repl_user = 'replicator' # WAL传输用户，初始化阶段创建的replicator用户
polar_dma_repl_passwd = 'replicator' # WAL传输用户密码，之前创建replicator用户所设密码
polar_dma_repl_appname = 'standby_$HOST_$PGPORT' # $HOST用int32表示
```

### 获取logger节点的日志起始位置
如果是重建logger节点，需要先从leader获取起始位置。

简单起见，获取当前的commit位置。

```bash
logger_start_point=`psql -U replicator -h <master_ip> -p <master_port> -A -t polardb_admin -c "select commit_index || ':' || synced_tli || ':' || synced_lsn  as startpoint from polar_dma_consensus_status;"`
```
### 初始化DMA元数据
先配置为learner角色节点，之后再将节点加入集群。如果是重建logger节点，则需要polar_dma_logger_start_point，否则不需要。
```bash
postgres -D $PGDATA/ -c polar_dma_init_meta=ON -c polar_dma_learners_info="$HOST:$PGPORT" -c polar_dma_logger_start_point="$logger_start_point"
```
### 启动节点
> **说明**：与单机版启动方式相同。第一次启动成功后，将该节点加入DMA集群，之后可直接启动。

```bash
pg_ctl -D $PGDATA/ start -l logger.log
```
### 加入集群
在leader节点执行SQL命令增加节点。
```bash
#对于logger节点
alter system dma add follower '$HOST:$PGPORT';
```
## 检查集群状态
集群创建完成后，可使用psql连接主节点，检查集群状态。

在主库使用如下sql确认流复制建立成功：

```bash
psql -h$PGDATA -p$PGPORT -c"select * from polar_dma_cluster_status;"
```
如果看到所有节点的状态正常，则表示集群创建成功。

## 附录：DMA配置参数列表

| 参数                                   | 修改方式       | 建议值/默认值          | 参数说明                                                     |
| -------------------------------------- | -------------- | ---------------------- | ------------------------------------------------------------ |
| polar_dma_file                         | 配置文件命令行 | $PGDATA/polar_dma.conf | polar consensus配置文件路径，在postgresql.conf中配置         |
| polar_dma_repl_user                    | 配置文件命令行 |                        | WAL传输用户密码                                              |
| polar_dma_repl_passwd                  | 配置文件命令行 |                        |                                                              |
| polar_dma_repl_appname                 | 配置文件命令行 |                        | WAL传输App name                                              |
| polar_dma_disable_election             | alter system   | false                  | consensus协议关闭选举功能开关                                |
| polar_dma_election_timeout（ms）       | 配置文件命令行 | 5s                     | consensus协议选举超时时间                                    |
| polar_dma_auto_leader_transfer         | alter system   | false                  | consensus协议关闭leader自动转移                              |
| polar_dma_delay_election               | alter system   | false                  | consensus协议延迟发起投票                                    |
| polar_dma_delay_election_timeout（ms） | 配置文件命令行 | 30min                  | consensus协议延迟发起投票时间                                |
| polar_dma_config_change_timeout（ms）  | alter system   | 60s                    | 配置变更超时                                                 |
| polar_dma_new_follower_threshold       | alter system   | 5000                   | 增加follower时的最小延迟index                                |
| polar_dma_min_delay_index              | alter system   | 5000                   | consensus协议最小延迟index                                   |
| polar_dma_max_delay_index              | alter system   | 50000                  | consensus协议最大延迟index                                   |
| polar_dma_auto_purge                   | 配置文件命令行 | true                   | consensus log自动purge功能开关                               |
| polar_dma_purge_timeout（ms）          | 配置文件命令行 | 15min                  | consensus log自动purge超时时间                               |
| polar_dma_log_keep_size                | alter system   | 8MB                    | consensus log保留日志大小                                    |
| polar_dma_send_timeout（ms）           | alter system   | 5ms                    | consensus协议网络发送超时                                    |
| polar_dma_pipeline_timeout（ms）       | alter system   | 1ms                    | consensus协议pipeline超时                                    |
| polar_dma_max_packet_size（KB）        | alter system   | 128KB                  | consensus协议最大网络包大小                                  |
| polar_dma_xlog_check_timeout（ms）     | alter system   | 10ms                   | consensus协议流复制等待超时                                  |
| polar_dma_worker_thread_count          | 配置文件命令行 | 8                      | consensus协议工作线程数量                                    |
| polar_dma_io_thread_count              | 配置文件命令行 | 8                      | consensus协议IO线程数量                                      |
| polar_dma_hb_thread_count              | 配置文件命令行 | 1                      | consensus协议心跳线程数量                                    |
| polar_dma_log_slot_size(8kB)           | 配置文件命令行 | 8192                   | consensus日志buffer页面个数                                  |
| polar_dma_init_meta                    | 配置文件命令行 | false                  | 元数据初始化                                                 |
| polar_dma_sync_meta                    | 配置文件命令行 | false                  | 元数据同步                                                   |
| polar_dma_members_info                 | 配置文件命令行 |                        | 集群leader/follower/logger信息                               |
| polar_dma_learners_info                | 配置文件命令行 |                        | 集群learner信息                                              |
| polar_dma_logger_start_point           | 配置文件命令行 |                        | logger节点起始点，格式为'start_log_Index:start_timeline:start_lsn' |
| polar_dma_cluster_id                   | 配置文件命令行 |                        | 集群ID                                                       |
