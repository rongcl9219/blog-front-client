import { GetterTree } from 'vuex';
import { CommonState } from './states';
import { RootState } from '../../index.d';

const getters: GetterTree<CommonState, RootState> = {
    getWebInfo: (state) => {
        return state.asideWebInfo;
    },
    getCommentUser: (state) => {
        return state.commentUser;
    },
    getSidebarOpen: (state) => {
        return state.sidebarOpen;
    },
    getHomeAside: (state) => {
        return state.homeAside;
    }
};

export default getters;
