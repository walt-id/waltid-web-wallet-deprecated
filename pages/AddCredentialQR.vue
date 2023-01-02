<template>
<div>
  <h2 class="_animation-fade">{{ $t("ADD_CREDENTIAL.TITLE") }}</h2>
  <video id="scanner-video" class="image-fluid mx-auto img-thumbnail"></video>
  <input type="text" class="form-control border-primary mb-2 mx-auto" v-model="oidcUri">
  <button :disabled="oidcUri == null" class="btn btn-primary" @click="start(null)">Start</button>
</div>
</template>
	
<script>
import QrScanner from 'qr-scanner'
export default {
	name: "AddCredentialQR",
  data() {
    return {
      oidcUri: null
    }
  },
  methods: {
    async startIssuance() {
      await this.$axios.$post('/api/wallet/issuance/startIssuerInitiatedIssuance', {
        "oidcUri": this.oidcUri
      }).then(sessionId => {
        this.$router.replace("/InitiateIssuance?sessionId=" + sessionId)
      }, reason => {
        this.$router.replace("/IssuanceError?reason=" + reason)
      })
    },
    async startPresentation() {
      await this.$axios.$post('/api/wallet/presentation/startPresentation', {
        "oidcUri": this.oidcUri
      }).then(sessionId => {
        this.$router.replace("/CredentialRequest/?sessionId=" + sessionId)
      }, reason => {
        this.$router.replace("/IssuanceError?reason=" + reason)
      })
    },
    async start(requestType) {
      if(requestType == null) {
        requestType = await this.detectRequestType(this.oidcUri)
      }
      if(requestType == "credential-offer") {
        this.startIssuance();
      } else if(requestType == "presentation-request") {
        this.startPresentation();
      } else {
        console.log("Request type unknown")
      }
    },
    async detectRequestType(uri) {
      return await this.$axios.$get('/api/wallet/oidc/detectRequestType', 
        { 
          params: { uri }
        }
      )
    },
    async checkScanResult(result) {
      return await this.detectRequestType(result.data)
    }
  },
  mounted() {
    const qrScanner = new QrScanner(document.getElementById("scanner-video"), 
      async result => {
        const requestType = await this.checkScanResult(result)
        if(requestType == "credential-offer" || requestType == "presentation-request") {
          qrScanner.stop()
          this.oidcUri = result.data;
          this.start(requestType);
        } else {
          console.log("Failed to parse QR code", result.data)
        }
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true
      });
    qrScanner.start()
  }
}
</script>
	
<style scoped>
	
</style>