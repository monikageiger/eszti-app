import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft, faSun, faMoon, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import './styles/main.scss'
import App from './App.vue'
import router from './router'

library.add(faChevronLeft, faSun, faMoon, faCircleCheck)

createApp(App)
  .component('FaIcon', FontAwesomeIcon)
  .use(router)
  .mount('#app')
