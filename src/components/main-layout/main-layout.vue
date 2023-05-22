<template>
    <div id="app">
        <el-container>
            <el-header><page-header/></el-header>
            <el-container id="content">
                <el-aside><side-bar/></el-aside>
                <el-main>
                    <slot>default slot</slot>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script setup lang="ts">
import PageHeader from "@/components/page-header/page-header.vue";
import SideBar from "@/components/side-bar/side-bar.vue";
</script>
<style scoped>
#content{
    margin-top: 60px;
    width: 100vw;
    height: 95vh;
}
.el-header{
    height: 60px;
    width: 100vw;
    background: #3182ff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
}
.el-aside{
    width: 300px;
    height: 100%;
    background: rgb(229, 231, 235);
}
.el-main{
    width: 100%;
    height: 100%;
    background: whitesmoke;
}
</style>