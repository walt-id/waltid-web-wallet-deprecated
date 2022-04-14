<template>
        <div>
            <h2>Sign up</h2>
            <p class="mt-3">Create a new wallet account.</p>
            <form action="" id="signup-form" class="my-4">
                <div class="my-2">
                    <input type="email" placeholder="E-mail" name="email" id="signup-form-email" class="border rounded px-3" autocomplete="off">
                </div>
                <div class="my-2">
                    <input type="password" placeholder="Password" name="password" id="signup-form-password" class="border rounded px-3" autocomplete="off">
                </div>
                <div class="my-2">
                    <button type="submit" name="submit" class="text-white border-0 rounded">Create Account</button>
                </div>
                <div class="my-2">
                    <NuxtLink to="/login">Already have account? Login</NuxtLink>
                </div>
            </form>
        </div>
</template>

<script>
/* eslint-disable */
import {config} from '/config.js'

export default {
  name: 'Signup',
  data(){
      return{
          copyright: config.copyright
      }
  }
}
</script>
