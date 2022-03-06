/**
 * @description 组合全部路由
 */

import HomeRouters from './home';

const routes = [
    ...HomeRouters,
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: () => import(/* webpackChunkName: "404" */ '@/views/NotFound.vue')
    }
];

export default routes;
