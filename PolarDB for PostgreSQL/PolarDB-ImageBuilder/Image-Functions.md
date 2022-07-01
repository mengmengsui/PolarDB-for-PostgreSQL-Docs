# 镜像功能

## 引擎镜像

引擎镜像功能比较简单，主要为初始化并拉起PolarDB for PostgreSQL进程。内部有一个supervisor守护进程，配合管控PolarDB Stack进行实例启停操作。

## 管理镜像

管理镜像提供管控功能给PolarDB Stack使用，PolarDB Stack在管理镜像建立出的容器中对数据库进行各种管控操作。

### 创建用户（RW）

通过执行SQL创建用户。

### 创建复制关系（RW）

与RO/Standby搭建复制关系，其中RO为同步复制，Standby为异步复制。

1. 修改postgresql.conf。

2. 创建slot。命名方式如下：

   - RO：replica_${custins_id}_${slot_unique_name}

   - Standby：standby_${custins_id}_${slot_unique_name}

### 磁盘满锁定实例（RW, RO, Standby）

磁盘满后，需要将实例锁定为普通用户只能读，不能写，但超级用户可以读写。

1. 修改postgresql.conf，设置**polar_force_trans_ro_non_sup=on**。

2. 执行：

   ```
   pg_ctl -D /data reload
   ```

### 磁盘满解锁实例（RW, RO, Standby）

1. 修改postgresql.conf，设置**polar_force_trans_ro_non_sup=off**。

2. 执行：

   ```
   pg_ctl -D /data reload
   ```

### 过期锁定实例（RW, RO, Standby）

实例过期后，需要完全禁止读写。

1. 创建锁文件*/data/ins_lock*。

2. 执行：

   ```
   pg_ctl -D /data stop
   ```

   停止的是管理镜像的容器，引擎镜像容器不停止。

### 过期解锁实例（RW, RO, Standby）

删除锁文件/data/ins_lock，然后supervisor会自动拉起实例。

### 磁盘扩容（RW, RO, Standby）

通过执行如下SQL实现：

```
select polar_vfs_disk_expansion()
```

### 参数刷新（RW, RO, Standby）

1. 修改postgresql.conf文件。

2. 执行：

   ```
   pg_ctl -D /data reload
   ```

### 启动/停止/重启实例（RW, RO, Standby）

通过执行如下命令实现：

```
pg_ctl -D /data start
pg_ctl -D /data stop
pg_ctl -D /data restart
```

### 健康检查（RW, RO, Standby）

通过连接到数据库，然后执行如下命令实现：

```
select 1   
```

### 线上运维

* 查看管控日志：

  管控日志记录在`/log/manager.log`文件中，日志按照大小自动轮转，单文件最大10MB，最多保存15个文件。


* 查看引擎日志：

  引擎日志记录在`/data/pg_log`目录下，`/log/pg_log`是该目录的一个软连接，放到`/log`目录下，用于外部日志采集。


* 连接数据库：

  执行`pg`命令连接。