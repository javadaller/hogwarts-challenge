import { switchTo } from "../helpers/switchTo.js";
import { sleep } from "../helpers/functions.js";
export async function nav() {
    switchTo('mainRooms');
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
    const logout = document.querySelector('#logout');
    logout.style.display = 'none';
    logout.addEventListener('click', () => {
        loggedOut();
    });
    //*HOUSES
    const houses = ['gryffindor.jpg', 'hufflepuff.jpg', 'ravenclaw.jpg', 'slytherin.jpg'];
    let houseIndex = 0;
    const houseImg = document.querySelector('#selectedHouse');
    if (houseImg) {
        //LEFT RIGHT
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
        //ENTER ROOM
        const enter = document.querySelector('#mainNavEnter');
        houseImg.addEventListener('mouseover', () => {
            enter.style.display = 'block';
        });
        houseImg.addEventListener('mouseleave', () => {
            enter.style.display = 'none';
        });
        houseImg.addEventListener('click', async () => {
            const storage = JSON.parse(localStorage.getItem('hogwarts'));
            if (storage) {
                const chatRoom = document.querySelector('#chatRoom');
                const house = houses[houseIndex].replace(/\.jpg$/i, '');
                const houseId = house.charAt(0).toUpperCase() + house.slice(1).toLowerCase();
                if (storage.house == houseId) {
                    const logo = document.querySelector('#chatLogo');
                    logo.src = houseImg.src;
                    chatRoom.setAttribute('houseName', houseId);
                    switchTo('chatRoom');
                }
                else {
                    const logo = document.querySelector('#chatLogo');
                    logo.classList.add('shake');
                    await sleep(300);
                    logo.classList.remove('shake');
                }
            }
            else {
                switchTo('mainLogin');
            }
        });
    }
    //*CHAT
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
//*LOGOUT
export async function loggedOut() {
    localStorage.removeItem('hogwards');
    const signin = document.querySelector('#navSignIn');
    signin.style.display = 'block';
    const signup = document.querySelector('#navSignUp');
    signup.style.display = 'block';
    const logout = document.querySelector('#logout');
    logout.style.display = 'none';
    const display = document.querySelector('#info');
    display.innerText = 'Logged out';
    switchTo('mainInfo');
    await sleep(1500);
    switchTo('mainLogin');
}
