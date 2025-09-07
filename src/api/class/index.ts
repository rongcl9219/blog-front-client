import Abstract from '@/core/request/http'
import type { Pagination } from '@/api/commonTypes'

/**
 * @description 分类接口
 */
class ClassApi extends Abstract {
  /**
     * 获取分类列表
     * @param pagination
     */
  getClassList(pagination: Pagination) {
    return this.fetchGet({
      url: '/admin/getClassList',
      params: pagination
    })
  }

  /**
     * 获取分类信息
     * @param classId
     */
  getClassInfo(classId: string) {
    return this.fetchGet({
      url: '/admin/getClassInfo',
      params: { classId }
    })
  }

  /**
     * 获取全部分类
     */
  getAllClass() {
    return this.fetchGet({
      url: '/getAllClass'
    })
  }

  /**
     * 获取分类
     */
  getClass() {
    return this.fetchGet({
      url: '/getClass'
    })
  }
}

let instance
export default (function() {
  if (instance) {
    return instance
  }
  instance = new ClassApi()
  return instance
})()
