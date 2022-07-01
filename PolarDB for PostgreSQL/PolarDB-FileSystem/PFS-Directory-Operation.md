# 目录操作

## 概览

| 操作(command)    | 功能       | 选项(options)               | 备注           |
| ---------------- | ---------- | --------------------------- | -------------- |
| [mkdir](# mkdir) | 创建目录   | `-p`： 父目录不存在，则创建 | —              |
| [ls](# ls)       | 打印目录   | 无                          | —              |
| [tree](# tree)   | 打印目录树 | `-v`：打印目录项详细信息    | —              |
| [rmdir](# rmdir) | 删除空目录 | 无                          | 目录必须是空的 |

## mkdir

- 功能描述：创建目录。
- 命令选项： 
  - `-p`：如果父目录不存在，则创建，可选。
- 示例：

```bash
#在nvme1n1上创建新目录mydir2
$sudo pfs -C disk mkdir /nvme1n1/mydir2

#在nvme1n1上创建新目录mydir3，如果目录mydir2不存在，则创建
$sudo pfs -C disk mkdir -p /nvme1n1/mydir2/mydir3
```

## ls

- 功能描述：打印当前目录的所有目录项。
- 命令选项：无
- 示例：

```bash
#打印nvme1n1的根目录
$sudo pfs -C disk ls /nvme1n1/
  File  1     4194304           Wed Jul 11 00:04:55 2018  .pfs-paxos
  File  1     33554432          Wed Jul 11 00:04:55 2018  .pfs-journal
   Dir  1     128               Wed Jul 11 00:04:55 2018  home
  File  1     17547574          Mon Jul 30 17:42:19 2018  test.log
   Dir  1     0                 Mon Jul 30 17:43:48 2018  dir1
   Dir  1     256               Mon Jul 30 20:19:38 2018  mydir
total 114688 (unit: 512Bytes)
#total代表该目录中所有普通文件所占的块数(块大小：512Bytes)
```

## tree

- 功能描述：打印当前目录的目录树，包括所有子目录及其中的文件。
- 命令选项： 
  - `-v` ：打印所有目录项的详细信息，默认关闭，可选。
- 示例：

```bash
#从根目录开始打印nvme1n1的目录树
$sudo pfs -C disk tree /nvme1n1/
|-.pfs-paxos
|-.pfs-journal
|-test_write_normal_f_1
|-test_rmdir_file_1
|-test_rmdir_not_empty
 |-file_0
 |-file_1
 |-file_2
 |-file_3
 |-file_4
|-truncate_test_f_3
|-test_truncate_dir
|-truncate_test_f_2
|-truncate_test_f_1
|-rename_test_f2_new
|-rename_test_f3
|-rename_test_dir3
|-rename_test_f1_new

3 directories, 15 files
```

## rmdir

- 功能描述：删除空目录，如果目录非空，则删除失败。
- 命令选项：无
- 示例：

```bash
#删除nvme1n1的目录/mydir2
$sudo pfs -C disk rmdir /nvme1n1/mydir2
```

