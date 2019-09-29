---
layout: page
id: roast
title: 吐槽
permalink: /roast/
---
{% for comment in site.roast %}
{{ comment.title }}
===
{{ comment.date }} - [链接]({{ comment.source }})

标签：{% for tag in comment.tag %}{{tag}}{% unless forloop.last %} - {% endunless %}{% endfor %}

评分：{% for counter in (1..comment.score) %}{{ comment.score_mark }}{% endfor %}({{ comment.score }})

{{ comment.content }}
{% endfor %}
