<template>
  <div class="_setting">
      <h2>Key Import</h2>
      <!--<p class="mt-3">You have no Ecosystems.</p>-->
      <div class="d-flex align-items-center justify-content-center _wizard mt-3">
          <div :class="this.wizardIndex === 0 ? '': 'animate__fadeOutRight hide'">
            <form id="key-import-form" @submit.prevent="keyImport">
              <div class="_item">
                <p>Import a key in PEM or JWK format.</p>
                <p class="text-primary">Asymmetric key</p>
                <textarea :class="this.error ? '_asymmetric-key mt-3 border-danger' : '_asymmetric-key mt-3'" :data="this.asymmetrickey" v-model="asymmetrickey"></textarea>
              </div>
              <button type="submit" name="submit" class="_bounce btn btn-primary text-white mt-3" style="width: 200px">
                  <span v-if="importLoading">
                      <img src="/dark-loader.gif" width="30px" style="opacity: 0.7" />
                  </span>
                  <span v-else>Import</span> 
              </button>
            </form>
          </div>
          <div :class="this.wizardIndex === 1 ? '_fadin': 'hide'">
              <div class="_item">
                <div class="success-animation">
                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                </div>
                <p>Your key imported successfully</p>
                <div class="mt-3 d-flex _button-view justify-content-center">
                  <a class="_bounce btn" href="/settings">Done</a>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Import',
  data() {
    return {
      wizardIndex: 0,
      asymmetrickey: '',
      error: false,
      importLoading: false,
    }
  },
  methods:{

    
    async keyImport (){
        this.importLoading= true;
        await this.$axios
        .$post("/api/wallet/keys/import", this.asymmetrickey)
        .then((res) => {
          console.log(res);
          this.wizardIndex = this.wizardIndex + 1;
        })
        .catch((e) => {
          console.log(e);
          this.error = true;
        })
        .finally(() => (this.importLoading = false));
    }
  }
};
</script>
