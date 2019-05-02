<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    background-color="#ffffff"
    text-color="#555555"
    active-text-color="#ffd04b"
    aria-label="Harmony Navigation">
    <el-menu-item aria-label="Home Nav Item" index="1" class="logo-item">
        <img src="../assets/harmonyLogo_small.png" title="Harmony Logo" class="logo" />
        <span v-if="!loggedIn" class="app-title">Harmony Connection Platform</span>
    </el-menu-item>
    <el-menu-item v-if="loggedIn" aria-label="Dashboard Nav Item" index="2">
      <a href="/" @click.prevent="goToView('/')" @keydown.enter="goToView('/')">
        Dashboard
      </a>
    </el-menu-item>
    <el-menu-item v-if="loggedIn" aria-label="About Nav Item" index="3">
      <a href="/about" @click.prevent="goToView('/about')" @keydown.enter="goToView('/about')">
        About
      </a>
    </el-menu-item>
    <div class="login-status-container">
      <el-dropdown aria-label="User Photo Dropdown Menu" aria-haspopup="true" trigger="click" v-if="loggedIn" class="user-photo">
        <Jdenticon :value="profileUid" size="small" :title="profileName" tip-placement="left"/>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item aria-label="Logout Menu Item" @click.native="logout">Logout</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div v-else class="signin-container">
        <el-button aria-label="Login Button" type="primary" plain @click="goToView('/login')">
          Login
        </el-button>
      </div>
    </div>
  </el-menu>
</template>

<script>
import router from '../router.js'
import { mapActions, mapState } from 'vuex'
import Jdenticon from '@/components/Jdenticon.vue'

export default {
  name: 'Navigation',
  components: {
    Jdenticon
  },
  data () {
    return {
      activeIndex: '1',
    }
  },
  methods: {
    ...mapActions(['login', 'logout']),
    goToView (path) {
      router.push(path)
    },
  },
  computed: {
    ...mapState([
      'user',
      'loggedIn'
    ]),
    profileUid: function () {
      return this.user.uid
    },
    profileName: function () {
      return this.user.email
    }
  }
}
</script>
<style lang="scss">
.app-title {
  padding-left: 1rem;
  color: #555555;
  font-size: 1.25rem;
  font-weight: 900;
}
.logo-item {
  cursor: default;
  &:hover {
    cursor: default;
  }
}
.logo {
  border-radius: .5rem;
  width: 30px;
  height: 30px;
  padding-left: 1.25rem;
}
li.el-menu-item {
  padding: 0;
  margin: 0;
  font-family: var(--font-family-header);
  color: var(--alt-font-color);
  &:hover {
    color: var(--alt-font-color)!important;
    background-color: var(--navigation-background-color)!important;
  }
  a {
    height: 100%;
    display: block;
    width: auto;
    padding: 0 20px;
    font-size: 1rem;
    text-decoration: none;
    &:hover {
      cursor: pointer;
    }
  }
  &.is-active {
    border-bottom: var(--navigation-border-active)!important;
  }
}
.login-status-container {
    position: absolute;
    width: 19rem;
    right: 1rem;
    top: 0;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 10;
    .el-form-item__content {
      transform: scale(0.75, 0.75)
    }
    .el-select {
      display: inline-block;
      position: relative;
      max-width: 7rem;
      margin-right: 1rem;
    }
    .el-form-item {
      margin-bottom: .4rem;
    }
    label {
      padding-bottom: 0 !important;
      line-height: 1rem;
      font-size: .75rem;
      padding-left: 1rem!important;
      padding-top: .5rem!important;
    }
    &:focus {
      outline: 0;
    }
    .user-photo {
      height: 60px;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 1rem;
      margin-right: .5rem;
      &:hover {
        cursor: pointer;
      }
      img {
        flex: 1;
        max-width: 2rem;
        max-height: 2rem;
        border-radius: 50%;
      }
    }
    .signin-container {
      display: inline-block;
      width: auto;
      button {
        color: var(--font-color);
        a {
          color: var(--font-color-primary);
          text-decoration: none;
          &:hover {
            cursor: pointer;
            color: #ffffff;
          }
        }
      }
      .sign-up-link {
        margin-right: 1rem;
        text-decoration: none;
        text-align: center;
      }
    }
  }
  </style>