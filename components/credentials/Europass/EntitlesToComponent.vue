<template>
    <span class="col-12 px-3">
        <ItemValueComponent :title="$t('CREDENTIAL.ID')" :value="entitlesTo.id"/>
        <ItemValueComponent :title="$t('CREDENTIAL.TITLE')" :value="entitlesTo.title"/>
        <ItemValueComponent :title="$t('CREDENTIAL.DEFINITION')" :value="entitlesTo.definition"/>
        <ItemValueComponent :title="$t('CREDENTIAL.ISSUED_DATE')" :value="entitlesTo.issuedDate"/>
        <EntitlesToSpecifiedByComponent :specifiedBy="entitlesTo.specifiedBy" :title="$t('CREDENTIAL.SPECIFIED_BY')"/>
    </span>
</template>

<script>
import moment from "moment";
import ItemValueComponent from "./ItemValueComponent.vue";
import EntitlesToSpecifiedByComponent from "./EntitlesToSpecifiedByComponent.vue";

export default {
  name: "EntitlesToComponent",
  props: {
    entitlesTo: {}
  },
  data() {
    return {
      moment: moment
    }
  },
  components: {
    ItemValueComponent,
    EntitlesToSpecifiedByComponent,
  },
}
</script>

<style scoped>

</style>