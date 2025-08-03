<template>
    <MdPreview :model-value="content" @onGetCatalog="onGetCatalog" noImgZoomIn :autoFoldThreshold="10000" />
</template>

<script lang="ts" setup>
import { toRefs, onMounted } from 'vue';
import { HeadList, MdPreview } from 'md-editor-v3';
import useViewer from '@/composables/viewer';
import 'md-editor-v3/lib/preview.css';
import { useCommonStore } from '@/store/common';

const commonStore = useCommonStore();

const { updateViewer } = useViewer();

const props = defineProps({
    content: {
        type: String,
        required: true
    }
});

const { content } = toRefs(props);

const onGetCatalog = (list: Array<HeadList>) => {
    commonStore.setCatalogList(list);
};

onMounted(() => {
    setTimeout(() => {
        updateViewer('.md-editor-preview-wrapper');
    }, 1000);
});
</script>

<style lang="scss">
.md-editor-preview-wrapper {
    .md-zoom, img {
        cursor: zoom-in;
    }

    figure {
        display: block !important;
    }

    .title-level-1 {
        font-size: 36px;
    }
    .title-level-2 {
        font-size: 30px;
    }
    .title-level-3 {
        font-size: 24px;
    }
    .title-level-4 {
        font-size: 20px;
    }
    .title-level-5 {
        font-size: 18px;
    }
    .title-level-6 {
        font-size: 16px;
    }
}
</style>
