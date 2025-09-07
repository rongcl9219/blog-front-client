import StorageCache from './storage'
import KEYS from './keys'

/**
 * 保存用户信息
 */
export const cacheUserInfo = new StorageCache(KEYS.commentUser)
