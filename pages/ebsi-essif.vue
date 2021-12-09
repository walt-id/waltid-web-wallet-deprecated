<template>
    <section class="_main bg-light row align-items-center justify-content-center justify-content-lg-start justify-content-md-center justify-content-sm-center p-0">
        <div id="widget" class="_form d-black bg-w shadow-lg text-center">
            <div class="_toggle-menu position-sticky d-flex justify-content-end col-12 align-items-center px-3">
                <a id="toggle-menu" @click="menuTrigger">
                    <div id="dash-1" class="_dash my-2"></div>
                    <div id="dash-2" class="_dash my-2"></div>
                    <div id="dash-3" class="_dash my-2"></div>
                </a>
            </div>
            <div class="_content justify-content-center d-flex align-items-center ">
                <div id="content" class="_setting">
                    <h2>EBSI/ESSIF</h2>
                    <!--<p class="mt-3">You have no Ecosystems.</p>-->
                    <div class="d-flex align-items-center justify-content-center _wizard mt-3">
                        <div :class="this.wizardIndex === 0 ? '': 'animate__fadeOutRight hide'">
                            <div class="_item">
                              <h4>Step 1</h4>
                              <p>Copy a security token from the EBSI website.</p>
                            </div>
                            <div class="mt-3 d-flex _button-view justify-content-center">
                              <a class="_bounce btn" @click="wizardNext">Get started</a>
                            </div>
                        </div>
                        <div :class="this.wizardIndex === 1 ? '_left-fade': 'hide'">
                            <div class="_item">
                              <h4>Step 2</h4>
                              <p>Insert the token below</p>
                            </div>
                            <div class="mt-3 d-flex _button-view justify-content-center">
                                <div>
                                    <form action="" id="token-submit" @submit.prevent="tokenSubmit">
                                        <input placeholder="Insert your token" id="inserted-token" name="insertedToken" :class="this.tokenWrong===true ? 'form-control my-2 border-danger':'form-control my-2'" :data="this.token" v-model="token"/>
                                        <button type="submit" name="submit" class="_bounce btn">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div :class="this.tokenSubmitted === true ? '_fadin': 'hide'">
                            <div class="_item">
                              <div class="success-animation">
                                  <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                              </div>
                              <p>You just succefully onboarded on EBSI</p>
                            </div>
                        </div>
                    </div>
                    <p :class="this.wizardIndex === 2 ? 'hide': '_help'">Want help? <span><a href="#">Detailed instructions</a></span></p>
                </div>
                <div id="menu-content" class="_menu-content hide">
                    <ul>
                        <li>
                            <NuxtLink to="/credentials">Credentials</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/connections">Connections</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/settings">Settings</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/login">logout</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="_copyright _blue-color d-flex align-items-center justify-content-center">
                <a id="copyright" href="https://walt.id/" target="_blank">by walt.id</a>
            </div>
        </div>
    </section>
</template>

<script>
import {menuTransitionShow, menuTransitionHide} from '@/helpers/menuTransation'

export default {
  name: 'Ecosystems',
  data() {
    return {
      trigger: true,
      wizardIndex: 0,
      token: '',
      tokenSubmitted: false,
      tokenWrong: false
    }
  },
  methods:{
    menuTrigger: function(){
          if(this.trigger === true){
              menuTransitionShow()
              this.trigger = false
              this.wizardIndex = 0
          }
          else{
              menuTransitionHide()
              this.trigger = true
          }
    },
    wizardNext: function(){
        this.wizardIndex = this.wizardIndex+1
    },
    async tokenSubmit (){
        try{
            const data = await this.$axios.$post('/api/wallet/did/create?method=ebsi', {
              header:{
                "accept": "text/plain",
                "Content-Type": "application/x-www-form-urlencoded" 
              },
              data:{
                ebsiBearerToken:`${this.token}`,
              }
            })
            console.log(data.data)
            this.tokenSubmitted=true
            this.wizardIndex = this.wizardIndex+1
        }catch(e){
            console.warn(e)
            this.tokenWrong=true
        }  
    }
  }
};
</script>
