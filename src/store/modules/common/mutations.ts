import { MutationTree } from 'vuex';
import { CommonState } from './states';
import { SET_WEB_INFO, SET_THEME, SET_COMMENT_USER } from './types';

const mutations: MutationTree<CommonState> = {
    [SET_WEB_INFO]: (state, webInfo: any): void => {
        state.asideWebInfo = webInfo;
    },
    [SET_THEME]: (state, theme: string): void => {
        state.theme = theme;
    },
    [SET_COMMENT_USER]: (state, commentUser: any): void => {
        state.commentUser = commentUser;
    }
};

export default mutations;
