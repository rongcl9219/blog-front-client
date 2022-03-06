import Abstract from "@/core/request/http";
import { UploadToken } from "./types";

/**
 * @description 公共接口
 */
class CommonApi extends Abstract {
    /**
     * 获取侧边栏信息
     */
    getAsideInfo() {
        return this.fetchGet({url: "/getAsideInfo"});
    }

    /**
     * 添加评论
     * @param data
     */
    addComment(data: any) {
        return this.fetchPost({
            url: "/addComment",
            data
        });
    }

    /**
     * 获取评论
     * @param articleId
     */
    getComment(articleId: string) {
        return this.fetchGet({
            url: "/getComment",
            params: {articleId}
        });
    }

    /**
     * 获取时间线数据
     */
    getTimeLine() {
        return this.fetchGet({url: "/getTimeLine"});
    }
}

// 单列模式返回对象
let instance;
export default (() => {
    if (instance) {
        return instance;
    }
    instance = new CommonApi();
    return instance;
})();
