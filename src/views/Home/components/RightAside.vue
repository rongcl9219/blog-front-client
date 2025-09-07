<template>
  <div class="right-aside">
    <WebInfo class="home-web-info" />
    <div class="class-box">
      <h4>
        <svg-icon icon-class="class-manage" />
        分类
      </h4>
      <ul class="class-ul">
        <li
          v-for="item in classList"
          :key="item.classId"
          class="li-item"
          @click="pathTo('/list', {type: 'class', id: item.classId})"
        >
          <span>{{ item.className }}</span>
          <span :style="{backgroundColor: getBgColor()}">{{ item.count }}</span>
        </li>
      </ul>
    </div>
    <el-divider />
    <h4>
      <svg-icon icon-class="tag" />
      标签
    </h4>
    <div class="tag-box">
      <span
        v-for="tag in tagList"
        :key="tag.tagId"
        class="tag-item"
        :style="{backgroundColor: getBgColor()}"
        @click="pathTo('/list', {type: 'tag', id: tag.tagId})"
      >{{ tag.tagName }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import WebInfo from '@/components/WebInfo/WebInfo.vue'
import { ClassApi, TagApi } from '@/api'
import { getBgColor } from '@/utils/tools'
import usePathTo from '@/composables/pathTo'
import type { TagInfo } from '@/api/tag/types'
import type { ClassInfo } from '@/api/class/types'

const { pathTo } = usePathTo()

let tagList = reactive<Array<TagInfo>>([])
let classList = reactive<Array<ClassInfo>>([])

onMounted(() => {
  ClassApi.getClass().then((res) => {
    classList.push(...res.data)
  })
  TagApi.getAllTag().then((res) => {
    tagList.push(...res.data)
  })
})
</script>

<style scoped lang="scss">
.right-aside {
  position: sticky;
  top: 80px;
  width: 300px;
  height: fit-content;
  margin-left: 20px;
  padding: 20px;
  border-radius: 5px;
  box-sizing: border-box;
  overflow: hidden;
  transition: .3s;
  box-shadow: 0 1px 8px 0 rgba(#000, .1);

  &:hover {
    box-shadow: 0 2px 16px 0 rgba(#000, .2);
  }

  h4 {
    margin: 15px 0;
    color: #222;

    & > i {
      margin-right: 5px;
    }
  }

  .class-ul .li-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px 5px 10px;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 2.2;
    border-radius: 3px;
    cursor: pointer;
    transition: .3s;
    color: #222;
    box-shadow: 0 1px 8px 0 rgba(#000, .1);

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 2px 16px 0 rgba(#000, .2);
    }

    span:nth-child(2) {
      width: 22px;
      height: 22px;
      text-align: center;
      line-height: 22px;
      border-radius: 3px;
      color: #F1F2F3;
      background-color: #F6F7F8;
    }
  }

  .tag-box {
    display: flex;
    flex-wrap: wrap;
  }

  .tag-item {
    font-size: 12px;
    margin: 0 10px 15px 0;
    padding: 5px 10px;
    border-radius: 3px;
    line-height: 1;
    cursor: pointer;
    transition: .3s;
    color: #F1F2F3;
    box-shadow: 0 2px 10px 1px rgba(#000, .1);;
  }
}

@media screen and (max-width: 720px) {
  .right-aside {
    position: relative;
    top: 0;
    width: auto;
    margin: 20px 0;

    .home-web-info {
      display: none;
    }
  }
}
</style>
