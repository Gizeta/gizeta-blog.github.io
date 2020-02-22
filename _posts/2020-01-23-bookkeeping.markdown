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

  var payload = "2a0zQCH2gBGBMs5O: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";
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
