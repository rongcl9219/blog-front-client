<template>
    <header class="header">
        <div class="header-box">
            <router-link class="home-link" to="/"><h1>火星的青青草原</h1></router-link>
            <HeaderSlider />
        </div>
    </header>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-property-decorator';
import HeaderSlider from './components/Slider.vue';
import { Action } from 'vuex-class';

@Options({
    name: 'HomeHeader',
    components: {
        HeaderSlider
    }
})
export default class HomeHeader extends Vue {
    @Action('common/setWebInfo') setWebInfo!: () => void;

    created() {
        this.setWebInfo();
    }
}
</script>

<style scoped lang="scss">
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    padding: 15px 30px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 1px 8px 0 rgba(#000, 0.1);
    z-index: 1;

    .header-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        max-width: 1200px;
        margin: 0 auto;
    }

    .home-link {
        font-weight: 500;
        font-size: 22px;
        color: #222;

        h1 {
            font-weight: 400;
            color: #222;
            font-family: zcool-kuaile, serif;
        }
    }
}
</style>
