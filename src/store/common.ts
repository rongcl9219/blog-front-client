import { defineStore } from 'pinia'
import { cacheUserInfo } from '@/core/storageCache'
import type { CustomResponse } from '@/core/request/type'
import { CommonApi } from '@/api'
import type { HeadList } from 'md-editor-v3'

export interface CommonState {
    asideWebInfo?: any;
    commentUser?: any;
    homeAside: boolean;
    catalogList: Array<HeadList>;
    activeCatalog: string;
}

export const useCommonStore = defineStore('setting', {
  state: (): CommonState => ({
    asideWebInfo: {},
    commentUser: cacheUserInfo.load() || null,
    homeAside: false,
    catalogList: [],
    activeCatalog: ''
  }),
  getters: {
    getWebInfo: state => state.asideWebInfo,
    getCommentUser: state => state.commentUser,
    getHomeAside: state => state.homeAside,
    getCatalogList: state => state.catalogList,
    getActiveCatalog: state => state.activeCatalog
  },
  actions: {
    /**
         * 设置网站信息
         */
    setWebInfo(): Promise<CustomResponse> {
      return new Promise<CustomResponse>((resolve, reject) => {
        CommonApi.getAsideInfo()
          .then((response) => {
            this.asideWebInfo = response.data
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    toggleHomeAside(): void {
      this.homeAside = !this.homeAside
    },
    setCommentUser(commentUser: string): void {
      this.commentUser = commentUser
      cacheUserInfo.save(commentUser)
    },
    setCatalogList(catalogList: Array<HeadList>): void {
      this.catalogList = catalogList
    },
    setActiveCatalog(activeCatalog: string): void {
      this.activeCatalog = activeCatalog
    }
  }
})
