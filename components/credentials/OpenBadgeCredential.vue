<template>
  <div class="p-4">
    <div class="col-12 py-3">
      <span>
        <h5>{{ $t('CREDENTIAL.TITLE') }}</h5>
        <p>{{ $t('CREDENTIAL.TYPE' + credential.type[credential.type.length - 1]) }}</p>
      </span>
    </div>
    <div class="d-flex py-3">
      <span class="col-4">
        <h5>{{ $t('CREDENTIAL.ISSUER') }}</h5>
        <p class="text-truncate" style="max-width: 12em">{{ credential.issuerObject.name ? credential.issuerObject.name : credential.issuer }}</p>
      </span>
      <span class="col-4"></span>
      <span class="col-4">
        <h5>{{ $t('CREDENTIAL.ISSUER.TYPE') }}</h5>
        <p class="text-truncate" style="max-width: 12em">{{ credential.issuerObject.type }}</p>
      </span>
      <span class="col-4"></span>
      <span class="col-4">
        <h5>{{ $t('CREDENTIAL.DID') }}</h5>
        <p class="text-truncate" style="max-width: 12em">{{ credential.issuerObject.id }}</p>
      </span>
      <span class="col-4"></span>
      <span class="col-4">
        <h5>{{ $t('CREDENTIAL.ISSUER.URL') }}</h5>
        <p class="text-truncate" style="max-width: 12em">{{ credential.issuerObject.url }}</p>
      </span>
    </div>
    <div class="d-flex py-3 border-bottom mb-3 border-secondary">
      <span class="col-4">
        <h5>{{ $t('CREDENTIAL.ISSUED_ON') }}</h5>
        <p>{{ moment(credential.issuanceDate).format("MMM Do YYYY") }}</p>
      </span>
      <span class="col-4">
        <h5>{{ $t('CREDENTIAL.EXPIRE') }}</h5>
        <p>{{ credential.expirationDate ? moment(credential.expirationDate).format("MMM Do YYYY") : "Never" }}</p>
      </span>
      <span class="col-4">
        <h5>{{ $t('CREDENTIAL.VALID_FROM') }}</h5>
        <p>{{ moment(credential.validFrom).format("MMM Do YYYY") }}</p>
      </span>
    </div>
    <div class="col-12 py-3">
      <div class="_image"
        style="background-image: url('credential.credentialSubject.achievement.image');"></div>
    </div>
    <div class="text-left">
      <span class="col-12 pb-3">
        <h5>{{ $t('CREDENTIAL.SUBJECT.TYPE') }}</h5>
        <p>{{ credential.credentialSubject.type }}</p>
      </span>
      <span class="col-12 px-3">
        <h5>{{ $t('CREDENTIAL.DID') }}</h5>
        <p>{{ credential.credentialSubject.id }}</p>
      </span>
      <span class="col-12 px-3">
        <h5>{{ $t('CREDENTIAL.TYPE') }}</h5>
        <p>{{ credential.credentialSubject.achievement.type }}</p>
      </span>
      <span class="col-12 px-3">
        <h5>{{ $t('CREDENTIAL.NAME') }}</h5>
        <p>{{ credential.credentialSubject.achievement.name }}</p>
      </span>
      <span class="col-12 px-3">
        <h5>{{ $t('CREDENTIAL.NAME') }}</h5>
        <p>{{ credential.credentialSubject.achievement.name }}</p>
      </span>
      <span class="col-12 px-3">
        <h5>{{ $t('CREDENTIAL.DESCRIPTION') }}</h5>
        <p>{{ credential.credentialSubject.achievement.description }}</p>
      </span>
      <span class="col-12 px-3">
        <h5>{{ $t('CREDENTIAL.TYPE') }}</h5>
        <p>{{ credential.credentialSubject.achievement.criteria.type }}</p>
      </span>
      <span class="col-12 px-3">
        <h5>{{ $t('CREDENTIAL.NARRATIVE') }}</h5>
        <p>{{ credential.credentialSubject.achievement.criteria.narrative }}</p>
      </span>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "OpenBadgeCredential",
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
