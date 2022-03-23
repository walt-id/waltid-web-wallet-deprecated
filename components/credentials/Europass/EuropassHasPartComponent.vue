<template>
    <span class="col-12 px-3">
        <h5>{{ $t("CREDENTIAL.LEARNING_ACHIEVEMENT") }}</h5>
        <div v-for="achievement in hasPart.learningAchievements"  v-bind:key="achievement">
            <ItemValueComponent :title="$t('CREDENTIAL.ID')" :value="achievement.id"/>
            <div v-for="identifier in achievement.identifier"  v-bind:key="identifier">
                <EuropassIdentifierComponent :identifier="identifier"/>
            </div>
            <ItemValueComponent :title="$t('CREDENTIAL.TITLE')" :value="achievement.title"/>
            <!-- was derived from -->
            <h5>{{ $t("CREDENTIAL.WAS_DERIVED_FROM") }}</h5>
            <div v-for="derived in hasPart.wasDerivedFrom"  v-bind:key="derived">
              <EuropassWasDerivedFromComponent :wasDerivedFrom="derived"/>
            </div>
          <!-- was influenced by -->
            <h5>{{ $t("CREDENTIAL.WAS_INFLUENCED_BY") }}</h5>
            <div v-for="wasInfluencedBy in hasPart.wasInfluencedBy"  v-bind:key="wasInfluencedBy">
                <EuropassWasInfluencedByComponent :wasInfluencedBy="wasInfluencedBy"/>
            </div>
          <!-- was awarded by -->
          <EuropassWasAwardedByComponent :wasAwardedBy="hasPart.wasAwardedBy"/>
          <!-- specified by -->
          <h5>{{ $t("CREDENTIAL.SPECIFIED_BY") }}</h5>
          <div v-for="specifiedBy in hasPart.specifiedBy"  v-bind:key="specifiedBy">
              <HasPartSpecifiedByComponent :specifiedBy="specifiedBy"/>
          </div>
        </div>
    </span>
</template>

<script>
import moment from "moment";
import ItemValueComponent from "./ItemValueComponent.vue";
import EuropassIdentifierComponent from "./EuropassIdentifierComponent.vue";
import EuropassWasInfluencedByComponent from "./EuropassWasInfluencedByComponent.vue";
import EuropassWasDerivedFromComponent from "./EuropassWasDerivedFromComponent.vue";
import EuropassWasAwardedByComponent from "./EuropassWasAwardedByComponent.vue";
import HasPartSpecifiedByComponent from "./HasPartSpecifiedByComponent.vue";

export default {
  name: "EuropassHasPartComponent",
  props: {
    hasPart: {}
  },
  data() {
    return {
      moment: moment
    }
  },
  components: {
    ItemValueComponent,
    EuropassIdentifierComponent,
    EuropassWasDerivedFromComponent,
    EuropassWasInfluencedByComponent,
    EuropassWasAwardedByComponent,
    HasPartSpecifiedByComponent,
  },
}
</script>

<style scoped>

</style>