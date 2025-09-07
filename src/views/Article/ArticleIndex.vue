<template>
  <div class="container article-page">
    <PageLoading v-if="pageLoad" />
    <NoData v-else-if="loadFail" />
    <div
      v-else
      class="article-wrapper"
    >
      <div class="article-content">
        <section class="article-message">
          <h3
            class="article-title"
            v-text="articleData.articleTitle"
          />
          <h4
            class="article-subtitle"
            v-text="articleData.articleSubtitle"
          />
          <p
            class="article-info"
            v-text="articleData.articleInfo"
          />
          <div class="article-more">
            <el-icon>
              <Calendar />
            </el-icon>
            <span class="push-date">发表于{{ articleData.createDate }}</span>
            <svg-icon
              icon-class="circle"
              class="icon-circle"
            />
            <el-icon>
              <FolderOpened />
            </el-icon>
            <div>
              <span
                v-for="item in articleData.classTypeList"
                :key="item.classId"
                class="underline"
                @click="pathTo('/list', { type: 'class', id: item.classId })"
              >{{ item.className }}</span>
            </div>
          </div>
        </section>
        <section class="article-body">
          <MdEditor
            :content="articleData.articleContent"
            :preview-only="true"
          />
        </section>
        <section class="tag-group">
          <el-tag
            v-for="item in articleData.tagTypeList"
            :key="item.tagId"
            class="tag-item"
            :style="{ backgroundColor: getBgColor() }"
            type="info"
            size="small"
            effect="dark"
            @click="pathTo('/list', { type: 'tag', id: item.tagId })"
          >
            {{ item.tagName }}
          </el-tag>
        </section>
        <section class="comment">
          <Comment :article-id="articleId" />
        </section>
      </div>
      <MdCatalog />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, reactive, ref, onMounted } from 'vue'
import { ArticleApi } from '@/api'
import MdEditor from '@/components/MdEditor/MdEditor.vue'
import PageLoading from '@/components/PageLoading/PageLoading.vue'
import Comment from '@/components/Comment/CommentIndex.vue'
import { Calendar, FolderOpened } from '@element-plus/icons-vue'
import myMessage from '@/utils/myMessage'
import { getBgColor } from '@/utils/tools'
import usePathTo from '@/composables/pathTo'
import type { ArticleInfo } from '@/api/article/types'
import type { ClassInfo } from '@/api/class/types'
import type { TagInfo } from '@/api/tag/types'
import MdCatalog from '@/components/MdCatalog/MdCatalog.vue'

interface IArticleData extends ArticleInfo {
  articleContent: string;
  createDate: string;
  tagTypeList: Array<TagInfo>;
  classTypeList: Array<ClassInfo>;
}

const { pathTo } = usePathTo()

const props = defineProps({
  articleId: {
    type: String,
    required: true
  }
})

const { articleId } = toRefs(props)

let articleData = reactive<IArticleData>({
  articleId: '',
  articleCover: '',
  articleInfo: '',
  articleKeyword: '',
  articleSubtitle: '',
  articleTitle: '',
  classType: '',
  tagType: '',
  articleContent: '',
  createDate: '',
  classTypeList: [],
  tagTypeList: []
})

const pageLoad = ref<boolean>(false)

const loadFail = ref<boolean>(true)

onMounted(() => {
  pageLoad.value = true
  ArticleApi.getArticleInfo(articleId?.value)
    .then((res) => {
      loadFail.value = false
      Object.assign(articleData, res.data)
    })
    .catch(() => {
      loadFail.value = true
      myMessage({
        type: 'error',
        message: '获取失败'
      })
    })
    .finally(() => {
      setTimeout(() => {
        pageLoad.value = false
      }, 1000)
    })
})
</script>

<style scoped lang="scss">
.article-page {
  max-width: none;

  .article-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 40px 30px;
    transition: 0.3s;

    .article-content {
      position: relative;
      max-width: 1200px;
      min-width: 1000px;
      margin: 40px 0;
      padding: 40px 30px 40px 40px;
      border-radius: 5px;
      transition: 0.3s;

      .article-title {
        text-align: center;
        font-size: 30px;
        font-weight: 600;
      }

      .article-subtitle {
        margin: 10px 0;
        text-align: center;
        font-size: 22px;
        font-weight: 600;
        font-family: '楷体', serif;
        color: rgba(0, 0, 0, 0.65);
      }

      .article-info {
        text-indent: 2em;
        font-size: 16px;
        font-weight: 400;
        font-family: '新宋体', serif;
        line-height: 22px;
      }

      .article-more {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #666;
        margin: 10px;

        .el-icon {
          margin: 0 5px;
        }

        .icon-circle {
          font-size: 12px;
          transform: scale(0.5);
        }

        .underline {
          margin-right: 5px;
          position: relative;
          border-bottom: 1px solid #222;
          cursor: pointer;
        }
      }

      .article-body {
        margin: 30px 0;
      }
    }
  }

  .article-title,
  .article-info {
    color: #222;
  }

  .article-subtitle {
    color: #9499a0;
  }

  .article-more {
    color: #797f87;

    .underline {
      padding-bottom: 2px;
      border-bottom: 1px solid #18191c;
    }
  }

  //.article-body {
  //    * {
  //        color: #222;
  //    }
  //}

  .comment {
    margin: 20px 0;
  }

  .tag-item {
    margin-left: 10px;
    cursor: pointer;
    border: none;
    line-height: 2;
  }
}

@media screen and (max-width: 720px) {
  .container {
    padding: 0;

    .article-wrapper {
      padding: 0;

      .article-content {
        margin: 0;
        padding: 40px 20px;
        box-shadow: none;
      }
    }
  }
}
</style>
