<template>
    <span class="col-12 px-3">
        <ItemValueComponent :title="$t('CREDENTIAL.ID')" :value="specifiedBy.id"/>
        <ItemValueComponent :title="$t('CREDENTIAL.TITLE')" :value="specifiedBy.title"/>
        <ItemValueComponent :title="$t('CREDENTIAL.VOLUME_OF_LEARNING')" :value="specifiedBy.volumeOfLearning"/>
        <ItemValueComponent :title="$t('CREDENTIAL.ECTS_CREDIT_POINTS')" :value="specifiedBy.eCTSCreditPoints"/>
        <ItemValueComponent :title="$t('CREDENTIAL.MAXIMUM_DURATION')" :value="specifiedBy.maximumDuration"/>
        <ItemValueComponent :title="$t('CREDENTIAL.IS_PARTIAL_QUALIFICATION')" :value="specifiedBy.isPartialQualification"/>
        <ItemValueComponent :title="$t('CREDENTIAL.EQFL_LEVEL')" :value="specifiedBy.eqflLevel"/>
        <ItemValueComponent :title="$t('CREDENTIAL.NQFL_LEVEL')" :value="specifiedBy.nqflLevel"/>
    </span>
</template>

<script>
import moment from "moment";
import ItemValueComponent from "./ItemValueComponent.vue";

export default {
  name: "EuropassHasPartComponent",
  props: {
    specifiedBy: {}
  },
  data() {
    return {
      moment: moment
    }
  },
  components: {
    ItemValueComponent,
  },
}
</script>

<style scoped>

</style>