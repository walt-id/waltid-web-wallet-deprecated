<template>
  <div>
      <div :class="'_content'">
          <div class="_setting">
              <h2 class="text-center">Account</h2>
              <br>
              <div class="mt-4 _setting-items">
                <div v-if="this.$store.state.auth.user.email">
                  <p class="text-left">Email</p>
                  <b class="text-left">{{this.$store.state.auth.user.email}}</b>
                </div>
                <div v-if="this.$store.state.auth.user.ethAccount" class="mt-2">
                  <p class="text-left">ETH Account</p>
                  <b class="text-left">{{this.$store.state.auth.user.ethAccount}}</b>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {}
</script>
