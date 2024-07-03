import { switchTo } from "../helpers/switchTo.js"

export function nav(): void {

    //*HEADER
    const title = document.querySelector<HTMLElement>('h1');
    if (title) {
        title.addEventListener('click', () => {
            switchTo('mainRooms')
        });
    }

    const signup = document.querySelector<HTMLDivElement>('#navSignUp');
    if (signup) {
        signup.addEventListener('click', () => {
            switchTo('mainRegister')
        });
    }

    const signin = document.querySelector<HTMLDivElement>('#navSignIn');
    if (signin) {
        signin.addEventListener('click', () => {
            switchTo('mainLogin')
        });
    }

    //*HOUSES
    const houses: Array<string> = ['gryffindor.jpg','hufflepuff.jpg','ravenclaw.jpg','slytherin.jpg']
    let houseIndex: number = 0
    const houseImg = document.querySelector<HTMLImageElement>('#selectedHouse')

    if(houseImg) {
        const left = document.querySelector<HTMLDivElement>('#roomLeft')
        if (left) {
            left.addEventListener('click', () => {
                houseIndex = houseIndex == 0? houseIndex = 3 : houseIndex -= 1
                houseImg.src = 'assets/images/'+houses[houseIndex]
            });
        }

        const right = document.querySelector<HTMLDivElement>('#roomRight')
        if (right) {
            right.addEventListener('click', () => {
                houseIndex = houseIndex == 3? houseIndex = 0 : houseIndex += 1
                houseImg.src = 'assets/images/'+houses[houseIndex]
            });
        }
    }
    

    //*FOOTER
    const linkedin = document.querySelector<HTMLDivElement>('#linkedin');
    if (linkedin) {
        linkedin.addEventListener('click', () => {
            open('https://www.linkedin.com/in/arnaud-van-acker/','_blank')
        });
    }

    const github = document.querySelector<HTMLDivElement>('#github');
    if (github) {
        github.addEventListener('click', () => {
            open('https://github.com/javadaller','_blank')
        });
    }

    const arnaudweb = document.querySelector<HTMLDivElement>('#arnaudweb');
    if (arnaudweb) {
        arnaudweb.addEventListener('click', () => {
            open('https://arnaudweb.be/','_blank')
        });
    }
}