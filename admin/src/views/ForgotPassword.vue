<template>
  <div class="forgot-password">
    <h2>Reset Password</h2>
    <el-form :model="ruleForm" label-width="135px" :rules="rules" ref="ruleForm" class="forgot-pass-form">
      <el-form-item for="email" label="Email" prop="email">
        <el-input id="email" v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary large" @click="submitForm('ruleForm')">Send Email</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import router from '../router'

export default {
  name: 'ForgotPass',
  data () {
    return {
      ruleForm: {
        email: ''
      },
      rules: {
        email: [
          { required: true, message: 'Please enter an email address', trigger: 'blur' },
          { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'sendResetEmail'
    ]),
    async submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.sendResetEmail(this.ruleForm.email)
          router.push('/login')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  }
}
</script>

<style lang="scss">
.forgot-password {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h2 {
    flex: 1;
  }
  .forgot-pass-form {
    flex: 1;
    min-width: 25rem;
  }
  p {
    flex: 1;
  }
}
</style>
