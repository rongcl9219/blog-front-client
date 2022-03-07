<template>
    <MarkdownEditor :model-value="content" :previewOnly="true" />
</template>

<script lang="ts">
import { Vue, Options, Prop } from 'vue-property-decorator';
import MarkdownEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import Viewer from '@/utils/viewer';

@Options({
    name: 'MdEditor',
    components: {
        MarkdownEditor
    }
})
export default class MdEditor extends Vue {
    @Prop({ type: String, default: '' }) content!: string;

    mounted() {
        this.$nextTick(() => {
            Viewer(document.querySelector('#md-preview') as HTMLElement);
        });
    }
}
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
