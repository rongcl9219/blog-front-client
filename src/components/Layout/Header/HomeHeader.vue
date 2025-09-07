<template>
  <header class="header">
    <div class="header-box">
      <router-link
        class="home-link"
        to="/"
      >
        <h1>火星的青青草原</h1>
      </router-link>
      <HeaderSlider />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useCommonStore } from '@/store/common'
import HeaderSlider from './components/Slider.vue'

const commonStore = useCommonStore()

onMounted(() => {
  commonStore.setWebInfo()
})
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  padding: 15px 30px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 1px 8px 0 rgba(#000, 0.1);
  z-index: 999999;

  .header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .home-link {
    font-weight: 500;
    font-size: 22px;
    color: #222;

    h1 {
      font-weight: 400;
      color: #222;
      font-family: zcool-kuaile, serif;
    }
  }
}
</style>
