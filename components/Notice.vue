<template>
    <div :class="this.isShown === true ? 'navbar navbar-expand-lg bg-primary _notice _fadeInDown': 'hide'">
        <div class="container-fluid">
          <div class="d-flex col-12">
            <div class="col"></div>
            <div class="col-10 text-center text-white d-flex align-items-center justify-content-center">
                <p><img src="https://i.ibb.co/Vm3CN36/favicon-white.png" /><strong>Notice:</strong> this walt.id version is just demo</p>
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
export default {
    name: "Notice",
    data (){
        return{
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
