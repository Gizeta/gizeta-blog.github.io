---
layout: post
title:  "如何愉快地在微信群中充当萌萌的表情 bot"
subtitle: "一种下载 Telegram sticker 图片的方法"
date:   2016-09-20 14:07:24
categories: [work]
---
自从用了 Telegram 之后，不知道怎么就转职成表情 bot 了（笑）。主要是微信的那些表情不够 kawaii，就想把 Telegram 里面的 sticker 都搬到微信的自定义表情中去（才发现自定义表情貌似可以同步 150 个，又不是去斗图，一般足够用了吧）。

打开 Telegram，发了个 sticker，长按消息。。。诶，怎么没有保存，这不是图片么。好吧，看来 Telegram 对图片和 sticker 处理不同。因为手里没有应用抓包的工具，所以方向就转到 web 端。然而 web 端的数据全是用二进制传递的，图片地址经过了 hash，解析协议又要花大量的时间。看来抓包找 url 这条路走不通。

既然抓包行不通，那就只能去做 Telegram bot 了。我对 Telegram 有好感不仅因为聊天功能比微信好用，而且 Telegram 很开放了很多 api，所以催生出很多有趣的 bot。给腾讯大老爷做个 QQ 的 bot 还都是自己去解析 WebQQ 的 api，功能少不说，还没准哪天就把 WebQQ 的访问砍了，难受地一逼。

好了，进入正题。做 Telegram bot 肯定就离不开 [bot 文档](https://core.telegram.org/bots/) 了。首先是要拿到一个 API Token，把 token 写在 url 中就能随意使用 api 了。私戳 [@BotFather](https://telegram.me/botfather)，按步骤填好 bot 的名字，就能拿到 token 了。

有了 token，下一步就是写程序啦。语言就选用最简单最省事的 Node.js，api 模块选用在 github star 数最高的 [telegram-node-bot](https://www.npmjs.com/package/telegram-node-bot)。照着 api 模块的文档写好代码。
{% highlight js %}
var co = require('co');
var fetch = require('node-fetch');
var TelegramBot = require('node-telegram-bot-api');

var token = 'XXXXXXXX';

var bot = new TelegramBot(token, {polling: true});

bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    var sticker = msg.sticker;
    if (sticker) {
        co(function *(){
            var link = yield bot.getFileLink(msg.sticker.file_id);
            var res = yield fetch(link);
            var buf = yield res.buffer();
            bot.sendPhoto(chatId, buf, {
                caption: link,
                disable_notification: true,
                reply_to_message_id: msg.message_id
            });
        });
    }
});
{% endhighlight %}

实际运行时就会发现 api 报错了，说图片类型不支持。原来 sticker 图片都是 webp 格式。在 sendPhoto 之前需要转换成支持的图片格式。谷歌了一番之后，选择使用 [node-webp](https://www.npmjs.com/package/cwebp) 库转换。这样就完成了一个简单的 sticker bot。给 bot 发送 sticker，bot 会返回转换后的图片及 webp 文件链接。这样无论是保存图片还是保存 webp 都可以作为表情添加到微信中。

美中不足的是，node-webp 转换后上传的图片返回是 jpg 格式，丢失了透明信息。一般下载 webp 链接就可以完美导入微信中。webp 格式虽然有体积小的优点，但是支持程度不是很好，至少 QQ 表情是没发添加 webp 图片的。不过作为新生的图片格式已经有如此高的支持程度，着实令我吃惊。

bot 完整的代码在 [https://bitbucket.org/Gizeta_sf/download_sticker_bot](https://bitbucket.org/Gizeta_sf/download_sticker_bot)，欢迎来调戏 [@Sticker DL Bot](https://telegram.me/sticker_download_bot)。

PS: 有个小问题，返回的 sticker webp 链接会暴露 token，所以发发 sticker 就好，不要发些私密的消息哦。