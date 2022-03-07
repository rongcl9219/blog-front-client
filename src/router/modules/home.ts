/**
 * @description 路由
 */
const HomePage = () => import('@/views/Home/index.vue');

const HomeArticle = () => import('@/views/Article/index.vue');

const ArticleList = () => import('@/views/ArticleList/index.vue');

const ClassTag = () => import('@/views/ClassTag/index.vue');

const About = () => import('@/views/About/index.vue');

const TimeLine = () => import('@/views/TimeLine/index.vue');

const Search = () => import('@/views/Search/index.vue');

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
