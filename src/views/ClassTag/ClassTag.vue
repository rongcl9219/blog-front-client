<template>
    <div class="class-tag-page">
        <h3>
            <svg-icon icon-class="class-manage"/>
            分类
        </h3>
        <div class="item-module">
            <div
                class="class-item"
                v-for="classItem in classList"
                :key="classItem.classId"
                @click="pathTo('/list', { type: 'class', id: classItem.classId })"
            >
                <span v-text="classItem.className"></span>
                <span class="class-count" :style="{ backgroundColor: getBgColor() }"
                ><span v-text="classItem.count"></span
                ></span>
            </div>
        </div>
        <h3>
            <svg-icon icon-class="tag"/>
            标签
        </h3>
        <div class="item-module">
            <div
                class="tag-item"
                v-for="tagItem in tagList"
                :key="tagItem.tagId"
                @click="pathTo('/list', { type: 'tag', id: tagItem.tagId })"
            >
                <span v-text="tagItem.tagName" :style="{ color: getBgColor() }"></span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { ClassApi, TagApi } from '@/api';
import { ClassInfo } from '@/api/class/types';
import { TagInfo } from '@/api/tag/types';
import { getBgColor } from '@/utils/tools';
import usePathTo from '@/composables/pathTo';

const { pathTo } = usePathTo();

let classList = reactive<Array<ClassInfo>>([]);

let tagList = reactive<Array<TagInfo>>([]);

onMounted(() => {
    ClassApi.getClass().then((res) => {
        classList.push(...res.data);
    });

    TagApi.getAllTag().then((res) => {
        tagList.push(...res.data);
    });
});
</script>

<style lang="scss" scoped>
.class-tag-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px 0;

    h3 {
        margin-top: 60px;
        text-align: center;
        font-size: 22px;
        color: #222;

        & > i {
            margin-right: 5px;
        }
    }

    .item-module {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 10px 0 20px 0;
    }

    .class-item {
        padding: 5px 15px;
        border: 1px solid #F6F7F8;
        margin: 5px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
        line-height: 2;
        cursor: pointer;
        transition: 0.3s;
        color: #222;
        box-shadow: 0 1px 8px 0 rgba(#000, .1);
        background-color: #fff;

        .class-count {
            display: inline-block;
            width: 22px;
            height: 22px;
            margin-left: 4px;
            text-align: center;
            line-height: 22px;
            border-radius: 3px;
            font-size: 13px;
            transition: 0.3s;
            color: #F1F2F3;
            background-color: #F6F7F8;
        }

        &:hover {
            color: #F1F2F3;
            background-color: rgba(#000, .9);;
        }
    }

    .tag-item {
        position: relative;
        padding: 3px;
        margin: 5px;
        cursor: pointer;
        color: #999;
        font-weight: 600;
        transition: 0.3s;

        & > span {
            text-shadow: 2px 2px 1px rgba(#000, .15);;
        }

        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            transform: scaleX(0);
            transition: 0.3s;
            background-color: #222;
        }

        &:hover {
            color: #222;

            &:after {
                transform: scaleX(1);
            }
        }
    }
}
</style>
