<template>
    <el-scrollbar wrap-class="scroll-wrapper" view-class="scroll-view">
        <el-config-provider :locale="zhCn">
            <template v-if="route.meta.home">
                <HomeLayout/>
            </template>
            <template v-else>
                <router-view :key="route.path"/>
            </template>
        </el-config-provider>
    </el-scrollbar>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { useRoute } from 'vue-router';
import HomeLayout from '@/components/Layout/HomeLayout.vue';

const route = useRoute();
</script>

<style>
#app {
    height: 100vh;
}
</style>
