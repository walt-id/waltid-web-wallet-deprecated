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
        <div class="_window-content">
          <div class="pt-2">
            <h1>{{nft.title}}</h1>
            <div class="d-flex justify-content-center mb-3">
              <div style="height: 300px" class="d-flex align-items-center">
                <img :src="nft.metadata.image" class="image-fluid mx-auto img-thumbnail nft-img" v-show="!showQR" @click="toggleShowQR()" />
                <canvas :id="'qr-' + tokenId" v-show="showQR" @click="toggleShowQR()" />
              </div>
            </div>
            <div>
              <button v-if="showRedeem" class="btn btn-primary py-2" style="width: 70%;">
                <i class="bi bi-cash me-2"></i>Redeem
              </button>
            </div>
            <div class="text-left pt-2">
              <span class="col-12 pb-3">
                  <h5>{{ $t('NFT.NAME') }}</h5>
                  <p>{{ nft.metadata.name }}</p>
              </span>
              <span class="col-12 px-3">
                  <h5>{{ $t('NFT.CONTRACT_ADDRESS') }}</h5>
                  <p>{{ nft.contract.address }}</p>
              </span>
              <span class="col-12 px-3">
                  <h5>{{ $t('NFT.TOKEN_ID') }}</h5>
                  <p>{{ nft.id.tokenId }}</p>
              </span>
              <span class="col-12 px-3">
                  <h5>{{ $t('NFT.TOKEN_STANDARD') }}</h5>
                  <p>{{ nft.id.tokenMetadata.tokenType }}</p>
              </span>
              <span class="col-12 px-3">
                  <h5>{{ $t('NFT.BLOCKCHAIN') }}</h5>
                  <p>{{ chain }}</p>
              </span>
              <span class="col-12 px-3">
                  <h5>{{ $t('NFT.DESCRIPTION') }}</h5>
                  <p>{{ nft.metadata.description }}</p>
              </span>
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
      showQR: false
    }
  },
  computed: {
    contractAddress() {
      return this.$route.params.id.split(":")[0]
    },
    tokenId() {
      return this.$route.params.id.split(":")[1]
    },
    nft() {
      return this.nfts.filter(n => n.contract.address == this.contractAddress && n.id.tokenId == this.tokenId)[0]
    },
    showRedeem() {
      return this.$route.query.redeem == "true"
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
    }
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
