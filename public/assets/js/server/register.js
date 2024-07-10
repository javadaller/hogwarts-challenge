import { connectToDB } from "./db/connect.js";
import { escapeHTML, sleep } from "../helpers/functions.js";
import { switchTo } from "../helpers/switchTo.js";
import User from "./models/User.js";
export async function register() {
    try {
        connectToDB();
        const nameInput = document.querySelector('#nameID');
        const emailInput = document.querySelector('#emailRegisterID');
        const houseInput = document.querySelector('#houseID');
        const passwordInput = document.querySelector('#passwordRegisterID');
        const passwordCheckInput = document.querySelector('#repeatPasswordID');
        const name = escapeHTML(nameInput.value);
        const email = escapeHTML(emailInput.value);
        const house = escapeHTML(houseInput.value);
        const password = escapeHTML(passwordInput.value);
        const passwordCheck = escapeHTML(passwordCheckInput.value);
        //check password
        if (password != passwordCheck) {
            passwordCheckInput.placeholder = "wrong password";
            return;
        }
        const newUser = new User({
            name,
            email,
            house,
            password
        });
        const saveUser = await newUser.save();
        console.log(saveUser, 'ok');
        //*INFO
        const display = document.querySelector('#info');
        display.innerText = 'New user added';
        switchTo('mainInfo');
        await sleep(2000);
        switchTo('mainLogin');
    }
    catch (error) {
        console.error('error registering user: ', error);
    }
}
