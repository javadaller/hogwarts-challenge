import { connectToDB } from "./db/connect.js";
import { escapeHTML } from "../helpers/functions.js";
import User from "./models/User.js"

export async function register(): Promise<void> {
    try {
        connectToDB()

        const nameInput: HTMLInputElement = document.querySelector('#nameID')!
        const emailInput: HTMLInputElement = document.querySelector('#emailRegisterID')!
        const houseInput: HTMLInputElement = document.querySelector('#houseID')!
        const passwordInput: HTMLInputElement = document.querySelector('#passwordRegisterID')!
        const passwordCheckInput: HTMLInputElement = document.querySelector('#repeatPasswordID')!

        const name: string = escapeHTML(nameInput.value)
        const email: string = escapeHTML(emailInput.value)
        const house: string = escapeHTML(houseInput.value)
        const password: string = escapeHTML(passwordInput.value)
        const passwordCheck: string = escapeHTML(passwordCheckInput.value)

        //check password
        if(password != passwordCheck) {
            passwordCheckInput.placeholder = "wrong password"
            return
        }

        const newUser = new User({
            name,
            email,
            house,
            password
        })

        const saveUser = await newUser.save()
        console.log(saveUser,'ok')

        

    } catch(error) {
        console.error('error registering user: ',error)
    }
}
