<template>
    <span class="col-12 pb-3">
        <ItemValueComponent :title="$t('CREDENTIAL.TITLE')" :value="wasInfluencedBy.title"/>
        <!-- identifier -->
          <div v-for="identifier in wasInfluencedBy.identifier" v-bind:key="identifier">
              <IdentifierComponent :identifier="identifier"/>
          </div>
          <ItemValueComponent :title="$t('CREDENTIAL.DEFINITION')" :value="wasInfluencedBy.definition"/>
          <ItemValueComponent :title="$t('CREDENTIAL.WORKLOAD')" :value="wasInfluencedBy.workload"/>
          <ItemValueComponent :title="$t('CREDENTIAL.STARTED_AT_TIME')" :value="wasInfluencedBy.startedAtTime"/>
          <ItemValueComponent :title="$t('CREDENTIAL.ENDED_AT_TIME')" :value="wasInfluencedBy.endedAtTime"/>
          <LoopLiComponent :title="$t('CREDENTIAL.DIRECTED_BY')" :items="wasInfluencedBy.directedBy"/>
          <LoopLiComponent :title="$t('CREDENTIAL.LOCATION')" :items="wasInfluencedBy.location"/>
          <WasInfluencedSpecifiedByComponent :specifiedBy="wasInfluencedBy.specifiedBy" :title="$t('CREDENTIAL.SPECIFIED_BY')"/>
    </span>
</template>

<script>
import moment from "moment";
import LoopLiComponent from "./LoopLiComponent.vue";
import ItemValueComponent from "./ItemValueComponent.vue";
import IdentifierComponent from "./IdentifierComponent.vue";
import WasInfluencedSpecifiedByComponent from "./WasInfluencedSpecifiedByComponent.vue";

export default {
  name: "WasInfluencedByComponent",
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
    IdentifierComponent,
    WasInfluencedSpecifiedByComponent,
  },
}
</script>

<style scoped>

</style>