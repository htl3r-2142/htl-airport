import { createRouter, createWebHashHistory } from 'vue-router'
import StartView from '@/views/StartView.vue'
import PassView from '@/views/PassView.vue'

const router = createRouter ({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', name: 'start', component: StartView},
        {path: '/pass', name: 'pass', component: PassView},
    ],
})

export default router