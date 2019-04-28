<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    aria-label="Harmony Navigation">
    <el-menu-item aria-label="Home Nav Item" index="1">
      <a href="/" @click.prevent="goToView('/')" @keydown.enter="goToView('/')">
        <!-- <img src="../assets/roleFictionLogo.svg" title="Role Fiction Logo" class="logo" /> -->
        Home
      </a>
    </el-menu-item>
    <el-menu-item aria-label="About Nav Item" index="2">
      <a href="/about" @click.prevent="goToView('/about')" @keydown.enter="goToView('/about')">
        About
      </a>
    </el-menu-item>
  </el-menu>
</template>

<script>
import router from '../router.js'

export default {
  name: 'Navigation',
  data () {
    return {
      activeIndex: '1',
    }
  },
  methods: {
    goToView (path) {
      router.push(path)
    }
  }
}
</script>
