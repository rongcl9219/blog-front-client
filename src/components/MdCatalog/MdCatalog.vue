<template>
    <div class="md-catalog">
        <div class="md-catalog-wrapper">
            <CatalogLink v-for="(catalog, index) in catalogList" :key="index" :catalog-item="catalog" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onBeforeUnmount } from 'vue';
import CatalogLink from '@/components/MdCatalog/CatalogLink.vue';
import { useCommonStore } from '@/store/common';
import { debounce } from 'lodash';
import { TocItem } from './types';

const commonStore = useCommonStore();

const catalogList = computed(() => {
    const tocItems: TocItem[] = [];

    commonStore.getCatalogList.forEach(({ text, level }, index) => {
        const item = { level, text, index: index + 1 };

        if (tocItems.length === 0) {
            // 第一个 item 直接 push
            tocItems.push(item);
        } else {
            let lastItem = tocItems[tocItems.length - 1]; // 最后一个 item

            if (item.level > lastItem.level) {
                // item 是 lastItem 的 children
                for (let i = lastItem.level + 1; i <= 6; i++) {
                    const { children } = lastItem;
                    if (!children) {
                        // 如果 children 不存在
                        lastItem.children = [item];
                        break;
                    }

                    lastItem = children[children.length - 1]; // 重置 lastItem 为 children 的最后一个 item

                    if (item.level <= lastItem.level) {
                        // item level 小于或等于 lastItem level 都视为与 children 同级
                        children.push(item);
                        break;
                    }
                }
            } else {
                // 置于最顶级
                tocItems.push(item);
            }
        }
    });

    return tocItems;
});

const loadScroll = debounce(() => {
    const headEleArr = document.getElementsByClassName('md-title');
    if (headEleArr.length > 0) {
        for (let i = 0; i < headEleArr.length; i++) {
            const headEle = headEleArr[i];
            const headTop = headEle.getClientRects()[0].top;

            if (i === 0 && headTop > 150) {
                commonStore.setActiveCatalog('');
                break;
            } else if (i === headEleArr.length - 1) {
                if (headTop <= 150) {
                    commonStore.setActiveCatalog(headEle.id);
                }
                break;
            } else {
                const nextEle = headEleArr[i + 1];
                const nextTop = nextEle.getClientRects()[0].top;

                if (headTop <= 150 && nextTop > 150) {
                    commonStore.setActiveCatalog(headEle.id);
                    break;
                }
            }
        }
    }
}, 100);

onMounted(() => {
    const ele = document.getElementsByClassName('el-scrollbar__wrap')[0];
    ele.addEventListener('scroll', loadScroll);
});

onBeforeUnmount(() => {
    commonStore.setActiveCatalog('');
    const ele = document.getElementsByClassName('el-scrollbar__wrap')[0];
    ele.removeEventListener('scroll', loadScroll);
});
</script>

<style scoped lang="scss">
.md-catalog {
    position: relative;
    width: 200px;
    min-width: 200px;
    max-width: 250px;
    padding-left: 50px;

    .md-catalog-wrapper {
        position: sticky;
        top: 200px;
    }
}

@media screen and (max-width: 1300px) {
    .md-catalog {
        display: none;
    }
}
</style>
