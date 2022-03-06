<template>
    <MarkdownEditor
        :model-value="content"
        :previewOnly="true"
    />
</template>

<script lang="ts">
export default {
    name: 'MdEditor'
};
</script>
<script lang="ts" setup>
import { toRefs, onMounted, nextTick } from 'vue';
import MarkdownEditor from 'md-editor-v3';
import Viewer from '@/utils/viewer';
import 'md-editor-v3/lib/style.css';

interface IProps {
    content: string;
}

const props = withDefaults(defineProps<IProps>(), {
    content: ''
});

const { content } = toRefs(props);

onMounted(() => {
    nextTick(() => {
        Viewer(document.querySelector('#md-preview') as HTMLElement);
    });
});
</script>

<style lang="scss">
.md-preview-wrapper {
    img {
        cursor: zoom-in;
    }

    figure {
        display: block;
    }
}
</style>
