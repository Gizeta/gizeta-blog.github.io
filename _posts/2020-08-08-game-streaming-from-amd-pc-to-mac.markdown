---
layout: post
title:  "AMD 显卡游戏串流到 macOS 的尝试"
date:   2020-08-08 04:33:10
categories: [other]
---
自从用上公司配备的 macbook，我有点喜欢上轻薄本了。我实在不喜欢在床上抱着傻大黑粗的笔记本。不过 macOS 系统能玩的游戏少之又少，如果能把台式机的游戏画面串流到 macbook 就可以在床上躺着玩游戏了，所以有了各种的尝试。

RDP
---
之前就一直在 mac 上使用 RDP 操作 Windows，期间有尝试过打开游戏。不过远程的时候没法用 PC 的鼠标操控，用 mac 触控板转视角太灵敏了，没法控制，这个方案肯定就直接 pass 了。

OBS
---
最开始是尝试将视频输出用 UDP 组播，不过我在 mac 上播放一直有问题，只能显示上面一小条画面，剩下的都是绿屏，改了几次编码都没有成功就放弃了。然后尝试了 mac 搭建 RTMP Server，PC 用 OBS 推流到服务器上。这个虽然可行，不过延迟有3秒，就是玩回合制的 RPG 也受不了，只能放弃了。

AMD Link
---
这我就想喷 AMD 了，隔壁 NVIDIA 都支持了，AMD Link 还不支持串流到 mac。看这代的硬件性能，以后装机就考虑 AMD CPU + NVIDIA GPU 了。

Moonlight + Sunshine
---
Moonlight 是借助 NVIDIA 技术实现的游戏串流软件，当然需要一块N卡。不过有人做了支持A卡的Stream Host，试了下效果还不错，就是隔一段时间会短暂卡顿一次，不知道是不是网络问题，不过很满意了。我还是希望官方能在 mac 上出个 AMD Link 客户端，不然我就去买N卡了（真香flag）。
