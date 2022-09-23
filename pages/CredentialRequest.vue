<template>
  <div>
      <div v-if="presentationSessionInfo && !selectedCredential" id="content">
          <h2>Presentation request</h2>
          <div class="_scrollable _container d-flex flex-column align-items-center justify-content-center">
              <div v-if="presentableCredentials.length > 0">
                <div class="form-check col-md-9 col-sm-12 mb-3" v-for="credential in presentableCredentials" :key="credential.id">
                  <div class="row justify-content-center">
                    <div class="col-2">
                    <input class="form-check-input me-4" type="checkbox" :id="'credential-' + credential.id" :name="'credential-' + credential.id" :value="credential.id" v-model="checkedCredentialIds">
                    </div>
                    <div class="col-10">
                    <a @click="selectedCredential = credential">{{credential.title ? credential.title : $t('CREDENTIAL.TYPE.' + credential.type[credential.type.length-1]) }}</a>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="requiredSchemaIds.length == 0 && presentableCredentials.length == 0">
                <em>Empty presentation requested, confirm to continue</em>
              </div>
              <div v-if="presentableCredentials.length == 0 && requiredSchemaIds.length > 0" id="content">
                  <em>No matching credentials found for the current DID</em>
              </div>
              <div class="_button mt-4" v-if="presentableCredentials.length > 0 || requiredSchemaIds.length == 0">
                  <button href="#share" class="_share col-12 mb-2" @click="peSubmit()">Share</button>
                  <a href="#reject" class="_reject col-12">Reject</a>
              </div>
              <div class="mt-4" v-if="presentationSessionInfo.availableIssuers != null && presentationSessionInfo.availableIssuers.length > 0">
                <div><b>Available issuers:</b></div>
                <select class="form-select" v-model="selectedIssuer">
                  <option v-for="issuer in presentationSessionInfo.availableIssuers" :key="issuer.id" :value="issuer.id">
                    {{ issuer.description }}
                  </option>
                </select>
                <div class="_button">
                <button href="#fetch" class="_share col-12 mb-2" @click="fetchFromIssuer()" :disabled="selectedIssuer == null">Fetch credential from issuer</button>
                </div>
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
      <form ref="responseForm" method="post" :action="presentationSessionInfo.redirectUri">
        <input ref="responseIdToken" type="hidden" name="id_token">
        <input ref="responseVpToken" type="hidden" name="vp_token">
        <input ref="responsePresentationSubmission" type="hidden" name="presentation_submission">
        <input ref="responseState" type="hidden" name="state">
      </form>
  </div>
</template>

<script>

export default {
  name: 'CredentialRequest',
  data() {
    return {
      id: 'xxxxxxxxxx',
      selectedCredential: null,
      checkedCredentialIds: [],
      selectedIssuer: null
    }
  },
  async asyncData ({ $axios, query, store }) {
    if(query.sessionId != null) {
      const presentationSessionInfo = await $axios.$get("/api/wallet/siopv2/continuePresentation", { params: { ...query, did: store.state.wallet.currentDid } })
      let presentableCredentials = []
      if(presentationSessionInfo.presentableCredentials.length > 0) {
        var params = new URLSearchParams();
        presentationSessionInfo.presentableCredentials.map(c => c.credentialId).forEach(id => params.append("id", id))
        const requestCfg = {
          params: params
        };
        const presentableCredentialsList = await $axios.$get("/api/wallet/credentials/list", requestCfg)
        presentableCredentials = presentableCredentialsList.list
      }
      const checkedCredentialIds = presentableCredentials.map(cred => cred.id)
      let selectedIssuer = null
      if(presentationSessionInfo.availableIssuers != null && presentationSessionInfo.availableIssuers.length > 0) {
        selectedIssuer = presentationSessionInfo.availableIssuers[0].id
      }
      return { presentationSessionInfo, presentableCredentials, selectedIssuer, checkedCredentialIds }
    }
  },
  computed: {
    requiredSchemaIds() {
      // TODO: adapt for Presentation exchange (2.0), where no schema uri is necessarily available
      return this.presentationSessionInfo.presentationDefinition.input_descriptors
      .filter(idesc => idesc.schema != null)
      .map(idesc => idesc.schema.uri)
    },
    currentDid () {
        console.log(this.$store.state.wallet.currentDid)
        return this.$store.state.wallet.currentDid
    }
  },
  methods:{
    peSubmit: async function() {
      const selectedPresentableCredentials = this.presentationSessionInfo.presentableCredentials.filter(c => this.checkedCredentialIds.findIndex(id => id == c.credentialId) >= 0)
      if(this.presentationSessionInfo.isPassiveIssuanceSession) {
        const issuanceSessionId = await this.$axios.$post("/api/wallet/siopv2/fulfillPassiveIssuance", selectedPresentableCredentials, { params: { sessionId: this.presentationSessionInfo.id }})
        this.$router.push("/ReceiveCredential?sessionId=" + issuanceSessionId)
      } else {
        const siopResp = await this.$axios.$post("/api/wallet/siopv2/fulfillPresentation", selectedPresentableCredentials, { params: { sessionId: this.presentationSessionInfo.id }})
        console.log("PE Response:", siopResp)
        this.$refs.responseIdToken.value = siopResp.id_token
        this.$refs.responseVpToken.value = siopResp.vp_token
        this.$refs.responsePresentationSubmission.value = siopResp.presentation_submission
        this.$refs.responseState.value = siopResp.state
        this.$refs.responseForm.submit()
      }
    },
    fetchFromIssuer: async function() {
      console.log(this.selectedIssuer)
      const location = await this.$axios.$post('/api/wallet/siopv2/initIssuance', {
        did: this.currentDid,
        issuerId: this.selectedIssuer,
        schemaIds: this.requiredSchemaIds,
        walletRedirectUri: '/CredentialRequest?sessionId=' + this.presentationSessionInfo.id
      })
      window.location = location
    }
  }
};
</script>
