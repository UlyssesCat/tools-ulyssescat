<template>
    <main-layout @keyup.enter.native="doMD5Convert">
        <el-row :gutter="20">
            <el-col :span="18"><el-input v-model="md5Input" placeholder="输入要转换的字符串"></el-input></el-col>
            <el-col :span="6"><el-button @click="doMD5Convert">转换md5</el-button></el-col>
        </el-row>
        <el-divider border-style="hidden" />
        <el-input v-model="md5Output" placeholder="生成结果"></el-input>
    </main-layout>
</template>


<script setup lang="ts">
import MainLayout from "@/components/main-layout/main-layout.vue";
import { ref } from 'vue'
import { MD5 } from 'crypto-js';

const md5Input = ref('')
const md5Output = ref('')
const doMD5Convert = () => {
    md5Output.value = MD5(md5Input.value).toString();
}
</script>
<style scoped>

</style>