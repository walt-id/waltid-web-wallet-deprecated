<template>
    <span class="col-12 px-3">
        <h5>{{ $t("CREDENTIAL.LEARNING_ACHIEVEMENT") }}</h5>
        <div v-for="achievement in hasPart.learningAchievements"  v-bind:key="achievement">
            <ItemValueComponent :title="$t('CREDENTIAL.ID')" :value="achievement.id"/>
            <div v-for="identifier in achievement.identifier"  v-bind:key="identifier">
                <IdentifierComponent :identifier="identifier"/>
            </div>
            <ItemValueComponent :title="$t('CREDENTIAL.TITLE')" :value="achievement.title"/>
            <!-- was derived from -->
            <h5>{{ $t("CREDENTIAL.WAS_DERIVED_FROM") }}</h5>
            <div v-for="derived in hasPart.wasDerivedFrom"  v-bind:key="derived">
              <WasDerivedFromComponent :wasDerivedFrom="derived"/>
            </div>
          <!-- was influenced by -->
            <h5>{{ $t("CREDENTIAL.WAS_INFLUENCED_BY") }}</h5>
            <div v-for="wasInfluencedBy in hasPart.wasInfluencedBy"  v-bind:key="wasInfluencedBy">
                <WasInfluencedByComponent :wasInfluencedBy="wasInfluencedBy"/>
            </div>
          <!-- was awarded by -->
          <WasAwardedByComponent :wasAwardedBy="hasPart.wasAwardedBy"/>
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
import IdentifierComponent from "./IdentifierComponent.vue";
import WasInfluencedByComponent from "./WasInfluencedByComponent.vue";
import WasDerivedFromComponent from "./WasDerivedFromComponent.vue";
import WasAwardedByComponent from "./WasAwardedByComponent.vue";
import HasPartSpecifiedByComponent from "./HasPartSpecifiedByComponent.vue";

export default {
  name: "HasPartComponent",
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
    IdentifierComponent,
    WasDerivedFromComponent,
    WasInfluencedByComponent,
    WasAwardedByComponent,
    HasPartSpecifiedByComponent,
  },
}
</script>

<style scoped>

</style>