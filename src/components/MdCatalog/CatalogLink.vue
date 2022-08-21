<template>
    <div class="catalog-wrapper">
        <div class="catalog-link" :class="{'catalog-link-active': isActive}" @click="onHandleClick"><span :title="catalogItem.text">{{catalogItem.text}}</span></div>
        <CatalogLink v-for="(catalog, index) in catalogList" :catalog-item="catalog" :key="index" />
    </div>
</template>

<script lang="ts" setup>
import { PropType, toRefs, computed } from 'vue';
import CatalogLink from '@/components/MdCatalog/CatalogLink.vue';
import { useCommonStore } from '@/store/common';
import { TocItem } from './types';

const commonStore = useCommonStore();

const props = defineProps({
    catalogItem: {
        type: Object as PropType<TocItem>,
        required: true
    }
});

const { catalogItem } = toRefs(props);

const catalogList = computed(() => {
    if (catalogItem.value.children) {
        return catalogItem.value.children;
    }
    return [];
});

const eleId = computed(() => {
    const { text, index } = catalogItem.value;
    return `${text}-${index + 1}`;
});

const isActive = computed(() => {
    return commonStore.getActiveCatalog === eleId.value;
});

const onHandleClick = () => {
    const hashEle = document.getElementById(eleId.value);
    if (hashEle) {
        commonStore.setActiveCatalog(eleId.value);
        const scrollEle = document.getElementsByClassName('scroll-wrapper')[0];
        const scrollTop = scrollEle.scrollTop;
        const hashTop = hashEle.getClientRects()[0].top;

        scrollEle.scrollTo({
            top: scrollTop + hashTop - 70,
            behavior: 'smooth'
        });
    }
};
</script>

<style scoped lang="scss">
.catalog-wrapper {
    padding-left: 1em;
}
.catalog-link {
    padding: 5px 0 5px;
    line-height: 1.2;
    transition: 0.3s;
    cursor: pointer;
    overflow: hidden;
    word-break: break-all;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:hover {
        color: var(--el-color-primary);
    }

    &:first-of-type {
        padding-top: 10px;
    }
}
.catalog-link-active {
    color: var(--el-color-primary);
}
</style>
