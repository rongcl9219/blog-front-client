import { MutationTree } from 'vuex';
import { CommonState } from './states';
import { SET_WEB_INFO, SET_THEME, SET_COMMENT_USER, SET_SIDEBAR, SET_HOME_ASIDE } from './types';

const mutations: MutationTree<CommonState> = {
    [SET_WEB_INFO]: (state, webInfo: any): void => {
        state.asideWebInfo = webInfo;
    },
    [SET_THEME]: (state, theme: string): void => {
        state.theme = theme;
    },
    [SET_COMMENT_USER]: (state, commentUser: any): void => {
        state.commentUser = commentUser;
    },
    [SET_SIDEBAR]: (state) => {
        state.sidebarOpen = !state.sidebarOpen;
    },
    [SET_HOME_ASIDE]: (state) => {
        state.homeAside = !state.homeAside;
    }
};

export default mutations;
