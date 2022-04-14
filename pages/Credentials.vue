<template>
    <div>
        <h2 class="_animation-fade">{{$t('CREDENTIALS.TITLE')}}</h2>
        <div class="_search">
            <form action="" id="search-form">
                <input name="search-input" type="text" v-model="search" :placeholder="$t('CREDENTIALS.SEARCH')">
            </form>
        </div>
        <div class="_scrollable d-flex flex-column align-items-center">
            <NuxtLink class="_card d-flex" v-for="credential in filteredList" v-bind:key="credential.id" :to="'/Credential?id='+encodeURIComponent(credential.id)" >
                <div class="col-10 d-flex align-items-center">
                    <div>
                        <h5 class="mb-1">{{$t('CREDENTIAL.TYPE.' + credential.type[credential.type.length-1])}}</h5>
                        <p class="text-truncate" style="max-width: 12em">by {{credential.issuerName ? credential.issuerName : credential.issuer}}</p>
                    </div>
                </div>
                <div class="col d-flex justify-content-end">
                    <i class="bi bi-bookmark-star-fill _icon-active"></i>
                </div>
            </NuxtLink>
        </div>
        <NuxtLink to="/AddCredential" class="btn btn-primary py-2" style="width: 70%;">
            <i class="bi bi-plus-lg me-2"></i>Request Credential
        </NuxtLink>
    </div>
</template>

<script>

export default {
  name: 'Credentials',
  data() {
    return {
      search: '',
      credentials: [
          {
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
          },
        ],
    }
  },
  computed: {
    filteredList() {
      return this.credentials.filter(credential => {
        return JSON.stringify(credential).toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  async asyncData ({ $axios }) {
    // TODO: select DID to use
    const credList = await $axios.$get("/api/wallet/credentials/list")
    const credentials = credList.list
    return { credentials }
  }
};
</script>
