<template>
    <div id="page-header">
        <el-row>
            <el-col :span="6"><div class="grid-content ep-bg-purple" /><a id="system-name">UlyssesCat's tools</a></el-col>
        </el-row>

    </div>
</template>
<script lang="ts" setup>
import router from "@/router";

</script>
<style scoped>
#page-header{
    text-align: left;
    margin-top: 5px;
    font-size: 30px;
}
#system-name{
    color: black;
}
</style>