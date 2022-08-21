/**
 * @description 路由
 */
const HomePage = () => import('@/views/Home/HomeIndex.vue');

const HomeArticle = () => import('@/views/Article/ArticleIndex.vue');

const List = () => import('@/views/List/ListIndex.vue');

const ClassTag = () => import('@/views/ClassTag/ClassTag.vue');

const About = () => import('@/views/About/AboutIndex.vue');

const TimeLine = () => import('@/views/TimeLine/TimeLineIndex.vue');

const Search = () => import('@/views/Search/SearchIndex.vue');

export default [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
        meta: {
            home: true
        }
    },
    {
        path: '/article',
        name: 'HomeArticle',
        component: HomeArticle,
        props: (route: any) => ({ articleId: route.query.articleId }),
        meta: {
            home: true
        }
    },
    {
        path: '/list',
        name: 'List',
        component: List,
        meta: {
            home: true
        }
    },
    {
        path: '/classTag',
        name: 'ClassTag',
        component: ClassTag,
        meta: {
            home: true
        }
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta: {
            home: true
        }
    },
    {
        path: '/timeLine',
        name: 'TimeLine',
        component: TimeLine,
        meta: {
            home: true
        }
    },
    {
        path: '/search',
        name: 'Search',
        component: Search,
        meta: {
            home: true
        }
    }
];
