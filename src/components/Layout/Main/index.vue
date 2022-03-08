<template>
    <div class="app-main">
        <router-view v-slot="{ Component }">
            <transition mode="out-in" name="fade-transform">
                <component :is="Component" />
            </transition>
        </router-view>
        <el-backtop :bottom="70" :visibility-height="300">
            <div class="to-top">
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

    .to-top {
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 22px;
        line-height: 40px;
        border-radius: 5px;
        background-color: #fff;
        color: #222;
        box-shadow: 0 2px 16px 0 rgba(#000, .2);
    }
}

@media screen and (max-width: 720px) {
    .el-backtop {
        right: 20px !important;
    }
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all 0.5s;
}

.fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
}

.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
