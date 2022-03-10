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
                    <h2>Key Import</h2>
                    <!--<p class="mt-3">You have no Ecosystems.</p>-->
                    <div class="d-flex align-items-center justify-content-center _wizard mt-3">
                        <div :class="this.wizardIndex === 0 ? '': 'animate__fadeOutRight hide'">
                         <form id="key-import-form" @submit.prevent="keyImport">
                            <div class="_item">
                              <p>Import a key in PME or JWK format.</p>
                              <p class="text-primary">Asymmetric key</p>
                              <textarea :class="this.error ? '_asymmetric-key mt-3 border-danger' : '_asymmetric-key mt-3'" :data="this.asymmetrickey" v-model="asymmetrickey"></textarea>
                            </div>
                            <button type="submit" name="submit" class="_bounce btn btn-primary text-white mt-3" style="width: 200px">
                                <span v-if="importLoading">
                                    <img src="/dark-loader.gif" width="30px" style="opacity: 0.7" />
                                </span>
                                <span v-else>Import</span> 
                            </button>
                          </form>
                        </div>
                        <div :class="this.wizardIndex === 1 ? '_fadin': 'hide'">
                            <div class="_item">
                              <div class="success-animation">
                                  <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                              </div>
                              <p>Your key imported successfully</p>
                              <div class="mt-3 d-flex _button-view justify-content-center">
                                <a class="_bounce btn" href="/settings">Done</a>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="menu-content" class="_menu-content hide">
                    <ul>
                        <li>
                            <NuxtLink to="/credentials">{{$t('MENU.CREDENTIALS')}}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/connections">{{$t('MENU.CONNECTIONS')}}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/settings">{{$t('MENU.SETTINGS')}}</NuxtLink>
                        </li>
                        <li>
                            <a @click="logout">{{$t('MENU.LOGOUT')}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="_copyright _blue-color d-flex align-items-center justify-content-center">
                <a id="copyright" href="https://walt.id/" target="_blank">{{this.copyright}}</a>
            </div>
        </div> 
    </section>
</template>

<script>
import {menuTransitionShow, menuTransitionHide} from '@/helpers/menuTransation'
import {config} from '/config.js'

export default {
  name: 'Import',
  data() {
    return {
      copyright: config.copyright,
      trigger: true,
      wizardIndex: 0,
      asymmetrickey: '',
      error: false,
      importLoading: false,
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

    
    async keyImport (){
        this.importLoading= true;
        this.wizardIndex = this.wizardIndex+1
        /*await this.$axios.$post('/api/wallet/keys/import', {
            "data": this.asymmetrickey
        })
        .then(
            res=>{
                console.log(res)
                this.importLoading=false;
                this.wizardIndex = this.wizardIndex+1
            }
        )
        .catch(
            e=>{
                console.log(e)
                this.importLoading=false;
                this.error=true
            }
        )*/
    },
    logout: async function() {
      await this.$auth.logout();
    },
  }
};
</script>
