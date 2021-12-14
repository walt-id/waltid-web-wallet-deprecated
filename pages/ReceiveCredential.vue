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
                <div id="content-confirm" v-if="!receivedCredentials && !selectedCredential">
                    <h2>{{$t('RECEIVE_CREDENTIALS.CONFIRM_TITLE')}}</h2>
                    <div class="_scrollable _container d-flex flex-column align-items-center justify-content-center">
                        <div class="col-10 d-flex align-items-center">
                          <div>
                            <h5 class="mb-1">{{pe.request.registration.client_name}}</h5>
                            <p>{{pe.request.registration.client_purpose}}</p>
                          </div>
                        </div>
                        <div class="_button">
                            <button href="#confirm" class="_share col-12 mb-2" @click="peSubmit()">{{$t('RECEIVE_CREDENTIALS.CONFIRM')}}</button>
                            <a href="#reject" class="_reject col-12">{{$t('RECEIVE_CREDENTIALS.REJECT')}}</a>
                        </div>
                    </div>
                </div>
                <div id="content-credentials" v-if="receivedCredentials && !selectedCredential">
                  <h2>{{$t('RECEIVE_CREDENTIALS.RECEIVED_CREDENTIALS_TITLE')}}</h2>
                  <div class="_scrollable _container d-flex flex-column align-items-center justify-content-center">
                    <a v-for="credential in receivedCredentials" :key="credential.id"
                       class="_card d-flex _animation-fade" href="#selectCredential"
                       @click="selectedCredential = credential">
                      <div class="col-10 d-flex align-items-center">
                        <div>
                          <h5 class="mb-1">{{credential.title ? credential.title : credential.type[credential.type.length-1]}}</h5>
                          <p class="text-truncate" style="max-width: 12em">by {{credential.issuerName ? credential.issuerName : credential.issuer}}</p>
                        </div>
                      </div>
                    </a>
                    <div class="_button">
                      <button href="#share" class="_share col-12 mb-2" @click="$router.push('/Credentials')">{{$t('RECEIVE_CREDENTIALS.ACCEPT')}}</button>
                      <a href="#reject" class="_reject col-12">{{$t('RECEIVE_CREDENTIALS.REJECT')}}</a>
                    </div>
                  </div>
                </div>
                <div v-if="selectedCredential">
                  <div class="_top-bar  position-sticky d-flex justify-content-center col-12 align-items-center px-3">
                    <div class="col-12 d-flex align-items-center _animation-fade">
                      <a href="" @click.prevent="selectedCredential = null" class="_back-button">
                        <span class="d-flex align-items-center">
                            <i class="bi bi-chevron-left"></i>
                            <p>{{$t('BACK')}}</p>
                        </span>
                      </a>
                    </div>
                  </div>
                  <div class="_window d-flex justify-content-center align-items-center">
                    <div class="_window-content m-2 p-2">
                      <CredentialView :credential="selectedCredential" class="p-4">
                      </CredentialView>
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
                          <NuxtLink to="/login">{{$t('MENU.LOGOUT')}}</NuxtLink>
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

import {menuTransitionShow, menuTransitionHide} from '../helpers/menuTransation'

export default {
  name: 'CredentialRequest',
  data() {
    return {
      trigger: true,
      id: 'xxxxxxxxxx',
      receivedCredentials: null,
      selectedCredential: null
    }
  },
  async asyncData ({ $axios, query }) {
    // TODO: select DID to use
    const dids = await $axios.$get("/api/wallet/did/list")
    const pe = await $axios.$get("/api/wallet/siopv2/credentialIssuance", { params: { ...query, subject_did: dids[0] } })
    return { pe }
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
    async peSubmit () {
      const peResp = await this.$axios.$post("/api/wallet/siopv2/credentialIssuance", this.pe)
      this.receivedCredentials = peResp
    }
  }
};
</script>
