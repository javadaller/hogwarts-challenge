import { sleep } from "../helpers/functions.js";

export async function cats(): Promise<void> {
    let animation: string;
    const cat: HTMLImageElement = document.querySelector('.cat')!

    while(true) {
        await sleep(getRandomInt(3000))

        animation = 'cat'+getRandomInt(3)

        cat.classList.add(animation)
        await sleep(500)
        cat.classList.remove(animation)

        await sleep(100)
    }
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max)+1;
}