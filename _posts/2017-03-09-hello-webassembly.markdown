---
layout: post
title:  "Hello WebAssembly"
date:   2017-03-09 23:04:41
categories: [others]
---
听闻 Firefox 52 已经支持了 WebAssembly，兴致大发，手撸一小段，也算是有写过 WebAssembly 的经历了（笑）。

```WebAssembly
(module
  (import "console" "log" (func $log (param i32)))
  (func $fact (param $n i32) (result i32)
    get_local $n   ;; push parameter $n on stack
    i32.const 0    ;; push constant int32 "0" on stack
    i32.eq         ;; execute "eq" which pops two operands from stack
    if i32         ;; pops one int32 from stack; if it is not "0"
      i32.const 1
    else
      get_local $n
      get_local $n
      i32.const 1
      i32.sub      ;; execute "sub" which pops two operands and pushes the result int32 on stack
      call $fact   ;; call function $fact which pops one int32 from stack and pushes the result int32 on stack
      i32.mul
    end)
  (func (export "calcFact") (param $n i32)
    get_local $n
    call $fact
    call $log)
)
```

```javascript
fetch('/upload/2017/03/09/201703092358.wasm').then(response =>
  response.arrayBuffer()
).then(bytes =>
  WebAssembly.instantiate(bytes, {
    console: {
      log: (arg) => console.log(arg)
    }
  })
).then(results => {
  results.instance.exports.calcFact(10)
});
```

哎呀，代码高亮还不支持 WebAssembly 呀。

不过目前文本格式的 WebAssembly 还没有完全定稿，上面代码的语法是按照 [wabt](https://github.com/WebAssembly/wabt/blob/master/README.md) 编写。
