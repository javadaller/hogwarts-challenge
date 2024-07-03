import { switchTo } from "../helpers/switchTo.js";
export function nav() {
    //*HEADER
    const title = document.querySelector('h1');
    if (title) {
        title.addEventListener('click', () => {
            switchTo('mainRooms');
        });
    }
    const signup = document.querySelector('#navSignUp');
    if (signup) {
        signup.addEventListener('click', () => {
            switchTo('mainRegister');
        });
    }
    const signin = document.querySelector('#navSignIn');
    if (signin) {
        signin.addEventListener('click', () => {
            switchTo('mainLogin');
        });
    }
    //*HOUSES
    const houses = ['gryffindor.jpg', 'hufflepuff.jpg', 'ravenclaw.jpg', 'slytherin.jpg'];
    let houseIndex = 0;
    const houseImg = document.querySelector('#selectedHouse');
    if (houseImg) {
        const left = document.querySelector('#roomLeft');
        if (left) {
            left.addEventListener('click', () => {
                houseIndex = houseIndex == 0 ? houseIndex = 3 : houseIndex -= 1;
                houseImg.src = 'assets/images/' + houses[houseIndex];
            });
        }
        const right = document.querySelector('#roomRight');
        if (right) {
            right.addEventListener('click', () => {
                houseIndex = houseIndex == 3 ? houseIndex = 0 : houseIndex += 1;
                houseImg.src = 'assets/images/' + houses[houseIndex];
            });
        }
    }
    //*FOOTER
    const linkedin = document.querySelector('#linkedin');
    if (linkedin) {
        linkedin.addEventListener('click', () => {
            open('https://www.linkedin.com/in/arnaud-van-acker/', '_blank');
        });
    }
    const github = document.querySelector('#github');
    if (github) {
        github.addEventListener('click', () => {
            open('https://github.com/javadaller', '_blank');
        });
    }
    const arnaudweb = document.querySelector('#arnaudweb');
    if (arnaudweb) {
        arnaudweb.addEventListener('click', () => {
            open('https://arnaudweb.be/', '_blank');
        });
    }
}
