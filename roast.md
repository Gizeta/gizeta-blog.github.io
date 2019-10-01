---
layout: page
id: roast
title: 吐槽
permalink: /roast/
---
{% assign roast = site.roast | sort: "date" | reverse %}{% for comment in roast %}
{{ comment.title }}
===
{{ comment.date | date: "%Y-%m-%d " }}{% if comment.playtime %} - 时间：{{ comment.playtime }}{% endif %} - [链接]({{ comment.source }}) - 评分：{% for counter in (1..comment.score) %}{% if comment.score_mark %}{{ comment.score_mark }}{% else %}★{% endif %}{% endfor %}({{ comment.score }})

标签：{% for tag in comment.tag %}{{tag}}{% unless forloop.last %} / {% endunless %}{% endfor %}{% if comment.highlight %} - 亮点：{{ comment.highlight }}{% endif %}

{{ comment.content }}

<br>

{% endfor %}
