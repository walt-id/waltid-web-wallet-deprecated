<template>
  <div class="p-4">
    <CredentialHeader :credential="credential"></CredentialHeader>
    <div class="col-12 py-3">
      <div
        class="_image"
        style="
          background-image: url('https://www.urbanpedaltours.com/wp-content/uploads/2019/04/team.png');
        "
      ></div>
    </div>
    <div class="text-left">
      <IdentifierComponent :identifier="credential.credentialSubject.identifier"/>
    </div>
    <div class="text-left">
      <span class="col-12 pb-3">
        <h5>{{ $t("CREDENTIAL.FIRST_NAME") }}</h5>
        <p>{{ credential.credentialSubject.givenNames }}</p>
      </span>
      <span class="col-12 px-3">
        <h5>{{ $t("CREDENTIAL.LAST_NAME") }}</h5>
        <p>{{ credential.credentialSubject.familyName }}</p>
      </span>
      <span class="col-12 px-3">
        <h5>{{ $t("CREDENTIAL.DATE_OF_BIRTH") }}</h5>
        <p>{{ credential.credentialSubject.dateOfBirth }}</p>
      </span>
    </div>

    <!-- achieved -->
    <AchievedComponent :achieved="credential.credentialSubject.achieved"/>

    <!-- learning achievemnt -->
    <!-- end learning achievement -->

    <!-- awarding opportunity -->
    <!-- end awarding opportunity -->

    <!-- learning specification -->
    <!-- end learning specification -->

    <div class="text-left"></div>
  </div>
</template>

<script>
import moment from "moment";
import CredentialHeader from "../CredentialHeader.vue";
import AchievedComponent from "./AchievedComponent.vue";
import IdentifierComponent from "./IdentifierComponent.vue";

export default {
  name: "Europass",
  props: {
    credential: {},
  },
  data() {
    return {
      moment: moment,
    };
  },
  components: {
    CredentialHeader,
    AchievedComponent,
    IdentifierComponent,
  },
};
</script>

<style scoped>
</style>
