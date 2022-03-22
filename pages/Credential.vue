<template>
    <section class="_main bg-light row align-items-center justify-content-center justify-content-lg-start justify-content-md-center justify-content-sm-center p-0">
        <div id="widget" class="_form d-black bg-w shadow-lg">
            <div class="_top-bar  position-sticky d-flex justify-content-center col-12 align-items-center px-3">
                <div class="col-6 d-flex align-items-center _animation-fade">
                    <a href="" @click.prevent="$router.back()" class="_back-button">
                        <span class="d-flex align-items-center">
                            <i class="bi bi-chevron-left"></i>
                            <p>Back</p>
                        </span>
                    </a>
                </div>
                <div class="col-6 d-flex align-items-center justify-content-end">
                    <div class="btn-group dropstart  _animation-fade">
                        <button type="button" class="_more-button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="d-flex align-items-center justify-content-center">
                                <i class="bi bi-three-dots"></i>
                            </span>
                        </button>
                        <ul class="dropdown-menu _dropdown">
                            <li><a class="dropdown-item text-dark" href="#share">Share</a></li>
                            <li><a class="dropdown-item text-danger" href="#delete">Delete</a></li>
                        </ul>
                    </div>
                </div>

            </div>
            <div class="_window d-flex justify-content-center align-items-center">
                <div class="_window-content m-2 p-2 ">
                    <CredentialView :credential="credential" class="p-3"></CredentialView>
                    <div class="_button mb-5 mx-5 text-center">
                        <a href="#copy" class="btn btn-secondary col-12 mb-3" @click="onCopy"><i class="bi bi-files me-3"></i>Copy Credential</a>
                        <a class="btn btn-danger col-12 mb-3" @click="deleteCredential"><i class="bi bi-trash me-3"></i>{{$t('CREDENTIAL.DELETE')}}</a>
                        <span v-if="this.coppied" class="text-secondary _fadin">Credential coppied to your clipboard</span>
                        <span v-if="this.deleted" class="text-secondary _fadin">Deleted Credential Successfully</span>
                        <span v-if="this.onDelete" class="text-secondary _fadin">
                            <img src="dark-loader.gif" width="30px" style="opacity: 0.9" />
                        </span>
                        <span v-if="this.onDelete" class="text-danger _fadin">Deleting the credential...</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import {menuTransitionShow, menuTransitionHide} from '../helpers/menuTransation'
import { copyText } from 'vue3-clipboard'

export default {
  name: 'Credential',
  data() {
    return {
      trigger: true,
      credentialContent: '',
      coppied: false,
      onDelete: false,
      deleted: false
    }
  },
  async asyncData ({ $axios, query }) {
    // TODO: select DID to use
    const credList = await $axios.$get("/api/wallet/credentials/list", { params: { id: query.id }})
    //this.credentialContent = credList.list[0]
    const credential = credList.list[0]
    return { credential }
  },
  methods:{
    menuTrigger: function(){
          if(this.trigger === true){
              menuTransitionShow()
              this.trigger = false
          }
          else{
              menuTransitionHide()
              this.trigger = true
          }
    },
    deleteCredential: async function() {
        if(this.credential != null) {
            const delResp = await this.$axios.delete("/api/wallet/credentials/delete/" + encodeURIComponent(this.credential.id))
            this.onDelete = true;
            if(delResp.status == 200) {
                this.onDelete = false;
                this.deleted = true;
                setTimeout(() => {
                    this.$router.back()
                }, 2500);
                
            }
        }
    },
    onCopy: function(){
        const copyContent = JSON.stringify(this.credential)
        copyText(copyContent, undefined, (error, event) => {
          if (error) {
            alert('Can not copy')
            console.log(error)
          } else {
            this.coppied=true;
            console.log(event)
          }
        })
    },
  }
};
</script>
