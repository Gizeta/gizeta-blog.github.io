---
layout: post
title:  "记个帐"
date:   2020-01-23 19:11:26
categories: [other]
---
<div id="main" style="width:800px;height:600px;"></div>

<script src="https://cdn.jsdelivr.net/npm/echarts@4.6.0/dist/echarts.min.js" integrity="sha256-9TvhGliyfFW2O8SvloAhdFQbfjluHQ+vQ7WWWX5Z7oM=" crossorigin="anonymous"></script>

<script>
  function b64ToBuf(str) {
    let encrypted = window.atob(str);
    let len = encrypted.length;
    let buf = new Uint8Array(len);
    for (let i = 0; i < len; i++)
      buf[i] = encrypted.charCodeAt(i);
    return buf.buffer;
  }

  function buf2str(buf) {
    return String.fromCharCode(...new Uint16Array(buf));
  }

  var payload = "Lk+iygMnqOM1iOYZ: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";
  let [iv, s] = payload.split(':');
  window.crypto.subtle.importKey(
    "jwk",
    {
      kty: "oct",
      k: window.localStorage.getItem("{{ page.id }}"),
      alg: "A256GCM",
      ext: true,
    },
    {
      name: "AES-GCM",
    },
    false,
    ["encrypt", "decrypt"]
  ).then(key => {
    window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: b64ToBuf(iv),
      },
      key,
      b64ToBuf(s)
    ).then(encrypted => {
      const csv = buf2str(encrypted);
      const chart = echarts.init(document.getElementById('main'));
      const category = csv.split('\n')[0].split(',').slice(1);
      const dataset = csv.split('\n').slice(1).reduce((ret, cur) => {
        const cell = cur.split(',');
        if (cell.length <= 1) return ret;
        ret[cell[0]] = cell.slice(1).map(d => +d);
        return ret;
      }, {});
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: category
        },
        xAxis: [
          {
            type: 'category',
            data: Object.keys(dataset)
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: category.map((c, i) => ({
          name: c,
          type: 'bar',
          stack: '总计',
          data: Object.values(dataset).map(d => d[i])
        }))
      };
      chart.setOption(option);
    });
  });
</script>
