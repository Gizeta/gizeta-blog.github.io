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

  var payload = "r3G1sQRBhq0KAFBy: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";
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
