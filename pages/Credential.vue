<template>
    <section class="_main bg-light row align-items-center justify-content-center justify-content-lg-start justify-content-md-center justify-content-sm-center p-0">
        <div id="widget" class="_form d-black bg-w shadow-lg">
            <div class="_top-bar  position-sticky d-flex justify-content-center col-12 align-items-center px-3">
                <div class="col-6 d-flex align-items-center _animation-fade">
                    <NuxtLink to="/credential-request" class="_back-button">
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
                    <div v-for="credential in credentials" v-bind:key="credential.id" class="p-4">
                        <div class="col-12 py-3">
                            <span>
                                <h5>Title</h5>
                                <p>{{credential.title}}</p>
                            </span>
                        </div>
                        <div class="d-flex py-3">
                            <span class="col-4">
                                <h5>Issuer</h5>
                                <p>{{credential.issuerName}}</p>
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
                                <p>{{moment(credential.issuanceDate).format("MMM Do YYYY")}}</p>
                            </span>
                            <span class="col-4">
                                <h5>Expire</h5>
                                <p>{{moment(credential.expirationDate).format("MMM Do YYYY")}}</p>
                            </span>
                            <span class="col-4">
                                <h5>Valid From</h5>
                                <p>{{moment(credential.validFrom).format("MMM Do YYYY")}}</p>
                            </span>
                        </div>
                        <div class="col-12 py-3">
                            <div class="_image" style="background-image: url('https://www.urbanpedaltours.com/wp-content/uploads/2019/04/team.png');"></div>
                        </div>
                        <div class="text-left">
                            <span class="col-12 pb-3">
                                <h5>First Name</h5>
                                <p>{{credential.credentialSubject.firstName}}</p>
                            </span>
                            <span class="col-12 px-3">
                                <h5>Last Name</h5>
                                <p>{{credential.credentialSubject.familyName}}</p>
                            </span>
                            <span class="col-12 px-3">
                                <h5>No°</h5>
                                <p>{{credential.credentialSubject.personalIdentifier}}</p>
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
import moment from 'moment'
export default {
  name: 'Credential',
  data() {
    return {
      moment: moment,
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
