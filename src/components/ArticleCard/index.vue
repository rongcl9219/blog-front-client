<template>
    <div class="article-card">
        <div class="article-head" @click="pathTo('/article', { articleId: articleInfo.articleId })">
            <div class="article-cover" :style="coverStyle"></div>
            <h3 class="article-title">
                <span>{{ articleInfo.articleTitle }}</span>
            </h3>
        </div>
        <div class="article-more">
            <el-icon><Calendar /></el-icon>
            <span class="push-date">发表于{{ articleInfo.createDate }}</span>
            <svg-icon icon-class="circle" class='icon-circle' />
            <el-icon><FolderOpened /></el-icon>
            <div>
                <span
                    class="underline"
                    v-for="item in articleInfo.classTypeList"
                    :key="item.classId"
                    @click="pathTo('/list', { type: 'class', id: item.classId })"
                >
                    {{ item.className }}
                </span>
            </div>
        </div>
        <p class="article-info">{{ articleInfo.articleInfo }}</p>
        <div class="tag-group">
            <el-tag
                v-for="item in articleInfo.tagTypeList"
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
        </div>
        <el-divider class="article-divider"></el-divider>
    </div>
</template>

<script lang="ts">
import { Options, Prop, mixins } from 'vue-property-decorator';
import { FolderOpened, Calendar } from '@element-plus/icons-vue';
import GMixins from '@/global/mixins';

@Options({
    name: 'ArticleCard',
    components: {
        FolderOpened,
        Calendar
    }
})
export default class ArticleCard extends mixins(GMixins) {
    @Prop({ type: Object, default: {} }) articleInfo!: any;

    get coverStyle() {
        return {
            backgroundImage: `url(${this.articleInfo.articleCover})`
        };
    }
}
</script>

<style scoped lang="scss">
.article-card {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 6px;
    transition: .3s;
    box-shadow: 0 1px 8px 0 rgba(#000, .1);

    &:hover {
        box-shadow: 0 2px 16px 0 rgba(#000, .2);
    }

    .article-head {
        position: relative;
        cursor: pointer;

        .article-cover {
            width: 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            transition: .3s;

            &:after {
                display: block;
                content: '';
                padding-top: 50%;
                background-color: rgba(#000, .3);
            }
        }

        &:hover {
            .article-cover {
                background-size: 105% 105%;
            }

            .article-title {
                color: #fff;
                transform: translate(-50%, -50%) scale(1.15);
            }
        }

        .article-title {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #E3E5E7;
            font-size: 30px;
            font-weight: 400;
            font-family: zcool-kuaile, serif;
            text-align: center;
            transition: .3s;
        }
    }

    .article-more {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        margin: 10px;
        color: #9499A0;

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
            border-bottom: 1px solid;
            cursor: pointer;
            border-color: #2F3238;
        }
    }

    .article-info {
        line-height: 20px;
        max-height: 60px;
        margin: 10px 0 15px;
        padding-left: 5px;
        border-left: 2px solid;
        border-radius: 0;
        font-size: 15px;
        font-weight: 500;
        font-family: '宋体', serif;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        border-color: #18191C;
        color: #222;
    }

    .tag-item {
        margin-left: 10px;
        cursor: pointer;
        border: none;
        line-height: 2;
        box-shadow: 0 2px 10px 1px rgba(#000, .1);;
    }
}

@media screen and (max-width: 720px) {
    .article-card {
        padding: 10px;

        .article-title {
            font-size: 20px !important;
        }

        .article-info {
            margin: 10px 0;
        }

        .article-divider {
            margin: 10px 0;
        }
    }
}
</style>
