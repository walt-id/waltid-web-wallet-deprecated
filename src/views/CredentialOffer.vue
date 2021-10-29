<template>
    <section class="_main bg-light row align-items-center justify-content-center justify-content-lg-start justify-content-md-center justify-content-sm-center p-0">
        <div id="widget" class="_form d-black bg-w shadow-lg text-center">
            <div class="_toggle-menu position-sticky d-flex justify-content-end col-12 align-items-center px-3">
                <a href="#sm" id="toggle-menu" @click="menuTrigger">
                    <div id="dash-1" class="_dash my-2"></div>
                    <div id="dash-2" class="_dash my-2"></div>
                    <div id="dash-3" class="_dash my-2"></div>
                </a>
            </div>
            <div class="_content justify-content-center d-flex align-items-center ">
                <div id="content">
                    <h2>Credential offer</h2>
                    <div class="_container-list d-flex justify-content-center align-items-center">
                        <div class="_window-content m-2 p-2 ">
                            <div class="p-4">
                                <ul>
                                    <li class="d-flex">
                                        <div class="col-11 d-flex align-items-center">
                                            <p>Dominik</p>
                                        </div>
                                        <span class="col">
                                            <i class="bi bi-x-circle-fill"></i>
                                        </span>
                                    </li>
                                    <li class="d-flex">
                                        <div class="col-11 d-flex align-items-center">
                                            <p>Beron</p>
                                        </div>
                                        <span class="col">
                                            <i class="bi bi-x-circle-fill"></i>
                                        </span>
                                    </li>
                                    <li class="d-flex">
                                        <div class="col-11 d-flex align-items-center">
                                            <p>xxx</p>
                                        </div>
                                        <span class="col">
                                            <i class="bi bi-x-circle-fill"></i>
                                        </span>
                                    </li>
                                    <li class="d-flex">
                                        <div class="col-11 d-flex align-items-center">
                                            <p>xxx</p>
                                        </div>
                                        <span class="col">
                                            <i class="bi bi-x-circle-fill"></i>
                                        </span>
                                    </li>
                                    <li class="d-flex">
                                        <div class="col-11 d-flex align-items-center">
                                            <p>xxx</p>
                                        </div>
                                        <span class="col">
                                            <i class="bi bi-x-circle-fill"></i>
                                        </span>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="_btns col-12 d-flex justify-content-center">
                        <div class="col-6">
                            <button href="#share" class="_share col-12 mb-2">Share</button>
                            <a href="#reject" class="_reject col-12">Reject</a>
                        </div>
                    </div>
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
// @ is an alias to /src

export default {
  name: 'CredentialOffer',
  data() {
    return {
      trigger: true,
      id: 'xxxxxxxxxx'
    }
  },
  methods:{
    menuTrigger: function(){
      let widget = document.getElementById('widget')
      let dash1 = document.getElementById('dash-1')
      let dash2 = document.getElementById('dash-2')
      let dash3 = document.getElementById('dash-3')
      let content = document.getElementById('content')
      let menuContent = document.getElementById('menu-content')
      let copyright = document.getElementById('copyright')
      if(this.trigger === true){
        console.log('show menu')
        content.classList.add('hide')
        menuContent.classList.remove('hide')
        widget.classList.remove('bg-w')
        widget.classList.add('bg-g')
        widget.classList.add('_border')
        dash1.classList.add('_close-x')
        dash2.classList.add('hide')
        dash3.classList.add('_close-y')
        console.log('show menu')
        copyright.classList.remove('_blue-color')
        copyright.classList.add('_white-color')
        this.trigger = false;
      }
      else{
        content.classList.remove('hide')
        menuContent.classList.add('hide')
        widget.classList.add('bg-w')
        widget.classList.remove('bg-g')
        widget.classList.remove('_border')
        dash1.classList.remove('_close-x')
        dash2.classList.remove('hide')
        dash3.classList.remove('_close-y')
        copyright.classList.add('_blue-color')
        copyright.classList.remove('_white-color')
        this.trigger = true;
      }
    },
  }
};
</script>
