<template>
    <div>
        <el-avatar
            class="avatar"
            :size="90"
            :src="webInfo.WEB_AVATAR && webInfo.WEB_AVATAR.url"
        ></el-avatar>
        <h3 class="web-user" v-text="webInfo.WEB_USER"></h3>
        <p class="web-info" v-text="webInfo.PERSONAL_DESC"></p>
        <div class="web-menu-wrap" @click="toggleHomeAside">
            <div class="menu-item" @click="pathTo('/')">
                <p class="num" v-text="getWebInfo.articleCount"></p>
                <p>文章</p>
            </div>
            <div class="menu-item" @click="pathTo('/classTag')">
                <p class="num" v-text="getWebInfo.classCount"></p>
                <p>分类</p>
            </div>
            <div class="menu-item" @click="pathTo('/classTag')">
                <p class="num" v-text="getWebInfo.tagCount"></p>
                <p>标签</p>
            </div>
        </div>
        <div class="git-box">
            <a class="git-link" target="_blank" :href="webInfo.GITHUB_LINK"
                ><svg-icon icon-class="github" /><span>github</span></a
            >
        </div>
        <el-divider></el-divider>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Options({
    name: 'WebInfo'
})
export default class WebInfo extends Vue {
    @Getter('common/getWebInfo') getWebInfo: any;

    get webInfo() {
        return this.getWebInfo.webInfo || {};
    }
}
</script>

<style scoped lang="scss">
.avatar {
    display: block;
    margin: 30px auto 20px;
}

.web-user,
.web-info {
    text-align: center;
    margin-bottom: 10px;
    color: #222;
}

.web-user {
    font-size: 26px;
}

.web-info {
    margin-bottom: 20px;
}

.web-menu-wrap {
    display: flex;
    justify-content: center;
    align-items: center;

    .menu-item {
        padding: 5px 15px;
        text-align: center;
        cursor: pointer;
        transition: 0.3s;
        color: #222;

        &:hover {
            color: #00AEEC;
        }

        &:nth-child(2) {
            border-left: 1px solid;
            border-right: 1px solid;
            border-color: #E3E5E7;
        }
    }

    .num {
        margin-bottom: 5px;
        font-size: 18px;
        font-weight: 600;
    }
}

.git-box {
    margin-top: 20px;
    border: 1px solid #fc6423;
    border-radius: 5px;
    cursor: pointer;

    .git-link {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 10px;
        color: #fc6423;
        transition: 0.3s;

        span {
            margin-left: 5px;
            font-size: 14px;
            font-weight: 400;
        }
    }

    &:hover .git-link {
        background-color: #fc6423;
        color: #fff;
    }
}

@media screen and (max-width: 720px) {
    .git-box {
        margin: 10px 20px;
    }
}
</style>
