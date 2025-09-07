<template>
  <div class="no_data">
    <img
      :src="noDataImage"
      alt=""
    >
    <p>{{ props.noDateText }}</p>
  </div>
</template>

<script lang="ts" setup>
import noDataImage from '@/assets/images/default_img/no_data.png'

const props = defineProps({
  noDateText: {
    type: String,
    default: '什么都没有'
  }
})
</script>

<style scoped lang="scss">
.no_data {
  margin-top: 7%;
  text-align: center;

  p {
    font-family: zcool-kuaile, sans-serif;
    font-size: 24px;
    color: var(--el-color-primary);
  }
}
</style>
