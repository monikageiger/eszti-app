import { createRouter, createWebHistory } from 'vue-router'
import GalleryPage from './components/GalleryPage.vue'
import PhotoPage from './components/PhotoPage.vue'
import ContactPage from './components/ContactPage.vue'

export default createRouter({
  history: createWebHistory('/'),
  routes: [
    { path: '/', component: GalleryPage },
    { path: '/image/:id', component: PhotoPage },
    { path: '/contact', component: ContactPage },
  ],
})
