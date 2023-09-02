# Docker

## 安装 Docker

```sh
# 1. yum 包更新到最新
yum update
# 2. 安装需要的软件包, yum-util提供yum-config-manager功能, 另外两个是devicemapper驱动依赖的
yum install -y yum-utils device-mapper-persistent-data lvm2
# 3. 设置yum源
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
# 4. 安装docker, 出现输入界面都按y
yum install -y docker-ce
# 5. 查看docker版本,
docker -v
# 6. 开启docker服务
service docker start
```

第四步报错:

```
  - Status code: 404 for https://download.docker.com/linux/centos/3/x86_64/stable/repodata/repomd.xml (IP: 13.32.50.112)
错误：为仓库 'docker-ce-stable' 下载元数据失败 : Cannot download repomd.xml: Cannot download repodata/repomd.xml: All mirrors were tried
```

[解决办法](https://forums.docker.com/t/docker-ce-stable-x86-64-repo-not-available-https-error-404-not-found-https-download-docker-com-linux-centos-7server-x86-64-stable-repodata-repomd-xml/98965/4):
修改 /etc/yum.repos.d/docker-ce.repo

```sh
vi /etc/yum.repos.d/docker-ce.repo
```

把`docker-ce-stable`的`baseurl`改为:

```
https://download.docker.com/linux/centos/7/$basearch/stable
```

在执行安装 docker 命令

```sh
yum install -y docker-ce
```

## 配置镜像加速器

[阿里云镜像加速器](https://cr.console.aliyun.com/cn-shanghai/instances/mirrors)

```sh
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://osiej1p1.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## Docker 命令

### Docker 服务相关命令

#### 启动 docker 服务

```sh
systemctl start docker
```

#### 停止 docker 服务

```sh
systemctl stop docker
```

#### 重启 docker 服务

```sh
systemctl restart docker
```

#### 查看 docker 服务状态

```sh
systemctl status docker
```

#### 开机启动 docker 服务

```sh
systemctl enable docker
```

### Docker 镜像相关命令

#### 查看镜像

```sh
docker images
docker images -q # 查看所用镜像的id
```

#### 搜索镜像

```sh
docker search nginx
```

#### 拉取镜像

```sh
docker pull nginx:latest
```

#### 删除指定本地镜像

```sh
docker rmi 605c77e624dd
```

#### 删除所有本地镜像

```sh
docker rmi `docker images -q`
```

### Docker 容器相关命令

#### 查看容器

```sh
docker ps # 查看正在运行的容器
docker ps -a # 查看所有容器
```

#### 创建容器

```sh
docker run 参数
# 方式1
docker run -it --name=c1 centos:7 /bin/bash
# 方式2
docker run -id --name=c2 centos:7
```

参数说明:

1. `-i`: 保持容器运行. 通常与`-t`同时使用.加入`it`这两个参数后, 容器创建后自动进入容器中, 退出容器后, 容器自动关闭.
2. `-t`: 为容器重新分配一个伪输入终端,通常与`-i`同时使用.
3. `-d`: 以守护(后台)模式运行容器.创建一个容器在后台运行,需要使用`docker exec`进入容器. 退出后, 容器不会关闭.
4. `-it`创建的容器一般称为交互式容器;`-id`创建的容器一般称为守护式容器
5. `--name`: 为创建的容器命名.

#### 进入容器

```sh
docker exec -it c2 /bin/bash
```

#### 启动容器

```sh
docker start c2 # 启动名称为c2的容器
```

#### 停止容器

```sh
docker stop c2 # 停止名称为c2的容器
```

#### 重启容器

```sh
docker restart c2
```

#### 删除容器(开启的容器不能被删除, 需先停止容器, 再删除)

```sh
docker rm c1 # 删除名称为c1的容器
docker rm `docker ps -aq` # 删除所有容器
```

#### 查看容器信息

```sh
docker inspect c2 # 查看名称为c2的容器信息
```

## Docker 容器的数据卷

**数据卷**

- 数据卷是宿主机中的一个目录或文件
- 当容器目录和数据卷目录绑定后, 对方的修改会立即同步
- 一个数据卷可以被多个容器同时挂载
- 一个容器也可以被挂载多个数据卷

**数据卷作用**

- 容器数据持久化
- 外部机器和容器间通信
- 容器之间数据交换

### 配置数据卷

创建启动容器时, 使用`-v`参数 设置数据卷

```sh
docker run ... -v 宿主机目录(文件):容器内目录(文件) ...

eg:
 docker run -it --name=c1 -v /root/data:/root/data_container centos:7 /bin/bash

```

注意事项:

1. 目录必须是绝对路径
2. 如果目录不存在, 会自动创建
3. 可以挂载多个数据卷

### 数据卷容器

**多容器进行数据交换**

1. 多个容器挂载同一个数据卷
2. 数据卷容器

#### 配置数据卷容器

1. 创建启动 c3 数据卷容器, 使用-v 参数 设置数据卷

```sh
docker run -it --name=c3 -v /volume centos:7 /bin/bash
```

1. 创建启动 c1 c2 容器,使用--volumes-from 参数 设置数据卷

```sh
docker run -it --name=c1 --volumes-from c3 centos:7 /bin/bash
docker run -it --name=c2 --volumes-from c3 centos:7 /bin/bash
```

## Docker 应用部署

### MySQL 部署

实现步骤:

1. 搜索 mysql 镜像
2. 拉取 mysql 镜像
3. 创建容器
4. 操作容器中的 mysql

#### 1. 搜索 mysql

```sh
docker search mysql
```

#### 2. 拉取 mysql 镜像

```sh
docker pull mysql:5.6
```

#### 3. 创建容器, 设置端口映射、目录映射

```sh
# 在/root 目录下创建mysql目录用于存储mysql数据信息
mkdir ~/mysql
cd ~/mysql

docker run -id \
-p 3307:3306 \ # 将容器的3306端口映射到宿主机的3307端口
-name=c_mysql \
-v $PWD/conf:/etc/mysql/conf.d \ # 将主机当前目录下的conf/my.cnf挂载到容器的/etc/mysql/conf.d配置目录
-v $PWD/logs:/logs \ # 将主机当前目录下的logs目录挂载到容器的/logs日志目录
-v $PWD/data:/var/lib/mysql \ # 将主机当前目录下的data目录挂载到容器的/var/lib/mysql数据目录
-e MYSQL_ROOT_PASSWORD=123456 \ # 初始化root用户的密码
mysql:5.6
```

#### 4. 进入容器, 操作 mysql

```sh
docker exec -it c_mysql /bin/bash
```

#### 5. 使用外部机器连接容器中的 mysql

连接的地址是宿主机 ip 和宿主机端口号

### Tomcat 部署

实现步骤:

1. 搜索 tomcat 镜像
2. 拉取 tomcat 镜像
3. 创建容器
4. 外部访问

#### 1. 搜索 tomcat 镜像

```sh
docker search tomcat
```

#### 2. 拉取 tomcat 镜像

```sh
docker pull tomcat
```

#### 3. 创建容器

```sh
# 在/root目录下创建tomcat目录用于存储tomcat数据信息
mkdir ~/tomcat
cd ~/tomcat

docker run -id --name=c_tomcat \
-p 8080:8080 \ # 将容器的8080端口映射到主机的8080端口
-v $PWD:/usr/local/tomcat/webapps \ # 将主机中当前目录挂载到容器的webapps
tomcat
```

#### 4. 使用外部机器访问 tomcat

### Nginx 部署

实现步骤:

1. 搜索 nginx 镜像
2. 拉取 nginx 镜像
3. 创建容器
4. 外部访问

#### 1. 搜索 nginx 镜像

```sh
docker search nginx
```

#### 2. 拉取 nginx 镜像

```sh
docker pull nginx
```

#### 3. 创建容器, 设置端口映射、目录映射

```sh
# 在/root目录下创建nginx目录用于存储nginx数据信息
mkdir ~/nginx
cd ~/nginx
mkdir conf
cd conf
# 在 ~/nginx/conf 下创建nginx.conf文件
vim nginx.conf

user nginx;
worker_processes 1;

error_log /var/log/nginx/error.log warn;
pid       /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include     /etc/nginx/mime.types;
    default_type    application/octet-stream;

    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_send "$http_referer"'
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log main;

    sendfile    on;
    #tcp_nopush on;

    keepalive_timeout 65;

    #gzip   on;

    include /etc/nginx/conf.d/*.conf;
}

docker run -id --name=c_nginx \
-p 80:80 \ # 端口映射
-v $PWD/conf/nginx.conf:/etc/nginx/nginx.conf \ # 目录挂载
-v $PWD/logs:/var/log/nginx \ # 目录挂载
-v $PWD/html:/usr/share/nginx/html \ # 目录挂载
nginx
```

#### 4. 外部机器访问 nginx

### Redis 部署

实现步骤:

1. 搜索 redis 镜像
2. 拉取 redis 镜像
3. 创建容器
4. 测试访问

#### 1. 搜索 redis 镜像

```sh
docker search redis
```

#### 2. 拉取 redis 镜像

```sh
docker pull redis
```

#### 3. 创建容器

```sh
docker run -id --name=c_redis -p 6379:6379 redis:5.0
```

#### 4. 测试访问

```sh
./redis-cli.exe -h [ip地址] -p 6379
```
