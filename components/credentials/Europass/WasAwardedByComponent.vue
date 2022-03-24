<template>
    <span class="col-12 pb-3" v-if="wasAwardedBy">
        <ItemValueComponent :title="$t('CREDENTIAL.ID')" :value="wasAwardedBy.id"/>
        <LoopLiComponent :title="$t('CREDENTIAL.AWARDING_BODY')" :items="wasAwardedBy.awardingBody"/>
        <ItemValueComponent :title="$t('CREDENTIAL.AWARDING_DATE')" :value="wasAwardedBy.awardingDate"/>
        <LoopLiComponent :title="$t('CREDENTIAL.AWARDING_LOCATION')" :items="wasAwardedBy.awardingLocation"/>
    </span>
</template>

<script>
import moment from "moment";
import LoopLiComponent from "./LoopLiComponent.vue";
import ItemValueComponent from "./ItemValueComponent.vue";

export default {
  name: "WasAwardedByComponent",
  props: {
    wasAwardedBy: {}
  },
  data() {
    return {
      moment: moment
    }
  },
  components: {
    LoopLiComponent,
    ItemValueComponent,
  },
}
</script>

<style scoped>

</style>