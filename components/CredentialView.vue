<template>
  <div class="p-4">
    <div class="text-center">
      <canvas :id="'qr-' + credential.id" />
    </div>
    <VerifiableVaccinationCertificate v-if="credential.type[credential.type.length-1] == 'VerifiableVaccinationCertificate'" :credential="credential" />
    <VerifiableID v-if="credential.type[credential.type.length-1] == 'VerifiableId'" :credential="credential" />
    <VerifiableDiploma v-if="credential.type[credential.type.length-1] == 'VerifiableDiploma'" :credential="credential" />
    <ProofOfResidence v-if="credential.type[credential.type.length-1] == 'ProofOfResidence'" :credential="credential" />
    <ParticipantCredential v-if="credential.type[credential.type.length-1] == 'ParticipantCredential'" :credential="credential" />
    <EuropeanBankIdentity v-if="credential.type[credential.type.length-1] == 'EuropeanBankIdentity'" :credential="credential" />
    <Europass v-if="credential.type[credential.type.length-1] == 'Europass'" :credential="credential" />
    <OpenBadgeCredential v-if="credential.type[credential.type.length-1] == 'OpenBadgeCredential'" :credential="credential" />
  </div>
</template>

<script>
import moment from "moment"
import QRious from "qrious"
export default {
  name: "CredentialView",
  props: {
    credential: {}
  },
  data() {
    return {
      moment: moment,
    }
  },
  mounted() {
    new QRious({
        element: document.getElementById('qr-' + this.credential.id),
        value: JSON.stringify(this.credential),
        size: 300
      })
  }
}
</script>

<style scoped>

</style>
