<template>
  <div class="p-4">
    <div class="col-12 py-3">
      <span>
        <h5>{{ $t('CREDENTIAL.TITLE') }}</h5>
        <p>{{ $t('TYPE' + credential.type[credential.type.length - 1]) }}</p>
      </span>
    </div>
    <!-- issuer -->
    <div class="d-flex py-3">
      <ImageComponent :image="credential.issuer.image"></ImageComponent>
      <span class="col-4">
        <h5>{{ $t('CREDENTIAL.ISSUER') }}</h5>
        <p class="text-truncate" style="max-width: 12em">{{ credential.issuer.name ? credential.issuer.name :
          credential.issuer }}</p>
      </span>
      <span class="col-4"></span>
      <span class="col-4">
        <h5>{{ $t('ISSUER.TYPE') }}</h5>
        <p class="text-truncate" style="max-width: 12em">{{ credential.issuer.type }}</p>
      </span>
      <span class="col-4"></span>
      <span class="col-4">
        <h5>{{ $t('ISSUER.ID') }}</h5>
        <p class="text-truncate" style="max-width: 12em">{{ credential.issuer.id }}</p>
      </span>
      <span class="col-4"></span>
      <span class="col-4" v-if="credential.issuer.url">
        <h5>{{ $t('ISSUER.URL') }}</h5>
        <p class="text-truncate" style="max-width: 12em">{{ credential.issuer.url }}</p>
      </span>
    </div>
    <!-- credential -->
    <span class="col-4" v-if="credential.id">
      <h5>{{$t('CREDENTIAL.ID')}}</h5>
      <p>{{ credential.id }}</p>
    </span>
    <div class="d-flex py-3 border-bottom mb-3 border-secondary">
      <span class="col-4" v-if="credential.issuanceDate">
        <h5>{{$t('CREDENTIAL.ISSUED_ON')}}</h5>
        <p>{{moment(credential.issuanceDate).format("MMM Do YYYY")}}</p>
      </span>
      <span class="col-4">
        <h5>{{$t('CREDENTIAL.EXPIRE')}}</h5>
        <p>{{credential.expirationDate ? moment(credential.expirationDate).format("MMM Do YYYY") : "Never"}}</p>
      </span>
      <span class="col-4" v-if="credential.validFrom">
        <h5>{{$t('CREDENTIAL.VALID_FROM')}}</h5>
        <p>{{moment(credential.validFrom).format("MMM Do YYYY")}}</p>
      </span>
    </div>
    <!-- credential subject -->
    <div class="text-left">
      <span class="col-12 pb-3">
        <h5>{{ $t('CREDENTIAL_SUBJECT.TYPE') }}</h5>
        <p>{{ credential.credentialSubject.type }}</p>
      </span>
      <span class="col-12 px-3" v-if="credential.credentialSubject.id">
        <h5>{{ $t('CREDENTIAL_SUBJECT.ID') }}</h5>
        <p>{{ credential.credentialSubject.id }}</p>
      </span>
      <!-- achievement -->
      <ImageComponent :image="credential.credentialSubject.achievement.image"></ImageComponent>
      <span class="col-12 px-3">
        <h5>{{ $t('ACHIEVEMENT.TYPE') }}</h5>
        <p>{{ credential.credentialSubject.achievement.type }}</p>
      </span>
      <span class="col-12 px-3">
        <h5>{{ $t('ACHIEVEMENT.NAME') }}</h5>
        <p>{{ credential.credentialSubject.achievement.name }}</p>
      </span>
      <span class="col-12 px-3" v-if="credential.credentialSubject.achievement.description">
        <h5>{{ $t('ACHIEVEMENT.DESCRIPTION') }}</h5>
        <p>{{ credential.credentialSubject.achievement.description }}</p>
      </span>
      <!-- criteria -->
      <span class="col-12 px-3">
        <h5>{{ $t('CRITERIA.TYPE') }}</h5>
        <p>{{ credential.credentialSubject.achievement.criteria.type }}</p>
      </span>
      <span class="col-12 px-3" v-if="credential.credentialSubject.achievement.criteria.narrative">
        <h5>{{ $t('CRITERIA.NARRATIVE') }}</h5>
        <p>{{ credential.credentialSubject.achievement.criteria.narrative }}</p>
      </span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import ImageComponent from "../ImageComponent.vue";

export default {
  name: "OpenBadgeCredential",
  props: {
    credential: {}
  },
  data() {
    return {
      moment: moment
    }
  },
  components: {
    ImageComponent,
  },
}
</script>

<style scoped>
</style>
