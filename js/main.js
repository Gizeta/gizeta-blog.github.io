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
