---
layout: post
title:  "装机小记"
date:   2019-06-30 14:02:42
categories: [note]
---
这里会记录些曾经在 VPS 上装过的觉得有趣的 App，顺便会附带一些吐槽和简短的安装方法（Debian only）。

（2020.10.06更新）

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
docker run -p 9000:9000 --name minio -e "MINIO_ACCESS_KEY=xxxxxx" -e "MINIO_SECRET_KEY=xxxxxx" -v /opt/minio/data:/data -v /opt/minio/config:/root/.minio minio/minio server /data
```

[Gitea](https://docs.gitea.io/zh-cn/)
---
自建 Git 仓库
```bash
docker pull gitea/gitea:latest
mkdir -p /var/lib/gitea
docker run -d --name=gitea -p 10022:22 -p 10080:3000 -v /var/lib/gitea:/data gitea/gitea:latest
```

[RethinkDB](https://rethinkdb.com/docs)
---
想用来代替 Firebase 的实时文档型数据库
```bash
docker pull rethinkdb
docker run -d --name=rethink -P rethinkdb
```

[RSSHub](https://docs.rsshub.app/)
---
开源的 RSS 源生成器，自建只是因为有些源需要个人的登陆信息
```bash
docker pull diygod/rsshub
docker run -d --name rsshub -p 1200:1200 \
  -e PIXIV_USERNAME=xxxxxx \
  -e PIXIV_PASSWORD=xxxxxx \
  -e YOUTUBE_KEY=xxxxxx \
  -e BILIBILI_COOKIE_xxxxxx="xxxxxx" \
  diygod/rsshub
```

SimpleKVaaS
---
简易的KV数据库，有get和set就满足我的需求了
```bash
docker pull skyfish624/simple_kvaas:lastest
docker run -d --name=kvaas -p 8001:8080 -v /opt/simple_kvaas:/data skyfish624/simple_kvaas:lastest
```
