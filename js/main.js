function getRandomCJKChar(len) {
    let str = [];
    len = len || 1;
    for (let i = 0; i < len; i++) {
        str.push(String.fromCharCode(13312 + Math.floor(Math.random()*6581)));
    }
    return str.join('');
}
let originTitle = '';
let titleTimerId = null;
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState == 'hidden') {
        originTitle = document.title;
        let newTitle = `👾${getRandomCJKChar(20)}`;
        document.title = newTitle;

        titleTimerId = setInterval(() => {
            newTitle = `👾${newTitle.substring(3)}${getRandomCJKChar()}`;
            document.title = newTitle;
        }, 1500);
    } else {
        clearInterval(titleTimerId);
        document.title = originTitle;
    }
});

let aaDom = document.querySelector('.aa-main');
let aaNueText = aaDom.innerHTML;
function onAAMouseEnter() {
    aaDom.removeEventListener('mouseenter', onAAMouseEnter);
    aaDom.addEventListener('mouseleave', onAAMouseLeave);
    aaDom.innerHTML = [
        '　',
        '　',
        '　',
        '　',
        '　',
        '　',
        '　　 　 　 　ﾄ ､.　 /|',
        '　 　 　 　 　＼＼|::|/|,. -‐‐- ､.,_',
        '　　　　　　　　,＞\'\'"´:::::::::::::::::::::::｀ヽ.',
        '　　　 　 　 ／:::/::::::::::/|::::::::::::::::::::::｀ヽ.',
        '￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣￣',
        '　',
    ].join("\n");
}
function onAAMouseLeave() {
    aaDom.removeEventListener('mouseleave', onAAMouseLeave);
    aaDom.addEventListener('mouseenter', onAAMouseEnter);
    aaDom.innerHTML = aaNueText;
}
aaDom.addEventListener('mouseenter', onAAMouseEnter);
