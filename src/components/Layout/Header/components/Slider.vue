<template>
    <div class="slider">
        <Theme/>
        <LinkTab/>
        <div class="header_tabs_tool" @click="toggleHomeAside">
            <span class="tabs_tool_line"></span>
            <span class="tabs_tool_line"></span>
            <span class="tabs_tool_line"></span>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-property-decorator';
import LinkTab from '@/components/Layout/components/LinkTab.vue';
import Theme from './Theme.vue';

@Options({
    name: 'Slider',
    components: {
        LinkTab,
        Theme
    }
})
export default class Slider extends Vue {
    get activeRoute() {
        return this.$route.name;
    }

    headerTool: boolean = false;
}
</script>

<style scoped lang="scss">
.slider {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.header_tabs_tool {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 25px;
    height: 25px;
    cursor: pointer;

    .tabs_tool_line {
        display: inline-block;
        width: 25px;
        height: 3px;
        transition: .3s;
        // TODO
        //@include background_color('background-color9');
    }
}

.home-slide-on .header_tabs_tool {
    .tabs_tool_line:nth-child(1) {
        transform: translate(0px, 8px) rotateZ(-45deg);
    }

    .tabs_tool_line:nth-child(2) {
        opacity: 0;
    }

    .tabs_tool_line:nth-child(3) {
        transform: translate(0px, -9px) rotateZ(45deg);
    }
}

@media screen and (max-width: 720px) {
    .slider {
        .header_tabs_tool {
            display: flex;
            margin-left: 15px;
        }
    }
}
</style>
