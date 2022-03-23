<template>
    <span class="col-12 pb-3">
        <h5>{{ $t("CREDENTIAL.GRADING_SCHEMA") }}</h5>
        <ItemValueComponent :title="$t('CREDENTIAL.ID')" :value="gradingScheme.id"/>
        <ItemValueComponent :title="$t('CREDENTIAL.TITLE')" :value="gradingScheme.title"/>
        <ItemValueComponent :title="$t('CREDENTIAL.DEFINITION')" :value="gradingScheme.definition"/>
    </span>
</template>

<script>
import moment from "moment";
import ItemValueComponent from "./ItemValueComponent.vue";

export default {
  name: "GradingSchemeComponent",
  props: {
    gradingScheme: {},
  },
  data() {
    return {
      moment: moment,
    };
  },
  components: {
    ItemValueComponent,
  },
};
</script>

<style scoped>
</style>