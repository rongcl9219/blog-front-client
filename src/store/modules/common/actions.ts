import { ActionTree, Commit } from 'vuex';
import { CommonState } from './states';
import { RootState } from '../../index.d';
import { SET_WEB_INFO, SET_SIDEBAR, SET_HOME_ASIDE, SET_COMMENT_USER } from './types';
import { CustomResponse } from '@/core/request/type';
import { CommonApi } from '@/api';
import { cacheUserInfo } from '@/core/storageCache';

const actions: ActionTree<CommonState, RootState> = {
    /**
     * 设置网站信息
     */
    async setWebInfo({ commit }: { commit: Commit }): Promise<CustomResponse> {
        return new Promise((resolve, reject) => {
            CommonApi.getAsideInfo()
                .then((response) => {
                    commit(SET_WEB_INFO, response.data);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    toggleSideBar({ commit }: { commit: Commit }) {
        commit(SET_SIDEBAR);
    },
    toggleHomeAside({ commit }: { commit: Commit }) {
        commit(SET_HOME_ASIDE);
    },
    setCommentUser: ({ commit }: { commit: Commit }, commentUser: string) => {
        commit(SET_COMMENT_USER, commentUser);
        cacheUserInfo.save(commentUser);
    }
};

export default actions;
