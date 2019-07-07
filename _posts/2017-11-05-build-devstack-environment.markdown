---
layout: post
title:  "使用DevStack搭建OpenStack环境"
date:   2017-11-05 21:16:28
categories: [note]
---
闲话
---
这篇文章不是教你如何学会搭建 OpenStack，而是记录了我使用 DevStack 搭建 OpenStack 的过程，内容仅供参考。

准备
---
本次是在 Windows 上利用虚拟机搭建单节点单网卡的 OpenStack 环境，至少要保证虚拟机有 4GB 内存及 130GB 硬盘空间。

* 操作系统：Windows 10
* 工具：VirtualBox 5.1
* 系统镜像：Ubuntu Server 14.04.5
* OpenStack版本：Ocata

搭建虚拟机系统环境
===
新建虚拟机及安装 Ubuntu 的过程就不详细说明了。这里主要说一下网络的设置。

![虚拟机网络设置](/upload/2017/11/05/201711052003.png)

{% highlight bash %}
# /etc/network/interface
auto eth0
iface eth0 inet static
address 192.168.31.91
netmask 255.255.255.0
gateway 192.168.31.1
dns-nameservers 8.8.8.8
{% endhighlight %}

需要注意一点，请确保eth0能够连接外网

安装 DevStack 准备
===
1. 安装 git 及 python-pip
2. clone DevStack 的仓库到``/home/devstack``。这里可以使用国内的镜像源。<br>``git clone http://git.trystack.cn/openstack-dev/devstack.git -b stable/ocata``
3. 进入 tools 目录，执行命令``./create-stack-user.sh``，创建 stack 用户。
4. 执行命令``passwd stack``，给 stack 用户设置密码。
5. 执行命令``chown -R stack:stack /home/devstack``，将其下的文件更换用户组
6. 执行命令``chmod 777 /dev/pts/0``，以便后续切换到其他用户 VNC 能接收到控制台输出。
7. 执行命令``su stack``，切换至 stack 用户。
8. （可选）在 root 及 stack 用户目录下配置 pip 源，如``pypi.douban.com``等。

配置 DevStack
===
搭建 OpenStack 最关键的步骤就是配置 DevStack 的 local.conf。在 samples 子目录中有一份示例，虽然大部分可以保持不变，但是网络配置的部分一定要结合自己需求修改。

下面是我配置使用的 local.conf 内容：
{% highlight bash %}
# /home/devstacl/local.conf
[[local|localrc]]

# 使用国内源
GIT_BASE=http://git.trystack.cn
NOVNC_REPO=http://git.trystack.cn/kanaka/noVNC.git
SPICE_REPO=http://git.trystack.cn/git/spice/spice-html5.git

# 每次重新 clone 仓库
# RECLONE=True

# Password
ADMIN_PASSWORD=nomoresecret
DATABASE_PASSWORD=stackdb
RABBIT_PASSWORD=stackqueue
SERVICE_PASSWORD=$ADMIN_PASSWORD

# Logging
LOGFILE=$DEST/logs/stack.sh.log
LOGDAYS=2

KEYSTONE_TOKEN_FORMAT=UUID

# 指定 cinder 空间大小
VOLUME_BACKING_FILE_SIZE=102400M

# Swift
SWIFT_HASH=66a3d6b56c1f479c8b4e70ab5c2000f5
SWIFT_REPLICAS=1
SWIFT_DATA_DIR=$DEST/data

disable_service tempest

# 使用neutron代替nova-network
disable_service n-net
enable_service q-svc
enable_service q-agt
enable_service q-dhcp
enable_service q-l3
enable_service q-meta
enable_service neutron

Q_USE_SECGROUP=True
# 务必和虚拟机的网络环境一致
HOST_IP=192.168.31.91
FLOATING_RANGE="192.168.31.0/24"
IPV4_ADDRS_SAFE_TO_USE="10.0.0.0/22"
Q_FLOATING_ALLOCATION_POOL=start=192.168.31.128,end=192.168.31.254
PUBLIC_NETWORK_GATEWAY="192.168.31.1"
PUBLIC_INTERFACE=eth0

Q_USE_PROVIDERNET_FOR_PUBLIC=True
OVS_PHYSICAL_BRIDGE=br-ex
PUBLIC_BRIDGE=br-ex
OVS_BRIDGE_MAPPINGS=public:br-ex
{% endhighlight %}

安装 DevStack
---
上面的工作都做完后，执行命令``./stack.sh``，等待安装完毕即可。

如果中途出现错误，可以执行``./unstack.sh``进行卸载，以及``./clean.sh``完全删除依赖的其他软件。

宿主机与虚拟实例互连
---
部署完后，在 OpenStack 创建新实例的时候往往会发现宿主机与虚拟实例之间不能互相 ping 通，而且虚拟实例也不能连接外网。这时候还需要进行两处设置。

虚拟机开启 NAT 转发
===
{% highlight bash %}
sudo bash
echo 1 > /proc/sys/net/ipv4/ip_forward
echo 1 > /proc/sys/net/ipv4/conf/eth0/proxy_arp
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
{% endhighlight %}

OpenStack 设置安全组规则
===
![安全组规则设置](/upload/2017/11/05/201711052104.png)
如图，作为例子允许 ICMP 协议通过。
