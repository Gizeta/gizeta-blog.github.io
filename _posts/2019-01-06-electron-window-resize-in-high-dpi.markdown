---
layout: post
title:  "关于 Windows 高 DPI 下 Electron 窗口大小的奇妙变化"
date:   2019-01-06 15:13:11
categories: [electron]
---
虽然这只是第二篇吐槽 Electron 各种问题的文章，但是我已经有预感这里以后有可能会成为记录各种 Electron 遇坑的地方。可怜可怜我们这些前端工程师还要研究 Electron 源代码的人吧。

根据 [Issue](https://github.com/electron/electron/issues/10862) 记载，这个问题从 1.5.0 就出现了，直到 4.0.1 也没有修复。现象就是在非 100% DPI 的 Windows 系统下，调用 setPosition 会引发窗口大小变化。一般是每次调用变大 0-2 px，但是也有出现高度减少 20-30px 的情况出现。调用 setPosition 之后调用 setSize 恢复原来的大小在某些 DPI 情况下可以限制窗口的变大，但是会有明显的窗口抖动现象。如果不幸地给窗口设置了 resizable 为 false，那么 setSize 会失效，只能眼睁睁看窗口逐渐变大。

解决方法是不要调用 setPosition，尽量使用 setBounds，目前 setBounds 没有发现这样的问题（虽然 setPosition 内部就是调用 setBounds）。具体原因我就先不查了，也懒得翻 chromium 的 issue list。希望公司能招到一个 chrome 专精，我就不用纠结这个蛋疼问题了。
