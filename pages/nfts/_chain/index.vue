<template>
    <div id="content">
        <h2 class="_animation-fade">{{$t('NFTS.TITLE')}}</h2>
        <div class="_search">
            <form action="" id="search-form">
                <input name="search-input" type="text" v-model="search" :placeholder="$t('NFTS.SEARCH')">
            </form>
            <b-form-select v-model="chain" :options="chainOptions"/>
        </div>
        <div class="_scrollable d-flex flex-column align-items-center">
          <div class="mx-auto w-50 mb-3" v-for="nft in filteredList" v-bind:key="nft.id.tokenId">
            <a href="#" @click.prevent="navToNFT(nft)">
              <video :src="$globals.mediaUrl(nft)" class="img-fluid img-thumbnail" v-if="$globals.isVideo(nft)" autoplay muted playsinline />
              <img :src="$globals.mediaUrl(nft)" class="img-fluid img-thumbnail" v-if="!$globals.isVideo(nft)" />
              <div style="font-size: 0.7rem; font-weight: bold;">{{nft.metadata.name}}</div>
            </a>
          </div>
        </div>
    </div>
</template>

<script>
import {config} from '/config.js'

export default {
  name: 'NFTs',
  data() {
    return {
      search: '',
      nfts: [],
      chain: this.$route.params.chain,
      chainOptions: this.$auth.user.ethAccount ? config.evmChains : config.tezosChains,
    }
  },
  watch: {
    chain: function (newVal, oldVal) {
      if(oldVal != newVal)
        console.log(`Reloading with ${newVal}`)
        this.$store.commit('wallet/setDefaultChain', newVal)
        this.$router.push({ name: "nfts-chain", params: { chain: newVal }})
    }
  },
  computed: {
    filteredList() {
      if(this.nfts.evmNfts){
        return this.nfts.evmNfts.filter(nft => {
          return JSON.stringify(nft).toLowerCase().includes(this.search.toLowerCase())
        })
      }else if(this.nfts.tezosNfts){
        return this.nfts.tezosNfts.filter(nft=>{return nft.token.metadata}).map(nft=>{
          return{
            contract:{
              address: nft.token.contract.address
            },
            id:{
              tokenId: nft.token.tokenId
            },
            metadata:{
              name: nft.token.metadata.name,
              image: nft.token.metadata.image ? nft.token.metadata.image : nft.token.metadata.displayUri
            }
          }
        })
      }else{
        return []
      }
     
    }
  },
  async asyncData ({ $axios, $auth, route }) {
    if($auth.user.ethAccount != null || $auth.user.tezosAccount != null) {
      const account= $auth.user.ethAccount ? $auth.user.ethAccount: $auth.user.tezosAccount
      const nfts = await $axios.$get("/v2/nftkit/nft/chain/" + route.params.chain + "/owner/" + account)
      return { nfts}
    } else {
        return {
            nfts: []
        }
    }
  },
  methods:{
    navToNFT(nft) {
      this.$router.push({name: "nfts-chain-id", params: { chain: this.chain, id: nft.contract.address + ":" + nft.id.tokenId}})
    }
  }
};
</script>
