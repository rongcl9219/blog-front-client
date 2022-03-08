<template>
    <div class="search-page">
        <div class="search-module">
            <el-input
                placeholder="请输入搜索内容"
                @keyup.enter="pathTo('/search', { query })"
                v-model="query"
                clearable
                autofocus
            >
                <template #append>
                    <el-button @click="pathTo('/search', { query })"
                        ><svg-icon icon-class="search"
                    /></el-button>
                </template>
            </el-input>
        </div>
        <div class="article-module">
            <ArticleList :query-obj="queryObj" />
        </div>
    </div>
</template>

<script lang="ts">
import { Options, mixins } from 'vue-property-decorator';
import GMixins from '@/global/mixins';
import ArticleList from '@/components/ArticleList/index.vue';

@Options({
    name: 'Search',
    components: {
        ArticleList
    }
})
export default class Search extends mixins(GMixins) {
    query: string = '';

    get queryObj() {
        return {
            query: this.$route.query.query || ''
        };
    }

    mounted() {
        this.query = (this.$route.query.query || '') as string;
    }
}
</script>

<style scoped lang="scss">
.search-page {
    min-width: 320px;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px 10px;

    .search-module {
        width: 75%;
        margin: 10px auto;

        .search-total {
            margin-top: 10px;
            font-size: 14px;
            font-weight: 600;
            color: #61666d;

            span {
                margin: 0 5px;
            }
        }
    }

    .article-module {
        width: 75%;
        margin: 0 auto;
        padding: 10px;
        box-sizing: border-box;
    }
}

@media screen and (max-width: 1100px) {
    .search-page {
        .search-module {
            width: 95%;
        }

        .article-module {
            width: 100%;
        }
    }
}
</style>
