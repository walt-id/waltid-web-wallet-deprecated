<template>
  <section class="_main bg-light row align-items-center justify-content-center justify-content-lg-start justify-content-md-center justify-content-sm-center">
    <div id="widget" class="_form d-grid align-items-center bg-white shadow-lg text-center">
      <div>
        <h2>Login</h2>
        <p class="mt-3">Access to your wallet.</p>
        <div>
          
        </div>
        <form action="" id="login-form" class="my-4" @submit.prevent="login">
          <ErrorMessage :message-content="errorMessage" :is-active="error" />
          <div class="my-2 _animation-fade">
            <input type="text" placeholder="E-mail" name="email" id="login-form-email" @input="resetError()" v-bind:class="this.validEmail === true ? 'border rounded px-3' : 'border rounded px-3 border-danger'" autocomplete="off" v-model="email">
          </div>
          <div class="my-2 _animation-fade">
            <input type="password" placeholder="Password" name="password" id="login-form-password" @input="resetError()" :data="this.password" :class="this.validPassword === true ? 'border rounded px-3' : 'border rounded px-3 border-danger'" autocomplete="off" v-model="password" >
          </div>
          <div class="my-2">
            <button type="submit" name="submit" class="text-white border-0 rounded _animation-fade">Login</button>
          </div>
          <div class="my-2 d-flex mt-4 justify-content-center">
            <a href="/signup" class="px-3 py-0">Sign up</a>
            <a href="/forgot-password" class="px-3 py-0 border-start border-2 ">Forgot password?</a>
          </div>
        </form>
        <a id="copyright" class="_animation-fade" href="https://walt.id/" target="_blank">by walt.id</a>
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
      validPassword: true,
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    // validate email if a domain name typed after @
    emailValidation (email){
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    async login (){
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
          this.$router.push("/dashboard")
        } catch (e) {
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
    // is a use Experience method to reset error state in retyping
    resetError (){
      this.validEmail = true
      this.validPassword = true
      this.error = false
    },
  }
}
</script>
