---
title: "Linux 中 tar语法"
---

## Linux 中 tar 语法

```sh
tar [options] [archive-file] [file or directory to be archived]
```

| Options | Description                                                            |
| ------- | ---------------------------------------------------------------------- |
| -c      | 通过将文件和目录捆绑在一起创建存档                                     |
| -x      | 从现有的存档文件中提取文件和目录                                       |
| -f      | 指定要创建或提取的存档文件的文件名                                     |
| -t      | 显示或列出归档文件中包含的文件和目录                                   |
| -u      | 存档并将新的文件或目录添加到现有的存档中                               |
| -v      | 显示详细信息,提供归档或提取过程中的详细输出                            |
| -A      | 将多个存档文件连接为一个存档文件                                       |
| -z      | 在创建 tar 文件时使用 gzip 压缩, 生成扩展名为'.tar.gz'的压缩归档文件   |
| -j      | 在创建 tar 文件时使用 bzip2 压缩, 生成扩展名为'.tar.bz2'的压缩归档文件 |
| -W      | 验证存档文件的完整性, 确保其内容没有损坏                               |
| -r      | 更新或添加文件或目录到已经存在的存档中, 而不重新创建整个存档           |

### 什么是归档文件?

归档文件是由一个或多个文件以及元数据组成的文件。归档文件用于将多个数据文件收集到一个文件中，以方便移植和存储，或者简单地压缩文件以使用更少的存储空间。

### 示例

#### 使用`-cvf`创建一个未压缩的`tar`存档

以下指令创建一个名为`file.tar`的`tar`文件, 它是当前目录中所有`.c`文件的存档文件:

```sh
tar cvf file.tar *.c
```

- `-c`: 创建一个新存档
- `-v`: 显示基本信息, 显示存档进度
- `-f`: 指定存档文件名

#### 使用`-xvf`从归档文件中提取文件.

以下指令从归档文件中提取文件:

```sh
tar xvf file.tar
```

- `-x`: 从归档文件中提取文件
- `-v`: 显示提取过程的基本信息
- `-f`: 指定归档文件的文件名

#### 使用`-z`选项,在`tar`归档中使用`gzip`压缩

以下指令创建一个命名为`file.tar.gz`的 tar 文件, 它是`.c`文件的归档:

```sh
tar cvzf file.tar.gz *.c
```

- `-z`: 使用`gzip`压缩
- `-j`: 使用`bzip2`压缩
- `-J`: 使用`xz`压缩

#### 使用`-xvzf`选项, 从`*.tar.gz`归档文件中提取文件

以下指令从`file.tar.gz`归档文件中提取文件:

```sh
tar xvzf file.tar.gz
```

#### 在`Linux`中检查已存在的`tar`、`tar.gz`、`tar.tbz` 文件大小

以下指令将为以`kB`为单位显示归档文件的大小:

```sh
tar czf file.tar | wc -c
or
tar czf file.tar.gz | wc -c
or
tar czf file.tar.tbz | wc -c
```

#### 更新已存在的`tar`文件

```sh
tar rvf file.tar *.c
```

#### 使用`-tf`选项列出指定归档文件的内容

```sh
tar tf file.tar
```

#### 应用管道通过`grep command`来查询信息

```sh
tar tvf file.tar | grep "text to find"
or
tar tvf file.tar | grep "filename.file extension"
```
