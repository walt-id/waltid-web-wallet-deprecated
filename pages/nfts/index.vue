<template>
  <div></div>
</template>
<script>
export default {
  created() {
    this.$router.push({ name: "nfts-chain", params: { chain: this.$store.state.wallet.defaultChain }})
  }
}
</script>
