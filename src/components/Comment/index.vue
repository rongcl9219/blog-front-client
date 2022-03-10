<template>
    <div class="comment-module">
        <div class="comment-form">
            <el-input
                class="comment-username"
                v-model="commentUser"
                clearable
                placeholder="昵称（必填）"
                show-word-limit
                maxlength="10"
            />
            <div class="comment-content">
                <el-input
                    type="textarea"
                    :rows="3"
                    resize="none"
                    maxlength="150"
                    show-word-limit
                    placeholder="写下你的评论"
                    v-model="commentContent"
                />
                <Emoji @onEmojiClick="clickSvg" />
            </div>
            <el-row type="flex" justify="end">
                <el-button type="primary" @click="checkComment(1)">发送</el-button>
            </el-row>
        </div>
        <div class="comment-container">
            <ul class="comment-list">
                <li class="comment-list-item" v-for="item in commentList" :key="item.commentId">
                    <el-avatar shape="square" :src="defaultUser"></el-avatar>
                    <div class="reply-module">
                        <div class="reply-con">
                            <span class="user-t" v-text="item.userName"></span
                            ><span class="colon">：</span>
                            <CommentContent :html-str="item.content" />
                        </div>
                        <div class="comment-func">
                            <span
                                class="reply-time"
                                v-text="formatDate('', item.createDate, 2)"
                            ></span>
                            <a class="reply-btn" @click="reply(item, 1)"
                                ><el-icon><ChatDotSquare /></el-icon> 回复</a
                            >
                        </div>
                        <div class="reply-editor" :id="'p' + item.commentId">
                            <div v-if="currentReply === item.commentId">
                                <div class="comment-content">
                                    <el-input
                                        type="textarea"
                                        :rows="3"
                                        resize="none"
                                        maxlength="150"
                                        show-word-limit
                                        :placeholder="replyPlaceholder"
                                        v-model="replyContent"
                                    >
                                    </el-input>
                                    <Emoji @onEmojiClick="clickSvg" />
                                </div>
                                <el-row type="flex" justify="end">
                                    <el-button
                                        type="text"
                                        class="cancel-btn"
                                        @click="currentReply = ''"
                                        >取消
                                    </el-button>
                                    <el-button
                                        type="text"
                                        class="send-btn"
                                        @click="checkComment(2)"
                                    >
                                        发送
                                    </el-button>
                                </el-row>
                            </div>
                        </div>
                        <template v-if="item.children && item.children.length > 0">
                            <ul class="reply-list">
                                <li
                                    class="comment-list-item"
                                    v-for="child in item.children"
                                    :key="child.commentId"
                                >
                                    <el-avatar shape="square" :src="defaultUser"></el-avatar>
                                    <div class="reply-module">
                                        <div class="reply-con">
                                            <span class="user-t" v-text="child.userName"></span>
                                            <template v-if="child.replyCommentUserName">
                                                <span class="colon">：回复</span>
                                                <span class="user-t"
                                                    >@<span>{{
                                                        child.replyCommentUserName
                                                    }}</span></span
                                                >
                                                <span class="colon">：</span>
                                            </template>
                                            <template v-else>
                                                <span class="colon">：</span>
                                            </template>
                                            <CommentContent :html-str="child.content" />
                                        </div>
                                        <div class="comment-func">
                                            <span
                                                class="reply-time"
                                                v-text="formatDate('', child.createDate, 2)"
                                            ></span>
                                            <a class="reply-btn" @click="reply(child, 2)"
                                                ><el-icon><ChatDotSquare /></el-icon> 回复</a
                                            >
                                        </div>
                                        <div class="reply-editor" :id="'r' + child.commentId">
                                            <div v-if="currentReply === child.commentId">
                                                <div class="comment-content">
                                                    <el-input
                                                        type="textarea"
                                                        :rows="3"
                                                        resize="none"
                                                        maxlength="150"
                                                        show-word-limit
                                                        :placeholder="replyPlaceholder"
                                                        v-model="replyContent"
                                                    >
                                                    </el-input>
                                                    <Emoji @onEmojiClick="clickSvg" />
                                                </div>
                                                <el-row type="flex" justify="end">
                                                    <el-button
                                                        type="text"
                                                        class="cancel-btn"
                                                        @click="currentReply = ''"
                                                        >取消
                                                    </el-button>
                                                    <el-button
                                                        type="text"
                                                        class="send-btn"
                                                        @click="checkComment(2)"
                                                        >发送
                                                    </el-button>
                                                </el-row>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Options, Prop, Watch } from 'vue-property-decorator';
import defaultUser from '@/assets/images/default_img/comment_user.jpg';
import { Action, Getter } from 'vuex-class';
import { CommonApi } from '@/api';
import { formatDate } from '@/utils/tools';
import Emoji from '@/components/Emoji/index.vue';
import CommentContent from './components/CommentContent.vue';
import Mint from 'mint-filter';
import words from '@/utils/minGanCi';
import { ChatDotSquare } from '@element-plus/icons-vue';

interface FSetCommentUser {
    // eslint-disable-next-line no-unused-vars
    (commentUser: string): void;
}

const mint = new Mint(words);
@Options({
    name: 'Comment',
    components: {
        Emoji,
        CommentContent,
        ChatDotSquare
    }
})
export default class Comment extends Vue {
    @Prop({ type: String, default: '', required: true }) articleId!: string;
    @Getter('common/getCommentUser') getCommentUser!: string;
    @Action('common/setCommentUser') setCommentUser!: FSetCommentUser;

    @Watch('currentReply')
    onReplyChange() {
        this.replyContent = '';
    }

    @Watch('commentUser')
    onCommentUser(value: string) {
        this.setCommentUser(value);
    }

    commentUser: string = '';

    commentList: Array<any> = [];

    commentContent: string = '';
    currentReply: string = '';
    replyContent: string = '';
    replyPlaceholder: string = '';

    replyModule = {
        content: '',
        commentLevel: 1,
        parentCommentId: '',
        parentCommentUserName: '',
        replyCommentId: '',
        replyCommentUserName: ''
    };

    defaultUser = defaultUser;

    clickSvg(key: string) {
        if (this.currentReply) {
            this.replyContent += key;
        } else {
            this.commentContent += key;
        }
    }

    checkComment(type: number) {
        if (!this.commentUser) {
            this.$msg({
                type: 'warning',
                message: '请输入昵称'
            });
            return false;
        }

        this.replyModule.content = type === 1 ? this.commentContent : this.replyContent;

        if (!this.replyModule.content) {
            this.$msg({
                type: 'warning',
                message: '评论内容不能为空'
            });
            return false;
        }
        this.replyModule.commentLevel = type;

        mint.filter(this.replyModule.content, { replace: false }).then((data) => {
            if (!data.pass) {
                this.$notify({
                    title: '评论包含敏感词汇',
                    dangerouslyUseHTMLString: true,
                    message: `<strong style="color: red;">${data.words.join(',')}</strong>`,
                    type: 'warning',
                    position: 'top-left',
                    offset: 100,
                    duration: 3000
                });
            } else {
                this.sendComment();
            }
        });
    }

    getArticleComment() {
        CommonApi.getComment(this.articleId).then((res) => {
            this.commentList = res.data.commentList;
        });
    }

    sendComment() {
        let data = {
            userName: this.commentUser,
            articleId: this.articleId,
            ...this.replyModule
        };

        if (this.replyModule.commentLevel === 1) {
            data.replyCommentId = '';
            data.replyCommentUserName = '';
            data.parentCommentId = '';
            data.parentCommentUserName = '';
        }
        CommonApi.addComment(data)
            .then(() => {
                this.$msg({
                    type: 'success',
                    message: '评论成功'
                });
                this.replyModule.content = '';
                if (this.replyModule.commentLevel === 1) {
                    this.commentContent = '';
                } else {
                    this.currentReply = '';
                    this.replyPlaceholder = '';
                    this.replyContent = '';
                    this.replyModule.replyCommentId = '';
                    this.replyModule.replyCommentUserName = '';
                    this.replyModule.parentCommentId = '';
                    this.replyModule.parentCommentUserName = '';
                }
                this.getArticleComment();
            })
            .catch(() => {
                this.$msg({
                    type: 'error',
                    message: '评论失败'
                });
            });
    }

    reply(data: any, type: number) {
        if (type === 1) {
            this.replyModule.replyCommentId = '';
            this.replyModule.replyCommentUserName = '';
            this.replyModule.parentCommentId = data.commentId;
            this.replyModule.parentCommentUserName = data.userName;
        } else {
            this.replyModule.replyCommentId = data.commentId;
            this.replyModule.replyCommentUserName = data.userName;
            this.replyModule.parentCommentId = data.parentCommentId;
            this.replyModule.parentCommentUserName = data.parentCommentUserName;
        }

        this.replyPlaceholder = `@${data.userName}`;
        this.currentReply = data.commentId;
    }

    formatDate = formatDate;

    mounted() {
        this.commentUser = this.getCommentUser;
        this.getArticleComment();
    }
}
</script>

<style scoped lang="scss">
.comment-module {
    padding: 20px;
    border-radius: 4px;
    background-color: #f6f7f8;
}

.comment-form {
    padding: 5px;

    .comment-username,
    .comment-content {
        position: relative;
        margin-bottom: 10px;
    }
}

.comment-list-item {
    margin-bottom: 10px;
    padding: 5px 0;

    .el-avatar {
        float: left;
    }

    .reply-module {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 50px;
        line-height: 1.5;

        .reply-con {
            font-size: 0;

            .user-t {
                font-size: 12px;
                color: #00aeec;
            }

            .colon {
                margin-right: 5px;
                font-size: 12px;
                color: #797f87;
            }

            .comment-con {
                font-size: 12px;

                > .svg-icon {
                    font-size: 20px;
                }
            }
        }

        .comment-func {
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
            font-size: 12px;
            color: #9499a0;

            .reply-btn {
                display: flex;
                align-items: center;
                margin-right: 10px;
                cursor: pointer;

                &:hover {
                    color: #ff7f24;
                }

                .el-icon {
                    margin-right: 2px;
                    font-size: 14px;
                }
            }
        }

        .reply-list {
            margin: 10px 0;
            padding: 10px 0 10px 20px;
            border-radius: 4px;
            background-color: #e3e5e7;
        }
    }
}

.comment-list > .comment-list-item {
    border-bottom: 1px solid #e3e5e7;
}

.el-button--primary {
    border: none;
    background-color: #00aeec;
}

.reply-editor {
    position: relative;
    margin-top: 10px;

    .comment-content {
        position: relative;
    }

    .cancel-btn {
        color: #ffb027 !important;

        &:hover {
            color: #ffc65d !important;
        }
    }

    .send-btn {
        margin-right: 10px;
        color: #00aeec !important;
    }
}
</style>
