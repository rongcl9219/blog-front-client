<template>
  <div
    class="wrapper"
    :class="{'home-slide-on': commonStore.homeAside}"
  >
    <HomeHeader />
    <HomeMain />
    <HomeFooter />
    <HomeAside />
    <div
      class="aside-mask"
      @click="commonStore.toggleHomeAside"
    />

    <el-backtop
      :right="100"
      target=".el-scrollbar__wrap"
      :bottom="100"
      :visibility-height="300"
    >
      <div class="back-top">
        <svg-icon icon-class="rocket" />
      </div>
    </el-backtop>
  </div>
</template>

<script lang="ts" setup>
import { useCommonStore } from '@/store/common'
import HomeHeader from './Header/HomeHeader.vue'
import HomeMain from './Main/HomeMain.vue'
import HomeFooter from './Footer/HomeFooter.vue'
import HomeAside from './Aside/HomeAside.vue'

const commonStore = useCommonStore()
</script>

<style scoped lang="scss">
.wrapper {
  background-color: #fff;
}

.aside-mask {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: rgba(#000, .35);
}

.el-backtop {
  box-shadow: none;
}

.back-top {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 22px;
  line-height: 40px;
  border-radius: 5px;
  color: #222;
  background-color: var(--el-bg-color-overlay);
  box-shadow: var(--el-box-shadow-lighter);
}

@media screen and (max-width: 720px) {
  .home-slide-on .aside-mask {
    display: block;
  }
  .el-backtop {
    right: 20px !important;
  }
}
</style>
