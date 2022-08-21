<template>
    <div class="slider">
        <LinkTab/>
        <div class="header-tabs-tool" @click="commonStore.toggleHomeAside">
            <span class="tabs-tool-line"></span>
            <span class="tabs-tool-line"></span>
            <span class="tabs-tool-line"></span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useCommonStore } from '@/store/common';
import LinkTab from '@/components/Layout/components/LinkTab.vue';

const commonStore = useCommonStore();
</script>

<style scoped lang="scss">
.slider {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.header-tabs-tool {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 25px;
    height: 25px;
    cursor: pointer;

    .tabs-tool-line {
        display: inline-block;
        width: 25px;
        height: 3px;
        transition: .3s;
        background-color: #222;
    }
}

.home-slide-on .header-tabs-tool {
    .tabs-tool-line:nth-child(1) {
        transform: translate(0px, 8px) rotateZ(-45deg);
    }

    .tabs-tool-line:nth-child(2) {
        opacity: 0;
    }

    .tabs-tool-line:nth-child(3) {
        transform: translate(0px, -9px) rotateZ(45deg);
    }
}

@media screen and (max-width: 720px) {
    .slider {
        .header-tabs-tool {
            display: flex;
            margin-left: 15px;
        }
    }
}
</style>
