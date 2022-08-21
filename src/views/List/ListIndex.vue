<template>
    <div class="list-page">
        <div class="article-module">
            <ArticleList :query-obj='queryObj'/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import ArticleList from '@/components/ArticleList/ArticleList.vue';

const route = useRoute();

const queryObj = computed(() => {
    const type = route.query.type;
    const query: any = {};
    if (type === 'class') {
        query.classType = route.query.id;
    } else if (type === 'tag') {
        query.tagType = route.query.id;
    }
    return query;
});
</script>

<style scoped lang="scss">
.list-page {
    overflow: hidden;

    .article-module {
        width: 75%;
        max-width: 800px;
        margin: 0 auto;
        padding: 40px 10px 20px;
        box-sizing: border-box;
    }

    @media screen and (max-width: 1100px) {
        .article-module {
            width: 100%;
        }
    }
}
</style>
