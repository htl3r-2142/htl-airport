import { createRouter, createWebHashHistory } from 'vue-router'
import StartView from '@/views/StartView.vue'
import PassView from '@/views/PassView.vue'
import EmojiView from "@/views/EmojiView.vue"
import CheckinView from "@/views/CheckinView.vue";
import UnterkategorieView from "@/views/UnterkategorieView.vue";
import BordkarteView from "@/views/BordkarteView.vue";

const router = createRouter ({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', name: 'start', component: StartView},
        {path: '/pass', name: 'pass', component: PassView},
        {path: "/emoji", name: "emoji", component: EmojiView},
        {path: "/checkin", name: "checkin", component: CheckinView},
        {path: "/unterkategorie", name: "unterkategorie", component: UnterkategorieView},
        {path: "/bordkarte", name: "bordkarte", component: BordkarteView},
    ],
})

export default router