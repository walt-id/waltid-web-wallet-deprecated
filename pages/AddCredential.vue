<template>
  <div>
    <h2 class="_animation-fade">{{ $t("ADD_CREDENTIAL.TITLE") }}</h2>
    <div class="mt-4 d-flex justify-content-center align-items-center" style="height: 200px">
      <div>
        <div>
          <p class="mb-2 text-secondary">Choose issuer</p>
          <div>
            <select class="form-select" aria-label="Default select example" v-model="selectedIssuer"
              @change="fetchIssuerMeta($event)">
              <option v-for="issuer in issuers" :key="issuer.id" :value="issuer.id">
                {{ issuer.description }}
              </option>
            </select>
          </div>
        </div>
        <div v-if="selectedIssuerMeta != null">
          <p class="mb-2 mt-3 text-secondary">Choose credential type</p>
          <div>
            <select class="form-select" aria-label="Default select example" v-model="selectedCredentialType">
              <option v-for="type in credentialTypes" :key="type.type" :value="type.type">
                {{ type.title }}
              </option>
            </select>
          </div>
        </div>
        <div v-if="selectedCredentialType">
          <button type="button" class="btn btn-primary mt-3" @click="startIssuance()" style="width: 100%">
            Fetch credential
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "AddCredential",
  data() {
    return {
      selectedIssuer: null,
      selectedIssuerMeta: null,
      selectedCredentialType: null,
    };
  },
  async asyncData({ $axios }) {
    // TODO: select DID to use
    const issuers = await $axios.$get("/api/wallet/issuer/list");
    return { issuers };
  },
  computed: {
    dids() {
      console.log(this.$store.state.wallet.dids)
      return this.$store.state.wallet.dids
    },
    currentDid() {
      console.log(this.$store.state.wallet.currentDid)
      return this.$store.state.wallet.currentDid
    },
    credentialTypes() {
      if (this.selectedIssuerMeta != null) {
        console.log(this.selectedIssuerMeta);
        if(this.selectedIssuerMeta.credentials_supported != null) {
          return Object.keys(this.selectedIssuerMeta.credentials_supported).map(
            k => { 
              return {
              type: k,
              title: this.selectedIssuerMeta.credentials_supported[k].display[0].name 
            }}
          );
        } else if(this.selectedIssuerMeta.credential_manifests != null) {
          return this.selectedIssuerMeta.credential_manifests.flatMap(
            (m) => m.output_descriptors
          ).map (d => {
            return {
              type: d.schema,
              title: d.name
            }
          });
        } else return [];
      } else return [];
    }
  },
  methods: {
    fetchIssuerMeta: async function ($event) {
      this.selectedIssuerMeta = await this.$axios.$get(
        "/api/wallet/issuer/metadata?issuerId=" + $event.target.value
      );
    },
    startIssuance: async function () {
      const location = await this.$axios.$post('/api/wallet/issuance/start', {
        did: this.currentDid,
        issuerId: this.selectedIssuer,
        credentialTypes: [this.selectedCredentialType],
        walletRedirectUri: '/Credentials'
      })
      window.location = location
    }
  },
};
</script>