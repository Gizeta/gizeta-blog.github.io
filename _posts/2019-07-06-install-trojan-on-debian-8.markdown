---
layout: post
title:  "Debian 8 编译安装 trojan"
date:   2019-07-06 15:14:20
categories: [other]
---

准备工作
---
```bash
apt -y install build-essential gcc g++ libtool automake python3 curl git
```

编译安装 OpenSSL
---
```bash
apt remove openssl
wget https://www.openssl.org/source/openssl-1.1.1c.tar.gz
tar -zxvf openssl-1.1.1c.tar.gz
mkdir /usr/local/openssl
cd openssl-1.1.1c/
./config
make
make install
echo "/usr/local/openssl/lib" >> /etc/ld.so.conf.d/openssl-1.1.1.conf
ldconfig -v
```

编译安装 CMake
---
```bash
wget https://cmake.org/files/v3.14/cmake-3.14.5.tar.gz
tar -zxvf cmake-3.14.5.tar.gz
cd cmake-3.14.5
./bootstrap
make
make install
```

编译安装 Boost
---
```bash
wget https://dl.bintray.com/boostorg/release/1.70.0/source/boost_1_70_0.tar.gz
tar -zxvf boost_1_70_0.tar.gz
cd boost_1_70_0
./bootstrap.sh
./b2
./b2 install
cp -r boost /usr/include
```

编译安装 trojan
---
```bash
git clone http://XXX/trojan.git
cd trojan
mkdir build
cd build
cmake .. -DENABLE_MYSQL=OFF -DFORCE_TCP_FASTOPEN=ON -DSYSTEMD_SERVICE=AUTO -DENABLE_SSL_KEYLOG=OFF
make
make install
```
