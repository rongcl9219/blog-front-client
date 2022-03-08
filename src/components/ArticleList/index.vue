<template>
    <div class="article-wrap">
        <div class="article-list" v-show="articleList.length > 0">
            <ArticleCard
                v-for="article in articleList"
                :key="article.articleId"
                :article-info='article'
            />
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="currentChange"
                :page-size="pagination.pageSize"
                v-model:current-page="pagination.page"
                :total="pagination.total"
            >
            </el-pagination>
        </div>
        <div v-show="articleList.length === 0">
            <NoData />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Options, Prop } from 'vue-property-decorator';
import ArticleCard from '@/components/ArticleCard/index.vue';
import { ArticleApi } from '@/api';

@Options({
    name: 'ArticleList',
    components: {
        ArticleCard
    }
})
export default class ArticleList extends Vue {
    @Prop({ type: Object, default: {} }) queryObj?: any;

    pagination: GIPagination = {
        page: 1,
        pageSize: 5,
        total: 0
    };

    articleList: Array<any> = [];

    getArticles(page: number) {
        const query = Object.assign(
            {},
            {
                page: page,
                pageSize: this.pagination.pageSize,
                articleStatus: 1
            },
            this.queryObj
        );
        ArticleApi.getArticleList(query).then((res) => {
            const data = res.data;
            this.pagination.page = data.pagination.page;
            this.pagination.total = data.pagination.total;
            this.articleList = data.articleList;
        });
    }

    currentChange(page: number) {
        this.getArticles(page);
    }

    mounted() {
        this.getArticles(1);
    }
}
</script>

<style lang="scss" scoped>
.article-wrap {
    flex: 1;
}
</style>
