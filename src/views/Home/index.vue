<template>
    <div class="home-page">
        <div class="banner">
            <div class="banner-bg" :style="bannerStyle"></div>
            <div class="banner-mask"></div>
            <div class="banner-info">
                <h2>火星的青青草原</h2>
                <p v-text="webInfo.MOTTO"></p>
            </div>
        </div>
        <div class="container">
            <ArticleList />
            <RightAside />
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import RightAside from '@/views/Home/components/RightAside.vue';
import ArticleList from '@/components/ArticleList/index.vue';

@Options({
    name: 'HomePage',
    components: {
        RightAside,
        ArticleList
    }
})
export default class HomePage extends Vue {
    @Getter('common/getWebInfo') getWebInfo!: any;

    get webInfo() {
        return this.getWebInfo.webInfo || {};
    }

    get bannerStyle() {
        const bannerUrl = this.webInfo.WEB_BANNER ? this.webInfo.WEB_BANNER.url : '';
        return {
            backgroundImage: `url('${bannerUrl}')`
        };
    }
}
</script>

<style lang="scss">
.home-page {
    .banner {
        position: relative;
        height: calc(100vh - 60px);

        .banner-bg {
            width: 100%;
            height: 100%;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
        }

        .banner-mask {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(#000, 0.3);
        }

        .banner-info {
            position: absolute;
            top: 50%;
            left: 50%;
            text-align: center;
            color: #f1f2f3;
            transform: translate(-50%, -50%);

            h2 {
                margin-bottom: 10px;
                font-size: 40px;
                font-weight: 500;
                letter-spacing: 2px;
                transition: 0.3s;
            }

            & > p {
                font-size: 24px;
                transition: 0.3s;
            }
        }
    }
}

@media screen and (max-width: 720px) {
    .home-page {
        .container {
            flex-direction: column;
        }

        .banner-info {
            h2 {
                font-size: 32px !important;
            }

            p {
                font-size: 22px !important;
            }
        }
    }
}
</style>
