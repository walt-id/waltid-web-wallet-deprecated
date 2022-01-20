<template>
  <section class="_main bg-light row align-items-center justify-content-center justify-content-lg-start justify-content-md-center justify-content-sm-center">
    <div id="widget" class="_form d-grid align-items-center bg-white shadow-lg text-center">
      <div :class="this.isSignin ? '_fade' : 'hide'">
        <img src="/favicon.png" width="50px" />
        
        <p class="mt-3">{{$t('LOGIN.MSG')}}</p>
        <div>
        </div>
        <form action="" id="login-form" class="my-4" @submit.prevent="login">
          <ErrorMessage :message-content="errorMessage" :is-active="error" />
          <div class="my-2 _animation-fade">
            <input type="text" :placeholder="$t('LOGIN.EMAIL')" name="email" id="login-form-email" @input="resetError()" v-bind:class="this.validEmail === true ? 'border rounded px-3' : 'border rounded px-3 border-danger'" autocomplete="off" v-model="email">
          </div>
          <div class="my-2 _animation-fade">
            <input type="password" :placeholder="$t('LOGIN.PASSWORD')" name="password" id="login-form-password" @input="resetError()" :data="this.password" :class="this.validPassword === true ? 'border rounded px-3' : 'border rounded px-3 border-danger'" autocomplete="off" v-model="password" >
          </div>
          <div class="my-2">
            <button type="submit" name="submit" class="text-white border-0 rounded _animation-fade">
              <span v-if="loginLoading">
                <img src="dark-loader.gif" width="30px" style="opacity: 0.7" />
              </span>
              <span v-else>{{$t('LOGIN.LOGIN')}}</span> 
            </button>
          </div>
          <div>
            <a href="#metamask" class="_meta-mask btn" @click="metamask">
              <span class="d-flex justify-content-center align-items-center">
                <img src="https://i.ibb.co/dK5Fb6N/metamsk-icon.png" width="20px" class="mx-2" />
                <p>Metamask</p>
              </span> 
            </a>
          </div>
          <div class="my-3 d-flex mt-4 justify-content-center">
            <a @click="toSignup" class="px-3 py-0 fw-normal">{{$t('LOGIN.SIGN_UP')}}</a>
            <a @click="toResetPassword" class="px-3 py-0 border-start border-2  fw-normal">{{$t('LOGIN.FORGOT_PASSWORD')}}</a>
          </div>
          <a href="#" v-for="locale in availableLocales" :key="locale.code" @click.prevent.stop="$i18n.setLocale(locale.code)">
            <img :src="locale.flag" width="20px" height="15px" :alt="locale.iso" class="me-2 border border-white" />
          </a>
        </form>
        <a id="copyright" class="_animation-fade" href="https://walt.id/" target="_blank">by walt.id</a>
      </div>
      <div :class="this.isSignup ? '_fadehi' : 'hide'">
          <h2>Sign up</h2>
          <p class="mt-3">Create a new wallet account.</p>
            <form action="" id="signup-form" class="my-4" @submit.prevent="login">
              <div class="my-2">
                  <input type="text" :placeholder="$t('LOGIN.EMAIL')" name="email" id="login-form-email" @input="resetError()" v-bind:class="this.validEmail === true ? 'border rounded px-3' : 'border rounded px-3 border-danger'" autocomplete="off" v-model="email">
              </div>
              <div class="my-2">
                  <input type="password" :placeholder="$t('LOGIN.PASSWORD')" name="password" id="login-form-password" @input="resetError()" :data="this.password" :class="this.validPassword === true ? 'border rounded px-3' : 'border rounded px-3 border-danger'" autocomplete="off" v-model="password" >
              </div>
              <div class="my-2">
                  <input type="password" :placeholder="$t('LOGIN.CONFIRM_PASSWORD')" name="password" id="signup-form-password-confirm" :class="this.confirmedPassword === false ? 'border border-danger rounded px-3' : 'border rounded px-3'" autocomplete="off" v-model="repassword" @input="confirmPassword()">
              </div>
              <div class="my-2">
                  <button type="submit" name="submit" class="text-white border-0 rounded">{{$t('LOGIN.CREATE_ACCOUNT')}}</button>
              </div>
              <div class="my-2">
                  <a @click="toSignIn">{{$t('LOGIN.ALREADY_ACCOUNT_LOGIN')}}</a>
              </div>
            </form>
          <a id="copyright" href="https://walt.id/" target="_blank">by walt.id</a>
      </div>
      <div :class="this.isResetPassword ? '_fadehi' : 'hide'">
          <h2>Reset password</h2>
          <p class="mt-3">Reset your account password</p>
            <form action="" id="signup-form" class="my-4">
              <div class="my-2">
                  <input type="email" placeholder="E-mail" name="email" id="signup-form-email" class="border rounded px-3" autocomplete="off">
              </div>
              <div class="my-2">
                  <button type="submit" name="submit" class="text-white border-0 rounded">Reset my password</button>
              </div>
              <div class="my-2">
                  <a @click="toSignIn">Already know your account? Login</a>
              </div>
            </form>
          <a id="copyright" href="https://walt.id/" target="_blank">by walt.id</a>
      </div>
    </div>
  </section>
</template>

<script>
import ErrorMessage from '@/components/ErrorMessage.vue'

export default {
  name: 'Login',
  components:{
    ErrorMessage
  },
  data () {
    return {
      email: "",
      validEmail: true,
      password: "",
      repassword: "",
      confirmedPassword: null,
      validPassword: true,
      error: false,
      errorMessage: '',
      isSignin: true,
      isSignup: false,
      isResetPassword: false,
      loginLoading: false,
      eth_account: null
    }
  },
  computed: {
    availableLocales () {
      console.log("locales", this.$i18n.locales)
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },
  methods: {
    //We included all pages in each condition for reset whole routing states for no UX errors
    toSignIn(){
      this.isSignup= false
      this.isResetPassword= false
      this.isSignin= true
    },
    toSignup(){
      this.isSignin= false
      this.isResetPassword= false
      this.isSignup= true
    },
    toResetPassword(){
      this.isSignup= false
      this.isSignin= false
      this.isResetPassword= true
    },
    // validate email if a domain name typed after @
    emailValidation (email){
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    async login (){
      this.loginLoading=true
      this.resetError()
      // check if  email && pw not empty === login
      if(this.emailValidation(this.email) && this.password.length > 0){
        try {
          const loginResponse = await this.$auth.loginWith("local", {
            data: {
            email: this.email,
            password: this.password
           }
          })
          this.$auth.setUser(loginResponse.data)
          this.$router.push("/")
        } catch (e) {
          this.loginLoading=false
          console.log(e.response.data)
          this.error = true
          this.errorMessage = e.response.data
        }
      }
      // check if both wrong: email && pw not empty
      else if(this.emailValidation(this.email) === false && this.password.length === 0){
        this.validEmail = false
        this.validPassword = false
        this.error = true
        this.errorMessage = "Please verify your credentials!"
      }
      // check if just email is not validate
      else if(this.emailValidation(this.email) === false){
        this.validEmail = false
        this.error = true
        this.errorMessage = "Please verify your email!"
      }
      // check just the pw is empty
      else if(this.password.length === 0){
        this.validPassword = false
        this.error = true
        this.errorMessage = "Please fill your password!"
      }
    },
    async metamask () {
      const ethereum =  window.ethereum;
      if (typeof ethereum !== 'undefined') {
         const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
         const account = accounts[0];
         this.eth_account = account
      }      
      else{
        this.validPassword = false
        this.error = true
        this.errorMessage = "Please install Metamask!"
      }
    },
    // is a use Experience method to reset error state in retyping
    resetError (){
      this.validEmail = true
      this.validPassword = true
      this.error = false
    },
    //confirm the password
    confirmPassword(){
      if(this.password.length>0 && this.repassword.length>0){
        this.password === this.repassword ? this.confirmedPassword = true : this.confirmedPassword = false
      }
    }
  }
}
</script>
