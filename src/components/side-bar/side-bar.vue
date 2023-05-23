<template>
        <el-menu :default-openeds="['1']" class="el-menu-vertical-demo">
        <el-sub-menu index="1">
            <template #title>
                <el-icon><switch-filled /></el-icon>
                <span>测试分类</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="1-1" @click="()=>{router.push('/MD5')}">
                    <template #title><el-icon><folder /></el-icon>md5加密</template>
                </el-menu-item>
                <el-menu-item index="1-2" @click="()=>{router.push('/Stock')}">
                    <template #title><el-icon><coin /></el-icon>股票</template>
                </el-menu-item>
                <el-menu-item index="1-3" @click="()=>{router.push('/ScreenShare')}">
                    <template #title><el-icon><coin /></el-icon>屏幕共享</template>
                </el-menu-item>
                <el-menu-item index="1-4" @click="()=>{router.push('/ScreenWatch')}">
                    <template #title><el-icon><coin /></el-icon>屏幕观看</template>
                </el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
    </el-menu>
</template>

<script lang="ts" setup>
import {SwitchFilled,Folder,Coin} from '@element-plus/icons-vue'
import router from "@/router";

</script>

<style>

</style>
