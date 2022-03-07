<template>
    <aside id="homeAside">
        <WebInfo/>
        <div @click="toggleHomeAside"><LinkTab/></div>
        <el-divider></el-divider>
    </aside>
</template>

<script lang='ts'>
import { Vue, Options } from 'vue-property-decorator';
import WebInfo from '@/components/WebInfo/index.vue';
import LinkTab from '@/components/Layout/components/LinkTab.vue';

@Options({
    name: 'HomeAside',
    components: {
        LinkTab,
        WebInfo
    }
})
export default class HomeAside extends Vue {}
</script>

<style scoped lang="scss">
// TODO
#homeAside {
    position: fixed;
    top: 0;
    left: 0;
    width: 230px;
    height: 100vh;
    padding-top: 60px;
    box-sizing: border-box;
    transform: translateX(-100%);
    transition: .3s;
    z-index: 15;
    //@include background_color('background-color1');
}

@media screen and (max-width: 720px) {
    .home-slide-on #homeAside {
        transform: translateX(0);
    }
}
</style>
