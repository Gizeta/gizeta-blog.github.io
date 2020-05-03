---
layout: post
title:  "路由器配置透明代理"
date:   2020-04-27 23:06:31
categories: [other]
---
之前因为怀疑路由器系统有问题就刷成了 OpenWRT，既然已经刷了，那就不如加些原来做不到的功能。本来是想给路由器加个透明代理，这样我就不用在本地配置代理了，不过由于路由器只有 11MB 空间，v2ray 这种用 go 开发的肯定是存不下了，而 trojan 没有现成的二进制包，需要自行编译，所以配置代理的想法一直在搁置。后来因为家里的网络玩 switch 联机一直失败，其他加速器也要开始收费，配置代理就马上提上了日程。

首先就是安装 trojan。官方已经提供了 OpenWRT 版本的源代码，只要找台 Linux 机器编译一下就可以。配置就和本地客户端一致，因为透明代理的部分交给 redsocks 去做了，这里使用 client 模式即可，不需要使用 nat 模式。我这里放个基于 openwrt-sdk-19.07.1-ramips-mt7620 编译的版本，[链接]（https://s3.gizeta.me/public/trojan_1.15.1-1_mipsel_24kc.ipk

然后就是安装 redsocks。这里用的是国人 fork 出来的 redsocks2。之前使用原版 redsocks 发现最后搭建的代理 NAT 类型不是 FullCone，switch 还是报 NAT 穿越失败的错误，换了 redsocks2 之后就好了。这里也放个我编译好的二进制包，[链接](https://s3.gizeta.me/public/redsocks2_0.67-1_mipsel_24kc.ipk)

最后就是配置一下防火墙，加上转发规则。
```bash
# 设置转发
iptables -t nat -N REDSOCKS
iptables -t nat -A REDSOCKS -d xxx.xxx.xxx.xxx -j RETURN
iptables -t nat -A REDSOCKS -d 0.0.0.0/8 -j RETURN
iptables -t nat -A REDSOCKS -d 10.0.0.0/8 -j RETURN
iptables -t nat -A REDSOCKS -d 127.0.0.0/8 -j RETURN
iptables -t nat -A REDSOCKS -d 169.254.0.0/16 -j RETURN
iptables -t nat -A REDSOCKS -d 172.16.0.0/12 -j RETURN
iptables -t nat -A REDSOCKS -d 192.168.0.0/16 -j RETURN
iptables -t nat -A REDSOCKS -d 224.0.0.0/4 -j RETURN
iptables -t nat -A REDSOCKS -d 240.0.0.0/4 -j RETURN
iptables -t nat -A REDSOCKS -p tcp -s 192.168.1.248/29 -j REDIRECT --to-ports 1081
iptables -t nat -A REDSOCKS -s 192.168.0.0/16 -j RETURN
iptables -t nat -A REDSOCKS -p tcp -j REDIRECT --to-ports 1081
iptables -t nat -I zone_lan_prerouting -j REDSOCKS

ip route add local 0.0.0.0/0 dev lo table 100
ip rule add fwmark 1 table 100
iptables -t mangle -N REDUDP
iptables -t mangle -A REDUDP -d 0.0.0.0/8 -j RETURN
iptables -t mangle -A REDUDP -d 10.0.0.0/8 -j RETURN
iptables -t mangle -A REDUDP -d 127.0.0.0/8 -j RETURN
iptables -t mangle -A REDUDP -d 169.254.0.0/16 -j RETURN
iptables -t mangle -A REDUDP -d 172.16.0.0/12 -j RETURN
iptables -t mangle -A REDUDP -d 192.168.0.0/16 -j RETURN
iptables -t mangle -A REDUDP -d 224.0.0.0/4 -j RETURN
iptables -t mangle -A REDUDP -d 240.0.0.0/4 -j RETURN
iptables -t mangle -A REDUDP -p udp -j TPROXY --on-port 1082 --tproxy-mark 0x01/0x01
iptables -t mangle -A PREROUTING -j REDUDP
```
```bash
# 取消转发
iptables -t nat -F REDSOCKS
sleep 3
iptables -t nat -D zone_lan_prerouting -j REDSOCKS
iptables -t nat -X REDSOCKS

ip route delete local 0.0.0.0/0 dev lo table 100
ip rule delete fwmark 1 table 100
iptables -t mangle -F REDUDP
sleep 3
iptables -t mangle -D PREROUTING -j REDUDP
iptables -t mangle -X REDUDP
```

不过我写的规则有个问题，就是udp转发没有区分源地址，都会走代理，虽然还不知道要怎么改，但是平时把转发规则关掉就不影响了，就先这样设置了，如果有找到解决方法再更新。

终于可以用自建的服务器玩 switch 联机了，不过感觉速度有些慢，是时候换个机房租了。
