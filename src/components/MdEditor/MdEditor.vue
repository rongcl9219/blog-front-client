<template>
    <MdPreview :model-value="content" @onGetCatalog="onGetCatalog" :previewOnly="true" />
</template>

<script lang="ts" setup>
import { toRefs, onMounted } from 'vue';
import { HeadList, MdPreview } from 'md-editor-v3';
import useViewer from '@/composables/viewer';
import 'md-editor-v3/lib/preview.css';
import { useCommonStore } from '@/store/common';
//
// const getId = (_text: string, index: number) => {
//     return `${_text}-${index + 1}`;
// };

// config({
//     markdownItPlugins(plugins) {
//         return plugins.map((p) => {
//             console.log(p.type, p);
//             if (p.type === 'image') {
//                 return {
//                     ...p,
//                     options: {
//                         ...p.options,
//                         classes: 'md-img'
//                     }
//                 };
//             }
//
//             return p;
//         });
//     }
// markdownItConfig(mdit) {
//     console.log(mdit);
//     // mdit.configure({
//     //
//     // });
//     mdit.renderer.render(tokens, options, env){
//
//     };
// }
// markedRenderer(renderer) {
//     renderer.heading = (text, level, raw, _s, index) => {
//         const id = getId(text, index);
//         return `<h${level} class="md-title title-level-${level}" id="${id}">${text}</h${level}>`;
//     };
//
//     renderer.image = (href, title, text) => {
//         return `<img class="md-img" src="${href}" alt="${text}" />`;
//     };
//
//     return renderer;
// }
// });

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
        updateViewer('#md-editor-v3');
    }, 1000);
});
</script>

<style lang="scss">
.md-preview-wrapper {
    .md-img {
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
