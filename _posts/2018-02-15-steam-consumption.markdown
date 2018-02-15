---
layout: post
title:  "Sbeam理财记录"
date:   2018-02-15 23:15:27
categories: [other]
---
G胖还我血汗钱！

|---
| 理财产品 | 投资 |
|:-|-:|
| FaceRig<br>FaceRig Live2D Module | \* |
| Deponia: The Complete Journey | \* |
| TIS-100 | \* |
| Hacknet | \* |
| Screeps | \* |
| Uplink<br>Hand Of Fate<br>Hand of Fate - First Expansion | \* |
| NEKOPARA Vol. 0<br>NEKOPARA Vol. 1<br>NEKOPARA Vol. 2 | \* |
| Shadowverse CCG | \* |
| AKIBA'S TRIP: Undead & Undressed | \* |
| Atelier Sophie: The Alchemist of the Mysterious Book | \* |
| DoDonPachi Resurrection (Post-Launch - No OST) | \* |
| NEKOPARA Vol. 3 | \* |
| Material Girl | \* |
| Transistor<br>Portal<br>Portal 2 | \* |
| PLAYERUNKNOWN'S BATTLEGROUNDS | \* |
| The Legend of Heroes: Trails of Cold Steel | \* |
| Dark Elf | \* |
| Tricolour Lovestory<br>Tricolour Lovestory : Chapter Zero | \* |
| King Exit | \* |
| Taima Miko Yuugi | \* |
| theHunter™: Call of the Wild<br>theHunter™: Call of the Wild - ATV SABER 4X4 | \* |
| 東方天空璋 ～ Hidden Star in Four Seasons. | \* |
| Rabi-Ribi | \* |
| fault - milestone one<br>fault - milestone two side:above | \* |
| Tokyo Xanadu eX+ | \* |
| Succubus Rem | \* |
| To The Moon | \* |
| Atelier Firis: The Alchemist and the Mysterious Journey | \* |
| TH15.5 東方憑依華　～ Antinomy of Common Flowers. | \* |
| The Disappearing of Gensokyo: Sakuya, Koishi, Suika Character Pack | \* |
| Mirror | \* |
| The Legend of Heroes: Trails of Cold Steel II | \* |
|===
| 总计 | \* |

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

  var payload = "opxOvH67hTaH3Xju:Wbw2DVG8Snmm79POu+KZvQd7IYkGnFlMQ7/SBA2GibhIhY9Z7k2BtZdTFt7G7aL3nh0xwRkefFxlcRSkrc8pg76pl+HHQRWhETOolOpsvgAWYF/Zd9ShkWYGDHXDglxmMIdZfol4rq5bE8ws/hdmTOwvUmZkhNcDfUNiC64OTZeKBZhRH12UKaqaOQ8D9OlpcKq59ULMiwzutZ1E2Y6AORh4o6o9rSuM9ST2JyCzv+8DWKkWuNZ/CdrEOIVt3lAKv3MW+LAu1UuL/8sAGFG1nBtFxSGr0jBp";
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
