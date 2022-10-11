<template>
<div>
  <h2 class="_animation-fade">{{ $t("ADD_CREDENTIAL.TITLE") }}</h2>
  <video id="scanner-video" class="image-fluid mx-auto img-thumbnail"></video>
  <input type="text" class="form-control border-primary mb-2 mx-auto" v-model="oidcUri">
  <button :disabled="oidcUri == null" class="btn btn-primary" @click="startIssuance">Start issuance</button>
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
    startIssuance: async function () {
      await this.$axios.$post('/api/wallet/issuance/startIssuerInitiatedIssuance', {
        "oidcUri": this.oidcUri
      }).then(sessionId => {
        this.$router.replace("/InitiateIssuance?sessionId=" + sessionId)
      }, reason => {
        this.$router.replace("/IssuanceError?reason=" + reason)
      })
    },
    checkScanResult(result) {
      return result.data.startsWith("openid-initiate-issuance:/")
    }
  },
  mounted() {
    const qrScanner = new QrScanner(document.getElementById("scanner-video"), 
      result => {
        if(this.checkScanResult(result)) {
          qrScanner.stop()
          this.oidcUri = result.data;
          this.startIssuance();
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