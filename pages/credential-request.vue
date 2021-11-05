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
                    <h2>Credential request</h2>
                    <div class="_container d-flex flex-column align-items-center justify-content-center">
                        <NuxtLink v-for="credential in credentials" v-bind:key="credential.id" class="_card d-flex _animation-fade" v-bind:to="'/credential?'+credential.id">
                            <div class="col-12 d-flex align-items-center">
                                <div>
                                    <h5>{{credential.title}}</h5>
                                    <p>By {{credential.issuerName}}</p>
                                </div>
                            </div>
                        </NuxtLink>
                        <div class="_button">
                            <button href="#share" class="_share col-12 mb-2">Share</button>
                            <a href="#reject" class="_reject col-12">Reject</a>
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
                        <li>
                            <NuxtLink to="/login">logout</NuxtLink>
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
  name: 'CredentialRequest',
  data() {
    return {
      trigger: true,
      credentials: [{
                     "@context":[
                        "https://www.w3.org/2018/credentials/v1",
                        "https://base.uri.vid/vid/contexts/v1"
                     ],
                     "type":[
                        "VerifiableCredential",
                        "VerifiableID"
                     ],
                     "id":"urn:uuid:1dee...674e",
                     "title":"National ID",
                     "issuer":"did:ebsi:EsnW...QEka",
                     "issuerName":"Great Government",
                     "issuanceDate":"2021-06-25T04:46:02Z",
                     "validFrom":"2021-06-25T04:46:02Z",
                     "expirationDate":"2022-06-25T04:46:02Z",
                     "credentialSubject":{
                        "type":[
                           "NaturalPerson"
                        ],
                        "id":"did:ebsi:Ef3u...KqGH",
                        "familyName":"Mustermann",
                        "nameAndFamilyNameAtBirth":"Muster",
                        "firstName":"Max",
                        "personalIdentifier":"ES/DE/01234567",
                        "dateOfBirth":"1982-06-07",
                        "nationality":"DEU",
                        "placeOfBirth":"Hamburg",
                        "currentAddress":{
                        "locatorDesignator":"22",
                        "thoroughfare":"Arcacia Avenue",
                        "postName":"Berlin",
                        "postCode":"10115"
                      },
                      "gender":"Male",
                        "portrait":"data:image/jp2;base64,"
                      },
                      "credentialStatus":{
                      "id":"https://",
                      "type":"TrustedCredentialStatus2021"
                    },
                    "credentialSchema":{
                    "id":"https://",
                    "type":"TrustedSchemaValidator2021"
                    },
                    "evidence":[{
                      "id":"https://",
                      "type":[
                       "DocumentVerification",
                       "PassportVerification"
                     ],
                     "verifier":"did:ebsi:2962...4a7a",
                     "subjectPresence":"Physical",
                     "documentPresence":"Physical",
                     "evidenceDocument":{
                         "type":"Passport",
                         "documentCode":"P",
                         "documentNumber":"SPECI2014",
                         "documentIssuingState":"NLD",
                         "documentExpirationDate":"2031-06-25"
                      }
                    }],
                    "proof":{
                       "type":"EidasEseal2021",
                       "created":"2021-06-25T04:46:02Z",
                       "proofPurpose":"assertionMethod",
                       "verificationMethod":"urn:uuid:4321...42de",
                       "proofValue":""
                    }
                   }],
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
