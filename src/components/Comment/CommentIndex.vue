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
                <Emoji @onEmojiClick="clickSvg"/>
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
                            <CommentContent :html-str="item.content"/>
                        </div>
                        <div class="comment-func">
                            <span
                                class="reply-time"
                                v-text="formatDate('', item.createDate, 2)"
                            ></span>
                            <a class="reply-btn" @click="reply(item, 1)"
                            >
                                <el-icon>
                                    <ChatDotSquare/>
                                </el-icon>
                                回复</a
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
                                    <Emoji @onEmojiClick="clickSvg"/>
                                </div>
                                <el-row type="flex" justify="end">
                                    <el-button
                                        type="link"
                                        class="cancel-btn"
                                        @click="currentReply = ''"
                                    >取消
                                    </el-button>
                                    <el-button
                                        type="link"
                                        class="send-btn"
                                        @click="checkComment(2)"
                                    >
                                        发送
                                    </el-button>
                                </el-row>
                            </div>
                        </div>
                        <template v-if="item.children && item.children?.length > 0">
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
                                            <CommentContent :html-str="child.content"/>
                                        </div>
                                        <div class="comment-func">
                                            <span
                                                class="reply-time"
                                                v-text="formatDate('', child.createDate, 2)"
                                            ></span>
                                            <a class="reply-btn" @click="reply(child, 2)"
                                            >
                                                <el-icon>
                                                    <ChatDotSquare/>
                                                </el-icon>
                                                回复</a
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
                                                    <Emoji @onEmojiClick="clickSvg"/>
                                                </div>
                                                <el-row type="flex" justify="end">
                                                    <el-button
                                                        type="link"
                                                        class="cancel-btn"
                                                        @click="currentReply = ''"
                                                    >取消
                                                    </el-button>
                                                    <el-button
                                                        type="link"
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
        <Vcode :imgs="vCodeImgs" :canvas-width="300" :canvas-height="200" :show="isShow" @success="onVCodeSuccess" @close="onVCodeClose" />
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, watch, onBeforeMount } from 'vue';
import Mint from 'mint-filter';
import Vcode from 'vue3-puzzle-vcode';
import defaultUser from '@/assets/images/default_img/comment_user.jpg';
import Emoji from '@/components/Emoji/EmojiIndex.vue';
import CommentContent from './components/CommentContent.vue';
import { CommonApi } from '@/api';
import { formatDate } from '@/utils/tools';
import words from '@/utils/minGanCi';
import { ChatDotSquare } from '@element-plus/icons-vue';
import { useCommonStore } from '@/store/common';
import myMessage from '@/utils/myMessage';
import { ElNotification } from 'element-plus';
import vCodeImg1 from '@/assets/images/vCode/img_1.jpg';
import vCodeImg2 from '@/assets/images/vCode/img_2.jpg';

interface IComment {
    commentId: string;
    createDate: string;
    content: string;
    userName: string;
    replyCommentUserName: string;
    children?: Array<IComment>
}

const mint = new Mint(words);

const commonStore = useCommonStore();

const props = defineProps({
    articleId: {
        type: String,
        default: '',
        required: true
    }
});

const { articleId } = toRefs(props);

const commentUser = ref<string>('');
let commentList = reactive<Array<IComment>>([]);
const commentContent = ref<string>('');
const currentReply = ref<string>('');
const replyContent = ref<string>('');
const replyPlaceholder = ref<string>('');
const replyModule = reactive({
    content: '',
    commentLevel: 1,
    parentCommentId: '',
    parentCommentUserName: '',
    replyCommentId: '',
    replyCommentUserName: ''
});
const vCodeImgs = [vCodeImg1, vCodeImg2];
const isShow = ref(false);

const getArticleComment = () => {
    CommonApi.getComment(articleId?.value).then((res) => {
        commentList.length = 0;
        commentList.push(...res.data.commentList);
    });
};

const clickSvg = (key: string) => {
    if (currentReply.value) {
        replyContent.value += key;
    } else {
        commentContent.value += key;
    }
};

const sendComment = () => {
    let data = {
        userName: commentUser.value,
        articleId: articleId.value,
        ...replyModule
    };

    if (replyModule.commentLevel === 1) {
        data.replyCommentId = '';
        data.replyCommentUserName = '';
        data.parentCommentId = '';
        data.parentCommentUserName = '';
    }
    CommonApi.addComment(data)
        .then(() => {
            myMessage({
                type: 'success',
                message: '评论成功'
            });
            replyModule.content = '';
            if (replyModule.commentLevel === 1) {
                commentContent.value = '';
            } else {
                currentReply.value = '';
                replyPlaceholder.value = '';
                replyContent.value = '';
                replyModule.replyCommentId = '';
                replyModule.replyCommentUserName = '';
                replyModule.parentCommentId = '';
                replyModule.parentCommentUserName = '';
            }
            getArticleComment();
        })
        .catch(() => {
            myMessage({
                type: 'error',
                message: '评论失败'
            });
        });
};

const onVCodeShow = () => {
    isShow.value = true;
};

const onVCodeClose = () => {
    isShow.value = false;
};

const onVCodeSuccess = () => {
    sendComment();
    onVCodeClose(); // 验证成功，需要手动关闭模态框
};

const checkComment = (type: number) => {
    if (!commentUser.value) {
        myMessage({
            type: 'warning',
            message: '请输入昵称'
        });
        return false;
    }

    replyModule.content = type === 1 ? commentContent.value : replyContent.value;

    if (!replyModule.content) {
        myMessage({
            type: 'warning',
            message: '评论内容不能为空'
        });
        return false;
    }
    replyModule.commentLevel = type;

    mint.filter(replyModule.content, { replace: false }).then((data) => {
        if (!data.pass) {
            ElNotification({
                title: '评论包含敏感词汇',
                dangerouslyUseHTMLString: true,
                message: `<strong style="color: red;">${data.words.join(',')}</strong>`,
                type: 'warning',
                position: 'top-left',
                offset: 100,
                duration: 3000
            });
        } else {
            onVCodeShow();
        }
    });
};

const reply = (data: any, type: number) => {
    if (type === 1) {
        replyModule.replyCommentId = '';
        replyModule.replyCommentUserName = '';
        replyModule.parentCommentId = data.commentId;
        replyModule.parentCommentUserName = data.userName;
    } else {
        replyModule.replyCommentId = data.commentId;
        replyModule.replyCommentUserName = data.userName;
        replyModule.parentCommentId = data.parentCommentId;
        replyModule.parentCommentUserName = data.parentCommentUserName;
    }

    replyPlaceholder.value = `@${data.userName}`;
    currentReply.value = data.commentId;
};

watch(currentReply, () => {
    replyContent.value = '';
});

watch(commentUser, (newVal: string) => {
    commonStore.setCommentUser(newVal);
});

onBeforeMount(() => {
    commentUser.value = commonStore.getCommentUser;
    getArticleComment();
});
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
