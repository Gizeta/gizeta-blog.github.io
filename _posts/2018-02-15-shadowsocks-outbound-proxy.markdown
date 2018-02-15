---
layout: post
title:  "Shadowsocks配置出口HTTPS代理"
date:   2018-02-15 17:49:15
categories: [sniffer]
---
最近接了个外包，想做个游戏 API 代理服务器。一开始以为简单写个代理服务器就完事了，没想到甲方说要整合 shadowsocks-manyuser 的系统。虽然刚开始觉得这样的设计太愚蠢，但是后来回过头看这个问题，感觉这真的是成本最低的方案了（自己还是 too simple）。这里就简单记录下想到的出口代理方案。

<br>

方案1 proxychains
===
没敢试，想想就觉得不靠谱，除非没有其他方案。

<br>

方案2 redsocks
===
真心觉得 redsocks 是最靠谱的方案，奈何不支持 HTTPS。如果只涉及 HTTP 及 HTTP CONNECT 的话，或许会是我的首选。

注：需要设置 iptables 转发

<br>

方案3 Privoxy / proxytunnel
===
貌似并不能做透明代理，需要在 Shadowsocks 前端再加一层代理。放弃。

<br>

方案4 Squid
===
从描述上看非常符合需求，从配置文件上看，hmmmmm，我还是放弃吧。

<br>

方案5 手撸 HTTPS 透明代理
===
实际选用的方案。可以说 100% 能成功的方案，但对于我这种渣水平来说，100% 会出 bug 的方案。不过，可以和后面的游戏 API 代理整合做在一起，没准也能避免各种性能损失（老板，我要加钱）。

具体实现可见 [bgq (暂未开源)](https://bitbucket.org/Gizeta_sf/bgq)。

注：需要设置 iptables 转发

<br>

方案⑨ 修改 Shadowsocks 源代码
===
看名字就知道不会选用的方案。

<br>

附设置 iptables 转发的规则：
```shell
iptables -t nat -A OUTPUT -p tcp -m tcp --dport 80 -j DNAT --to 127.0.0.1:8080
iptables -t nat -A OUTPUT -p tcp -m tcp --dport 443 -j DNAT --to 127.0.0.1:8081
```
