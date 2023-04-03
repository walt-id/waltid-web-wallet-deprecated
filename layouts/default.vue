<template>
  <div>
    <Notice></Notice>
    <section class="_main bg-light row align-items-center justify-content-center justify-content-lg-start justify-content-md-center justify-content-sm-center">
    <div id="widget" :class="['_form d-grid bg-w shadow-lg text-center position-relative', !$store.state.utils.fullPageModal && 'align-items-center']">
      <span class="close-icon" @click="$store.commit('utils/toggleFullPageModal')" v-if="$store.state.utils.fullPageModal">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 45px; height: 45px;">
          <path d="M6 18L18 6M6 6L18 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <div v-if="!$store.state.utils.fullPageModal" class="_toggle-menu position-sticky d-flex justify-content-end col-12 align-items-center px-3">
        <a id="toggle-menu" @click="menuTrigger" v-if="!hideMenu">
          <div id="dash-1" class="_dash my-2"></div>
          <div id="dash-2" class="_dash my-2"></div>
          <div id="dash-3" class="_dash my-2"></div>
        </a>
      </div>
      <div :class="['_content justify-content-center d-flex', !$store.state.utils.fullPageModal && 'align-items-center']" :style="{ marginTop: $store.state.utils.fullPageModal ? '2em' : '-2em' }">
        <div id="content" class="h-100">
          <Nuxt class="h-100" />
        </div>
        <div id="menu-content" class="_menu-content hide">
          <ul>
              <li v-if="!config.hidePage.credentials">
                  <NuxtLink to="/credentials">{{$t('MENU.CREDENTIALS')}}</NuxtLink>
              </li>
              <li v-if="!config.hidePage.nfts">
                  <NuxtLink :to="'/nfts/' + defaultChain" v-if="showNFTSLink">{{$t('MENU.NFTS')}}</NuxtLink>
              </li>
              <li v-if="!config.hidePage.connections">
                  <NuxtLink to="/connections">{{$t('MENU.CONNECTIONS')}}</NuxtLink>
              </li>
              <li v-if="!config.hidePage.settings">
                  <NuxtLink to="/settings">{{$t('MENU.SETTINGS')}}</NuxtLink>
              </li>
              <li>
                <a href="#" @click="logout">{{$t('MENU.LOGOUT')}}</a>
              </li>
          </ul>
        </div>
      </div>
      <div v-if="!$store.state.utils.fullPageModal" class="_copyright _blue-color d-flex align-items-center justify-content-center">
        <a id="copyright" href="https://walt.id/" target="_blank">{{copyright}}</a>
      </div>
    </div>
    </section>
  </div>
</template>

<script>
import {menuTransitionShow, menuTransitionHide} from '../helpers/menuTransation'
import {config} from '/config.js'


export default {
  name: 'default',
  data() {
    return {
      copyright: config.copyright,
      trigger: true,
      config: config,
    }
  },
  computed: {
    showNFTSLink() {
      return this.$auth.user != null && (this.$auth.user.ethAccount != null || this.$auth.user.tezosAccount != null || this.$auth.user.polkadotAccount != null || this.$auth.user.nearAccount != null)
    },
    defaultChain() {
      return this.$store.state.wallet.defaultChain
    },
    hideMenu() {
      return this.$route.name == "Login"
    }
  },
  // async asyncData ({ $axios }) {
  // },
  watch: {
    $route() {
      if(!this.trigger)
        this.menuTrigger()
    },
  },
  methods:{
    menuTrigger: function(){
      console.log(this.$route)
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
        this.$router.replace('/login')
      },
  }
};
</script>

<style lang="sass">
.close-icon
  position: absolute
  right: 0.5rem
  top: 1.1rem
  cursor: pointer
</style>