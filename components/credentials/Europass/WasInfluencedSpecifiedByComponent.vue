<template>
    <span class="col-12 pb-3">
        <ItemValueComponent :title="$t('CREDENTIAL.ID')" :value="specifiedBy.id"/>
        <ItemValueComponent :title="$t('CREDENTIAL.TITLE')" :value="specifiedBy.title"/>
        <!-- identifier -->
          <div v-for="identifier in specifiedBy.identifier" v-bind:key="identifier">
              <IdentifierComponent :identifier="identifier"/>
          </div>
          <LoopLiComponent :title="$t('CREDENTIAL.LEARNING_ACTIVITY_TYPE')" :items="specifiedBy.learningActivityType"/>
          <ItemValueComponent :title="$t('CREDENTIAL.WORKLOAD')" :value="specifiedBy.workload"/>
          <LoopLiComponent :title="$t('CREDENTIAL.LANGUAGE')" :items="specifiedBy.language"/>
          <LoopLiComponent :title="$t('CREDENTIAL.ALTERNATIVE_LABEL')" :items="specifiedBy.alternativeLabel"/>
          <ItemValueComponent :title="$t('CREDENTIAL.DEFINITION')" :value="specifiedBy.definition"/>
          <LoopLiComponent :title="$t('CREDENTIAL.ADDITIONAL_NOTE')" :items="specifiedBy.additionalNote"/>
          <ItemValueComponent :title="$t('CREDENTIAL.HOME_PAGE')" :value="specifiedBy.homePages"/>
          <LoopLiComponent :title="$t('CREDENTIAL.SUPPLEMENTARY_DOCUMENT')" :items="specifiedBy.suplementaryDocument"/>
          <ItemValueComponent :title="$t('CREDENTIAL.MODE')" :value="specifiedBy.mode"/>
          <!-- TODO -->
          <!-- teaches -->
          <!-- hasPart -->
          <!-- specialisationOf -->
    </span>
</template>

<script>
import moment from "moment";
import LoopLiComponent from "./LoopLiComponent.vue";
import ItemValueComponent from "./ItemValueComponent.vue";
import IdentifierComponent from "./IdentifierComponent.vue";

export default {
  name: "WasInfluencedSpecifiedByComponent",
  props: {
    specifiedBy: {}
  },
  data() {
    return {
      moment: moment
    }
  },
  components: {
    LoopLiComponent,
    ItemValueComponent,
    IdentifierComponent
  },
}
</script>

<style scoped>

</style>