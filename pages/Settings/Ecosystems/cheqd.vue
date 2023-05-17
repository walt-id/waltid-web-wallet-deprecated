<template>
    <div class="_setting">
        <h2>CHEQD</h2>
        <!--<p class="mt-3">You have no Ecosystems.</p>-->
        <div class="d-flex align-items-center justify-content-center _wizard mt-3">
            <div :class="this.wizardIndex === 0 ? '': 'animate__fadeOutRight hide'">
                <div class="_item">
                    <h4>Step 1</h4>
                    <p>Choose CHEQD network.</p>
                </div>
                <div class="mt-3 d-flex _button-view justify-content-center">
                    <select v-model="version" class="form-select w-75">
                        <option value="0">Testnet</option>
                        <option value="1">Mainnet</option>
                    </select>
                </div>
                <div class="mt-3 d-flex _button-view justify-content-center">
                    <a class="_bounce btn" @click="wizardNext">Get started</a>
                </div>
                <p v-if="version == 1" class="_help mt-3">Requires token for the CHEQD<br>mainnet network fee!</p>
            </div>
            <div :class="this.wizardIndex === 1 ? '_left-fade': 'hide'">
                <div class="_item">
                    <h4>Step 2</h4>
                </div>
                <div v-if="version == 1" class="_item">
                    <p>CHEQD network fee</p>
                    <div class="mt-3 d-flex _button-view justify-content-center">
                        <div>
                            <form id="token-submit" action="" @submit.prevent="tokenSubmit">
                                <input id="inserted-token" v-model="token" :class="this.tokenWrong===true ? 'form-control my-2 border-danger':'form-control my-2'"
                                       :data="this.token" name="insertedToken" placeholder="Insert your token"/>
                                <BlockingButtonComponent label="Submit"/>
                            </form>
                        </div>
                    </div>
                    <p :class="this.wizardIndex === 2 ? 'hide': '_help mt-3'">Requires token for the CHEQD<br>mainnet network fee!</p>
                </div>
                <div v-else class="_item">
                    <p>Create new DID CHEQD</p>
                    <form id="token-submit" action="" @submit.prevent="tokenSubmit">
                        <BlockingButtonComponent :loading="generationLoading" label="Submit"/>
                    </form>
                </div>
            </div>
            <div :class="this.tokenSubmitted === true ? '_fadin': 'hide'">
                <div class="_item">
                    <div class="success-animation">
                        <svg class="checkmark" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
                            <circle class="checkmark__circle" cx="26" cy="26" fill="none" r="25"/>
                            <path class="checkmark__check" d="M14.1 27.2l7.1 7.2 16.7-16.8" fill="none"/>
                        </svg>
                    </div>
                    <p>You just successfully onboarded onto CHEQD!</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import BlockingButtonComponent from '~/components/BlockingButtonComponent.vue'

export default {
    name: 'Cheqd',
    data() {
        return {
            wizardIndex: 0,
            token: '',
            tokenSubmitted: false,
            generationLoading: false,
            tokenWrong: false,
            version: 0
        }
    },
    components: {
        BlockingButtonComponent,
    },
    methods: {
        wizardNext: function () {
            this.wizardIndex = this.wizardIndex + 1
        },
        async tokenSubmit() {
            this.generationLoading = true;
            try {
                const newDid = await this.$axios.$post('/api/wallet/did/create', {
                    "method": 'cheqd',
                    "network": this.version === 0 ? 'testnet' : 'mainnet'
                })
                console.log(newDid)
                this.generationLoading = false;
                this.$store.commit('wallet/addDid', newDid)
                this.tokenSubmitted = true
                this.wizardIndex = this.wizardIndex + 1
            } catch (e) {
                console.warn(e)
                this.generationLoading = false;
                this.tokenWrong = true
            }
        }
    }
};
</script>
