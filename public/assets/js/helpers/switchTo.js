import { sleep } from "./functions.js";
export async function switchTo(category) {
    const categories = Array.from(document.querySelector('main').children);
    const main = document.querySelector('main');
    if (main && categories) {
        main.classList.remove('fadeIn');
        main.classList.add('fadeOut');
        await sleep(300);
        for (let i = 0; i < categories.length; i++) {
            if (category != categories[i].id) {
                categories[i].style.display = 'none';
            }
            else {
                categories[i].style.display = 'block';
            }
        }
        main.classList.remove('fadeOut');
        main.classList.add('fadeIn');
    }
}
