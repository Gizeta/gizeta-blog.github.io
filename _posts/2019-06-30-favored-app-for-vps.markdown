---
layout: post
title:  "装机小记"
date:   2019-06-30 14:02:42
categories: [note]
---
这里会记录些曾经在 VPS 上装过的觉得有趣的 App，顺便会附带一些吐槽和简短的安装方法（Debian only）。

[Monitorix](https://www.monitorix.org/)
---
轻量的服务器监控工具 / 界面还算看得过去 / 自带 HTTP 服务器

```bash
wget -qO - https://apt.izzysoft.de/izzysoft.asc | apt-key add -
echo "deb https://apt.izzysoft.de/ubuntu generic universe" | tee -a /etc/apt/sources.list
apt install monitorix
```

[Docker](https://docs.docker.com/)
---
这么🔥装了总没错

```bash
apt install apt-transport-https ca-certificates curl gnupg2 software-properties-common
curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
apt install docker-ce docker-ce-cli containerd.io
```

[minio](https://docs.min.io/)
---
自建 Object Storage / docker / 兼容 Amazon S3
```bash
docker pull minio/minio
docker run -p 9000:9000 --name minio -e "MINIO_ACCESS_KEY=miniodeployedbygizeta" -e "MINIO_SECRET_KEY=bzTVCWQ6/PvFAx63e71d2acqlg5/EjRA" -v /opt/minio/data:/data -v /opt/minio/config:/root/.minio minio/minio server /data
```
