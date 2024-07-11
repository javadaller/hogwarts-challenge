import { switchTo } from "../helpers/switchTo.js"
import { sleep } from "../helpers/functions.js"

export async function nav(): Promise<void> {

    switchTo('mainRooms')

    //*HEADER
    const title = document.querySelector<HTMLElement>('h1')
    if (title) {
        title.addEventListener('click', () => {
            switchTo('mainRooms')
        });
    }

    const signup = document.querySelector<HTMLDivElement>('#navSignUp')
    if (signup) {
        signup.addEventListener('click', () => {
            switchTo('mainRegister')
        });
    }

    const signin = document.querySelector<HTMLDivElement>('#navSignIn')
    if (signin) {
        signin.addEventListener('click', () => {
            switchTo('mainLogin')
        });
    }

    const logout: HTMLElement = document.querySelector('#logout')!
    logout.style.display = 'none'

    logout.addEventListener('click', () => {
        loggedOut()
    })

    //*HOUSES
    const houses: Array<string> = ['gryffindor.jpg','hufflepuff.jpg','ravenclaw.jpg','slytherin.jpg']
    let houseIndex: number = 0
    const houseImg = document.querySelector<HTMLImageElement>('#selectedHouse')

    if(houseImg) {
        //LEFT RIGHT
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

        //ENTER ROOM
        const enter: HTMLElement = document.querySelector('#mainNavEnter')!

        houseImg.addEventListener('mouseover', () => {
            enter.style.display = 'block'
        })

        houseImg.addEventListener('mouseleave', () => {
            enter.style.display = 'none'
        })

        houseImg.addEventListener('click', async () => {
            const storage = JSON.parse(localStorage.getItem('hogwards')!)
            console.log(storage)

            if(storage) {
                const chatRoom: HTMLElement = document.querySelector('#chatRoom')!
                const house: string = houses[houseIndex].replace(/\.jpg$/i, '')
                const houseId: string = house.charAt(0).toUpperCase() + house.slice(1).toLowerCase()

                console.log(houseId)

                if(storage.house == houseId) {
                    const logo: HTMLImageElement = document.querySelector('#chatLogo')!
                    logo.src = houseImg.src
                
                    chatRoom.setAttribute('houseName', houseId)
                    switchTo('chatRoom')


                } else {
                    const logo: HTMLImageElement = document.querySelector('#chatLogo')!
                    logo.classList.add('shake')
                    await sleep(300)
                    logo.classList.remove('shake')
                }
                
            } else {
                switchTo('mainLogin')
            }
        })
    }

    //*CHAT
    

    //*FOOTER
    const linkedin = document.querySelector<HTMLDivElement>('#linkedin')
    if (linkedin) {
        linkedin.addEventListener('click', () => {
            open('https://www.linkedin.com/in/arnaud-van-acker/','_blank')
        });
    }

    const github = document.querySelector<HTMLDivElement>('#github')
    if (github) {
        github.addEventListener('click', () => {
            open('https://github.com/javadaller','_blank')
        });
    }

    const arnaudweb = document.querySelector<HTMLDivElement>('#arnaudweb')
    if (arnaudweb) {
        arnaudweb.addEventListener('click', () => {
            open('https://arnaudweb.be/','_blank')
        });
    }
}

//*LOGOUT
export async function loggedOut(): Promise<void> {
    localStorage.removeItem('hogwards')
    const signin: HTMLElement = document.querySelector('#navSignIn')!
    signin.style.display = 'block'

    const signup: HTMLElement = document.querySelector('#navSignUp')!
    signup.style.display = 'block'

    const logout: HTMLElement = document.querySelector('#logout')!
    logout.style.display = 'none'

    const display: HTMLElement = document.querySelector('#info')!
    display.innerText = 'Logged out'
    switchTo('mainInfo')
    await sleep(1500)
    switchTo('mainLogin')
}