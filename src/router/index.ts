import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import Routers from './modules/routes';

const routes: Array<RouteRecordRaw> = Routers,
    router = createRouter({
        history: createWebHistory(),
        routes
    });

// 改变进度条的HTML结构
NProgress.configure({
    template: '<div class="bar" role="bar"><div class="peg"></div></div>'
});

router.beforeEach((to, from, next) => {
    NProgress.start();
    return next();
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
