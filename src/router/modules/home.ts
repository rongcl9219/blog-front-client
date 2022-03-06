/**
 * @description 路由
 */
const HomePage = () => import(/* webpackChunkName: "home-page" */ '@/views/Home/index.vue')

const HomeArticle = () => import(/* webpackChunkName: "home-article" */ '@/views/Article/index.vue')

const ArticleList = () => import(/* webpackChunkName: "home-articleList" */ '@/views/ArticleList/index.vue')

const ClassTag = () => import(/* webpackChunkName: "home-classTag" */ '@/views/ClassTag/index.vue')

const About = () => import(/* webpackChunkName: "home-about" */ '@/views/About/index.vue')

const TimeLine = () => import(/* webpackChunkName: "home-timeLine" */ '@/views/TimeLine/index.vue')

const Search = () => import(/* webpackChunkName: "home-search" */ '@/views/Search/index.vue')

export default [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/article',
        name: 'HomeArticle',
        component: HomeArticle,
        props: (route: any) => ({ articleId: route.query.articleId })
    },
    {
        path: '/articleList',
        name: 'ArticleList',
        component: ArticleList
    },
    {
        path: '/classTag',
        name: 'ClassTag',
        component: ClassTag
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/timeLine',
        name: 'TimeLine',
        component: TimeLine
    },
    {
        path: '/articleList',
        name: 'ArticleList',
        component: ArticleList
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    }
];
