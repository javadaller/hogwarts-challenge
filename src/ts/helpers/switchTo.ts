import { sleep } from "./functions.js"

export async function switchTo(category: string): Promise<void> {
    const categories: Array<HTMLElement> = Array.from(document.querySelector('main')!.children) as HTMLElement[]

    const body: HTMLElement = document.querySelector('body')!
    const header: HTMLElement = document.querySelector('header')!
    const footer: HTMLElement = document.querySelector('footer')!

    if(body && categories) {
        body.classList.remove('fadeIn')
        body.classList.add('fadeOut')
    
        await sleep(250)

        if(category == 'mainInfo') {     
            header.style.display = 'none'
            footer.style.display = 'none'
        } else {
            header.style.display = 'flex'
            footer.style.display = 'flex'
        }

        for(let i = 0; i < categories.length; i++) {
            if(category != categories[i].id) {
                categories[i].style.display = 'none'
            } else {
                categories[i].style.display = 'block'
            }
        }

        body.classList.remove('fadeOut')
        body.classList.add('fadeIn')

    }
}