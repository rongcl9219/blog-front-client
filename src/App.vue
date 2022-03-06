<template>
    <el-scrollbar>
        <el-config-provider :locale="zhCn">
            <router-view v-slot="{ Component }">
                <transition name="fade-transform" mode="out-in">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </transition>
            </router-view>
        </el-config-provider>
    </el-scrollbar>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { initTheme } from '@/utils/theme';
onMounted(() => {
    initTheme();
});
</script>

<style>
#app {
    height: 100vh;
}
</style>
