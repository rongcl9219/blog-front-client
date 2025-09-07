<template>
  <aside class="home-aside">
    <WebInfo />
    <div @click="commonStore.toggleHomeAside">
      <LinkTab />
    </div>
    <el-divider />
  </aside>
</template>

<script lang="ts" setup>
import WebInfo from '@/components/WebInfo/WebInfo.vue'
import LinkTab from '@/components/Layout/components/LinkTab.vue'
import { useCommonStore } from '@/store/common'

const commonStore = useCommonStore()
</script>

<style scoped lang="scss">
.home-aside {
  position: fixed;
  top: 0;
  left: 0;
  width: 230px;
  height: 100vh;
  padding-top: 60px;
  box-sizing: border-box;
  transform: translateX(-100%);
  transition: .3s;
  z-index: 15;
  background-color: #fff;
}

@media screen and (max-width: 720px) {
  .home-slide-on .home-aside {
    transform: translateX(0);
  }
}
</style>
