import Abstract from "@/core/request/http";
import { ArticleList, ArticleInfo } from "./types";

/**
 * @description 文章接口
 */
class ArticleApi extends Abstract {
    /**
     * 获取文章列表
     * @param queryParams
     */
    getArticleList(queryParams: ArticleList) {
        return this.fetchGet({
            url: "/getArticleList",
            params: queryParams,
        });
    }

    /**
     * 获取文章信息
     * @param articleId
     */
    getArticleInfo(articleId: string) {
        return this.fetchGet({
            url: "/getArticleInfo",
            params: {articleId},
        });
    }

    /**
     * 获取文章内容
     * @param articleId
     */
    getContent(articleId: string) {
        return this.fetchGet({
            url: "/getContent",
            params: {articleId},
        });
    }

    /**
     * 获取最近发布文章
     */
    getCurrentArticles() {
        return this.fetchGet({
            url: "/admin/getCurrentArticles",
        });
    }
}

let instance;
export default (function () {
    if (instance) {
        return instance;
    }
    instance = new ArticleApi();
    return instance;
})();
