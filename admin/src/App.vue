<template>
  <el-container id="app">
    <el-header id="nav">
      <navigation />
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import Navigation from './components/Navigation.vue'

export default {
  components: {
    Navigation,
  },
}
</script>

<style lang="scss">
#app {
  
}
#nav {
  padding: 0;
}
</style>
