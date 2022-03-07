import { cacheUserInfo, cacheThemeInfo } from '@/core/storageCache';

export interface CommonState {
    asideWebInfo?: any;
    commentUser?: any;
    theme?: string;
    sidebarOpen: boolean;
    homeAside: boolean;
}

export const state: CommonState = {
    asideWebInfo: {},
    commentUser: cacheUserInfo.load() || null,
    theme: cacheThemeInfo.load() || '',
    sidebarOpen: false,
    homeAside: false
};
