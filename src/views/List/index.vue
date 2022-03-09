<template>
    <div class="list-page">
        <div class="article-module">
            <ArticleList :query-obj='queryObj' />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, mixins } from 'vue-property-decorator';
import GMixins from '@/global/mixins';
import ArticleList from '@/components/ArticleList/index.vue';

@Options({
    name: 'List',
    components: {
        ArticleList
    }
})
export default class List extends mixins(GMixins) {
    get queryObj() {
        const type = this.$route.query.type;
        const query: any = {};
        if (type === 'class') {
            query.classType = this.$route.query.id;
        } else if (type === 'tag') {
            query.tagType = this.$route.query.id;
        }
        return query;
    }
}
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
