### docker 

- 常用指令

  ```bash
  # 在 有Dockerfile的目录下创建镜像
  docker build -t xxx
  
  # 根据xxx镜像运行yyy容器
  docker run --name yyy -d -p 8888:80 xxx
  ```

- Dockerfile示例

  ```bash
  FROM node:alpine as builder
  
  # 指定工作目录
  RUN mkdir -p /app/client
  WORKDIR /app/client
  
  # 复制目录文件
  COPY . .
  
  # 安装依赖并执行相关操作
  RUN npm install --registry=https://registry.npm.taobao.org && npm run build && rm -rf node_modules
  
  FROM nginx:alpine
  
  # 复制打包后的产物
  COPY --from=builder /app/client/dist /usr/share/nginx/html
  
  # 复制自定义的nginx.conf文件
  COPY --from=builder /app/client/BuildScript/nginx.conf /etc/nginx/nginx.conf
  
  # 暴露80端口
  EXPOSE 8080
  
  CMD ["nginx", "-g", "daemon off;"]
  
  ```

- nginx.conf示例

  ```bash
  
  #user  nobody;
  worker_processes  1;
  
  #error_log  logs/error.log;
  #error_log  logs/error.log  notice;
  #error_log  logs/error.log  info;
  
  #pid        logs/nginx.pid;
  
  
  events {
      worker_connections  1024;
  }
  
  
  http {
      include       mime.types;
      default_type  application/octet-stream;
  
      #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
      #                  '$status $body_bytes_sent "$http_referer" '
      #                  '"$http_user_agent" "$http_x_forwarded_for"';
  
      #access_log  logs/access.log  main;
  
      sendfile        on;
      #tcp_nopush     on;
  
      #keepalive_timeout  0;
      keepalive_timeout  65;
  
      #gzip  on;
  
      server {
          listen       80;
          server_name  localhost;
  
          #charset koi8-r;
  
          #access_log  logs/host.access.log  main;
  
          location / {
              root   /usr/share/nginx/html;
              index  index.html index.htm;
          }
  
          location /api/ {
              rewrite ^.+api/?(.*)$ /$1 break;
              proxy_pass http://51.158.151.96:8888;
          }
  
          #error_page  404              /404.html;
  
          # redirect server error pages to the static page /50x.html
          #
          error_page   500 502 503 504  /50x.html;
          location = /50x.html {
              root   html;
          }
  
          # proxy the PHP scripts to Apache listening on 127.0.0.1:80
          #
          #location ~ \.php$ {
          #    proxy_pass   http://127.0.0.1;
          #}
  
          # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
          #
          #location ~ \.php$ {
          #    root           html;
          #    fastcgi_pass   127.0.0.1:9000;
          #    fastcgi_index  index.php;
          #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
          #    include        fastcgi_params;
          #}
  
          # deny access to .htaccess files, if Apache's document root
          # concurs with nginx's one
          #
          #location ~ /\.ht {
          #    deny  all;
          #}
      }
  
  
      # another virtual host using mix of IP-, name-, and port-based configuration
      #
      #server {
      #    listen       8000;
      #    listen       somename:8080;
      #    server_name  somename  alias  another.alias;
  
      #    location / {
      #        root   html;
      #        index  index.html index.htm;
      #    }
      #}
  
  
      # HTTPS server
      #
      #server {
      #    listen       443 ssl;
      #    server_name  localhost;
  
      #    ssl_certificate      cert.pem;
      #    ssl_certificate_key  cert.key;
  
      #    ssl_session_cache    shared:SSL:1m;
      #    ssl_session_timeout  5m;
  
      #    ssl_ciphers  HIGH:!aNULL:!MD5;
      #    ssl_prefer_server_ciphers  on;
  
      #    location / {
      #        root   html;
      #        index  index.html index.htm;
      #    }
      #}
  
  }
  ```

  