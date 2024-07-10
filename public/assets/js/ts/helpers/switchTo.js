var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { sleep } from "./functions.js";
export function switchTo(category) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = Array.from(document.querySelector('main').children);
        const body = document.querySelector('body');
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        if (body && categories) {
            body.classList.remove('fadeIn');
            body.classList.add('fadeOut');
            yield sleep(250);
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
    });
}
