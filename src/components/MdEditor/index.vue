<template>
    <MarkdownEditor :model-value="content" :previewOnly="true" />
</template>

<script lang="ts">
import { Options, Prop, Watch, mixins } from 'vue-property-decorator';
import MarkdownEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import Viewer from '@/utils/viewer';

@Options({
    name: 'MdEditor',
    components: {
        MarkdownEditor
    }
})
export default class MdEditor extends mixins(Viewer) {
    @Prop({ type: String, default: '' }) content!: string;

    @Watch('content')
    onContentChange() {
        this.$nextTick(() => {
            this.updateViewer('#md-editor-v3');
        });
    }

    mounted() {
        this.$nextTick(() => {
            this.updateViewer('#md-editor-v3');
        });
    }
}
</script>

<style lang="scss">
.md-preview-wrapper {
    img {
        cursor: zoom-in !important;
    }

    figure {
        display: block !important;
    }
}
</style>
