<template>
    <span class="col-12 pb-3">
        <h5>{{ $t("CREDENTIAL.SPECIFIED_BY") }}</h5>
        <ItemValueComponent :title="$t('CREDENTIAL.ID')" :value="specifiedBy.id"/>
        <ItemValueComponent :title="$t('CREDENTIAL.TITLE')" :value="specifiedBy.title"/>
        <GradingSchemeComponent :gradingScheme="specifiedBy.gradingScheme"/>
    </span>
</template>

<script>
import moment from "moment";
import ItemValueComponent from "./ItemValueComponent.vue";
import GradingSchemeComponent from "./GradingSchemeComponent.vue";

export default {
  name: "WasDerivedSpecifiedByComponent",
  props: {
    specifiedBy: {},
  },
  data() {
    return {
      moment: moment,
    };
  },
  components: {
    ItemValueComponent,
    GradingSchemeComponent,
  },
};
</script>

<style scoped>
</style>