import { switchTo } from "../helpers/switchTo.js";
import { sleep } from "../helpers/functions.js";
export function register() {
    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('registerForm');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                emailRegister: formData.get('emailRegister'),
                houseRegister: formData.get('house'),
                passwordRegister: formData.get('passwordRegister'),
                repeatPassword: formData.get('repeatPassword')
            };
            try {
                const response = await fetch('/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                const result = await response.json();
                if (response.ok) {
                    //*INFO
                    const display = document.querySelector('#info');
                    display.innerText = 'New user added';
                    switchTo('mainInfo');
                    await sleep(2000);
                    switchTo('mainLogin');
                }
                else {
                    alert(`Error: ${result.message}`);
                }
            }
            catch (error) {
                console.error('Error submitting form:', error);
                alert('An error occurred. Please try again later.');
            }
        });
    });
}
