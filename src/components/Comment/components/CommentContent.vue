<template>
  <span class="comment-con">
    <template
      v-for="(item, index) in htmlArr"
      :key="index"
    >
      <span
        v-if="item.type === 1"
        v-text="item.text"
      />
      <svg-icon
        v-else
        :icon-class="item.text"
      />
    </template>
  </span>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted } from 'vue'
import emojiData from '@/components/Emoji/emojiData'

interface IHtmlObj {
  type: number;
  text: string;
}

const props = defineProps({
  htmlStr: {
    type: String,
    default: ''
  }
})

const { htmlStr } = toRefs(props)

const htmlArr = reactive<Array<IHtmlObj>>([])

const initHtml = () => {
  // 匹配 [] 之间的字符 包括[]
  const reg = /(\[.*?])/g
  const regTest = /(\[)|]/g
  const textArr = htmlStr?.value.split(reg)
  textArr.forEach(text => {
    let obj: IHtmlObj = {
      type: 1,
      text: ''
    }
    if (text) {
      if (regTest.test(text)) {
        let key = text.replace(regTest, '')
        if (emojiData[key]) {
          obj.type = 2
          obj.text = emojiData[key]
        } else {
          obj.text = text
        }
      } else {
        obj.text = text
      }
      htmlArr.push(obj)
    }
  })
}

onMounted(() => {
  initHtml()
})
</script>

<style scoped lang="scss">
.comment-con {
  font-size: 14px;

  .svg-icon {
    font-size: 20px;
  }
}
</style>
