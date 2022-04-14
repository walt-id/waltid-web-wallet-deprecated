<template>
    <div id="content">
        <h2 class="_animation-fade">{{$t('NFTS.TITLE')}}</h2>
        <div class="_search">
            <form action="" id="search-form">
                <input name="search-input" type="text" v-model="search" :placeholder="$t('NFTS.SEARCH')">
            </form>
        </div>
        <div class="_scrollable d-flex flex-column align-items-center">
            <div class="_card d-flex" v-for="nft in filteredList" v-bind:key="nft.id.tokenId">
                <span>{{nft.description}}</span>
                <img :src="nft.metadata.image" class="img-fluid img-thumbnail rounded mx-auto d-block" />
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
      nfts: []
    }
  },
  computed: {
    filteredList() {
      return this.nfts.filter(nft => {
        return JSON.stringify(nft).toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  async asyncData ({ $axios, $auth }) {
    if($auth.user.ethAccount != null) {
        const nfts = await $axios.$get("/v1/nft/chain/RINKEBY/owner/" + $auth.user.ethAccount)
        return { nfts }
    } else {
        return {
            nfts: []
        }
    }
  },
  methods:{
  }
};
</script>
