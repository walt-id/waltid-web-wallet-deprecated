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
                    <h2>Settings</h2>
                    <br>
                    <!--<p class="mt-3">You have no settings.</p>-->
                    <div class="d-flex mt-3 align-items-center _setting-items">
                        <div class="col-10 _item">
                            <h4>Account</h4>
                            <p>Manage your account.</p>
                        </div>
                        <div class="col">
                            <a class="_button-view">View</a>
                        </div>
                    </div>
                    <div class="d-flex mt-4 align-items-center _setting-items">
                        <div class="col-10 _item">
                            <h4>Data</h4>
                            <p>Manage your data.</p>
                        </div>
                        <div class="col">
                            <NuxtLink to="/settings/data" class="_button-view">View</NuxtLink>
                        </div>
                    </div>
                    <div class="d-flex mt-4 align-items-center _setting-items">
                        <div class="col-10 _item">
                            <h4>Ecosystems</h4>
                            <p>Join and manage your<br>identity ecosystems.</p>
                        </div>
                        <div class="col">
                            <NuxtLink to="/settings/ecosystems" class="_button-view">View</NuxtLink>
                        </div>
                    </div>
                </div>
                <div id="menu-content" class="_menu-content hide">
                    <ul>
                        <li>
                            <NuxtLink to="/credentials">{{$t('MENU.CREDENTIALS')}}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/connections">{{$t('MENU.CONNECTIONS')}}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/settings">{{$t('MENU.SETTINGS')}}</NuxtLink>
                        </li>
                        <li>
                            <a @click="logout">{{$t('MENU.LOGOUT')}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="_copyright _blue-color d-flex align-items-center justify-content-center">
                <a id="copyright" href="https://walt.id/" target="_blank">{{copyright}}</a>
            </div>
        </div>
    </section>
</template>

<script>

import {menuTransitionShow, menuTransitionHide} from '../../helpers/menuTransation'
import {config} from '/config.js'

export default {
  name: 'Settings',
  data() {
    return {
      copyright: config.copyright,
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
    },
    logout: async function() {
      await this.$auth.logout();
    },
  }
};
</script>
