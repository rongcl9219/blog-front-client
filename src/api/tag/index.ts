import Abstract from '@/core/request/http';
import { Pagination } from '@/api/commonTypes';

/**
 * @description 标签接口
 */
class TagClass extends Abstract {
    /**
     * 获取标签列表
     * @param pagination
     */
    getTagList(pagination: Pagination) {
        return this.fetchGet({
            url: '/admin/getTagList',
            params: pagination
        });
    }

    /**
     * 获取标签信息
     * @param tagId
     */
    getTagInfo(tagId: string) {
        return this.fetchGet({
            url: '/admin/getTagInfo',
            params: { tagId }
        });
    }

    /**
     * 获取全部标签
     */
    getAllTag() {
        return this.fetchGet({
            url: '/getAllTag'
        });
    }
}

let instance;
export default (function () {
    if (instance) {
        return instance;
    }
    instance = new TagClass();
    return instance;
})();
