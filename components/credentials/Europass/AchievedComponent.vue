<template>
    <div class="text-left">
      <span class="col-12 pb-3">
        <h5>{{ $t("CREDENTIAL.ACHIEVED") }}</h5>
      </span>
      <!-- outer loop -->
        <div v-for="achievedValue in achieved"  v-bind:key="achievedValue">
          <ItemValueComponent :title="$t('CREDENTIAL.TITLE')" :value="achievedValue.title"/>
          <!-- additional note -->
          <LoopLiComponent :items="achievedValue.additionalNote" :title="$t('CREDENTIAL.ADDITIONAL_NOTE')"/>
          <!-- identifier -->
          <div v-for="identifier in achievedValue.identifier" v-bind:key="identifier">
              <IdentifierComponent :identifier="identifier"/>
          </div>
          <!-- was derived from -->
          <span class="col-12 px-3">
            <h5>{{ $t("CREDENTIAL.WAS_DERIVED_FROM") }}</h5>
            <div v-for="derived in achievedValue.wasDerivedFrom"  v-bind:key="derived">
              <WasDerivedFromComponent :wasDerivedFrom="derived"/>
            </div>
          </span>
          <!-- was influenced by -->
          <span class="col-12 px-3">
            <h5>{{ $t("CREDENTIAL.WAS_INFLUENCED_BY") }}</h5>
            <div v-for="wasInfluencedBy in achievedValue.wasInfluencedBy"  v-bind:key="wasInfluencedBy">
              <WasInfluencedByComponent :wasInfluencedBy="wasInfluencedBy"/>
            </div>
          </span>
          <!-- was awarded by -->
          <span class="col-12 px-3" v-if="achievedValue.wasAwardedBy">
            <h5>{{ $t("CREDENTIAL.WAS_AWARDED_BY") }}</h5>
            <WasAwardedByComponent :wasAwardedBy="achievedValue.wasAwardedBy"/>
          </span>
          <!-- has part -->
          <HasPartComponent :hasPart="achievedValue.hasPart"/>
          <!-- entitles to -->
          <EntitlesToComponent :entitlesTo="achievedValue.entitlesTo"/>
          <!-- specified by -->
          <h5>{{ $t("CREDENTIAL.SPECIFIED_BY") }}</h5>
          <div v-for="specifiedBy in achievedValue.specifiedBy"  v-bind:key="specifiedBy">
            <AchievedSpecifiedByComponent :specifiedBy="specifiedBy"/>
           </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import ItemValueComponent from "./ItemValueComponent.vue"
import LoopLiComponent from "./LoopLiComponent.vue";
import IdentifierComponent from "./IdentifierComponent.vue";
import WasInfluencedByComponent from "./WasInfluencedByComponent.vue";
import WasDerivedFromComponent from "./WasDerivedFromComponent.vue";
import WasAwardedByComponent from "./WasAwardedByComponent.vue";
import HasPartComponent from "./HasPartComponent.vue";
import EntitlesToComponent from "./EntitlesToComponent.vue";
import AchievedSpecifiedByComponent from "./AchievedSpecifiedByComponent.vue";

export default {
  name: "AchievedComponent",
  props: {
    achieved: {},
  },
  data() {
    return {
      moment: moment,
    };
  },
  components: {
    LoopLiComponent,
    ItemValueComponent,
    IdentifierComponent,
    WasDerivedFromComponent,
    WasInfluencedByComponent,
    WasAwardedByComponent,
    HasPartComponent,
    EntitlesToComponent,
    AchievedSpecifiedByComponent,
  },
};
</script>

<style scoped>
</style>
