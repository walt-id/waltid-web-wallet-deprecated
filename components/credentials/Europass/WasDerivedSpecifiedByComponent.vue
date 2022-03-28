<template>
    <span class="col-12 pb-3" v-if="specifiedBy">
        <h5>{{ title }}</h5>
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
    title: {},
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