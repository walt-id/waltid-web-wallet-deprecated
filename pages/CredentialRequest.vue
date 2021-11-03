<template>
    <section class="_main bg-light row align-items-center justify-content-center justify-content-lg-start justify-content-md-center justify-content-sm-center p-0">
        <div id="widget" class="_form d-black bg-w shadow-lg text-center">
            <div class="_toggle-menu position-sticky d-flex justify-content-end col-12 align-items-center px-3">
                <a href="#sm" id="toggle-menu" @click="menuTrigger">
                    <div id="dash-1" class="_dash my-2"></div>
                    <div id="dash-2" class="_dash my-2"></div>
                    <div id="dash-3" class="_dash my-2"></div>
                </a>
            </div>
            <div class="_content justify-content-center d-flex align-items-center ">
                <div id="content">
                    <h2>Credential request</h2>
                    <div class="_container d-flex flex-column align-items-center justify-content-center">
                        <router-link class="_card d-flex _animation-fade" to="/Credential" v-for="credential in claimedCredentials.list" :key="credential.id">
                            <div class="col-12 d-flex align-items-center">
                                <div>
                                    <h5>{{ credential.credentialSubject.firstName }} {{ credential.credentialSubject.familyName }}</h5>
                                    <p>{{ credential.credentialSubject.dateOfBirth }}</p>
                                </div>
                            </div>
                        </router-link>
                        <div class="_button">
                            <button href="#share" class="_share col-12 mb-2" @click="peSubmit()">Share</button>
                            <a href="#reject" class="_reject col-12">Reject</a>
                        </div>
                    </div>
                </div>
                <div id="menu-content" class="_menu-content hide">
                    <ul>
                        <li>
                            <router-link to="/credentials">Credentials</router-link>
                        </li>
                        <li>
                            <router-link to="/connections">Connections</router-link>
                        </li>
                        <li>
                            <router-link to="/settings">Settings</router-link>
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
  async asyncData ({ $axios, query }) {
    // TODO: select DID to use
    const dids = await $axios.$get("/api/wallet/did/list")
    const pe = await $axios.$get("/api/wallet/siopv2/presentationExchange", { params: { ...query, subject_did: dids[0] } })
    const claimedCredentials = await $axios.$get("/api/wallet/credentials/list", { params: { id: pe.claimedCredentials.map(c => c.credentialId) } })
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
    async peSubmit () {
      const peResp = await this.$axios.$post("/api/wallet/siopv2/presentationExchange", this.pe)
      console.log("PE Response:", peResp)
      this.$refs.responseIdToken.value = peResp.id_token
      this.$refs.responseVpToken.value = peResp.vp_token
      this.$refs.responseForm.submit()
    }
  }
};
</script>
