<template>
  <section
    class="
      _main
      bg-light
      row
      align-items-center
      justify-content-center
      justify-content-lg-start
      justify-content-md-center
      justify-content-sm-center
      p-0
    "
  >
    <div id="widget" class="_form d-black bg-w shadow-lg text-center">
      <div
        class="
          _toggle-menu
          position-sticky
          d-flex
          justify-content-end
          col-12
          align-items-center
          px-3
        "
      >
        <a id="toggle-menu" @click="menuTrigger">
          <div id="dash-1" class="_dash my-2"></div>
          <div id="dash-2" class="_dash my-2"></div>
          <div id="dash-3" class="_dash my-2"></div>
        </a>
      </div>
      <div class="_content justify-content-center d-flex align-items-center">
        <div id="content">
          <h2 class="_animation-fade">{{ $t("ADD_CREDENTIAL.TITLE") }}</h2>
          <div class="mt-4 d-flex justify-content-center align-items-center" style="height: 200px">
            <div>
              <div>
              <p class="mb-2 text-secondary">Choose issuer</p>
              <div>
                <select class="form-select" aria-label="Default select example" v-model="selectedIssuer" @change="fetchIssuerMeta($event)">
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
        <div id="menu-content" class="_menu-content hide">
          <ul>
            <li>
              <NuxtLink to="/credentials">{{
                $t("MENU.CREDENTIALS")
              }}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/connections">{{
                $t("MENU.CONNECTIONS")
              }}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/settings">{{ $t("MENU.SETTINGS") }}</NuxtLink>
            </li>
            <li>
              <a @click="logout">{{ $t("MENU.LOGOUT") }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="
          _copyright
          _blue-color
          d-flex
          align-items-center
          justify-content-center
        "
      >
        <a id="copyright" href="https://walt.id/" target="_blank">by walt.id</a>
      </div>
    </div>
  </section>
</template>
<script>
import {menuTransitionShow, menuTransitionHide} from '../helpers/menuTransation'
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
    dids () {
      console.log(this.$store.state.wallet.dids)
      return this.$store.state.wallet.dids
    },
    currentDid () {
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
    initIssuance: async function() {
      const location = await this.$axios.$post('/api/wallet/siopv2/initIssuance', {
        did: this.currentDid,
        issuerId: this.selectedIssuer,
        schemaIds: [ this.selectedCredentialSchema ],
        walletRedirectUri: '/Credentials'
      })
      window.location = location
    },
    menuTrigger: function(){
          if(this.trigger === true){
              menuTransitionShow()
              this.trigger = false
          }
          else{
              menuTransitionHide()
              this.trigger = true
          }
    },
    logout: async function() {
      await this.$auth.logout();
      this.$router.push('/login')
    },
  },
};
</script>