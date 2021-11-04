<template>
    <section class="_main bg-light row align-items-center justify-content-center justify-content-lg-start justify-content-md-center justify-content-sm-center p-0">
        <div id="widget" class="_form d-black bg-w shadow-lg text-center">
            <div class="_toggle-menu position-sticky d-flex justify-content-end col-12 align-items-center px-3">
                <a id="toggle-menu" @click="menuTrigger">
                    <div id="dash-1" class="_dash my-2"></div>
                    <div id="dash-2" class="_dash my-2"></div>
                    <div id="dash-3" class="_dash my-2"></div>
                </a>
            </div>
            <div class="_content justify-content-center d-flex align-items-center ">
                <div id="content">
                    <h2>Credential request</h2>
                    <div class="_container d-flex flex-column align-items-center justify-content-center">
                        <NuxtLink class="_card d-flex _animation-fade" to="/Credential">
                            <div class="col-12 d-flex align-items-center">
                                <div>
                                    <h5>National ID</h5>
                                    <p>by Great Government</p>
                                </div>
                            </div>
                        </NuxtLink>
                        <div class="_button">
                            <button href="#share" class="_share col-12 mb-2">Share</button>
                            <a href="#reject" class="_reject col-12">Reject</a>
                        </div>
                    </div>
                </div>
                <div id="menu-content" class="_menu-content hide">
                    <ul>
                        <li>
                            <NuxtLink to="/credentials">Credentials</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/connections">Connections</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/settings">Settings</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="_copyright _blue-color d-flex align-items-center justify-content-center">
                <a id="copyright" href="https://walt.id/" target="_blank">by walt.id</a>
            </div>
        </div>
    </section>
</template>

<script>

import {menuTransitionShow, menuTransitionHide} from '../helpers/menuTransation'

export default {
  name: 'CredentialRequest',
  data() {
    return {
      trigger: true,
      id: 'xxxxxxxxxx'
    }
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
