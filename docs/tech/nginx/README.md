# Nginx

## Nginx 是什么?

[维基百科](https://zh.wikipedia.org/zh-hans/Nginx)说明:

> Nginx（发音同“engine X”）是异步框架的网页服务器，也可以用作反向代理、负载平衡器和 HTTP 缓存。该软件由俄罗斯程式设计师伊戈尔·赛索耶夫（Игорь Сысоев）开发并于 2004 年首次公开发布。

[官网](http://nginx.org/en/)说明:

> nginx [engine x] is an HTTP and reverse proxy server, a mail proxy server, and a generic TCP/UDP proxy server, originally written by Igor Sysoev.

### 相关概念

#### 反向代理

[维基百科](https://zh.wikipedia.org/wiki/%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86)说明:

> 反向代理（Reverse proxy）在电脑网络中是代理服务器的一种。服务器根据客户端的请求，从其关系的一组或多组后端服务器（如 Web 服务器）上获取资源，然后再将这些资源返回给客户端，客户端只会得知反向代理的 IP 地址，而不知道在代理服务器后面的服务器集群的存在[1]。
>
> 与前向代理不同，前向代理作为客户端的代理，将从互联网上获取的资源返回给一个或多个的客户端，服务端（如 Web 服务器）只知道代理的 IP 地址而不知道客户端的 IP 地址；而反向代理是作为服务器端（如 Web 服务器）的代理使用，而不是客户端。客户端借由前向代理可以间接访问很多不同互联网服务器（集群）的资源，而反向代理是供很多客户端都通过它间接访问不同后端服务器上的资源，而不需要知道这些后端服务器的存在，而以为所有资源都来自于这个反向代理服务器。

前向代理(正向代理)是客户端的代理, 比如 vpn 就是用的正向代理;
反向代理是服务器端的代理, 比如 nginx 代理服务器.

#### 负载均衡

[维基百科]说明:

> 负载均衡（英语：load balancing）是一种电子计算机技术，用来在多个计算机（计算机集群）、网络连接、CPU、磁碟驱动器或其他资源中分配负载，以达到最佳化资源使用、最大化吞吐率、最小化响应时间、同时避免过载的目的。 使用带有负载平衡的多个服务器组件，取代单一的组件，可以通过冗余提高可靠性。负载平衡服务通常是由专用软件和硬件来完成。 主要作用是将大量作业合理地分摊到多个操作单元上进行执行，用于解决互联网架构中的高并发和高可用的问题。

### 作用

- web 服务器
- 反向代理服务器
- 负载均衡
- 虚拟主机
- 电子邮件（IMAP/POP3）代理服务器

## Nginx 的安装和使用

## 1. 安装 Nginx

```sh
sudo yum install -y nginx
```

## 2. 启动 Nginx

```sh
sudo systemctl start nginx.service
或者
sudo systemctl nginx start
```

## 3. 设置开机自启动 Nginx

```sh
sudo systemctl enable nginx.service
```

## 4. Nginx 配置信息

网站文件存放默认目录

```
/usr/share/nginx/html
```

自定义 Nginx 站点配置文件存放目录

```
/etc/nginx/conf.d
```

Nginx 全局配置

```
/etc/nginx/nginx.conf
```

## 5. 重新载入配置文件

```sh
nginx -s reload
```

**注意: 修改配置文件后重新载入才生效**

## 6. 关闭 Nginx

```sh
nginx -s stop // 停止
或者
nginx -s quit // 安全退出
```

## 7. 查看 Nginx 进程

```sh
ps aux|grep nginx
```

## 8. 重启 Nginx 服务

```sh
sudo systemctl nginx restart
```

## Nginx 配置

默认全局配置文件是`/etc/nginx/nginx.conf`文件.
文件示例

```nginx
# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/
# 全局块
user nginx;
worker_processes auto; # worker角色的工作进程的个数，master进程是接收并分配请求给worker处理
error_log /var/log/nginx/error.log; # 错误日志路径
pid /run/nginx.pid; # 进程id

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;
# Events块
events {
    worker_connections 1024; # 工作进程的最大连接数量
}
# http块
http {

    # 日志格式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    # access日志路径
    access_log  /var/log/nginx/access.log  main;

    sendfile            on; # 开启高效文件传输模式, 运行sendfile方式传输文件
    tcp_nopush          on; # sendfile开启时才开启
    tcp_nodelay         on;
    keepalive_timeout   65; # 长连接超时时间，单位是秒
    types_hash_max_size 4096;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;

    # 负载均衡
    upstream myexpress {
        # weight是权重，可以根据机器配置定义权重。weigth参数表示权值，权值越高被分配到的几率越大。
        server 127.0.0.1:3000 weight=3;
        server 127.0.0.1:3001 weight=1;
    }

    # server 块
    server {
        listen       80; # 监听端口
        listen       [::]:80;
        server_name  _;
        root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        location / {
            proxy_pass http://myexpress; # 请求转向myexpress定义的服务器列表
        }
        # 错误页面
        error_page 404 /404.html;
            location = /40x.html {
        }
        # 错误页面
        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }

        # 示例 web页面
        location /myweb/ {
            root      /usr/share/nginx/html/;
            try_files $uri/ $uri /myweb/index.html;
            index     index.html home.html;
        }

        # 示例反向代理服务器
        location /ww/ {
            proxy_pass http://127.0.0.1:8400/ww/;
            proxy_set_header   Host             $host:$server_port;
            proxy_set_header   X-Real-IP        $remote_addr;
            proxy_set_header   Remote-Host      $remote_addr;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        }
    }

# Settings for a TLS enabled server.
#
#    server {
#        listen       443 ssl http2;
#        listen       [::]:443 ssl http2;
#        server_name  _;
#        root         /usr/share/nginx/html;
#
#        ssl_certificate "/etc/pki/nginx/server.crt";
#        ssl_certificate_key "/etc/pki/nginx/private/server.key";
#        ssl_session_cache shared:SSL:1m;
#        ssl_session_timeout  10m;
#        ssl_ciphers PROFILE=SYSTEM;
#        ssl_prefer_server_ciphers on;
#
#        # Load configuration files for the default server block.
#        include /etc/nginx/default.d/*.conf;
#
#        error_page 404 /404.html;
#            location = /40x.html {
#        }
#
#        error_page 500 502 503 504 /50x.html;
#            location = /50x.html {
#        }
#    }

}
```
