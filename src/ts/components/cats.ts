import { sleep, randomInt } from "../helpers/functions.js";

export async function cats(): Promise<void> {
    let animation: string;
    const cat: HTMLImageElement = document.querySelector('.cat')!

    while(true) {
        await sleep(randomInt(1,3000))

        animation = 'cat'+randomInt(0,3)

        cat.classList.add(animation)
        await sleep(500)
        cat.classList.remove(animation)

        await sleep(100)
    }
}
