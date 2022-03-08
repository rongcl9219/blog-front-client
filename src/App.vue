<template>
    <el-scrollbar>
        <el-config-provider :locale="zhCn">
            <template v-if="$route.meta.home">
                <HomeLayout />
            </template>
            <template v-else>
                <router-view :key="$route.path" />
            </template>
        </el-config-provider>
    </el-scrollbar>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-property-decorator';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import HomeLayout from '@/components/Layout/index.vue';

@Options({
    name: 'App',
    components: {
        HomeLayout
    }
})
export default class App extends Vue {
    get zhCn() {
        return zhCn;
    }
}
</script>

<style>
#app {
    height: 100vh;
}
</style>
