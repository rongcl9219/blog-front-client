import Abstract from "@/core/request/http";

/**
 * @description 网站信息接口
 */
class WebInfoApi extends Abstract {
    /**
     * 获取网站信息
     */
    getWebInfo() {
        return this.fetchGet({
            url: "/getWebInfo",
        });
    }
}

let instance;
export default (function () {
    if (instance) {
        return instance;
    }
    instance = new WebInfoApi();
    return instance;
})();
