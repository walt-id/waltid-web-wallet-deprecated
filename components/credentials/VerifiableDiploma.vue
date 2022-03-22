<template>
  <div class="p-4">
    <CredentialHeader :credential="credential"></CredentialHeader>
    <div class="col-12 py-3">
      <div class="_image" style="background-image: url('https://www.urbanpedaltours.com/wp-content/uploads/2019/04/team.png');"></div>
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
          <h5>{{$t('CREDENTIAL.DATE_OF_BIRTH')}}</h5>
          <p>{{credential.credentialSubject.dateOfBirth}}</p>
      </span>
      <!-- TODO: add more properties for VerifiableDiploma -->
      <span class="col-12 px-3">
          <h5>{{$t('CREDENTIAL.DID')}}</h5>
          <p style="word-wrap: break-word;">{{credential.credentialSubject.id}}</p>
      </span>

      <span class="col-12 px-3">
          <h5>{{$t('CREDENTIAL.GRADING_SCHEMA')}}</h5>
          <p>{{credential.credentialSubject.gradingScheme.title}}</p>
      </span>

      <span class="col-12 px-3">
          <h5>{{$t('CREDENTIAL.LEARNING_ACHIEVEMENT')}}</h5>
          <p>{{credential.credentialSubject.learningAchievement.title}}</p>
      </span>

      <span class="col-12 px-3">
          <h5>{{$t('CREDENTIAL.ECTS_CREDIT_POINTS')}}</h5>
          <p>{{credential.credentialSubject.learningSpecification.ectsCreditPoints}}</p>
      </span>

    </div>
  </div>
</template>

<script>
import moment from "moment";
import CredentialHeader from './CredentialHeader.vue';

export default {
  name: "VerifiableDiploma",
  props: {
    credential: {}
  },
  data() {
    return {
      moment: moment
    }
  },
  components: {
    CredentialHeader
  }
}
</script>

<style scoped>

</style>
