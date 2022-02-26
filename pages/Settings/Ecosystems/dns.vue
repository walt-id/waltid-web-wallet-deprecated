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
                    <h2>DNS (did:web)</h2>
                    <!--<p class="mt-3">You have no Ecosystems.</p>-->
                    <div class="d-flex align-items-center justify-content-center _wizard mt-3">
                        <div :class="this.wizardIndex === 0 ? '': 'animate__fadeOutRight hide'">
                            <div class="_item">
                              <h4>Step 1</h4>
                              <p>Create & register your did:web.</p>
                            </div>
                            <div class="mt-3 d-flex _button-view justify-content-center">
                              <a class="_bounce btn" @click="wizardNext">Get started</a>
                            </div>
                        </div>
                        <div :class="this.wizardIndex === 1 ? '_left-fade': 'hide'">
                            <div class="_item">
                              <h4>Step 2</h4>
<!--                              <p>Define key and domain. On default a new key will be generated and the did:web will be hosted at walt.id.</p>-->
                              <p>The did:web will be hosted at walt.id.</p>
                            </div>
                            <div class="mt-3 d-flex _button-view justify-content-center">
                                <div>
                                    <form action="" id="generate-did-submit" @submit.prevent="DIDgenerate">
                                        <input placeholder="Insert the domain (optional)" id="inserted-domain" name="insertedDomain" class="form-control _domain-form" style="width: 12em" :data="this.domain" v-model="domain"/>
                                        <button type="submit" name="submit" class="_bounce btn text-white mt-3" style="width: 200px">
                                            <span v-if="generationLoading">
                                               <img src="/dark-loader.gif" width="30px" style="opacity: 0.7" />
                                            </span>
                                            <span v-else>Generate DID</span> 
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div :class="this.wizardIndex === 2 ? '_fadin': 'hide'">
                            <div class="_item">
                              <div class="success-animation">
                                  <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                              </div>
                              <p>Your DID:web generated successfully</p>
                            </div>
                        </div>
                        <div :class="this.DIDgenerated === true ? '_fadin': 'hide'">
                            <div class="_item">
                              <p><strong>Successfully created</strong></p>
                              <p>did:web at:</p>
                              {{this.didHost}}
                              <textarea name="did-content" id="" cols="30" rows="5" class="mt-2 _did-content" :data="this.didContent" v-model="this.didContent"></textarea>
                              <p v-if="coppied" class="text-secondary _bounce" style="font-size: 13px">Copied successfully</p>
                              <button type="button" @click="onCopy" class="_bounce btn _btn-copy text-white mt-2" ><i class="bi bi-files me-2"></i>Copy DID</button>
                              <a href="/" class="_bounce btn _btn-blue text-white mt-2">Done</a>
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
                <a id="copyright" href="https://walt.id/" target="_blank">by walt.id</a>
            </div>
        </div> 
    </section>
</template>

<script>
import {menuTransitionShow, menuTransitionHide} from '@/helpers/menuTransation'
import { copyText } from 'vue3-clipboard'

export default {
  name: 'Ecosystems',
  data() {
    return {
      trigger: true,
      wizardIndex: 0,
      DIDgenerated: false,
      domain: '',
      didHost: '',
      generationLoading: false,
      didContent: '',
      coppied: false
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
    
    async DIDgenerate (){
      this.generationLoading= true;
      var did = "";
      try{
          if (this.domain) {
               did = await this.$axios.$post('/api/wallet/did/create', {
              "method": 'web',
              "didWebDomain": this.domain
            })
          } else {
               did = await this.$axios.$post('/api/wallet/did/create', {
              "method": 'web',
              "didWebDomain": this.domain
            })
          }
            console.log(did)
            this.$axios.$get(`https://wallet.waltid.org/api/wallet/did/${did}`)
            .then(
              res=>{
                this.didHost = did
                this.didContent=JSON.stringify(res, undefined, 2)
                console.log(res)
                this.generationLoading= false;
                this.wizardIndex = this.wizardIndex+1
                setTimeout(()=>{
                   this.DIDgenerated=true
                   this.wizardIndex = this.wizardIndex+1
                }, 2500);
              }
            )
            .catch(
              e=>console.log(e)
            )
            
            
        }catch(e){
            console.warn(e)
            this.generationLoading=false
        }
    },
    onCopy: function(){
        copyText(this.didContent, undefined, (error, event) => {
          if (error) {
            alert('Can not copy')
            console.log(error)
          } else {
            this.coppied=true;
            console.log(event)
          }
        })
    },
    logout: async function() {
      await this.$auth.logout();
    },
  }
};
</script>
