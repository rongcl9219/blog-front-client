/**
 * @description 路由
 */
const HomePage = () => import('@/views/Home/index.vue');

const HomeArticle = () => import('@/views/Article/index.vue');

const List = () => import('@/views/List/index.vue');

const ClassTag = () => import('@/views/ClassTag/index.vue');

const About = () => import('@/views/About/index.vue');

const TimeLine = () => import('@/views/TimeLine/index.vue');

const Search = () => import('@/views/Search/index.vue');

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
