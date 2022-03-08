<template>
    <div class="wrapper" :class="{'home-slide-on': homeAside}">
        <HomeHeader/>
        <HomeMain/>
        <HomeFooter/>
        <HomeAside/>
        <div class="aside-mask" @click="toggleHomeAside"></div>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import HomeHeader from './Header/index.vue';
import HomeMain from './Main/index.vue';
import HomeFooter from './Footer/index.vue';
import HomeAside from './Aside/index.vue';

@Options({
    name: 'HomeLayout',
    components: {
        HomeHeader,
        HomeMain,
        HomeFooter,
        HomeAside
    }
})
export default class HomeLayout extends Vue {
    @Getter('common/getHomeAside') homeAside!: () => boolean;
}
</script>

<style scoped lang="scss">
.wrapper {
    background-color: #fff;
}
.aside-mask {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 10;
    background-color: rgba(#000, .35);
}

@media screen and (max-width: 720px) {
    .home-slide-on .aside-mask {
        display: block;
    }
}
</style>
