<template>
  <section class="_main bg-light row align-items-center justify-content-center justify-content-lg-start justify-content-md-center justify-content-sm-center p-0">
        <div id="widget" class="_form d-black bg-w shadow-lg text-center">
            <div class="_toggle-menu position-sticky d-flex justify-content-end col-12 align-items-center px-3">
                <a href="#sm" id="toggle-menu" @click="menuTrigger()">
                    <div id="dash-1" class="_dash my-2"></div>
                    <div id="dash-2" class="_dash my-2"></div>
                    <div id="dash-3" class="_dash my-2"></div>
                </a>
            </div>
            <div class="_content justify-content-center d-flex align-items-center ">
                <div id="content">
                    <h2>No Action required</h2>
                    <p class="mt-3">You have no pending requests or offers.</p>
                </div>
                <div id="menu-content" class="_menu-content hide">
                    <ul>
                        <li>
                            <router-link to="/credentials">Credentials</router-link>
                        </li>
                        <li>
                            <router-link to="/connections">Connections</router-link>
                        </li>
                        <li>
                            <router-link to="/settings">Settings</router-link>
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
  name: 'Home',
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
