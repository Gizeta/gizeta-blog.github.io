---
layout: post
title:  "关于 Magnet 在 Electron 3.0 后失效的问题"
date:   2019-01-01 12:11:39
categories: [electron]
---
问题描述见 [issue](https://github.com/electron/electron/issues/16091)，这里就不详细说了，只是说下产生问题的原因。

[Magnet](http://magnet.crowdcafe.com/) 根据窗口 ZoomButton 状态决定功能是否可用。很明显， Electron 升级到 3.0 之后，ZoomButton 的行为明显发生了变化，这一点没有在 Release Note 的 Changes 中进行说明。而在代码层面，[2.0](https://github.com/electron/electron/blob/2-0-x/atom/browser/native_window_mac.mm#L1977) 和 [3.0](https://github.com/electron/electron/blob/3-0-x/atom/browser/native_window_mac.mm#L1383) 中设置 ZoomButton 状态的代码并没有变动过。经过调试，基本可以确定是由 AtomNSWindow 重构带来的代码执行逻辑变动引发的问题。

在 2.0 中：InstallView -> setEnabled:NO -> SetMaximizable(true) -> setEnabled:YES

在 3.0 中：SetMaximizable(true) -> setEnabled:YES -> AddContentViewLayers -> setEnabled:NO -> OverrideNSWindowContentView -> SetMaximizable(false) -> setEnabled:NO -> AddContentViewLayers -> setEnabled:NO

修复的话，针对上面的执行逻辑应该很容易写出，我这里就不丢脸放代码了。
