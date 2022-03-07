<template>
    <el-scrollbar>
        <el-config-provider :locale="zhCn">
            <HomeLayout/>
        </el-config-provider>
    </el-scrollbar>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { initTheme } from '@/utils/theme';
import HomeLayout from '@/components/Layout/index.vue';

@Options({
    name: 'App',
    components: {
        HomeLayout
    }
})
export default class App extends Vue {
    @Getter('common/getTheme') getTheme!: () => string;
    get zhCn() {
        return zhCn;
    }
    get themeClass() {
        return `theme-${this.getTheme}`;
    }
    mounted() {
        initTheme();
    }
}
</script>
