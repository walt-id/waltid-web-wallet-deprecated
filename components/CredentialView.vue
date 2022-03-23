<template>
  <div class="p-4">
    <VerifiableVaccinationCertificate v-if="credential.type[credential.type.length-1] == 'VerifiableVaccinationCertificate'" :credential="credential" />
    <VerifiableID v-if="credential.type[credential.type.length-1] == 'VerifiableId'" :credential="credential" />
    <VerifiableDiploma v-if="credential.type[credential.type.length-1] == 'VerifiableDiploma'" :credential="credential" />
    <ProofOfResidence v-if="credential.type[credential.type.length-1] == 'ProofOfResidence'" :credential="credential" />
    <ParticipantCredential v-if="credential.type[credential.type.length-1] == 'ParticipantCredential'" :credential="credential" />
    <EuropeanBankIdentity v-if="credential.type[credential.type.length-1] == 'EuropeanBankIdentity'" :credential="credential" />
    <Europass v-if="credential.type[credential.type.length-1] == 'Europass'" :credential="credential" />
  </div>
</template>

<script>
import moment from "moment"
export default {
  name: "CredentialView",
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
