<template>
    <div id="content">
        <h2 class="_animation-fade">{{$t('NFTS.TITLE')}}</h2>
        <div class="_search">
            <form action="" id="search-form">
                <input name="search-input" type="text" v-model="search" :placeholder="$t('NFTS.SEARCH')">
            </form>
        </div>
        <div class="_scrollable d-flex flex-column align-items-center">
          <!-- <div class="mx-auto w-50 mb-3" v-for="nft in filteredList" v-bind:key="nft.id.tokenId">
            <a href="#" @click.prevent="navToNFT(nft)">
              <img :src="nft.metadata.image" class="img-fluid img-thumbnail" />
              <div style="font-size: 0.7rem; font-weight: bold;">{{nft.description}}</div>
            </a>
          </div> -->
          <div class="mx-auto w-50 mb-3" v-for="nft in filteredList" v-bind:key="nft.token.tokenId">
            <a href="#" @click.prevent="navToNFT(nft)">
              <img :src="nft.token.transactionExternalUrl" class="img-fluid img-thumbnail" />
              <div style="font-size: 0.7rem; font-weight: bold;">{{nft.token.name}}</div>
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
  // eslint-disable-next-line
  async asyncData ({ $axios, $auth, route }) {
    if($auth.user.ethAccount != null) {
        // const nfts = await $axios.$get("/nftkit/nft/chain/" + route.params.chain + "/owner/" + $auth.user.ethAccount)
        return {
          nfts: [{"address":"0x21dd9b1913d84ab295fdf19834b0b6824a5912ca","attributes":[],"metadataUrl":"","standard":"ERC721","token":{"account":214,"collectable":2,"description":"An impressive 2278-meter suspension bridge over the Tagus River, but where does it lead?  Find out on the other side. With this ticket you can cross the bridge.","id":756,"imageUrl":"ipfs://bafybeians2y345aqtfpowdqsphjyhfrz32ltjmod6bdk52lbtmukesc26a","mediaType":"video","name":"Ticket","tokenId":"374","transactionExternalUrl":"https://polygonscan.com/tx/0x0db2dff84301d561aa86749f96862f59956937099936b0cffa487cbd6f9b66ce","transactionId":"0x0db2dff84301d561aa86749f96862f59956937099936b0cffa487cbd6f9b66ce","uuid":"0bf2a9c3-0401-4016-b138-f6959e9ad7bd"}},{"address":"0x9bc4d80c7b77ecc7107eac3961cb1dd98930f2b2","attributes":[{"traitType":"Category","traitValue":"Pushing the boundaries"},{"traitType":"Award","traitValue":"Dynamic thinkers"}],"metadataUrl":"","standard":"ERC721","token":{"account":214,"collectable":6,"description":"For the team that has built outstanding IP with their dynamic thinking, leading to exceptional publications and SATT.","id":757,"imageUrl":"ipfs://bafybeiddn2dcp4dczrykwzvqux74fpk5vap2vvwsg7nfwvtkpalecenvqy","mediaType":"video","name":"Pushing the boundaries: Dynamic thinkers","tokenId":"95","transactionExternalUrl":"https://polygonscan.com/tx/0xb4f6b64c9c110b8186810bcf51e469cfb68bcfb387d0a11e3baa7f57bb5d2d7c","transactionId":"0xb4f6b64c9c110b8186810bcf51e469cfb68bcfb387d0a11e3baa7f57bb5d2d7c","uuid":"836e010c-b996-439d-a2d7-6957024924c5"}},{"address":"0x21dd9b1913d84ab295fdf19834b0b6824a5912ca","attributes":[],"metadataUrl":"","standard":"ERC721","token":{"account":214,"collectable":13,"description":"Like in real life, your wallet must be secured. Cryptocurrencies make it possible to transfer value anywhere in a very easy way and it allows you to be in control of your money. Such great features also come with great security concerns. At the same time, cryptocurrencies can provide very high levels of security if used correctly. Always remember that it is your responsibility to adopt good practices in order to protect your money.","id":762,"imageUrl":"ipfs://bafybeifafghdpxy2rjtvqts3i7sipfhjkzo6s4pe36ovr7kup5zie5wqja","mediaType":"image","name":"Wallet Setup","tokenId":"383","transactionExternalUrl":"https://polygonscan.com/tx/0xbe102529a1ba9e8a3ca68e079cda1464044fcc550a9b32d21844c765d3eda258","transactionId":"0xbe102529a1ba9e8a3ca68e079cda1464044fcc550a9b32d21844c765d3eda258","uuid":"9ee09905-17e6-42b6-92db-4e06e85817de"}}]
        }
        // return { nfts }
    } else {
        return {
            nfts: []
        }
    }
  },
  methods:{
    navToNFT(nft) {
      // this.$router.push({name: "nfts-chain-id", params: { chain: this.chain, id: nft.contract.address + ":" + nft.id.tokenId}})
      this.$router.push({name: "nfts-chain-id", params: { chain: this.chain, id: nft.token.address + ":" + nft.token.tokenId}})
    }
  }
};
</script>
