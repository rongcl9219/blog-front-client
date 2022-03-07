<template>
    <nav class="header_tabs">
        <div class="tab_item">
            <router-link
                to="/"
                class="link-home"
                :class="'HomePage' === activeRoute ? 'route-active' : ''"
            >
                <el-icon><House /></el-icon>
                <span>首页</span>
            </router-link>
        </div>
        <div class="tab_item">
            <router-link to="/classTag" :class="'ClassTag' === activeRoute ? 'route-active' : ''">
                <svg-icon icon-class="tag" />
                <span>分类/标签</span>
            </router-link>
        </div>
        <div class="tab_item">
            <router-link to="/about" :class="'About' === activeRoute ? 'route-active' : ''">
                <el-icon><UserFilled /></el-icon>
                <span>关于</span>
            </router-link>
        </div>
        <div class="tab_item">
            <router-link to="/timeLine" :class="'TimeLine' === activeRoute ? 'route-active' : ''">
                <svg-icon icon-class="publish-date" />
                <span>时间线</span>
            </router-link>
        </div>
        <div class="tab_item">
            <router-link to="/search" :class="'Search' === activeRoute ? 'route-active' : ''">
                <el-icon><Search /></el-icon>
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
.header_tabs {
    display: flex;

    .tab_item {
        margin: 0 5px;
        font-size: 14px;
        border-radius: 5px;
        cursor: pointer;

        a {
            transition: 0.3s;
            padding: 2px 8px;
            // TODO
            //@include font_color('text-color4');

            &:hover {
                //@include font_color('text-color2');
            }
        }

        & a:hover,
        .route-active {
            //@include font_color('text-color2');
        }

        i {
            margin-right: 3px;
            font-size: 16px;
        }
    }
}

.slider {
    .header_tabs {
        flex-direction: row;
        align-items: center;
    }
}

#homeAside {
    .header_tabs {
        flex-direction: column;

        .tab_item {
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
        .header_tabs {
            display: none;
        }
    }
}
</style>
