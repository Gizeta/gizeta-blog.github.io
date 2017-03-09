---
layout: post
title:  "如何在网页中监听触控板事件"
date:   2017-03-09 20:50:12
categories: [fe]
---
在做 Baidu IFE 题的时候，有一道是任意缩放 canvas 中的图片。作为一个鼠标坏了半年也没换的懒人来说，触控板双指缩放就是在正常不过的事情了。等到真正写代码才注意到，我竟然不知道要用到哪个事件。更惊讶的是，百度了一番，竟然没人问这个问题。翻遍了 MDN，最后把目标选定在 WheelEvent 上面了。

> 当滚动鼠标滚轮或操作其它类似输入设备时会触发滚轮事件。

原来触控板是类似鼠标滚轮的输入设备，我竟然从来没有思考过这样的事情，刷新了我对触控板的认知（笑）。

代码理所当然的就写了出来

```javascript
document.querySelector('canvas').addListener('wheel', function(e) {
    console.log(e.deltaX);
    console.log(e.deltaY);
});
```

不知道是我笔记本的触控板垃圾，还是常识，deltaX 和 deltaY 中只会有一个非 0 值。嘛，能识别触发就是成功了。诶，等等，向上滑和向左滑的值我能理解，缩放时候的值怎么看不懂？一会儿是 deltaX，一会儿是 deltaY，我怎么和滑动手势区别开？Google 了一番，最后在 StackOverflow 上找到了答案，在触控板缩放的时候，e.ctrlKey 会被置为 true。等等，我想到了什么。

> 当滚动鼠标滚轮或操作其它类似输入设备时会触发滚轮事件。

原来触控板是类似鼠标滚轮的输入设备，我竟然从来没有思考过这样的事情，再一次刷新了我对触控板的认知（笑）。

所以最终的代码是这样。

```javascript
document.querySelector('canvas').addListener('wheel', function(e) {
    if (e.ctrlKey) {
        let delta = e.deltaX + e.deltaY;
        if (delta > 0)
            console.log('缩小');
        else
            console.log('放大');
    } else {
        console.log('滚动');
    }
});
```

最后最大的收获反而不是怎么监听触控板，而是知道了触控板就是鼠标滚轮（笑）。啥，你说 Mac？没见过的孩子呢。
