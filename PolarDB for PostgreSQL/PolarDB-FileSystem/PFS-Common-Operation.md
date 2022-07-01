# 通用操作

## 概览

| 操作(command)      | 功能           | 选项(options)                        |
| ------------------ | -------------- | ------------------------------------ |
| [stat](# stat)     | 显示属性信息   | 无                                   |
| [rm](# rm)         | 删除目录或文件 | `-r`：删除目录                       |
| [rename](# rename) | 重命名         | 无                                   |
| [du](# du)         | 统计磁盘使用量 | `-a`：打印文件。<br>`-d`：打印深度。 |
| [cp](# cp)         | 拷贝目录或文件 | `-r`：拷贝目录                       |

## stat

-  功能描述：查看属性信息 。
-  命令选项：无 
-  示例： 

```bash
#在nvme1n1中，查看/mydir/myfile的文件信息
$sudo pfs -C disk stat /nvme1n1/mydir/myfile
  file: /nvme1n1/mydir/myfile
  size: 104857600       blocks: 8192
device: nvme1n1          inode: 2105 links: 1
access: 0, Thu Jan  1 08:00:00 1970
modify: 1532953314, Mon Jul 30 20:21:54 2018
change: 1532953314, Mon Jul 30 20:21:54 2018
#size：文件长度（字节）
#blocks：所占块数（块大小：512Bytes）
#device：磁盘号
#inode：inode号
#links：链接数，通常为1，暂时不支持软硬链接
#access：atime，最近一次访问时间，暂不支持
#modify：mtime，最近一次文件内容的修改时间
#change：ctime，最近一次文件内容或属性的修改时间
```

## rm

- 功能描述：删除目录或文件，目录需要添加`-r`选项。
- 命令选项： 
  - `-r`：删除目录，可选。
- 示例：

```bash
# 删除nvme1n1的目录/mydir
$sudo pfs -C disk rm -r /nvme1n1/mydir

# 删除nvme1n1的文件/myfile
$sudo pfs -C disk rm /nvme1n1/myfile
```

## rename

- 功能描述：重命名目录或文件，支持移动到其他目录。 
  - 文件：如果新路径已经存在，则删除已有文件。
  - 目录：如果新路径已经存在，且该目录非空，则删除已有目录。
- 命令选项：无
- 示例：

```bash
# 重命名文件
$sudo pfs -C disk rename /nvme1n1/myfile /nvme1n1/myfile2

# 重命名目录
$sudo pfs -C disk rename /nvme1n1/mydir /nvme1n1/other_dir/mydir2
```

## du

- 功能描述：查看目录或文件磁盘使用量。
- 命令选项： 
  - `-a`：打印文件，默认关闭，可选。
  - `-d`：打印深度，默认是1，可选。
- 示例：

```bash
# 显示文件磁盘使用量
$sudo pfs -C disk du /nvme1n1/.pfs-journal
32768   /nvme1n1/.pfs-journal
# 单位是KB

# 显示根目录磁盘使用量，打印深度是2
$sudo pfs -C disk du -d 2 /nvme1n1/home
23617536        /nvme1n1/home/mysql/data3000
23617536        /nvme1n1/home/mysql
23617536        /nvme1n1/home
# 单位是KB
```
