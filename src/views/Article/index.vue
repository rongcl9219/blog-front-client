<template>
    <div class="container article-page">
        <PageLoading v-if="pageLoad" />
        <NoData v-else-if="loadFail"/>
        <div class="article-wrapper" v-else>
            <div class="article-content">
                <section class="article-message">
                    <h3 class="article-title" v-text="articleData.articleTitle"></h3>
                    <h4 class="article-subtitle" v-text="articleData.articleSubtitle"></h4>
                    <p class="article-info" v-text="articleData.articleInfo"></p>
                    <div class="article-more">
                        <el-icon><Calendar /></el-icon>
                        <span class="push-date">发表于{{ articleData.createDate }}</span>
                        <svg-icon icon-class="circle" class="icon-circle" />
                        <el-icon><FolderOpened /></el-icon>
                        <div>
                                    <span
                                        v-for="item in articleData.classTypeList"
                                        class="underline"
                                        :key="item.classId"
                                        @click="
                                            pathTo('/list', { type: 'class', id: item.classId })
                                        "
                                    >{{ item.className }}</span
                                    >
                        </div>
                    </div>
                </section>
                <section class="article-body">
                    <MdEditor :content="articleData.articleContent" :previewOnly="true" />
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
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Prop, mixins } from 'vue-property-decorator';
import GMixins from '@/global/mixins';
import Comment from '@/components/Comment/index.vue';
import { ArticleApi } from '@/api';
import MdEditor from '@/components/MdEditor/index.vue';
import PageLoading from '@/components/PageLoading/index.vue';
import { Calendar, FolderOpened } from '@element-plus/icons-vue';

@Options({
    name: 'Article',
    components: {
        Comment,
        MdEditor,
        PageLoading,
        Calendar,
        FolderOpened
    }
})
export default class Article extends mixins(GMixins) {
    @Prop({ type: String, default: '', required: true }) articleId!: string;

    articleData: any = {};

    pageLoad: boolean = false;

    loadFail: boolean = true;

    mounted() {
        this.pageLoad = true;
        ArticleApi.getArticleInfo(this.articleId)
            .then((res) => {
                this.loadFail = false;
                this.articleData = res.data;
            })
            .catch(() => {
                this.loadFail = true;
                this.$msg({
                    type: 'error',
                    message: '获取失败'
                });
            })
            .finally(() => {
                setTimeout(() => {
                    this.pageLoad = false;
                }, 1000);
            });
    }
}
</script>

<style scoped lang="scss">
.article-page {
    .article-wrapper {
        width: 100%;
        padding: 40px 30px;
        transition: 0.3s;

        .article-content {
            position: relative;
            margin: 40px 0;
            padding: 40px 30px 40px 40px;
            border-radius: 5px;
            box-shadow: 0 0 5px -1px rgba(0, 0, 0, 0.15);
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

    .article-body {
        * {
            color: #222;
        }
    }

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
