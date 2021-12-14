<template>
  <div class="p-4">
    <div class="col-12 py-3">
                            <span>
                                <h5>{{$t('CREDENTIAL.TITLE')}}</h5>
                                <p>{{credential.title ? credential.title : credential.type[credential.type.length-1]}}</p>
                            </span>
    </div>
    <div class="d-flex py-3">
                            <span class="col-4">
                                <h5>{{$t('CREDENTIAL.ISSUER')}}</h5>
                                <p class="text-truncate" style="max-width: 12em">{{credential.issuerName ? credential.issuerName : credential.issuer}}</p>
                            </span>
      <span class="col-4">
                            </span>
      <span class="col-4">
                                <h5>{{$t('CREDENTIAL.STATUS')}}</h5>
                                <p>Valid</p>
                            </span>
    </div>
    <div class="d-flex py-3 border-bottom border-secondary">
                            <span class="col-4">
                                <h5>{{$t('CREDENTIAL.ISSUED_ON')}}</h5>
                                <p>{{moment(credential.issuanceDate).format("MMM Do YYYY")}}</p>
                            </span>
      <span class="col-4">
                                <h5>{{$t('CREDENTIAL.EXPIRE')}}</h5>
                                <p>{{credential.expirationDate ? moment(credential.expirationDate).format("MMM Do YYYY") : "Never"}}</p>
                            </span>
      <span class="col-4">
                                <h5>{{$t('CREDENTIAL.VALID_FROM')}}</h5>
                                <p>{{moment(credential.validFrom).format("MMM Do YYYY")}}</p>
                            </span>
    </div>
    <div class="text-left">
                            <span class="col-12 pb-3">
                                <h5>{{$t('CREDENTIAL.FIRST_NAME')}}</h5>
                                <p>{{credential.credentialSubject.firstNames}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.LAST_NAME')}}</h5>
                                <p>{{credential.credentialSubject.familyName}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.GENDER')}}</h5>
                                <p>{{credential.credentialSubject.gender}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.DATE_OF_BIRTH')}}</h5>
                                <p>{{credential.credentialSubject.dateOfBirth}}</p>
                            </span>
            <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.ADDRESS')}}</h5>
                                <p>{{credential.credentialSubject.address.streetAddress}}</p>
                                <p>{{credential.credentialSubject.address.postalCode}}</p>
                                <p>{{credential.credentialSubject.address.locality}}</p>
                                <p>{{credential.credentialSubject.address.countryName}}</p>
                            </span>
            <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.FAMILY_STATUS')}}</h5>
                                <p>{{credential.credentialSubject.familyStatus}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.IDENTIFICATION_NUMBER')}}</h5>
                                <p>{{credential.credentialSubject.identificationNumber}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.DID')}}</h5>
                                <p>{{credential.credentialSubject.id}}</p>
                            </span>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "ProofOfResidence",
  props: {
    credential: {}
  },
  data() {
    return {
      moment: moment
    }
  }
}
</script>

<style scoped>

</style>
