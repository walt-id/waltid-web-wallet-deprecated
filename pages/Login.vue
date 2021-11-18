<template>
  <section class="_main bg-light row align-items-center justify-content-center justify-content-lg-start justify-content-md-center justify-content-sm-center">
    <div id="widget" class="_form d-grid align-items-center bg-white shadow-lg text-center">
      <div>
        <h2>Login</h2>
        <p class="mt-3">Access to your wallet.</p>
        <div>
          
        </div>
        <form action="" id="login-form" class="my-4" @submit.prevent="login">
          <div :class="this.error ? 'alert alert-danger mx-5 _bounce' : 'invisible'">
            Please verify your login credentials!
          </div>
          <div class="my-2 _animation-fade">
            <input type="email" placeholder="E-mail" name="email" id="login-form-email" class="border rounded px-3" autocomplete="off" v-model="email">
          </div>
          <div class="my-2 _animation-fade">
            <input type="password" placeholder="Password" name="password" id="login-form-password" @input="pwValidation()" v-bind:class="this.validPassword === true ? 'border rounded px-3' : 'border rounded px-3 border-danger'" autocomplete="off" v-model="password" >
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

export default {
  name: 'Login',
  data () {
    return {
      email: "",
      validEmail: true,
      password: "",
      validPassword: true,
      error: false
    }
  },
  methods: {
    emailValidation (email){
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    pwValidation (){
      this.password.length > 0 ? this.validPassword = true : this.validPassword = false
    },
    async login () {
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
          this.error = e.response.data.message
        }
      }
      else{
        this.error = true
      }
    },
  }
}
</script>
