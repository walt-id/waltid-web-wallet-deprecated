<template>
  <div class="p-4">
    <div class="col-12 py-3">
                            <span>
                                <h5>Title</h5>
                                <p>{{credential.title ? credential.title : credential.type[credential.type.length-1]}}</p>
                            </span>
    </div>
    <div class="d-flex py-3">
                            <span class="col-4">
                                <h5>Issuer</h5>
                                <p class="text-truncate" style="max-width: 12em">{{credential.issuerName ? credential.issuerName : credential.issuer}}</p>
                            </span>
      <span class="col-4">
                            </span>
      <span class="col-4">
                                <h5>Statue</h5>
                                <p>Valid</p>
                            </span>
    </div>
    <div class="d-flex py-3 border-bottom border-secondary">
                            <span class="col-4">
                                <h5>Issued on</h5>
                                <p>{{moment(credential.issuanceDate).format("MMM Do YYYY")}}</p>
                            </span>
      <span class="col-4">
                                <h5>Expire</h5>
                                <p>{{credential.expirationDate ? moment(credential.expirationDate).format("MMM Do YYYY") : "Never"}}</p>
                            </span>
      <span class="col-4">
                                <h5>Valid From</h5>
                                <p>{{moment(credential.validFrom).format("MMM Do YYYY")}}</p>
                            </span>
    </div>
    <div class="col-12 py-3">
      <div class="_image" style="background-image: url('https://www.urbanpedaltours.com/wp-content/uploads/2019/04/team.png');"></div>
    </div>
    <div class="text-left">
                            <span class="col-12 pb-3">
                                <h5>First Name</h5>
                                <p>{{credential.credentialSubject.givenNames}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>Last Name</h5>
                                <p>{{credential.credentialSubject.familyName}}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>Date Of Birth</h5>
                                <p>{{credential.credentialSubject.dateOfBirth}}</p>
                            </span>
      <!-- TODO: add more properties for VerifiableDiploma -->
      <span class="col-12 px-3">
                                <h5>DID</h5>
                                <p>{{credential.credentialSubject.id}}</p>
                            </span>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "VerifiableDiploma",
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
