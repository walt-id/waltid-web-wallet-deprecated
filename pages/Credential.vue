<template>
    <section class="_main bg-light row align-items-center justify-content-center justify-content-lg-start justify-content-md-center justify-content-sm-center p-0">
        <div id="widget" class="_form d-black bg-w shadow-lg">
            <div class="_top-bar  position-sticky d-flex justify-content-center col-12 align-items-center px-3">
                <div class="col-6 d-flex align-items-center _animation-fade">
                    <NuxtLink to="/credentials" class="_back-button">
                        <span class="d-flex align-items-center">
                            <i class="bi bi-chevron-left"></i>
                            <p>Back</p>
                        </span>
                    </NuxtLink>
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
                    <div class="p-4">
                        <div class="col-12 py-3">
                            <span>
                                <h5>Title</h5>
                                <p>National ID</p>
                            </span>
                        </div>
                        <div class="d-flex py-3">
                            <span class="col-4">
                                <h5>Issuer</h5>
                                <p>Governoment</p>
                            </span>
                            <span class="col-4">
                            </span>
                            <span class="col-4">
                                <h5>Statue</h5>
                                <p>Valid</p>
                            </span>
                        </div>
                        <div class="d-flex py-3 border-bottom border-secondary">
                            <span class="col-4">
                                <h5>Issued on</h5>
                                <p>XX-XX-XXXX</p>
                            </span>
                            <span class="col-4">
                                <h5>Expire</h5>
                                <p>XX-XX-XXXX</p>
                            </span>
                            <span class="col-4">
                                <h5>Valid From</h5>
                                <p>XX-XX-XXXX</p>
                            </span>
                        </div>
                        <div class="col-12 py-3">
                            <div class="_image" style="background-image: url('https://www.urbanpedaltours.com/wp-content/uploads/2019/04/team.png');"></div>
                        </div>
                        <div class="text-left">
                            <span class="col-12 pb-3">
                                <h5>First Name</h5>
                                <p>Dominik</p>
                            </span>
                            <span class="col-12 px-3">
                                <h5>Last Name</h5>
                                <p>Beron</p>
                            </span>
                            <span class="col-12 px-3">
                                <h5>No°</h5>
                                <p>273-29F-38</p>
                            </span>
                        </div>
                    </div>
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
