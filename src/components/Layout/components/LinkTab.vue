<template>
    <nav class="header-nav">
        <div class="nav-item">
            <router-link
                to="/"
                class="link-home"
                :class="'HomePage' === activeRoute ? 'route-active' : ''"
            >
                <svg-icon icon-class="home-page" />
                <span>首页</span>
            </router-link>
        </div>
        <div class="nav-item">
            <router-link to="/classTag" :class="'ClassTag' === activeRoute ? 'route-active' : ''">
                <svg-icon icon-class="tag" />
                <span>分类/标签</span>
            </router-link>
        </div>
        <div class="nav-item">
            <router-link to="/about" :class="'About' === activeRoute ? 'route-active' : ''">
                <svg-icon icon-class="user" />
                <span>关于</span>
            </router-link>
        </div>
        <div class="nav-item">
            <router-link to="/timeLine" :class="'TimeLine' === activeRoute ? 'route-active' : ''">
                <svg-icon icon-class="publish-date" />
                <span>时间线</span>
            </router-link>
        </div>
        <div class="nav-item">
            <router-link to="/search" :class="'Search' === activeRoute ? 'route-active' : ''">
                <svg-icon icon-class="search" />
                <span>搜索</span>
            </router-link>
        </div>
    </nav>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-property-decorator';
import { House, UserFilled, Search } from '@element-plus/icons-vue';

@Options({
    name: 'LinkTab',
    components: {
        House,
        UserFilled,
        Search
    }
})
export default class LinkTab extends Vue {
    get activeRoute() {
        return this.$route.name;
    }
}
</script>

<style scoped lang="scss">
.header-nav {
    display: flex;

    .nav-item {
        margin: 0 5px;
        font-size: 14px;
        border-radius: 5px;
        cursor: pointer;

        a {
            transition: 0.3s;
            padding: 2px 8px;
            color: #9499A0;

            &:hover {
                color: #222;
            }
        }

        & a:hover,
        .route-active {
            color: #222;
        }

        .svg-icon {
            margin-right: 3px;
            font-size: 16px;
        }
    }
}

.slider {
    .header-nav {
        flex-direction: row;
        align-items: center;
    }
}

.home-aside {
    .header-nav {
        flex-direction: column;

        .nav-item {
            font-size: 16px;
            font-weight: 600;
            line-height: 1;
            padding: 0 15px;
            margin: 5px;
        }
    }
}

@media screen and (max-width: 720px) {
    .slider {
        .header-nav {
            display: none;
        }
    }
}
</style>
