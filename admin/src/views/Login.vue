<template>
  <div class="login">
    <h2>Login</h2>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" label-position="right" class="login-form" @submit.prevent.stop>
      <el-form-item for="email" label="Email" prop="email">
        <el-input id="email" type="email" v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item for="password" label="Password" prop="password">
        <el-input id="password" v-model="ruleForm.password" :type="passwordInputType"></el-input>
      </el-form-item>
      <div class="link-holder">
        <a href="/forgotpass" class="forgot-password" @click.prevent="goToView('/forgotpass')" @keypress.prevent.stop.enter="goToView('/forgotpass')" tabindex="0">
          Forgot Password?
        </a>
        <a href="" v-if="showPassword" @click.prevent="showPassword = false" @keypress.prevent.stop.enter="showPassword = false" class="pass-show-hide" tabindex="0">
          Hide Password
        </a>
        <a href="" v-else @click.prevent="showPassword = true" class="pass-show-hide" @keypress.prevent.stop.enter="showPassword = true" tabindex="0">
          Show Password
        </a>
      </div>
      <el-form-item class="button-holder">
        <el-button aria-label="Login" type="primary large" class="login-button" @click="submitForm('ruleForm')">Login</el-button>
      </el-form-item>
    </el-form>
    <div v-if="authMessage.message" class="error">{{authMessage.code}} - {{authMessage.message}}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router from '../router.js'

export default {
  name: 'Login',
  data () {
    return {
      showPassword: false,
      ruleForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: 'Please enter an Email Address', trigger: 'blur' },
          { type: 'email', message: 'Please enter a valid Email Address', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Password must be at least 6 characters', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'login',
      'resetAuthMessage'
    ]),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login({ email: this.ruleForm.email, password: this.ruleForm.password })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    goToView (path) {
      router.push(path)
    }
  },
  computed: {
    ...mapState([
      'authMessage'
    ]),
    passwordInputType: function () {
      return this.showPassword ? 'text' : 'password'
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-right: 5rem;
  h2 {
    flex: 1;
    margin-left: 5rem;
  }
  .login-form {
    flex: 1;
    min-width: 25rem;
    .login-button {
      width: 19.5rem;
      &:focus {
        outline: auto 5px -webkit-focus-ring-color;
      }
    }
    div:nth-child(2) {
      margin-bottom: .5rem;
    }
    .link-holder {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
      .pass-show-hide {
        flex: 1;
        text-align: left;
        margin-bottom: .5rem;
        max-width: 7rem;
        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
      .forgot-password {
        flex: 1;
        text-align: right;
        margin-bottom: .5rem;
        max-width: 8rem;
        margin-left: 6rem;
        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
  .signup-holder {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 25rem;
    span {
      flex: 1;
      text-align: center;
      margin-left: 5rem;
    }
  }
  .button-holder {
    margin-bottom: 1rem;
    margin-top: .5rem;
  }
  p {
    flex: 1;
  }
  .error {
    color: red;
  }
}
</style>
