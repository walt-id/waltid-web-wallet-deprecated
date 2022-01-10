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
                <div v-if="claimedCredentials.list.length > 0" id="content">
                    <h2>Credential request</h2>
                    <div class="_scrollable _container d-flex flex-column align-items-center justify-content-center">
                        <NuxtLink class="_card d-flex _animation-fade" :to="'/Credential?id='+encodeURIComponent(credential.id)" v-for="credential in claimedCredentials.list" :key="credential.id">
                          <div class="col-10 d-flex align-items-center">
                            <div>
                              <h5 class="mb-1">{{credential.title ? credential.title : credential.type[credential.type.length-1]}}</h5>
                              <p class="text-truncate" style="max-width: 12em">by {{credential.issuerName ? credential.issuerName : credential.issuer}}</p>
                            </div>
                          </div>
                        </NuxtLink>
                        <div class="_button mt-4">
                            <button href="#share" class="_share col-12 mb-2" @click="peSubmit()">Share</button>
                            <a href="#reject" class="_reject col-12">Reject</a>
                        </div>
                    </div>
                </div>
                <div v-if="claimedCredentials.list.length == 0" id="content">
                    <em>No matching credentials found for the current DID</em>
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
                          <a href="#" @click="logout">{{$t('MENU.LOGOUT')}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="_copyright _blue-color d-flex align-items-center justify-content-center">
                <a id="copyright" href="https://walt.id/" target="_blank">by walt.id</a>
            </div>
            <form ref="responseForm" method="post" :action="pe.request.redirect_uri">
              <input ref="responseIdToken" type="hidden" name="id_token" >
              <input ref="responseVpToken" type="hidden" name="vp_token" >
            </form>
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
      id: 'xxxxxxxxxx'
    }
  },
  async asyncData ({ $axios, query, store }) {
    const pe = await $axios.$get("/api/wallet/siopv2/presentationExchange", { params: { ...query, subject_did: store.state.wallet.currentDid } })
    let claimedCredentials = { list: [] }
    if(pe.claimedCredentials.length > 0) {
      var params = new URLSearchParams();
      pe.claimedCredentials.map(c => c.credentialId).forEach(id => params.append("id", id))
      const requestCfg = {
        params: params
      };
      claimedCredentials = await $axios.$get("/api/wallet/credentials/list", requestCfg)
    }
    return { pe, claimedCredentials }
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
    peSubmit: async function() {
      const peResp = await this.$axios.$post("/api/wallet/siopv2/presentationExchange", this.pe)
      console.log("PE Response:", peResp)
      this.$refs.responseIdToken.value = peResp.id_token
      this.$refs.responseVpToken.value = peResp.vp_token
      this.$refs.responseForm.submit()
    },
    logout: async function() {
      await this.$auth.logout();
      this.$router.push('/login')
    },
  }
};
</script>
