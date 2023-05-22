// createWebHashHistory 是hash模式就是访问链接带有#
// createWebHistory  是history模式
import { createRouter, createWebHashHistory } from 'vue-router'

// 引入文件，动态路由
const Home = () => import("@/views/Home.vue");
const About = () => import("@/views/About.vue");
const NotFound = () => import("@/views/NotFound.vue");

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/About",
        name: "About",
        component: About,
    },
    {
        path: "/:pathMatch(.*)*", // 代替vue2的通配符path: "*",
        name: "NotFound",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router