<template>
<div>
  <h1>Issuance or Presentation Error</h1>
  <div class="text-secondary">{{reason}}</div>
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