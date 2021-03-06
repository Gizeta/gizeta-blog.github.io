---
layout: post
title:  "poi-statistics 已死"
date:   2019-07-06 21:38:25
categories: [work]
---
当发布这篇文章的时候，poi-statistics 这个项目应该是已经被归档了。这里稍微回顾一下 poi-statistics，也吐槽一下各种不成熟的设计。

2015年7月28日，网站第一个版本上线。其实上线前是有过一段时间的试运行阶段，不过当时就暴露出一个大问题，由于数据库实时查询的效率问题，网页加载极其缓慢，被迫修改了实现方案缓存统计结果。在紧急修改了两周之后就迎来了第一次的活动统计。当时还是采用直接缓存网页的方式（`remi-rack-staticifier`)，虽然这样可以做到完全静态，但是一旦页面需要调整就必须重新静态化，如果页面出现 bug 会导致更新只能等到下次静态化，因此把数据单独存为 json 文件，这样修改网页也不会影响到数据，这样的缓存方式就一直使用了很长一段时间。

当然第一个版本肯定是有各种问题。首先是游戏常量数据的存储方式，之前采取的是将数据写到一个文件中作为全局常量，结果一个文件就有 4000 多行，维护起来确实有些麻烦，于是就把常量拆分成多个文件存储。虽然当时我也同时开坑了 kcdata 的数据，不过我没有想到 kcdata 能作为各个舰娘项目的数据源，导致后续 poi-statistics 的数据来源迁移工作一直搁置，到现在也没有能完全使用 kcdata，维护数据简直想死，算是当时设计上的一个失误吧。

不过数据维护仅仅是个小问题，还有一个更大的问题摆在我面前，那就是数据统计的时间超级长，甚至严重到了数据库每天更新，而网站却还没有统计完五天前数据的状况。因此当时开展了一次较大的重构工作：将一次完整的统计拆分成每个小时的小片数据，因为这些数据永远不会被更新、删除，所以可以减轻数据统计的工作量。这次重构在当时确实起了一定效果，不过却因为增加了大量的缓存数据导致硬盘空间不足。虽然实际原因是 MongoDB 没开压缩，不过考虑到后续数据会持续增加，为了彻底解决硬盘空间的问题（实际是因为当时机器配置低，没打算升级机器），把方案改为合并相同小时数和分钟数的数据。这样原方案会因为时间数据不断增加，而新方案的数据量永远是固定的，再加上统计过的原数据可以没有顾虑地删除掉。这样既解决了数据占用大量硬盘空间的问题，又缓解了因为数据量大导致内存占用大的问题。所以，这个数据模型一直沿用到了现在。

经过了上述几次重构，缓存方式已经确定，数据模型也基本定型，所以后续没有太大的结构改动了。想一下也就是：为了提高查询速度将数据从 MongoDB 迁到 PostgreSQL；为了实现更灵活地改动而去掉了 HTML 的缓存；为了方便更新数据在部分地方整合了 kcdata 数据；为了多次利用统计结果而设计了 key-value 数据表做缓存。但是，现在的架构真的是完美的吗？数据出错不能及时维护、做不到查询某一时间段的统计数据、每次维护游戏常量数据步骤极其繁琐、代码仓库和实际网站不同步、甚至还有部分代码没有完全迁移到现有架构，poi-statistics 已经运营了 4 年，期间问题不断，是时候该重新审视一下现在的代码，考虑重新来过了。

poi-statistics 已死，原谅我没法再进行维护。

未来属于 poi-stat-kai。
