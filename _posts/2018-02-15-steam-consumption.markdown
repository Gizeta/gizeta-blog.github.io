---
layout: post
title:  "Sbeam理财记录"
date:   2018-02-15 23:15:27
categories: [other]
---
G胖还我血汗钱！

2018.07.17更新

|---
| 理财时间 | 理财产品 | 投资 |
|:-|:-|-:|
| 2016.07 | FaceRig<br>FaceRig Live2D Module | \* |
| 2016.07 | Deponia: The Complete Journey | \* |
| 2016.07 | TIS-100 | \* |
| 2016.07 | Hacknet | \* |
| 2016.08 | Screeps | \* |
| 2016.10 | Uplink<br>Hand Of Fate<br>Hand of Fate - First Expansion | \* |
| 2016.11 | NEKOPARA Vol. 0<br>NEKOPARA Vol. 1<br>NEKOPARA Vol. 2 | \* |
| 2016.12 | Shadowverse CCG | \* |
| 2017.03 | AKIBA'S TRIP: Undead & Undressed | \* |
| 2017.03 | Atelier Sophie: The Alchemist of the Mysterious Book | \* |
| 2017.03 | DoDonPachi Resurrection (Post-Launch - No OST) | \* |
| 2017.05 | NEKOPARA Vol. 3 | \* |
| 2017.06 | Material Girl | \* |
| 2017.06 | Transistor<br>Portal<br>Portal 2 | \* |
| 2017.06 | PLAYERUNKNOWN'S BATTLEGROUNDS | \* |
| 2017.08 | The Legend of Heroes: Trails of Cold Steel | \* |
| 2017.08 | Dark Elf | \* |
| 2017.09 | Tricolour Lovestory<br>Tricolour Lovestory : Chapter Zero | \* |
| 2017.10 | King Exit | \* |
| 2017.10 | Taima Miko Yuugi | \* |
| 2017.11 | theHunter™: Call of the Wild<br>theHunter™: Call of the Wild - ATV SABER 4X4 | \* |
| 2017.11 | 東方天空璋 ～ Hidden Star in Four Seasons. | \* |
| 2017.11 | Rabi-Ribi | \* |
| 2017.11 | fault - milestone one<br>fault - milestone two side:above | \* |
| 2017.12 | Tokyo Xanadu eX+ | \* |
| 2017.12 | Succubus Rem | \* |
| 2017.12 | To The Moon | \* |
| 2017.12 | Atelier Firis: The Alchemist and the Mysterious Journey | \* |
| 2018.01 | TH15.5 東方憑依華　～ Antinomy of Common Flowers. | \* |
| 2018.01 | The Disappearing of Gensokyo: Sakuya, Koishi, Suika Character Pack | \* |
| 2018.02 | Mirror | \* |
| 2018.02 | The Legend of Heroes: Trails of Cold Steel II | \* |
| 2018.02 | MELTY BLOOD Actress Again Current Code<br>Human: Fall Flat | \* |
| 2018.04 | Wallpaper Engine | \* |
| 2018.06 | Just Shapes & Beats | \* |
| 2018.06 | Feather Of Praying 羽翼的祈愿 | \* |
| 2018.06 | Grand Theft Auto V | \* |
| 2018.06 | Ys VIII: Lacrimosa of DANA | \* |
| 2018.06 | OneShot<br>INSIDE | \* |
| 2018.06 | Watch_Dogs2 | \* |
| 2018.06 | Watch_Dogs 2 - Season Pass | \* |
|===
| 总计 | 总计 | \* |

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

  var payload = "LuZgmmm74T8oIWoT:4d+bneZ0Uc0UFWWBeTVG6GSaQfNE9evTeUXVN+D+r+xFs79JDIadZQnq5tQM6CsMvNdyaP2ZbmytA7Ch8oAjewNVqZ7OWWukXQjNujf5zE400W+TfWmDWPpsQquPsxQ09e00rjTyJ5C7zqHJZQdc8uQdbUEYiokeKxC7DB5KuFHPjxx41x/TtUx5L39k4r+aQFSibpJSyqIv6fSERTBq28l5f50yPPpoBpuXnTEDmgE/JrmPChBpaD1JXF/uQXgzckkz//pPEkAq5Bhi40v8kSqpScvAJQhIcOBzQmLQMMEPZw0ugksDbJ6gqEOHU94Q3unpDQMd05v8rrlTsm7EjoDDM+5T/yrTdpCkhCDxYpw=";
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
      var cost = JSON.parse(buf2str(encrypted));
      for (let i = 0; i < cost.length; i++) {
        document.querySelector('tbody tr:nth-child(' + (i + 1) + ') td:last-child').innerHTML = cost[i];
      }
      document.querySelector('tfoot tr:last-child td:last-child').innerHTML = cost.reduce((a, b) => a + b);
    });
  });
</script>
