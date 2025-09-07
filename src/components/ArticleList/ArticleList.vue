<template>
  <div class="article-wrap">
    <div
      v-show="articleList.length > 0"
      class="article-list"
    >
      <ArticleCard
        v-for="article in articleList"
        :key="article.articleId"
        :article-info="article"
      />
      <el-pagination
        v-model:current-page="pagination.page"
        background
        layout="prev, pager, next"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @current-change="currentChange"
      />
    </div>
    <div v-show="articleList.length === 0">
      <NoData />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, watch, reactive, onMounted } from 'vue'
import ArticleCard from '@/components/ArticleCard/ArticleCard.vue'
import { ArticleApi } from '@/api'
import type { ArticleInfo } from '@/api/article/types'

const props = defineProps({
  queryObj: {
    type: Object,
    default() {
      return {}
    }
  }
})

const { queryObj } = toRefs(props)

const pagination = reactive<GIPagination>({
  page: 1,
  pageSize: 5,
  total: 0
})

let articleList = reactive<Array<ArticleInfo>>([])

const getArticles = (page: number) => {
  const query = Object.assign(
    {},
    {
      page: page,
      pageSize: pagination.pageSize,
      articleStatus: 1
    },
    queryObj?.value
  )
  ArticleApi.getArticleList(query).then((res) => {
    articleList.length = 0
    const data = res.data
    pagination.page = data.pagination.page
    pagination.total = data.pagination.total
    articleList.push(...data.articleList)
  })
}

const currentChange = (page: number) => {
  getArticles(page)
}

watch(queryObj, () => {
  getArticles(1)
}, { deep: true })

onMounted(() => {
  getArticles(1)
})
</script>

<style lang="scss" scoped>
.article-wrap {
  flex: 1;
}
</style>
