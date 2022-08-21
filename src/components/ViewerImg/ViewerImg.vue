<template>
    <div class="view-image" ref="viewerRef">
        <slot :images="images" :options="options"></slot>
    </div>
</template>

<script lang="ts" setup>
import { toRefs, watch, computed, ref, onMounted, onUnmounted, nextTick } from 'vue';
import { viewerDefaultOptions } from './config';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

interface IProps {
    images?: any;
    rebuild?: boolean;
    options?: any;
}

const props = withDefaults(defineProps<IProps>(), {
    images: null,
    rebuild: false,
    options: {}
});

const { images, rebuild, options } = toRefs(props);

const viewerRef = ref<HTMLElement>();

let viewerObj = ref<any>();

const viewerOptions = computed(() => {
    return Object.assign({}, viewerDefaultOptions, options.value);
});

const createViewer = () => {
    const ele = viewerRef.value as HTMLElement;
    viewerObj.value = new Viewer(ele, viewerOptions.value);
};

const destroyViewer = () => {
    if (viewerObj.value) {
        viewerObj.value.destroy();
    }
};

const rebuildViewer = () => {
    destroyViewer();
    createViewer();
};

const updateViewer = () => {
    if (viewerObj.value) {
        viewerObj.value.update();
    } else {
        createViewer();
    }
};

const onChange = () => {
    if (rebuild) {
        rebuildViewer();
    } else {
        updateViewer();
    }
};

// eslint-disable-next-line no-unused-vars
const show = (index: number) => {
    if (viewerObj.value) {
        viewerObj.value.view(index || 0);
    }
};

watch(
    images,
    () => {
        nextTick(() => {
            onChange();
        });
    },
    { deep: true }
);

watch(
    options,
    () => {
        nextTick(() => {
            onChange();
        });
    },
    { deep: true }
);

onMounted(() => {
    createViewer();
});

onUnmounted(() => {
    destroyViewer();
});
</script>

<style scoped>
.view-image {
    display: inline;
    vertical-align: top;
}
</style>
