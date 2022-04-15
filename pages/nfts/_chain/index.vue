<template>
    <div id="content">
        <h2 class="_animation-fade">{{$t('NFTS.TITLE')}}</h2>
        <div class="_search">
            <form action="" id="search-form">
                <input name="search-input" type="text" v-model="search" :placeholder="$t('NFTS.SEARCH')">
            </form>
        </div>
        <div class="_scrollable d-flex flex-column align-items-center">
          <div class="mx-auto w-50 mb-3" v-for="nft in filteredList" v-bind:key="nft.id.tokenId">
            <a href="#" @click.prevent="navToNFT(nft)">
              <img :src="nft.metadata.image" class="img-fluid img-thumbnail" />
              <div style="font-size: 0.7rem; font-weight: bold;">{{nft.description}}</div>
            </a>
          </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'NFTs',
  data() {
    return {
      search: '',
      nfts: [],
      chain: this.$route.params.chain
    }
  },
  computed: {
    filteredList() {
      return this.nfts.filter(nft => {
        return JSON.stringify(nft).toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  async asyncData ({ $axios, $auth, route }) {
    if($auth.user.ethAccount != null) {
        const nfts = await $axios.$get("/v1/nft/chain/" + route.params.chain + "/owner/" + $auth.user.ethAccount)
        return { nfts }
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
