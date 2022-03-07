<template>
    <div class="app-main">
        <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </transition>
        </router-view>
        <el-backtop :bottom="70" :visibility-height="300">
            <div class="to_top">
                <svg-icon icon-class="rocket" />
            </div>
        </el-backtop>
    </div>
</template>

<script lang='ts'>
import { Vue, Options } from 'vue-property-decorator';

@Options({
    name: 'HomeMain'
})
export default class HomeMain extends Vue {}
</script>

<style scoped lang="scss">
.app-main {
    padding: 60px 0 0 0;
    min-height: calc(100vh - 120px);

    .el-backtop {
        box-shadow: none;
    }

    .to_top {
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 22px;
        line-height: 40px;
        border-radius: 5px;
        // TODO
        //@include background_color('background-color1');
        //@include font_color('text-color2');
        //@include box_shadow('box-shadow2');
    }
}

@media screen and (max-width: 720px) {
    .el-backtop {
        right: 20px !important;
    }
}
</style>
