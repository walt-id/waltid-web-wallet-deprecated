<template>
    <div class="text-left">
      <span class="col-12 pb-3">
        <h5>{{ $t("CREDENTIAL.ACHIEVED") }}</h5>
      </span>
      <!-- outer loop -->
        <div v-for="achievedValue in achieved"  v-bind:key="achievedValue">
          <span class="col-12 pb-3">
            <h5>{{ $t("CREDENTIAL.ID") }}</h5>
            <p>{{ achievedValue.id }}</p>
          </span>
          <span class="col-12 px-3">
            <h5>{{ $t("CREDENTIAL.TITLE") }}</h5>
            <p>{{ achievedValue.title }}</p>
          </span>
          <!-- additional note -->
          <LoopLiComponent :items="achievedValue.additionalNote" :title="$t('CREDENTIAL.ADDITIONAL_NOTE')"/>
          <!-- identifier -->
          <div v-for="identifier in achievedValue.identifier" v-bind:key="identifier">
              <EuropassIdentifierComponent :identifier="identifier"/>
          </div>
          <!-- was derived from -->
          <span class="col-12 px-3">
            <h5>{{ $t("CREDENTIAL.WAS_DERIVED_FROM") }}</h5>
            <div v-for="derived in achievedValue.wasDerivedFrom"  v-bind:key="derived">
              <EuropassWasDerivedFromComponent :wasDerivedFrom="derived"/>
            </div>
          </span>
          <!-- was influenced by -->
          <span class="col-12 px-3">
            <h5>{{ $t("CREDENTIAL.WAS_INFLUENCED_BY") }}</h5>
            <div v-for="wasInfluencedBy in achievedValue.wasInfluencedBy"  v-bind:key="wasInfluencedBy">
              <EuropassWasInfluencedByComponent :wasInfluencedBy="wasInfluencedBy"/>
            </div>
          </span>
          <!-- was awarded by -->
          <EuropassWasAwardedByComponent :wasAwardedBy="achievedValue.wasAwardedBy"/>
          <!-- has part -->
          <EuropassHasPartComponent :hasPart="achievedValue.hasPart"/>
          <!-- entitles to -->
          <EuropassEntitlesToComponent :entitlesTo="achievedValue.entitlesTo"/>
          <!-- specified by -->
          <h5>{{ $t("CREDENTIAL.WAS_INFLUENCED_BY") }}</h5>
          <div v-for="specifiedBy in achievedValue.specifiedBy"  v-bind:key="specifiedBy">
            <AchievedSpecifiedByComponent :specifiedBy="specifiedBy"/>
           </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import LoopLiComponent from "./LoopLiComponent.vue";
import EuropassIdentifierComponent from "./EuropassIdentifierComponent.vue";
import EuropassWasInfluencedByComponent from "./EuropassWasInfluencedByComponent.vue";
import EuropassWasDerivedFromComponent from "./EuropassWasDerivedFromComponent.vue";
import EuropassWasAwardedByComponent from "./EuropassWasAwardedByComponent.vue";
import EuropassHasPartComponent from "./EuropassHasPartComponent.vue";
import EuropassEntitlesToComponent from "./EuropassEntitlesToComponent.vue";
import AchievedSpecifiedByComponent from "./AchievedSpecifiedByComponent.vue";

export default {
  name: "EuropassAchievedComponent",
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
    EuropassIdentifierComponent,
    EuropassWasDerivedFromComponent,
    EuropassWasInfluencedByComponent,
    EuropassWasAwardedByComponent,
    EuropassHasPartComponent,
    EuropassEntitlesToComponent,
    AchievedSpecifiedByComponent,
  },
};
</script>

<style scoped>
</style>
