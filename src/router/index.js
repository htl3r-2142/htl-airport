import { createRouter, createWebHashHistory } from 'vue-router'
import StartView from '@/views/StartView.vue'
import PassView from '@/views/PassView.vue'
import EmojiView from "@/views/EmojiView.vue"

const router = createRouter ({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', name: 'start', component: StartView},
        {path: '/pass', name: 'pass', component: PassView},
        {path: "/emoji", name: "emoji", component: EmojiView},

    ],
})

export default router