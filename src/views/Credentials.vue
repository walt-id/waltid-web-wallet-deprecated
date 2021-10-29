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
                    <h2>My Credentials</h2>
                    <div class="_search">
                        <form action="" id="search-form">
                            <input name="search-input" type="text" placeholder="Search...">
                        </form>
                    </div>
                    <div class="_scrollable d-flex flex-column align-items-center">
                        <router-link class="_card d-flex" to="/Credential?id=273-29F-38">
                            <div class="col-10 d-flex align-items-center">
                                <div>
                                    <h5>National ID</h5>
                                    <p>by Great Government</p>
                                </div>
                            </div>
                            <div class="col d-flex justify-content-end">
                                <i class="bi bi-bookmark-star-fill _icon-active"></i>
                            </div>
                        </router-link>
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
  name: 'Credentials',
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
