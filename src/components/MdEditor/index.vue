<template>
    <MarkdownEditor :model-value="content" :previewOnly="true" />
</template>

<script lang="ts">
import { Vue, Options, Prop, Watch } from 'vue-property-decorator';
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

    @Watch('content')
    onContentChange() {
        this.$nextTick(() => {
            Viewer(document.getElementById('md-preview') as HTMLElement);
        });
    }

    mounted() {
        this.$nextTick(() => {
            Viewer(document.getElementById('md-preview') as HTMLElement);
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
