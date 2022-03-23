<template>
    <span class="col-12 pb-3">
        <ItemValueComponent :title="$t('CREDENTIAL.ID')" :value="wasInfluencedBy.id"/>
        <ItemValueComponent :title="$t('CREDENTIAL.TITLE')" :value="wasInfluencedBy.title"/>
        <!-- identifier -->
          <div v-for="identifier in wasInfluencedBy.identifier" v-bind:key="identifier">
              <EuropassIdentifierComponent :identifier="identifier"/>
          </div>
          <ItemValueComponent :title="$t('CREDENTIAL.DEFINITION')" :value="wasInfluencedBy.definition"/>
          <ItemValueComponent :title="$t('CREDENTIAL.WORKLOAD')" :value="wasInfluencedBy.workload"/>
          <ItemValueComponent :title="$t('CREDENTIAL.STARTED_AT_TIME')" :value="wasInfluencedBy.startedAtTime"/>
          <ItemValueComponent :title="$t('CREDENTIAL.ENDED_AT_TIME')" :value="wasInfluencedBy.endedAtTime"/>
          <LoopLiComponent :title="$t('CREDENTIAL.DIRECTED_BY')" :items="wasInfluencedBy.directedBy"/>
          <LoopLiComponent :title="$t('CREDENTIAL.LOCATION')" :items="wasInfluencedBy.location"/>
          <WasInfluencedSpecifiedByComponent :specifiedBy="wasInfluencedBy.specifiedBy"/>
    </span>
</template>

<script>
import moment from "moment";
import LoopLiComponent from "./LoopLiComponent.vue";
import ItemValueComponent from "./ItemValueComponent.vue";
import EuropassIdentifierComponent from "./EuropassIdentifierComponent.vue";
import WasInfluencedSpecifiedByComponent from "./WasInfluencedSpecifiedByComponent.vue";

export default {
  name: "EuropassWasInfluencedByComponent",
  props: {
    wasInfluencedBy: {}
  },
  data() {
    return {
      moment: moment
    }
  },
  components: {
    LoopLiComponent,
    ItemValueComponent,
    EuropassIdentifierComponent,
    WasInfluencedSpecifiedByComponent,
  },
}
</script>

<style scoped>

</style>