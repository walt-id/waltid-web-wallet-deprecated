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
                <div id="content" class="_setting">
                    <h2>Ecosystems</h2>
                    <br>
                    <!--<p class="mt-3">You have no Ecosystems.</p>-->
                    <div class="d-flex mt-3 align-items-center _setting-items">
                        <div class="col-10 _item">
                            <h4>EBSI/ESSIF</h4>
                            <p>BAsed on the<br>EU blockchain (EBSI).</p>
                        </div>
                        <div class="col">
                            <a class="_button-view _bounce">Join</a>
                        </div>
                    </div>
                    <div class="d-flex mt-4 align-items-center _setting-items">
                        <div class="col-10 _item">
                            <h4>DNS</h4>
                            <p>Based on the domain<br>name service (DNS).</p>
                        </div>
                        <div class="col">
                            <a class="_button-view _bounce">Join</a>
                        </div>
                    </div>
                    <div class="d-flex mt-4 align-items-center _setting-items">
                        <div class="col-10 _item">
                            <h4>Key</h4>
                            <p>Peer-to-peer based<br>key distribution.</p>
                        </div>
                        <div class="col">
                            <a class="_button-view _bounce">Join</a>
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
                        <li>
                            <NuxtLink to="/login">logout</NuxtLink>
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
  name: 'Ecosystems',
  data() {
    return {
      trigger: true
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
