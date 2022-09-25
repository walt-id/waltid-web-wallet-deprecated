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
            <select class="form-select" aria-label="Default select example" v-model="selectedCredentialSchema">
              <option v-for="schema in credentialSchemas()" :key="schema.schema" :value="schema.schema">
                {{ schema.name }}
              </option>
            </select>
          </div>
        </div>
        <div v-if="selectedCredentialSchema">
          <button type="button" class="btn btn-primary mt-3" @click="initIssuance()" style="width: 100%">
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
      selectedCredentialSchema: null,
    };
  },
  async asyncData({ $axios }) {
    // TODO: select DID to use
    const issuers = await $axios.$get("/api/wallet/siopv2/issuer/list");
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
    }
  },
  methods: {
    fetchIssuerMeta: async function ($event) {
      this.selectedIssuerMeta = await this.$axios.$get(
        "/api/wallet/siopv2/issuer/metadata?issuerId=" + $event.target.value
      );
    },
    credentialSchemas: function () {
      if (this.selectedIssuerMeta != null) {
        console.log(this.selectedIssuerMeta);
        return this.selectedIssuerMeta.credential_manifests.flatMap(
          (m) => m.output_descriptors
        );
      } else return [];
    },
    initIssuance: async function () {
      const location = await this.$axios.$post('/api/wallet/siopv2/initIssuance', {
        did: this.currentDid,
        issuerId: this.selectedIssuer,
        schemaIds: [this.selectedCredentialSchema],
        walletRedirectUri: '/Credentials'
      })
      window.location = location
    }
  },
};
</script>