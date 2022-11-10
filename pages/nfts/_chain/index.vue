<template>
  <div>
    <div v-if="$store.state.utils.fullPageModal" class="adjust-modal">
      <h2 class="_animation-fade mb-4">{{$t('NFTS.ADJUST_MODAL.TITLE')}}</h2>
      <div class="d-flex justify-content-between mb-2">
        <p class="mb-0">Chain</p>
        <span v-b-tooltip.hover.click.topright="{ customClass: 'c-tooltip' }" title="Chain from which NFTs are gathered" class="bi bi-question-circle"></span>
      </div>
      <b-form-select v-model="chain" :options="chainOptions" @change="$store.commit('utils/toggleFullPageModal')" class="form-select" />
    </div>
    <div id="content" v-else>
      <h2 class="_animation-fade">{{$t('NFTS.TITLE')}}</h2>
      <p v-if="chain != null" @click="$store.commit('utils/toggleFullPageModal')" style="cursor: pointer;" class="mt-3 mb-2">{{chain}}</p>
        <div class="_search">
            <form action="" id="search-form">
                <div class="d-flex align-items-center justify-content-center" style="gap: 0.3rem">
                  <input name="search-input" type="text" v-model="search" :placeholder="$t('NFTS.SEARCH')">
                  <span @click="$store.commit('utils/toggleFullPageModal')" style="cursor: pointer;">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" style="width: 42px; height: 42px;">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                    </svg>
                  </span>
                </div>
            </form>
        </div>
        <div class="_scrollable d-flex flex-column align-items-center">
          <div class="mx-auto w-50 mb-3" v-for="nft in filteredList" v-bind:key="nft.id.tokenId">
            <a href="#" @click.prevent="navToNFT(nft)">
              <TokenMediaComponent :nft="nft" thumbnail/>
              <div style="font-size: 0.7rem; font-weight: bold;">{{nft.metadata.name}}</div>
            </a>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import {config} from '/config.js'
import TokenMediaComponent from "~/components/TokenMediaComponent.vue";

export default {
  name: 'NFTs',
  data() {
    return {
      search: '',
      nfts: [],
      chain: this.$route.params.chain,
      chainOptions: this.$auth.user.ethAccount ? config.evmChains : config.tezosChains,
      adjustModal: false,
    }
  },
  components: {
    TokenMediaComponent,
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

<style lang="sass" scoped>
.c-tooltip
  &:deep
    .tooltip-inner
      max-width: unset
</style>