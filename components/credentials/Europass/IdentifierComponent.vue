<template>
    <span class="col-12 pb-3" v-if="identifier">
        <h5>{{ $t("CREDENTIAL.IDENTIFIER") }}</h5>
        <ItemValueComponent :title="$t('CREDENTIAL.SCHEME_ID')" :value="identifier.schemeID"/>
        <ItemValueComponent :title="$t('CREDENTIAL.VALUE')" :value="identifier.value"/>
    </span>
</template>

<script>
import moment from "moment";
import ItemValueComponent from './ItemValueComponent.vue';

export default {
  name: "IdentifierComponent",
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