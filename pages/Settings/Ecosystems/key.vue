<template>
  <div class="_setting">
      <h2>Key (did:key)</h2>
      <!--<p class="mt-3">You have no Ecosystems.</p>-->
      <div class="d-flex align-items-center justify-content-center _wizard mt-3">
          <div :class="this.wizardIndex === 0 ? '': 'animate__fadeOutRight hide'">
              <div class="_item">
                <h4>Step 1</h4>
                <p>Create a did:key.</p>
              </div>
              <div class="mt-3 d-flex _button-view justify-content-center">
                <a class="_bounce btn" @click="wizardNext">Get started</a>
              </div>
          </div>
          <div :class="this.wizardIndex === 1 ? '_left-fade': 'hide'">
              <div class="_item">
                <h4>Step 2</h4>
<!--                              <p>Define key and domain. On default a new key will be generated and the did:key will be hosted at walt.id.</p>-->
                <p>The did:key does not require any DLT, as the identifier is the encoded public key.</p>
              </div>
              <div class="mt-3 d-flex _button-view justify-content-center">
                  <div>
                      <form action="" id="generate-did-submit" @submit.prevent="DIDgenerate">
                        <p><label for="checkbox">Use jwk_jcs-pub</label></p>
                        <input type="checkbox" id="checkbox" v-model="useJwkJcsPub" />
                        
                        <BlockingButtonComponent :loading="generationLoading" label="Generate DID" />
                      </form>
                  </div>
              </div>
          </div>
          <div :class="this.wizardIndex === 2 ? '_fadin': 'hide'">
              <div class="_item">
                <div class="success-animation">
                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                </div>
                <p>Your DID:key generated successfully</p>
              </div>
          </div>
          <div :class="this.DIDgenerated === true ? '_fadin': 'hide'">
              <div class="_item">
                <p><strong>Successfully created</strong></p>
                <p>{{this.didHost}}</p>
                <textarea name="did-content" id="" cols="30" rows="5" class="mt-2 _did-content" :data="this.didContent" v-model="this.didContent"></textarea>
                <br>
                <p v-if="coppied" class="text-secondary _bounce mt-2" style="font-size: 13px">Copied successfully</p>
                <br>
                <a hre="#copy" @click="onCopy" class="_bounce btn _btn-copy text-white mt-2" ><i class="bi bi-files me-2"></i>Copy DID</a>
                <br>
                <a href="/" class="_bounce btn _btn-blue text-white mt-2">Done</a>
              </div>
          </div>
      </div>
      
  </div>
</template>

<script>
import { copyText } from 'vue3-clipboard'
import BlockingButtonComponent from '~/components/BlockingButtonComponent.vue'

export default {
  name: 'Key',
  data() {
    return {
      wizardIndex: 0,
      DIDgenerated: false,
      domain: '',
      didHost: '',
      generationLoading: false,
      didContent: '',
      useJwkJcsPub: false,
      coppied: false
    }
  },
  components: {
      BlockingButtonComponent,
  },
  methods:{
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
                  "method": "key",
                  "useJwkJcsPub": this.useJwkJcsPub
              })
          }
            console.log(did)
            this.$axios.$get(`/api/wallet/did/${did}`)
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
    }
  }
};
</script>
