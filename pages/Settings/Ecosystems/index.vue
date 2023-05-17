<template>
    <div class="h-100">
        <div :class="['h-100', this.didListModal === false ? '':'hide']">
            <div class="_setting h-100">
                <h2>Ecosystems</h2>
                <br>
                <!--<p class="mt-3">You have no Ecosystems.</p>-->
                <!-- EBSI / ESSIF -->
                <div class="holder">
                    <div class="d-flex mt-3 align-items-start _setting-items">
                        <div class="flex-grow-1 _item">
                            <h4>EBSI/ESSIF</h4>
                            <p>Based on the EU blockchain (EBSI).</p>
                            <b v-if="hasType(currentDid, 'ebsi')" class="_tag"><em>Selected</em></b>
                        </div>
                        <div class="ms-auto">
                            <NuxtLink to="/settings/ecosystems/ebsi-essif" class="_button-view _bounce">Add</NuxtLink>
                        </div>
                    </div>
                    <!-- DNS (web) -->
                    <div class="d-flex mt-4 align-items-start _setting-items">
                        <div class="flex-grow-1 _item">
                            <h4>Web</h4>
                            <p>Based on <code>.well-known/</code>.</p>
                            <b v-if="hasType(currentDid, 'web')" class="_tag">
                                <em>Selected</em>
                            </b>
                        </div>
                        <div class="ms-auto">
                            <NuxtLink to="/settings/ecosystems/dns" class="_button-view _bounce">Add</NuxtLink>
                        </div>
                    </div>
                    <!-- Gaia-X -->
                    <div class="d-flex mt-4 align-items-start _setting-items">
                        <div class="flex-grow-1 _item">
                            <h4>Gaia-X</h4>
                            <p>Onboard the Gaia-X ecosystem.</p>
                            <b v-if="hasType(currentDid, 'gaia-x')" class="_tag">
                            </b>
                        </div>
                        <div class="ms-auto">
                            <NuxtLink to="/settings/ecosystems/gaia-x" class="_button-view _bounce">Add</NuxtLink>
                        </div>
                    </div>
                    <!-- IOTA -->
                    <div class="d-flex mt-4 align-items-start _setting-items">
                        <div class="flex-grow-1 _item">
                            <h4>IOTA</h4>
                            <p>Onboard the IOTA ecosystem.</p>
                            <b v-if="hasType(currentDid, 'iota')" class="_tag">
                            </b>
                        </div>
                        <div class="ms-auto">
                            <NuxtLink to="/settings/ecosystems/iota" class="_button-view _bounce">Add</NuxtLink>
                        </div>
                    </div>
                    <!-- CHEQD -->
                    <div class="d-flex mt-4 align-items-start _setting-items">
                        <div class="flex-grow-1 _item">
                            <h4>CHEQD</h4>
                            <p>Onboard the CHEQD ecosystem.</p>
                            <b v-if="hasType(currentDid, 'cheqd')" class="_tag">
                            </b>
                        </div>
                        <div class="ms-auto">
                            <NuxtLink to="/settings/ecosystems/cheqd" class="_button-view _bounce">Add</NuxtLink>
                        </div>
                    </div>
                    <!-- Key -->
                    <div class="d-flex mt-4 align-items-start _setting-items">
                        <div class="flex-grow-1 _item">
                            <h4>Key</h4>
                            <p>P2P based key distribution.</p>
                            <b v-if="hasType(currentDid, 'key')" class="_tag"><em>Selected</em></b>
                        </div>
                        <div class="ms-auto">
                            <NuxtLink to="/settings/ecosystems/key" class="_button-view _bounce">Add</NuxtLink>
                        </div>
                    </div>
                </div>
                <div class=" mt-3">
                    <a @click="showModal" class="btn btn-primary py-2" style="width: 100%;">
                        Select Ecosystem
                    </a>
                </div>
            </div>
        </div>
        <div :class="['h-100', this.didListModal === true ? '_content d-flex':'hide']">
            <div class="mt-3 h-100">
                <div class="_top-bar px-3" style="min-height: auto;">
                    <div class="d-flex align-items-center _animation-fade">
                        <a href="#" @click="hideModal" class="_back-button">
                            <span class="d-flex align-items-center">
                                <i class="bi bi-chevron-left"></i>
                                <p>Back</p>
                            </span>
                        </a>
                    </div>
                </div>
                <div class="_did-content h-100">
                    <h2>Select default DID</h2>
                    <br>
                    <div class="d-grid justify-content-center holder">
                        <div v-for="did in dids" v-bind:key="did.index">
                            <a href="#" @click="setDefaultDID(did)"
                                class="_card d-flex">
                                <div class="col-9 d-flex align-items-center">
                                    <div>
                                        <h5 class="mb-1" data-bs-toggle="tooltip" data-bs-placement="top" :title="did">{{did.slice(0,25)}}...</h5>
                                    </div>
                                </div>
                                <div class="col d-flex justify-content-end align-items-start">
                                    <b v-if="currentDid === did" class="_tag mt-2"><em>Default</em></b>
                                    <b v-else class="_tag-active mt-2"><em>Set default</em></b>

                                </div>
                            </a>
                        </div>
                    </div>
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
            didListModal: false,
            setDD: false
        }
    },
    computed: {
        dids() {
            console.log(this.$store.state.wallet.dids)
            return this.$store.state.wallet.dids
        },
        currentDid() {
            console.log(this.$store.state.wallet.currentDid)
            return this.$store.state.wallet.currentDid
        }
    },
    methods: {
        hasDidFor: function (type) {
            console.log("wallet state", this.dids)
            return this.dids.findIndex(d => this.hasType(d, type)) != -1
        },
        hasType: function (did, type) {
            return did.match(`\\w+:${type}:.*`)
        },
        showModal: function () {
            this.didListModal = true
        },
        hideModal: function () {
            this.didListModal = false
        },
        trySetDefaultDID: function () {
            this.setDD = true
        },
        cancelSetDefaultDID: function () {
            this.setDD = false
        },
        setDefaultDID: function (did) {
            this.$store.commit('wallet/setCurrentDid', did)
            this.setDD = false
        }

    }
};
</script>

<style lang="sass" scoped>
.holder
    overflow-y: auto
    height: calc( 100% - 48px - 65px )
</style>
