# 文件系统操作

## 概览

| 操作(command)      | 功能                                      | 选项(options)                                                |
| ------------------ | ----------------------------------------- | ------------------------------------------------------------ |
| [mkfs](# mkfs)     | 创建文件系统                              | `-u`：最大写实例数。<br>`-l`：journal文件大小。<br>`-f`：强制格式化。 |
| [growfs](# growfs) | 格式化新扩容的chunk                       | `-o`：扩容前chunk数。<br>`-n`：扩容后chunk数。<br>`-f`：强制格式化。 |
| [info](# info)     | 打印元数据使用情况                        | 无                                                           |
| [dumpfs](# dumpfs) | 读取superblock，检查chunk header和metaobj | `-m`：dump meta data (默认dump ck hdr)<br>`-t`：meta data type。<br>`-c`：chunk id。<br>`-o`：metaobj id 。 |
| [dumple](# dumple) | 读取journal中的log entry内容              | `-a`：遍历整个journal。<br>`-t`：txid。<br>`-b`：btno。<br>`-d`：deno。<br>`-i`：ino。 |



## mkfs

- 功能描述：在指定的磁盘设备上格式化文件系统。
- 参数说明： 
  - `-u`：最大实例个数，默认是3，最大可设置为255，可选。
  - `-f`：强制执行格式化，可选。
- 示例：

```bash
# 格式化nvme1n1
# 参数"-C disk"表示此次操作的是本地磁盘设备, nvme1n1是本地的一块存储设备名。
$sudo pfs -C disk mkfs nvme1n1

# 如果提示“already formatted”导致mkfs失败，确认mkfs操作安全后，添加'-f'标志
$sudo pfs -C disk mkfs -f nvme1n1

# 格式化nvme1n1，实例数10
$sudo pfs -C disk mkfs -u 10 nvme1n1
```

## growfs

- 功能描述：格式化扩容后的新chunk [old, new)
- 参数说明： 
  - `-o`：格式化前的chunk数。
  - `-n`：格式化后的chunk数。
  - `-f`：强制执行格式化，可选。
- 示例：

```bash
# 磁盘设备 nvme1n1大小从10GB扩成30GB后，格式化新chunk [1, 3)
$sudo pfs -C disk growfs -o 1 -n 3 nvme1n1

# 如果提示“already formatted”导致growfs失败，确认growfs操作安全后，添加'-f'标志
$sudo pfs -C disk growfs -o 1 -n 3 -f nvme1n1
```

## info

- 功能描述：打印文件系统的元数据信息。 
  - 打印PFS整体元数据使用情况：打印深度为1。
- 示例：

```bash
#打印磁盘 nvme1n1中文件系统的元数据信息
$sudo pfs -C disk info nvme1n1
Blktag Info:
 (0)allocnode: id 0, shift 0, nchild=3, nall 7680, nfree 1897, next 0
Direntry Info:
 (0)allocnode: id 0, shift 0, nchild=3, nall 6144, nfree 5974, next 0
Inode Info:
 (0)allocnode: id 0, shift 0, nchild=3, nall 6144, nfree 5974, next 0
 #nchild是chunk个数，磁盘总容量=nchild*10GB，nvme1n1有30GB
 #磁盘空闲block容量=1897*4MB
```


## dumpfs

- 功能描述：打印superblock内元数据。
- 参数说明： 
  - `-m`：打印meta，未指定则打印chunk header
  - `-t`：指定metaobj类型，1/2/3分别对应bt/de/in
  - `-c`：指定chunk id
  - `-o`：指定metaobj number
- 示例：

```bash
# 打印nvme1n1的所有chunk header以及元数据统计信息
$sudo pfs -C disk dumpfs nvme1n1
chunk 0:
    ck_magic   0x5046534348
    ck_chunksize 10737418240
    ck_blksize 4194304
    ck_sectsize 4096
    ck_number  0
    ck_nchunk  3
    ck_checksum 2628069786
    ck_physet[MT_BLKTAG].ms_nsect 80
    ck_physet[MT_DIRENTRY].ms_nsect 64
    ck_physet[MT_INODE].ms_nsect 64
    ck_physet[MT_BLKTAG].ms_sectbda 0x1000
    ck_physet[MT_DIRENTRY].ms_sectbda 0x51000
    ck_physet[MT_INODE].ms_sectbda 0x91000
…………
type    free    used    total
blktag  7668    12      7680
dentry  6141    3       6144
inode   6141    3       6144

# 读取nvme1n1的metaobj元数据，指定chunk0，且metaobj number为1的inode
$sudo pfs -C disk dumpfs -m -c 0 -t 3 -o 1 nvme1n1
 mo_type    inode
 mo_number  1
 mo_checksum 3315235856
 mo_used    1
 mo_version 0
 mo_head    1
 mo_tail    1
  in_type    1
  in_deno    1
  in_flags   0
  in_nlink   1
  in_nblock  1
  in_size    4194304
  in_atime   0
  in_ctime   1551271708
  in_mtime   1551271708
```

## dumple

- 功能描述：打印journal内log entry数据。
- 参数说明： 
  - `-a`：遍历journal中所有可见的log entry（默认只遍历当前有效的log entry）
  - `-t`：指定特定的txid
  - `-b`：指定blocktag metaobj number
  - `-d`：指定direntry metaobj number
  - `-i`：指定inode metaobj number
- 示例：

```bash
# 打印nvme1n1中journal的所有log entry内容，包括已被trim的le项
$sudo pfs -C disk dumple -a nvme1n1
 le_txid    1
 le_lsn     1
 le_sector_bda 10737750016
 le_obj_idx 0
 le_checksum 3912500790
 le_more    1
  mo_type    direntry
  mo_number  2048
  mo_checksum 1467810822
  mo_used    1
  mo_version 0
  mo_next    0
  mo_prev    2
    de_dirino  0
    de_ino     2048
    de_name    largefile
...
 le_txid    2
 le_lsn     6
 le_sector_bda 10738012160
 le_obj_idx 0
 le_checksum 278390252
 le_more    0
  mo_type    inode
  mo_number  2048
  mo_checksum 3233154735
  mo_used    1
  mo_version 0
  mo_head    528385
  mo_tail    528385
    in_type    1
    in_deno    2048
    in_flags   0
    in_nlink   1
    in_nblock  1
    in_size    0
    in_atime   0
    in_ctime   1551337605
    in_mtime   1551337605
[PFS_LOG] Mar  6 15:25:42.498594 INF [82650] number of log entries hit: 6 / 2097152 (all in journal)

# 遍历nvme1n1中journal的有效log entry，并且筛选出txid为2，metaobj number为2048的inode的le项
$sudo pfs -C disk dumple -t 2 -i 2048 nvme1n1
 le_txid    2
 le_lsn     6
 le_sector_bda 10738012160
 le_obj_idx 0
 le_checksum 278390252
 le_more    0
  mo_type    inode
  mo_number  2048
  mo_checksum 3233154735
  mo_used    1
  mo_version 0
  mo_head    528385
  mo_tail    528385
    in_type    1
    in_deno    2048
    in_flags   0
    in_nlink   1
    in_nblock  1
    in_size    0
    in_atime   0
    in_ctime   1551337605
    in_mtime   1551337605
[PFS_LOG] Mar  6 15:32:03.101423 INF [105651] number of log entries hit: 1 / 6 (valid)
```
