<template>
  <div class="p-4">
    <div class="col-12 py-3">
                            <span>
                                <h5>{{ $t('CREDENTIAL.TITLE') }}</h5>
                                <p>{{ $t('CREDENTIAL.TYPE.' + credential.type[credential.type.length - 1]) }}</p>
                            </span>
    </div>
    <div class="d-flex py-3">
                            <span class="col-4">
                                <h5>{{ $t('CREDENTIAL.ISSUER') }}</h5>
                                <p class="text-truncate"
                                   style="max-width: 12em">{{
                                    credential.issuerName ? credential.issuerName : credential.issuer
                                  }}</p>
                            </span>
      <span class="col-4">
                            </span>
      <span class="col-4">
                                <h5>{{ $t('CREDENTIAL.STATUS') }}</h5>
                                <p>Valid</p>
                            </span>
    </div>
    <div class="d-flex py-3 border-bottom mb-3 border-secondary">
                            <span class="col-4">
                                <h5>{{ $t('CREDENTIAL.ISSUED_ON') }}</h5>
                                <p>{{ moment(credential.issuanceDate).format("MMM Do YYYY") }}</p>
                            </span>
      <span class="col-4">
                                <h5>{{ $t('CREDENTIAL.EXPIRE') }}</h5>
                                <p>{{
                                    credential.expirationDate ? moment(credential.expirationDate).format("MMM Do YYYY") : "Never"
                                  }}</p>
                            </span>
      <span class="col-4">
                                <h5>{{ $t('CREDENTIAL.VALID_FROM') }}</h5>
                                <p>{{ moment(credential.validFrom).format("MMM Do YYYY") }}</p>
                            </span>
    </div>

    <div class="text-left">
      <span class="col-12 pb-3">
          <h5>{{ $t('CREDENTIAL.FAMILY_NAME') }}</h5>
          <p>{{ credential.credentialSubject.familyName }}</p>
      </span>
      <span class="col-12 px-3">
          <h5>{{ $t('CREDENTIAL.GIVEN_NAME') }}</h5>
          <p>{{ credential.credentialSubject.givenNames }}</p>
      </span>
      <span class="col-12 px-3">
          <h5>{{ $t('CREDENTIAL.DATE_OF_BIRTH') }}</h5>
          <p>{{ credential.credentialSubject.dateOfBirth }}</p>
      </span>
      <span class="col-12 px-3">
          <h5>{{ $t('CREDENTIAL.PLACE_OF_BIRTH_COUNTRY') }}</h5>
          <p>{{ credential.credentialSubject.placeOfBirth.country }}</p>
      </span>
      <span class="col-12 px-3">
          <h5>{{ $t('CREDENTIAL.DATE_OF_BIRTH_LOCALITY') }}</h5>
          <p>{{ credential.credentialSubject.placeOfBirth.locality }}</p>
      </span>
      <span class="col-12 pb-3">
          <h5>{{ $t('CREDENTIAL.ID') }}</h5>
          <p>{{ credential.credentialSubject.id }}</p>
      </span>
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
