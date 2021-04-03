---
layout: post
title:  "DMMGamePlayer 是个什么垃圾客户端"
date:   2021-04-03 19:25:26
categories: [hack]
---
<style>
  .hidden {
    display: none;
  }
  .bg-color {
    color: #F5F5F5;
  }
</style>

当赛马娘在 DMM 平台出 PC 客户端的时候，我就知道会有这么一天。算了算，这大概是我是第 8 次安装 DMMGamePlayer 了，每次都因为忍受不了各种问题（慢到要死的启动速度、代理网络问题时不时启动不了、代理 IP 问题页面加载不出来）而不得不放弃在 PC 平台上玩。DMM 还是去做网页游戏好了，我真没见过哪个客户端能烂成这样。可是，赛马娘该玩还是得玩，我硬着头皮再装了一次 DMMGamePlayer。不过这次在研究怎么注入 Umamusume.exe 的时候我注意到游戏启动参数都有一个 onetime_token，我立马就意识到用这个 token 不就可以不用通过 DMMGamePlayer 启动游戏了么。马上开干。先说一句，以下内容纯属萌新瞎玩，逆向 dalao 可以绕路了。

准备
---
首先看下 DMMGamePlayer 程序的目录结构。根目录有个 DMMGamePlayer.exe 和 dgpservice.exe，还有一个 rt 文件夹。扫了下 rt 文件夹里全是 JVM Runtime 相关的文件，看不出和游戏有什么关系，于是就猜测这些内容都在 DMMGamePlayer.exe 里面。在反编译 exe 之前在网上搜了搜这个 runtime，好像是用了 Excelsior JET 把 jar 封装成 exe。顺便搜了搜解包工具，但是什么也没有找到，不知道是太小众了还是说公司的法务部比较厉害。这下只能去看 exe 了。

反编译 exe
---
用 IDA 打开了 exe，好家伙，什么也看不懂。这个工具要怎么用啊，萌新之前没用过，于是我只能关掉，然后去睡觉了。这次反编译到这里就结束了......<spam class="bg-color">才怪。虽然不知道怎么用，但英文字母至少能看懂，先搜搜有啥可利用的线索吧。首先看了眼所有的函数，除了几个系统调用外，其他都没有命名，看来是没法从这里下手了。先找找有什么能看懂的吧。搜了下全部的字符串，371515 条结果，大量的 Java 相关的字符串，看来可能是把 jar 明文打进去了。我相信以 DMM 的技术力，主要逻辑肯定都在 jar 里面，C++ 只是个启动 wrapper，这样把 jar 解出来就算成功一大半了。看了几个字符串上下文都有些固定的字节，搜了下正好是 zip 的标志头，这下可以根据 jar 的文件格式把这些文件提取出来了。写了个简单的脚本把这些文件扫出来丢进 Java 反编译工具里，结果大部分的 .class 文件都解不出来，一看文件是 0KB，估计是数据不完整，其他的资源/配置文件虽然完好无损的解出来了，不过并没有找到生成 token 相关的逻辑。重新回看了解文件的过程，发现解出的文件数据都在 .rdata 段，之前扫出的字符串还有部分在 .data 段，看来是要想办法把这两个拼在一起才有可能正常解出来了。不过看了半天也不知道怎么搞，我也不会用 IDA 调试 exe，反编译这条路因为能力不够就断了。

除了反编译 exe 还有其他方法拿到 token 吗？显然是有的，token 必然是请求服务器生成的，拦截 DMMGamePlayer 与服务器的通信肯定能找到想要的数据。
{: .hidden}

监听网络请求
---
{: .hidden}
想拦截 DMMGamePlayer 的请求，第一是想到了 Wireshark，不过抓了一次看都是 TLS 数据包，走 HTTPS 还是用 Fiddler/Charles 更方便一些。按照网上的让 DMMGamePlayer 走代理的方法修改了 rt/lib/net.properties，然后这次连登录界面都看不到了，强制要求更新。看来 DMMGamePlayer 还校验了本地文件，既然这样那就全局走代理好了。配好代理之后，这次报网络异常，看了 Charles 的记录，HTTPS 握手失败了，看样子是证书不可信，Charles 内置了安装证书到 Java VM 的功能，不过这个并没有生效，看来这种内置的 JVM 还需要单独配置。将 Charles 根证书添加到 rt/lib/security/cacerts，之后成功抓到了 HTTPS 请求。不过这次也强制要求更新。看来 cacerts 文件也不能改啊，不过看到 Charles 的第一条记录，``/gameplayer/platformapp/dmmgameplayer``里面返回个客户端所有的文件和 md5，原来是通过这种方式校验文件改动的啊，既然 HTTPS 都能拦截到，修改里面的 md5 值不是很容易的事情么。替换成新生成的 md5 之后果然直接进入到首页中了。所有的 HTTPS 请求也都成功的记录下来了。看了下所需的数据都在 ``/api/gameplayer/app/start``里面，连游戏文件列表都有，这下连更新游戏都可以不用走 DMMGamePlayer 了。
{: .hidden}

实现
---
{: .hidden}
相关实现会放在 [GitHub](https://github.com/Gizeta/oh-no-dgp) 上，不过肯定要隐藏下关键实现，不然律师函找上门就“绝不调”了。
{: .hidden}

<script>
  if (location.search.includes('i_know_what_i_do')) {
    document.querySelectorAll('.hidden').forEach(x => x.className = x.className.replace('hidden', ''));
    document.querySelectorAll('.bg-color').forEach(x => x.className = x.className.replace('bg-color', ''));
  }
</script>