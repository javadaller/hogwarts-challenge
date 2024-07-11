import { nav } from "./components/nav.js"
import { magicWand } from "./components/magicWand.js"
import { cats } from "./components/cats.js"
import { register } from "./server/register.js"
import { login } from "./server/login.js"
import { postMessage } from "./server/messages.js"

localStorage.removeItem('hogwarts')

nav()
magicWand()
cats()

register()
login()

postMessage()