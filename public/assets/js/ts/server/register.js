var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { connectToDB } from "./db/connect.js";
import { escapeHTML, sleep } from "../helpers/functions.js";
import { switchTo } from "../helpers/switchTo.js";
import User from "./models/User.js";
export function register() {
    return __awaiter(this, void 0, void 0, function* () {
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
            const saveUser = yield newUser.save();
            console.log(saveUser, 'ok');
            //*INFO
            const display = document.querySelector('#info');
            display.innerText = 'New user added';
            switchTo('mainInfo');
            yield sleep(2000);
            switchTo('mainLogin');
        }
        catch (error) {
            console.error('error registering user: ', error);
        }
    });
}
