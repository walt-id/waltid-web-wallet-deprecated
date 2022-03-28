<template>
    <span class="col-12 px-3" v-if="specifiedBy">
        <h5>{{ title }}</h5>
        <ItemValueComponent :title="$t('CREDENTIAL.TITLE')" :value="specifiedBy.title"/>
        <ItemValueComponent :title="$t('CREDENTIAL.ENTITLEMENT_TYPE')" :value="specifiedBy.entitlementType"/>
        <ItemValueComponent :title="$t('CREDENTIAL.STATUS')" :value="specifiedBy.status"/>
        <LoopLiComponent :title="$t('CREDENTIAL.LIMIT_ORGANIZATION')" :items="specifiedBy.limitOrganisation"/>
        <LoopLiComponent :title="$t('CREDENTIAL.LIMIT_JURISDICTION')" :items="specifiedBy.limitJurisdiction"/>
    </span>
</template>

<script>
import moment from "moment";
import ItemValueComponent from "./ItemValueComponent.vue";
import LoopLiComponent from "./LoopLiComponent.vue";

export default {
  name: "EntitlesToSpecifiedByComponent",
  props: {
    specifiedBy: {},
    title: {},
  },
  data() {
    return {
      moment: moment
    }
  },
  components: {
    ItemValueComponent,
    LoopLiComponent,
  },
}
</script>

<style scoped>

</style>