<template v-if="identifier">
    <span class="col-12 pb-3">
        <h5>{{ $t("CREDENTIAL.IDENTIFIER") }}</h5>
        <ItemValueComponent :title="$t('CREDENTIAL.EUROPASS.IDENTIFIER.SCHEME_ID')" :value="identifier.schemeID"/>
        <ItemValueComponent :title="$t('CREDENTIAL.EUROPASS.IDENTIFIER.VALUE')" :value="identifier.value"/>
    </span>
</template>

<script>
import moment from "moment";
import ItemValueComponent from './ItemValueComponent.vue';

export default {
  name: "EuropassIdentifierComponent",
  props: {
    identifier: {}
  },
  data() {
    return {
      moment: moment
    }
  },
  components: {
      ItemValueComponent
  }
}
</script>

<style scoped>

</style>