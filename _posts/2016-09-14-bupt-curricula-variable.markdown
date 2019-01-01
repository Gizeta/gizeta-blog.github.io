---
layout: post
title:  "BUPT 的选课发包脚本"
date:   2016-09-14 07:20:51
categories: [fe]
---
应同学之邀，来写篇博客。不过，在写之前调侃几句。脚本抢课有风险，小心还没吃上月饼，就被学校开除，这可是价值观的问题（笑）。

<br>

正题
===
BUPT 的选课系统真是烂，明明临时借几台机器做横向扩展就能撑住。这老旧的系统，估计当时做的时候，还没有云的概念吧。为了能让我在第一学期就能享受到数学的乐趣，把之前抓 CNU 的学生信息脚本改了改直接拿来用了（我都毕业了，就别查我水表了）。

伪造发包就是直接模拟浏览器发 HTTP 请求。URL、POST Data、Cookie 这些肯定是必须的，而其他的 HTTP 请求头就看服务器有没有做检测了，常见的会验证 Referer、User Agent，不过这些想伪造也是很容易的。BUPT 这么烂的系统当然什么验证都没有啦，不过想不被封的话，尽可能地去模拟浏览器的行为比较安全。

登录
---
写脚本当然从登录开始写啦，不过 yjxt.bupt.edu.cn 没有登录的入口，登录管理统一到 auth.bupt.edu.cn 上了。WTF，居然是 HTTPS，Ruby 在 Windows 上的 HTTPS 不自带证书，之前改过一次，但是垃圾 Windows 10 总是重置配置，实在懒得配了（记不住命令23333）。幸好学校可怜我技术渣，没有去掉 HTTP 的访问。开着浏览器的开发者工具抓一波请求。

![登录-Post](/upload/2016/09/14/20160914170917.png)

![登录-Reponse](/upload/2016/09/14/20160914170741.png)

service 写好要跳转登录的选课 URL，登录之后会直接 302 跳转过去。Post 参数明显是要抓登录的 HTML 页面表单（正则就好，XPath也能用），不过有个小坑，就是登录页面会设置一个 Cookie，Post 的时候别忘了把这个 Cookie 也发过去，不然就一直 302 到登录页面，页面还不报错，坑。用 Ruby 写就是下面这样啦。

{% highlight ruby %}
login_response = http.request_get('/authserver/login?service=http%3a%2f%2fyjxt.bupt.edu.cn%2fULogin.aspx')

jsession_id = 'JSESSIONID=' + /JSESSIONID=(.*?);/m.match(login_response.header["set-cookie"])[1]

t_lt = /name="lt" value="(.*?)"/m.match(login_response.body)[1]
t_exec = /name="execution" value="(.*?)"/m.match(login_response.body)[1]

auth_response = http.request_post('/authserver/login?service=http%3a%2f%2fyjxt.bupt.edu.cn%2fULogin.aspx', "username=#{$username}&password=#{$password}&lt=#{t_lt}&execution=#{t_exec}&_eventId=submit&rmShown=1", {'cookie' => jsession_id})

redir_url = auth_response.header["location"].gsub('http://yjxt.bupt.edu.cn', '')
{% endhighlight %}

跳转的 URL 可一定要记住。那个是去 yjxt.bupt.edu.cn 换 Cookie 的重要链接。

访问那个跳转的 URL 就能在响应中拿到选课系统的 Cookie，登录过程就完成了。

<br>

选课
---
这个选课系统居然是用 ASP.net Form 做的，我的天，源代码可读性差到极点。选课关键的 EID 还是一长串的字符，等等，WTF，重新登陆后居然还会变。看来只能每次登陆根据课程号抓一遍 EID 了。同样正则一通之后，拿到每个课程 EID，就开始选课之旅了。

开着开发者工具先按着选课流程走一遍，然后找到相关的 Post 请求，记录下 Post Data、URL、Cookie等信息，写脚本模拟一遍发包就完成了选课。

![选课-Post](/upload/2016/09/14/20160914173430.png)

Post 的参数看着是一片随机字符串，其实都可以在 HTML 页面抓取到。另外提醒一下，__VIEWSTATE 和 __EVENTVALIDATION 都是 base64 加密，不过并不是 URL 安全的 base64，所以别忘了转义。

Post 请求的 Response Body 会包含选课结果，不过我偷懒只判断了选课成功，实际并没有什么影响啦。

<br>

结束
---
博客里只是简单地写了些发包分析的流程，具体过程可以参考完整代码。完整代码在[https://gist.github.com/Gizeta/5ea910e8a9fb1e1e8a6db9ab29497dd2](https://gist.github.com/Gizeta/5ea910e8a9fb1e1e8a6db9ab29497dd2)。我下学期还有课，下次选课见（笑）。

<br>

下面写一些无关的扯淡内容，并不是引发战争（笑）。

关于 Python VS Ruby，最早纠结这个问题还是在高中的时候。当时想着学一门脚本语言用来写写网站（PHP 写大型网站很麻烦，当时 Node.JS 也还没有火，感觉 ASP/JSP 太臃肿了），baidu 了半天两个语言的文章，最后选了 Ruby。并不是说 Ruby 就比 Python 强大，只是我更喜欢 Ruby 的哲学而已。现代语言之间很多都是互相借鉴的，文中的这种小脚本换成 python 的成本很小。对于纠结语言不同而止步不前的人，我只能说 too naive。

关于 UI 自动化测试脚本和发包脚本的优劣。这个问题并没有一个固定的答案，发包脚本的优势是只关心关键的请求，其他的一概忽略，加快访问速度，不过这样偏离了模拟浏览器行为的原则，如果连每个图片都要模拟 GET 一遍，脚本的复杂程度就会大幅度上升。而且发包脚本的流程一般是硬编码的，原站改了一个变量名就有可能导致脚本报错。而 UI 自动化测试脚本完全地模拟了浏览器的行为，一般很难准确地区分用户和脚本，所以被抓的概率很低。两种脚本都有存在的价值，不过当然是哪个好用用哪个啦。
