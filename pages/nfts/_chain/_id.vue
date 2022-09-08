<template>
  <div>
    <div class="position-sticky px-3 backbtn">
      <a href="" @click.prevent="$router.back()" class="_back-button">
          <span class="d-flex align-items-center">
              <i class="bi bi-chevron-left"></i> Back
          </span>
      </a>
    </div>
    <div class="_window d-flex justify-content-center align-items-center">
        <div class="_window-content px-3">
          <div class="pt-4">
            <h2 class="q-sans-md" style="color: #008CC8;">{{$globals.getTokenName(nft.token)}}</h2>
            <div class="d-flex justify-content-center mb-3">
              <div style="height: 300px" class="d-flex align-items-center">
                <video :src="$globals.mediaUrl(nft.token)" class="image-fluid mx-auto img-thumbnail nft-img" v-if="!showQR && $globals.isVideo(nft.token)" autoplay loop playsinline />
                <img :src="$globals.mediaUrl(nft.token)" class="image-fluid mx-auto img-thumbnail nft-img" v-if="!showQR && !$globals.isVideo(nft.token)" />
                <canvas :id="'qr-' + tokenId" v-show="showQR" @click="toggleShowQR()" />
              </div>
            </div>
            <div>
              <button v-if="showRedeem" :disabled="isRedeemed || redeemInProgress" :class="'btn py-2 ' + (isRedeemed ? 'btn-danger' : 'btn-success')" style="width: 70%;" @click="redeem">
                <span v-if="!isRedeemed && !redeemInProgress"><i class="bi bi-cash me-2"></i>Redeem</span>
                <span v-if="isRedeemed && !redeemInProgress"><i class="bi bi-cash me-2"></i>Token redeemed</span>
                <div v-if="redeemInProgress" class="spinner-border" role="status">
                  <span class="sr-only"></span>
                </div>
              </button>
              <button v-if="isRedeemable" type="button" class="btn btn-primary mt-2" @click="toggleShowQR" :disabled="isRedeemed"><i class="bi bi-upc-scan me-2"></i><span v-if="showQR">Close QR code</span><span v-if="!showQR">Show QR code</span></button>
            </div>
            <div class="text-left pt-2">
              <div v-if="isRedeemable && isRedeemed" class="alert alert-info mt-3 mx-3">
                <em>This token has already been redeemed.</em>
              </div>
              <span class="col-12 pb-3">
                  <h5>{{ $t('NFT.NAME') }}</h5>
                  <p>{{ nft.token.title }}</p>
              </span>
              <span class="col-12 px-3">
                  <h5>{{ $t('NFT.DESCRIPTION') }}</h5>
                  <p>{{ nft.token.description }}</p>
              </span>
              <span class="col-12 px-3">
                  <h5>{{ $t('NFT.CONTRACT_ADDRESS') }}</h5>
                  <p>{{ nft.address }}</p>
              </span>
              <span class="col-12 px-3">
                  <h5>{{ $t('NFT.TOKEN_ID') }}</h5>
                  <p>{{ nft.token.tokenId }}</p>
              </span>
              <span class="col-12 px-3">
                  <h5>{{ $t('NFT.TOKEN_STANDARD') }}</h5>
                  <p>{{ nft.standard }}</p>
              </span>
              <span class="col-12 px-3">
                  <h5>{{ $t('NFT.BLOCKCHAIN') }}</h5>
                  <p>{{ chain }}</p>
              </span>
            </div>
            <div class="p-3" v-if="$globals.isNotNullOrEmpty(nft.token.transactionExternalUrl)">
              <a type="button" class="btn btn-primary w-100" :href="nft.token.transactionExternalUrl" target="_blank">View on blockchain explorer</a>
            </div>
            <div class="px-3 py-3">
              <a type="button" class="btn btn-primary w-100 corp-e-reg" :href="openSeaUrl" target="_blank">View on OpenSea</a>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import QRious from "qrious"
export default {
  name: "NFT",
  data() {
    return {
      chain: this.$route.params.chain,
      showQR: false,
      redeemInProgress: false
    }
  },
  computed: {
    showRedeem() {
      return this.$route.query.redeem == "true"
    },
    isRedeemable() {
      return !this.showRedeem && this.nft.attributes.find(a => a.traitType == "redeemed") != null
    },
    isRedeemed() {
      return this.nft.attributes.find(a => a.traitType == "redeemed" && a.traitValue == "true") != null
    },
    contractAddress() {
      return this.$route.params.id.split(":")[0]
    },
    tokenId() {
      return this.$route.params.id.split(":")[1]
    },
    nft() {
      return this.nfts//.filter(n => n.contract.address == this.contractAddress && n.id.tokenId == this.tokenId)[0]
    },
    openSeaUrl() {
      return `https://opensea.io/assets/matic/${this.nft.address}/${this.nft.token.tokenId}`
    },
    contractUrl(){
      return `https://polygonscan.com/address/${this.nft.address}`
    }
  },
  async asyncData ({ $axios, $auth, route }) {
    // TODO: get info for single token
    const nfts = await $axios.$get("/nftkit/nft/chain/" + route.params.chain + "/owner/" + $auth.user.ethAccount)
    return {nfts}
  },
  mounted() {
    new QRious({
        element: document.getElementById('qr-' + this.tokenId),
        value: JSON.stringify(this.nft),
        size: 300
      })
  },
  methods: {
    toggleShowQR() {
      this.showQR = !this.showQR
    },
    async redeem() {
      console.log(this.nft)
      this.redeemInProgress = true
      await this.$axios.$post(`/api/wallet/nfts/redeemVoucher/${this.chain}/${this.nft.address}/${this.nft.token.tokenId}`)
      this.nft = {...await this.$axios.$get(`/api/wallet/nfts/get/${this.chain}/${this.nft.token.uuid}`)}
      this.redeemInProgress = false
      this.showToast()
    },
    showToast() {
      if(this.isRedeemed) {
        this.$toast.success('Token successfully redeemed', {duration: 3000, icon: 'bi bi-check-circle-fill', iconPack: 'custom-class', action : {
          text : 'OK',
          onClick : (e, toastObject) => {
              toastObject.goAway(0);
          }
        }})
      } else {
          this.$toast.error('Failed to redeem token', {duration: 3000, icon: 'bi bi-x-circle-fill', iconPack: 'custom-class',action : {
          text : 'OK',
          onClick : (e, toastObject) => {
              toastObject.goAway(0);
          }
        }})
      }
    },
  }
}
</script>

<style>

h1 {
  font-size: 1em;
  font-weight: bold;
}
.nft-img {
  max-height: 300px;
}

@media only screen and (max-width: 1080px)  {
  .backbtn {
    position: relative !important;
    top: -1em;
  }
  
}
</style>
