import { cacheUserInfo, cacheThemeInfo } from '@/core/storageCache';

export interface CommonState {
    asideWebInfo?: any;
    commentUser?: any;
    theme?: string;
}

export const state: CommonState = {
    asideWebInfo: {},
    commentUser: cacheUserInfo.load() || null,
    theme: cacheThemeInfo.load() || ''
};
