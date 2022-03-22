<template>
  <div class="p-4">
    <div class="col-12 py-3">
                            <span>
                                <h5>{{$t('CREDENTIAL.TITLE')}}</h5>
                                <p>{{$t('CREDENTIAL.TYPE.' + credential.type[credential.type.length-1])}}</p>
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
    <div class="d-flex py-3 border-bottom mb-3 border-secondary">
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
                                <h5>{{$t('CREDENTIAL.ID')}}</h5>
                                <p>{{credential.credentialSubject.id}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.COMPANY_NUMBER')}}</h5>
                                <p>{{credential.credentialSubject.companyNumber}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.COMPANY_NAME')}}</h5>
                                <p>{{credential.credentialSubject.companyName}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.HEADQUARTER_COUNTRY')}}</h5>
                                <p>{{credential.credentialSubject.headquarterCountry}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.LEGAL_COUNTRY')}}</h5>
                                <p>{{credential.credentialSubject.legalCountry}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.LEI')}}</h5>
                                <p>{{credential.credentialSubject.lei}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.PARENT_ORGANIZATION')}}</h5>
                                <p>{{credential.credentialSubject.parentOrganisation}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.SUB_ORGANIZATION')}}</h5>
                                <p>{{credential.credentialSubject.subOrganisation}}</p>
                            </span>

      <!-- <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.PROGRAM_NAME')}}</h5>
                                <p>{{credential.credentialSubject.programName}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.DOMAIN')}}</h5>
                                <p>{{credential.credentialSubject.domain}}</p>
                            </span> -->
<!--      <span class="col-12 px-3">-->
<!--                                <h5>{{$t('CREDENTIAL.ETH_ADDRESS')}}</h5>-->
<!--                                <p>{{credential.credentialSubject.ethereumAddress}}</p>-->
<!--                            </span>-->
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "VerifiableID",
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
