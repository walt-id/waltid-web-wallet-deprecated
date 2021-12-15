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
                                <h5>{{$t('CREDENTIAL.FIRST_NAME')}}</h5>
                                <p>{{credential.credentialSubject.givenNames}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.LAST_NAME')}}</h5>
                                <p>{{credential.credentialSubject.familyName}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.GENDER')}}</h5>
                                <p>{{credential.credentialSubject.personSex}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.DATE_OF_BIRTH')}}</h5>
                                <p>{{credential.credentialSubject.dateOfBirth}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.VACCINE_OR_PROFYLAXIS')}}</h5>
                                <p>{{credential.credentialSubject.vaccinationProphylaxisInformation[0].vaccineOrProphylaxis}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.VACCINE_MEDICINAL_PRODUCT')}}</h5>
                                <p>{{credential.credentialSubject.vaccinationProphylaxisInformation[0].vaccineMedicinalProduct}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.DOSE_NUMBER')}}</h5>
                                <p>{{credential.credentialSubject.vaccinationProphylaxisInformation[0].doseNumber}} / {{credential.credentialSubject.vaccinationProphylaxisInformation[0].totalSeriesOfDoses}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.DATE_OF_VACCINATION')}}</h5>
                                <p>{{credential.credentialSubject.vaccinationProphylaxisInformation[0].dateOfVaccination}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.ADMINISTERING_CENTER')}}</h5>
                                <p>{{credential.credentialSubject.vaccinationProphylaxisInformation[0].administeringCentre}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.COUNTRY_OF_VACCINATION')}}</h5>
                                <p>{{credential.credentialSubject.vaccinationProphylaxisInformation[0].countryOfVaccination}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>{{$t('CREDENTIAL.DID')}}</h5>
                                <p>{{credential.credentialSubject.id}}</p>
                            </span>
    </div>
  </div>
</template>

<script>
import moment from "moment"
export default {
  name: "VerifiableVaccinationCertificate",
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
