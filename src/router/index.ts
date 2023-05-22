// createWebHashHistory 是hash模式就是访问链接带有#
// createWebHistory  是history模式
import { createRouter, createWebHashHistory } from 'vue-router'

// 引入文件，动态路由
const Default = () => import("@/views/Home.vue");
const MD5 = () => import("@/views/md5.vue");


const routes = [
    {
        path: "/",
        name: "Default",
        component: Default,
    },
    {
        path: "/MD5",
        name: "MD5",
        component: MD5,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router