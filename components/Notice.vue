<template>
    <div :class="this.isShown === true ? 'navbar navbar-expand-lg bg-primary _notice _fadeInDown': 'hide'">
        <div class="container-fluid">
          <div class="d-flex col-12">
            <div class="col"></div>
            <div class="col-10 text-center text-white d-flex align-items-center justify-content-center">
                <p><img :src="this.logo.path" :alt="this.logo.alt" /><strong>Notice:</strong> This implementation is intended for demo purposes only. It should not be used in production settings.</p>
            </div>
            <div class="col text-white d-flex justify-content-end align-items-center">
                <a @click="hideNotice">
                    <i class="bi bi-x-lg"></i>
                </a>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import {config} from '/config.js'
export default {
    name: "Notice",
    data (){
        return{
            copyright: config.copyright,
            logo: config.whiteLogo,
            isShown: true
        }
    },
    methods:{
        hideNotice (){
            this.isShown = false
        }
    }

}
</script>
