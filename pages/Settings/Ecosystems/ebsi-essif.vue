<template>
    <div class="_setting">
        <h2>EBSI/ESSIF</h2>
        <!--<p class="mt-3">You have no Ecosystems.</p>-->
        <div class="d-flex align-items-center justify-content-center _wizard mt-3">
            <div :class="this.wizardIndex === 0 ? '': 'animate__fadeOutRight hide'">
                <div class="_item">
                    <h4>Step 1</h4>
                    <p>Copy a security token from the EBSI website.</p>
                </div>
                <div class="mt-3 d-flex _button-view justify-content-center">
                    <a class="_bounce btn" @click="wizardNext">Get started</a>
                </div>
                <p :class="this.wizardIndex === 2 ? 'hide': '_help mt-3'">Get token for the EBSI<br>Pre Production environment <span><a href="https://app.preprod.ebsi.eu/users-onboarding" target="_blank">here</a></span></p>
            </div>
            <div :class="this.wizardIndex === 1 ? '_left-fade': 'hide'">
                <div class="_item">
                    <h4>Step 2</h4>
                    <p>Insert the token below</p>
                </div>
                <div class="mt-3 d-flex _button-view justify-content-center">
                    <div>
                        <form action="" id="token-submit" @submit.prevent="tokenSubmit">
                            <input placeholder="Insert your token" id="inserted-token" name="insertedToken" :class="this.tokenWrong===true ? 'form-control my-2 border-danger':'form-control my-2'" :data="this.token" v-model="token"/>
                            <button type="submit" name="submit" class="_bounce btn text-white">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <div :class="this.tokenSubmitted === true ? '_fadin': 'hide'">
                <div class="_item">
                    <div class="success-animation">
                        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                    </div>
                    <p>You just successfully onboarded on EBSI</p>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>

export default {
  name: 'Ecosystems',
  data() {
    return {
      wizardIndex: 0,
      token: '',
      tokenSubmitted: false,
      tokenWrong: false
    }
  },
  methods:{
    wizardNext: function(){
        this.wizardIndex = this.wizardIndex+1
    },
    async tokenSubmit (){
        try{
            const data = await this.$axios.$post('/api/wallet/did/create?method=ebsi', {
                "didEbsiBearerToken": this.token
            })
            console.log(data.data)
            this.tokenSubmitted=true
            this.wizardIndex = this.wizardIndex+1
        }catch(e){
            console.warn(e)
            this.tokenWrong=true
        }
    }
  }
};
</script>
