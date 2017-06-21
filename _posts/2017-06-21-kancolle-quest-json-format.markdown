---
layout: post
title:  "艦これ任务描述 json 格式设计"
date:   2017-06-21 13:36:57
categories: [others]
---
虽然代表舰娘百科接下了维护 poi 任务插件 [plugin-quest](https://github.com/poooi/plugin-quest) 的工作，不过心里还是很不情愿的。poi 任务插件的 json 格式设计思路与我主导的 [kcdata](https://github.com/kcwikizh/kcdata) 有较大的不同，设计目的也大相径庭，维护起来就和重新一遍没啥区别。经过了角川的多次折腾，无论是哪种格式用来完美描述新任务都很难实现，只能被迫去设计新的 json 描述格式。下面就列一下目前设计的描述规则。（虽然一直在抱怨 poi 任务插件的 json 格式，不过相比于重构插件，我还是依然选择继续苦逼地维护旧格式。毕竟设计理念不同嘛，而且一直懒得写新代码。）

整理进度(2017/06/21)：<=140

1、数字 (number <~ type)
---
就是数字哒呦。

2、字符串 (string <~ type)
---
就是字符串哒呦。

3、数组 (array <~ type)
---
就是数组哒呦。元素为type/object/cond时表示“或”关系，元素为req时表示“且”关系。<br>
ps: 嘛，上面三个是最基本的类型啦。

4、数值范围 (range <~ type)
---
```
{
  "type":    "range",
  "between": [1, 5],
  "gte":     1,
  "gt":      1,
  "lte":     1,
  "lt":      1
}
```
上述表意字段只可选择一种。如包含多种，按列出顺序只解析第一个有效值。

5、舰娘 (ship <~ object)
---
```
{
  "type": "ship",
  "id": number || array,
  "remodel": number || array || range    // optional
}
```
remodel用于遍历改造后的舰娘。

6、装备 (slotitem <~ object)
---
```
{
  "type": "slotitem",
  "id": number || array
}
```

7、道具 (useitem <~ object)
---
```
{
  "type": "useitem",
  "id": number || array
}
```

8、舰种 (shiptype <~ object)
---
```
{
  "type": "shiptype",
  "id": number || array
}
```

9、远征 (expedition <~ object)
---
```
{
  "type": "expedition",
  "id": number || array
}
```

10、条件且 (and <~ cond)
---
```
{
  "type": "and",
  "cond": [ cond1, cond2, ... ]
}
```

11、条件或 (or <~ cond)
---
```
{
  "type": "or",
  "cond": [ cond1, cond2, ...]
}
```
或
```
[ cond1, cond2, ... ]
```

12、条件非 (not <~ cond)
---
```
{
  "type": "not",
  "cond": cond
}
```

13、旗舰 (flagship <~ req)
---
```
{
  "category": "flagship",
  "ship": ship || shiptype || cond,    // optional
  "fleet": number                      // optional, default = 1
  "level": number || array || range    // optional
}
```

14、编成 (fleet <~ req)
---
```
{
  "category": "fleet",
  "ship": ship || shiptype || cond,      // optional
  "amount": number || array || range,
  "fleet": number                        // optional, default = 1
  "pos": number                          // optional, >= 2
  "speed": number                        // optional
}
```
