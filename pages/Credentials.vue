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
                    <h2 class="_animation-fade">My Credentials</h2>
                    <div class="_search">
                        <form action="" id="search-form">
                            <input name="search-input" type="text" placeholder="Search...">
                        </form>
                    </div>
                    <div class="_scrollable d-flex flex-column align-items-center">
                        <NuxtLink class="_card d-flex" to="/Credential?id=273-29F-38">
                            <div class="col-10 d-flex align-items-center">
                                <div>
                                    <h5>National ID</h5>
                                    <p>by Great Government</p>
                                </div>
                            </div>
                            <div class="col d-flex justify-content-end">
                                <i class="bi bi-bookmark-star-fill _icon-active"></i>
                            </div>
                        </NuxtLink>
                        <div class="_card d-flex ">
                            <div class="col-10 d-flex align-items-center">
                                <div>
                                    <h5>Permanent Resident Card</h5>
                                    <p>by Great Government</p>
                                </div>
                            </div>
                            <div class="col d-flex justify-content-end">
                                <i class="bi bi-person-bounding-box _icon-inactive"></i>
                            </div>
                        </div>
                        <div class="_card d-flex ">
                            <div class="col-10 d-flex align-items-center">
                                <div>
                                    <h5>Europass</h5>
                                    <p>by Université de Lille</p>
                                </div>
                            </div>
                            <div class="col d-flex justify-content-end">
                                <i class="bi bi-pip _icon-inactive"></i>
                            </div>
                        </div>
                        <div class="_card d-flex ">
                            <div class="col-10 d-flex align-items-center">
                                <div>
                                    <h5>Bachelor Degree</h5>
                                    <p>by Université de Lille</p>
                                </div>
                            </div>
                            <div class="col d-flex justify-content-end">
                                <!--<i class="bi bi-plus-circle-dotted _icon"></i>-->
                            </div>
                        </div>
                        <div class="_card d-flex ">
                            <div class="col-10 d-flex align-items-center">
                                <div>
                                    <h5>National ID 1</h5>
                                    <p>by Great Government</p>
                                </div>
                            </div>
                            <div class="col d-flex justify-content-end">
                                <!--<i class="bi bi-plus-circle-dotted _icon"></i>-->
                            </div>
                        </div>
                        <div class="_card d-flex ">
                            <div class="col-10 d-flex align-items-center">
                                <div>
                                    <h5>National ID 1</h5>
                                    <p>by Great Government</p>
                                </div>
                            </div>
                            <div class="col d-flex justify-content-end">
                                <!--<i class="bi bi-plus-circle-dotted _icon"></i>-->
                            </div>
                        </div>
                        <div class="_card d-flex ">
                            <div class="col-10 d-flex align-items-center">
                                <div>
                                    <h5>National ID 1</h5>
                                    <p>by Great Government</p>
                                </div>
                            </div>
                            <div class="col d-flex justify-content-end">
                                <!--<i class="bi bi-plus-circle-dotted _icon"></i>-->
                            </div>
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
  name: 'Credentials',
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
