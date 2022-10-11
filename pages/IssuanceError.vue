<template>
<div>
  <h1>Issuance Error</h1>
  <div>{{reason}}</div>
</div>
</template>
	
<script>
export default {
	name: "IssuanceError",
  computed: {
    reason() {
      return this.$route.query.reason
    }
  }
}
</script>
	
<style scoped>
	
</style>