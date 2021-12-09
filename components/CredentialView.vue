<template>
  <div class="p-4">
    <VerifiableVaccinationCertificate v-if="credential.type[credential.type.length-1] == 'VerifiableVaccinationCertificate'" :credential="credential" />
  </div>
</template>

<script>
import moment from "moment"
import VerifiableVaccinationCertificate from "@/components/credentials/VerifiableVaccinationCertificate";
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
