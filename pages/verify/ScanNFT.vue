<template>
  <div>
    <h1>Scan NFT</h1>
    <div>
      <video id="scanner-video" class="image-fluid mx-auto img-thumbnail"></video>
      <em>{{progressMsg}}</em>
    </div>
  </div>
</template>
<script>
import QrScanner from 'qr-scanner'

export default {
  name: "ScanNFT",
  data() {
    return {
      progressMsg: "Scanning for NFT QR code..."
    }
  },
  methods: {
    checkScanResult(result) {
      try {
       const resultObject = JSON.parse(result.data)
      return resultObject != null && resultObject.contract != null 
        && resultObject.contract.address != null
        && resultObject.id != null && resultObject.id.tokenId != null
        && resultObject.metadata != null && resultObject.metadata.image != null 
      } catch (error) {
        console.log("error parsing qr code result")
        return false
      }
    }
  },
  mounted() {
    const qrScanner = new QrScanner(document.getElementById("scanner-video"), 
      result => {
        if(this.checkScanResult(result)) {
          qrScanner.stop()
          const nft = JSON.parse(result.data)
          console.log("scan result", result)
          this.$router.replace({
            name: "nfts-chain-id", 
            params: { 
              chain: this.$store.state.wallet.defaultChain,
              id: nft.contract.address + ":" + nft.id.tokenId
            }, 
            query: { redeem: "true" }
          })
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
