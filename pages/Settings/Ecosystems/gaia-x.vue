<template>
    <div class="_setting">
        <h2>Gaia-X (did:web)</h2>
        <!--<p class="mt-3">You have no Ecosystems.</p>-->
        <div class="d-flex align-items-center justify-content-center _wizard mt-3">
            <div :class="this.wizardIndex === 0 ? '': 'animate__fadeOutRight hide'">
                <div class="_item">
                    <h4>Step 1</h4>
                    <p>Create & register a did:web.</p>
                </div>
                <div class="mt-3 d-flex _button-view justify-content-center">
                    <a class="_bounce btn" @click="wizardNext">Get started</a>
                </div>
            </div>
            <div :class="this.wizardIndex === 1 ? '_left-fade': 'hide'">
                <div class="_item">
                    <h4>Step 2</h4>
                    <!--                              <p>Define key and domain. On default a new key will be generated and the did:web will be hosted at walt.id.</p>-->
                    <p>If no domain is entered, the did:web will be registered at walt.id.</p>
                </div>
                <div class="mt-3 d-flex _button-view justify-content-center">
                    <div>
                        <form action="" id="generate-did-submit" @submit.prevent="DIDgenerate">
                            <input placeholder="Insert the domain (optional)" id="inserted-domain" name="insertedDomain"
                                class="form-control _domain-form" style="width: 12em" :data="this.domain"
                                v-model="domain" />
                            <button type="submit" name="submit" class="_bounce btn text-white mt-3"
                                style="width: 200px">
                                <span v-if="generationLoading">
                                    <img src="/dark-loader.gif" width="30px" style="opacity: 0.7" />
                                </span>
                                <span v-else>Generate DID</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div :class="this.wizardIndex === 2 ? '_fadin': 'hide'">
                <div class="_item">
                    <div class="success-animation">
                        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                        </svg>
                    </div>
                    <p>did:web generated successfully</p>
                </div>
            </div>
            <div :class="this.DIDgenerated === true && this.wizardIndex === 3 ? '_fadin': 'hide'">
                <div class="_item">
                    <p><strong>Successfully created</strong></p>
                    <p>
                        <b>{{this.didHost}}</b>
                    </p>
                    <textarea name="did-content" id="" cols="30" rows="5" class="mt-2 _did-content"
                        :data="this.didContent" v-model="this.didContent"></textarea>
                    <p v-if="coppied" class="text-secondary _bounce" style="font-size: 13px">Copied successfully</p>

                    <button type="button" @click="onCopy" class="_bounce btn _btn-copy text-white mt-2">
                        <i class="bi bi-files me-2"></i>Copy DID</button>
                        <!-- <a href="/" class="_bounce btn _btn-blue text-white mt-2">Done</a> -->
                    <a class="_bounce btn _btn-blue text-white mt-2" @click="wizardNext">Next</a>
                </div>
            </div>
            <!-- self-description step -->
            <div :class="this.wizardIndex === 4 ? '_left-fade': 'hide'">
                <div class="_item">
                    <h4>Step 4</h4>
                    <p>Enter legal person information</p>
                </div>
                <div class="mt-3 d-flex _button-view justify-content-center">
                    <div>
                        <div>
                            <div>
                                <textarea name="self-description" @input="$emit('input', $event.target.value)" id="" cols="30" rows="5" class="mt-2 _did-content"></textarea>
                                <a href="/" class="_bounce btn _btn-blue text-white mt-2">Done</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- legal person credential step -->
            <!-- <div :class="this.wizardIndex === 4 ? '_left-fade': 'hide'">
                <div class="_item">
                    <h4>Step 4</h4>
                    <p>Generate Credential</p>
                </div>
                <div class="mt-3 d-flex _button-view justify-content-center">
                    <div>
                        <a class="_bounce btn _btn-blue text-white mt-2" @click="generateLegalPerson(); wizardNext();">Generate</a>
                    </div>
                </div>
            </div> -->
        </div>

    </div>
</template>
  
<script>
import { copyText } from 'vue3-clipboard'

export default {
    name: 'Gaia-X',
    data() {
        return {
            wizardIndex: 0,
            DIDgenerated: false,
            domain: '',
            didHost: '',
            generationLoading: false,
            didContent: '',
            selfDescription: '',
            coppied: false
        }
    },
    methods: {
        wizardNext: function () {
            this.wizardIndex = this.wizardIndex + 1
        },

        async DIDgenerate() {
            this.generationLoading = true;
            var did = "";
            try {
                if (this.domain) {
                    did = await this.$axios.$post('/api/wallet/did/create', {
                        "method": 'web',
                        "didWebDomain": this.domain
                    })
                } else {
                    did = await this.$axios.$post('/api/wallet/did/create', {
                        "method": 'web',
                        "didWebDomain": this.domain
                    })
                }

                console.log(did)
                this.$axios.$get(`/api/wallet/did/${did}`)
                    .then(
                        res => {
                            this.didHost = did
                            this.didContent = JSON.stringify(res, undefined, 2)
                            console.log(res)
                            this.generationLoading = false;
                            this.wizardIndex = this.wizardIndex + 1
                            setTimeout(() => {
                                this.DIDgenerated = true
                                this.wizardIndex = this.wizardIndex + 1
                            }, 2500);
                        }
                    )
                    .catch(
                        e => console.log(e)
                    )
                this.$axios.$get(`/api/wallet/`)


            } catch (e) {
                console.warn(e)
                this.generationLoading = false
            }
        },
        onCopy: function () {
            copyText(this.didContent, undefined, (error, event) => {
                if (error) {
                    alert('Can not copy')
                    console.log(error)
                } else {
                    this.coppied = true;
                    console.log(event)
                }
            })
        },
        generateLegalPerson: function() {

        },
        uploadFile: function() {
            this.Images = this.$refs.file.files[0];
        },
        submitFile: function() {
            const formData = new FormData();
            formData.append('file', this.Images);
            const headers = { 'Content-Type': 'multipart/form-data' };
            this.$axios.post('https://httpbin.org/post', formData, { headers }).then((res) => {
                res.data.files; // binary representation of the file
                res.status; // HTTP status
            });
        }
    }
};
</script>
  