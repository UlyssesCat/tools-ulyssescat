<template>
        <el-menu :default-openeds="['1']" class="el-menu-vertical-demo">
        <el-sub-menu index="1">
            <template #title>
                <el-icon><switch-filled /></el-icon>
                <span>测试分类</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="1-1" @click="()=>{router.push('/md5')}">
                    <template #title><el-icon><folder /></el-icon>md5加密</template>
                </el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
    </el-menu>
</template>

<script lang="ts" setup>
import {SwitchFilled,Folder} from '@element-plus/icons-vue'
import router from "@/router";

</script>

<style>

</style>
