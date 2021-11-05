<template>
    <section class="_main bg-light row align-items-center justify-content-center justify-content-lg-start justify-content-md-center justify-content-sm-center p-0">
        <div id="widget" class="_form d-black bg-w shadow-lg">
            <div class="_top-bar  position-sticky d-flex justify-content-center col-12 align-items-center px-3">
                <div class="col-6 d-flex align-items-center _animation-fade">
                    <a href="" @click.prevent="$router.back()" class="_back-button">
                        <span class="d-flex align-items-center">
                            <i class="bi bi-chevron-left"></i>
                            <p>Back</p>
                        </span>
                    </a>
                </div>
                <div class="col-6 d-flex align-items-center justify-content-end">
                    <div class="btn-group dropstart  _animation-fade">
                        <button type="button" class="_more-button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="d-flex align-items-center justify-content-center">
                                <i class="bi bi-three-dots"></i>
                            </span>
                        </button>
                        <ul class="dropdown-menu _dropdown">
                            <li><a class="dropdown-item text-dark" href="#share">Share</a></li>
                            <li><a class="dropdown-item text-danger" href="#delete">Delete</a></li>
                        </ul>
                    </div>
                </div>

            </div>
            <div class="_window d-flex justify-content-center align-items-center">
                <div class="_window-content m-2 p-2 ">
                    <CredentialView :credential="credential" class="p-4">
                    </CredentialView>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import {menuTransitionShow, menuTransitionHide} from '../helpers/menuTransation'
export default {
  name: 'Credential',
  data() {
    return {
      trigger: true
    }
  },
  async asyncData ({ $axios, query }) {
    // TODO: select DID to use
    const credList = await $axios.$get("/api/wallet/credentials/list", { params: { id: query.id }})
    const credential = credList.list[0]
    return { credential }
  },
  methods:{
    menuTrigger: function(){
          if(this.trigger === true){
              menuTransitionShow()
              this.trigger = false
          }
          else{
              menuTransitionHide()
              this.trigger = true
          }
    }
  }
};
</script>
