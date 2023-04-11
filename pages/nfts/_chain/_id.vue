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
          <h2 class="q-sans-md" style="color: #008CC8;">{{ nft.metadata.name }}</h2>
          <div class="d-flex justify-content-center mb-3">
            <div style="height: 300px" class="d-flex align-items-center">
              <TokenMediaComponent :nft="nft" :showQR="showQR" />
              <canvas :id="'qr-' + tokenId" v-show="showQR" @click="toggleShowQR()" />
            </div>
          </div>
          <div>
            <button v-if="showRedeem" :disabled="isRedeemed || redeemInProgress"
              :class="'btn py-2 ' + (isRedeemed ? 'btn-danger' : 'btn-success')" style="width: 70%;" @click="redeem">
              <span v-if="!isRedeemed && !redeemInProgress"><i class="bi bi-cash me-2"></i>Redeem</span>
              <span v-if="isRedeemed && !redeemInProgress"><i class="bi bi-cash me-2"></i>Token redeemed</span>
              <div v-if="redeemInProgress" class="spinner-border" role="status">
                <span class="sr-only"></span>
              </div>
            </button>
            <button v-if="isRedeemable" type="button" class="btn btn-primary mt-2" @click="toggleShowQR"
              :disabled="isRedeemed"><i class="bi bi-upc-scan me-2"></i><span v-if="showQR">Close QR code</span><span
                v-if="!showQR">Show QR code</span></button>
          </div>
          <div class="text-left pt-2">
            <div v-if="isRedeemable && isRedeemed" class="alert alert-info mt-3 mx-3">
              <em>This token has already been redeemed.</em>
            </div>
            <span class="col-12 px-3">
              <h5>{{ $t('NFT.DESCRIPTION') }}</h5>
              <p>{{ nft.metadata.description }}</p>
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
          </div>
          <div class="p-3" v-if="$globals.isNotNullOrEmpty(nft.metadata.external_url)">
            <a type="button" class="btn btn-primary w-100" :href="nft.metadata.external_url" target="_blank">View on
              blockchain explorer</a>
          </div>
          <div class="px-3 py-3" v-if="$globals.isNotNullOrEmpty(marketplaceUrl)">
            <a type="button" class="btn btn-primary w-100 corp-e-reg" :href="marketplaceUrl" target="_blank">View on
              {{ marketplace }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRious from "qrious"
import { config } from '/config.js'
import TokenMediaComponent from "~/components/TokenMediaComponent.vue";

export default {
  name: "NFT",
  props: {

  },
  data() {
    return {
      chain: this.$route.params.chain,
      showQR: false,
      redeemInProgress: false,
    }
  },
  components: {
    TokenMediaComponent,
  },
  computed: {
    showRedeem() {
      return this.$route.query.redeem == "true"
    },
    isRedeemable() {
      return !this.showRedeem && this.nft.metadata.attributes && this.nft.metadata.attributes.find(a => a.trait_type == "redeemed") != null
    },
    isRedeemed() {
      return this.nft.metadata.attributes.find(a => a.trait_type == "redeemed" && a.value == "true") != null
    },
    contractAddress() {
      return this.$route.params.id.split(":")[0]
    },
    tokenId() {
      return this.$route.params.id.split(":")[1]
    },
    nft() {
      return this.nfts.filter(n => n.contract.address == this.contractAddress && n.id.tokenId == this.tokenId)[0]
    },
    marketplace() {
      let result = null
      if (config.evmChains.includes(this.chain)) {
        result = "OpenSea"
      }
      if (config.polkadotEvmChains.includes(this.chain)) {
        result = "Tofunft"
      }
      if (config.tezosChains.includes(this.chain)) {
        result = "Rarible"
      }

      return result
    },
    marketplaceUrl() {
      let url = config.marketplaces[this.chain]
      if (url != undefined) {
        return url + `${this.nft.contract.address}/${this.nft.id.tokenId}`
      } else {
        return ''
      }
    },
    contractUrl() {
      return `https://polygonscan.com/address/${this.nft.contract.address}`
    },
  },
  async asyncData({ $axios, $auth, route }) {
    // TODO: get info for single token
    let account = $auth.user.ethAccount ? $auth.user.ethAccount : $auth.user.tezosAccount ? $auth.user.tezosAccount : $auth.user.polkadotAccount ? $auth.user.polkadotAccount : $auth.user.polkadotEvmAccount ? $auth.user.polkadotEvmAccount : $auth.user.nearAccount
    console.log("ACCOUNT: ", account)
    if (route.params.chain == 'testnet') {
      const contractAddress = route.params.id.split(":")[0]
      const tokenId = route.params.id.split(":")[1]
      const result = await $axios.$get("/v2/nftkit/nft/near/chain/" + route.params.chain + "/contract/" + contractAddress + "/NFT/" + tokenId)
      return {
        nfts: [{
          contract: {
            address: contractAddress
          },
          id: {
            tokenId: result.token_id,
            tokenMetadata: {
              tokenType: null
            }
          },
          metadata: {
            name: result.metadata?.title,
            description: result.metadata?.description,
            image: result.metadata?.media,
            external_url: null
          }
        }]
      }
    } else {
      const result = await $axios.$get("/v2/nftkit/nft/chain/" + route.params.chain + "/owner/" + account)
      if (result.evmNfts) {
        const nfts = result.evmNfts
        return { nfts }}
      else if (result.tezosNfts) {
        const nfts = result.tezosNfts.map(nft => {
          return {
            contract: {
              address: nft.token.contract.address
            },
            id: {
              tokenId: nft.token.tokenId,
              tokenMetadata: {
                tokenType: nft.token.standard
              }
            },
            metadata: {
              name: nft.token.metadata?.name,
              description: nft.token.metadata?.name.description,
              image: nft.token.metadata?.image ? nft.token.metadata?.image : nft.token.metadata?.displayUri,
              external_url: route.params.chain == "TEZOS" ? `https://tzkt.io/${nft.token.contract.address}/operations/` : `https://ghostnet.tzkt.io/${nft.token.contract.address}/operations/`
            }
          }
        })
        return { nfts }
      } else if (result.polkadotEvmNft) {
        const nfts = result.polkadotEvmNft.map(nft => {
          return {
            contract: {
              address: nft.constractAddress
            },
            id: {
              tokenId: nft.tokenId,
              tokenMetadata: {
                tokenType: null
              }
            },
            metadata: {
              name: nft.nftMetadata?.name,
              description: nft.nftMetadata?.description,
              image: nft.nftMetadata?.image ? nft.nftMetadata?.image : nft.nftMetadata?.displayUri,
              external_url: null
            }
          }
        })
        return { nfts }
      }ZZ
    }
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
      await this.$axios.$post(`/api/wallet/nfts/redeemVoucher/${this.chain}/${this.nft.contract.address}/${this.nft.id.tokenId}`)
      this.nft = { ...await this.$axios.$get(`/api/wallet/nfts/get/${this.chain}/${this.nft.id.tokenId}`) }
      this.redeemInProgress = false
      this.showToast()
    },
    showToast() {
      if (this.isRedeemed) {
        this.$toast.success('Token successfully redeemed', {
          duration: 3000, icon: 'bi bi-check-circle-fill', iconPack: 'custom-class', action: {
            text: 'OK',
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        })
      } else {
        this.$toast.error('Failed to redeem token', {
          duration: 3000, icon: 'bi bi-x-circle-fill', iconPack: 'custom-class', action: {
            text: 'OK',
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        })
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

@media only screen and (max-width: 1080px) {
  .backbtn {
    position: relative !important;
    top: -1em;
  }

}</style>
