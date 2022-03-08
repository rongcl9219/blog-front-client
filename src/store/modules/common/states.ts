import { cacheUserInfo } from '@/core/storageCache';

export interface CommonState {
    asideWebInfo?: any;
    commentUser?: any;
    sidebarOpen: boolean;
    homeAside: boolean;
}

export const state: CommonState = {
    asideWebInfo: {},
    commentUser: cacheUserInfo.load() || null,
    sidebarOpen: false,
    homeAside: false
};
