import { sleep } from "./functions.js";
export async function switchTo(category) {
    const categories = Array.from(document.querySelector('main').children);
    const body = document.querySelector('body');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    if (body && categories) {
        body.classList.remove('fadeIn');
        body.classList.add('fadeOut');
        await sleep(250);
        if (category == 'mainInfo') {
            header.style.display = 'none';
            footer.style.display = 'none';
        }
        else {
            header.style.display = 'flex';
            footer.style.display = 'flex';
        }
        for (let i = 0; i < categories.length; i++) {
            if (category != categories[i].id) {
                categories[i].style.display = 'none';
            }
            else {
                categories[i].style.display = 'block';
            }
        }
        body.classList.remove('fadeOut');
        body.classList.add('fadeIn');
    }
}
