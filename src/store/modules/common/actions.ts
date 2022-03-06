import { ActionTree, Commit, Dispatch } from 'vuex';
import { CommonState } from './states';
import { RootState } from '../../index.d';
import { SET_WEB_INFO } from './types';
import { CustomResponse } from '@/core/request/type';
import { CommonApi } from '@/api';

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
    }
};

export default actions;
