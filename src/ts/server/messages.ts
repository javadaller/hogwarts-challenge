import { escapeHTML, createDiv, sleep } from "../helpers/functions.js"

export async function postMessage(): Promise<void> {
    const sendButton: HTMLInputElement | null = document.querySelector('#chatSubmit')
    const textArea: HTMLInputElement | null = document.querySelector('#chatInputId')
    const roomImg: HTMLImageElement | null = document.querySelector('#selectedHouse')

    if (sendButton && textArea && roomImg) {

        //*Get messages
        roomImg.addEventListener('click', async (event) => {
            event.preventDefault()
            const userJSON = JSON.parse(localStorage.getItem('hogwarts')!)
            const room: HTMLElement = document.querySelector('#chatRoom')!
            await sleep(100)
            const roomHouse = room.getAttribute('houseName')

            if (userJSON && room && roomHouse) {

                if(roomHouse == userJSON.house) {

                    try {
                        const reloadResponse = await fetch(`/api/messages/getMessages?house=${encodeURIComponent(userJSON.house)}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })

                        const reloadResult = await reloadResponse.json()
                        if (reloadResponse.ok) {
                            chatDisplay(reloadResult.data)
                        } else {
                            alert(`Error: ${reloadResult.message}`)
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert('An error occurred. Please try again later.')
                    }
                }
            }
        })

        //*Post message and get messages
        sendButton.addEventListener('click', async (event) => {
            event.preventDefault()

            const userJSON = localStorage.getItem('hogwarts')

            if (userJSON) {
                const user = JSON.parse(userJSON)
                const message: string = escapeHTML(textArea.value)

                const data: Record<string, any> = {
                    name: user.name,
                    date: new Date(),
                    content: message,
                    house: user.house
                }

                try {
                    const response = await fetch('/api/messages/postMessage', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    })

                    const result = await response.json()
                    if (response.ok) {
                        console.log('Message sent successfully')
                    } else {
                        alert(`Error: ${result.message}`)
                    }
                    
                    const reloadResponse = await fetch(`/api/messages/getMessages?house=${encodeURIComponent(user.house)}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })

                    const reloadResult = await reloadResponse.json()
                    if (reloadResponse.ok) {
                        //!ici
                        chatDisplay(reloadResult.data)
                    } else {
                        alert(`Error: ${reloadResult.message}`)
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again later.')
                }
            } else {
                alert('Please login.')
            }
        })
    }
}

function chatDisplay(data: any[]): void {
    const display: HTMLElement = document.querySelector('#chatDisplay')!
    display.innerHTML = ''

    for(let i=0; i<data.length; i++) {
        const message = createDiv('div',display,'chatParent')

        const name = createDiv('div',message,'chatName')
        name.innerText = data[i].name

        const content = createDiv('div',message,'chatMessage')
        content.innerText = data[i].content

        const date = createDiv('div',message,'chatDate')
        const dateContent = formatDateAndTime(data[i].date)
        date.innerText = dateContent[0]+' '+dateContent[1]
    }
}

function formatDateAndTime(dateTimeString: string): Array<string> {
    const dateObj = new Date(dateTimeString)

    const day = dateObj.getDate()
    const month = dateObj.getMonth() + 1
    const year = dateObj.getFullYear()

    const formattedDate = `${day}/${month}/${year.toString().slice(-2)}`

    const hours = dateObj.getHours()
    const minutes = dateObj.getMinutes()

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

    return [formattedDate,formattedTime]
        
}
