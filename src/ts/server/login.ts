import { switchTo } from "../helpers/switchTo.js"
import { sleep } from "../helpers/functions.js"

export function login(): void {
    const loginButton = document.getElementById('loginButton');
    if (!loginButton) {
      console.error('Login button not found');
      return;
    }
  
    loginButton.addEventListener('click', async () => {
      const emailInput = document.getElementById('emailID') as HTMLInputElement;
      const passwordInput = document.getElementById('passwordID') as HTMLInputElement;
  
      if (!emailInput || !passwordInput) {
        alert('Please fill in both email and password fields.');
        return;
      }
  
      const email = emailInput.value;
      const password = passwordInput.value;
  
      if (!email || !password) {
        alert('Please enter both email and password.');
        return;
      }
  
      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
        if (response.ok) {
          //! login réussi
            const signin: HTMLElement = document.querySelector('#navSignIn')!
            signin.style.display = 'none'

            const signup: HTMLElement = document.querySelector('#navSignUp')!
            signup.style.display = 'none'

            const logout: HTMLElement = document.querySelector('#logout')!
            logout.style.display = 'block'



          const display: HTMLElement = document.querySelector('#info')!
          display.innerText = 'Successfully logged in'
          switchTo('mainInfo')
          await sleep(2000)
          switchTo('mainRooms')
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred while trying to log in. Please try again.');
      }
    });
}
  