import { sleep } from "../helpers/functions.js";
export async function cats() {
    let animation;
    const cat = document.querySelector('.cat');
    while (true) {
        await sleep(getRandomInt(3000));
        animation = 'cat' + getRandomInt(3);
        cat.classList.add(animation);
        await sleep(500);
        cat.classList.remove(animation);
        await sleep(100);
    }
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}
