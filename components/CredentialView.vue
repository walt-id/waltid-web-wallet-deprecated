<template>
  <div class="p-4">
    <div class="col-12 py-3">
                            <span>
                                <h5>Title</h5>
                                <p>National ID</p>
                            </span>
    </div>
    <div class="d-flex py-3">
                            <span class="col-4">
                                <h5>Issuer</h5>
                                <p>Government</p>
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
                                <p>{{ Intl.DateTimeFormat("en-US").format(new Date(credential.issuanceDate)) }}</p>
                            </span>
      <span class="col-4">
                                <h5>Expire</h5>
                                <p v-if="credential.expirationDate">{{ Intl.DateTimeFormat("en-US").format(new Date(credential.expirationDate)) }}</p>
                            </span>
      <span class="col-4">
                                <h5>Valid From</h5>
                                <p>{{ Intl.DateTimeFormat("en-US").format(new Date(credential.validFrom)) }}</p>
                            </span>
    </div>
    <div class="col-12 py-3">
      <div class="_image"
           style="background-image: url('https://www.urbanpedaltours.com/wp-content/uploads/2019/04/team.png');"></div>
    </div>
    <div class="text-left">
                            <span class="col-12 pb-3">
                                <h5>First Name</h5>
                                <p>{{ credential.credentialSubject.firstName }}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>Last Name</h5>
                                <p>{{ credential.credentialSubject.familyName }}</p>
                            </span>
      <span class="col-12 px-3">
                                <h5>No°</h5>
                                <p>273-29F-38</p>
                            </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CredentialView",
  props: {
    credential: {}
  }
}
</script>

<style scoped>

</style>