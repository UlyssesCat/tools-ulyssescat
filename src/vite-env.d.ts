/// <reference types="vite/client" />
// 注入.vue文件类型
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}