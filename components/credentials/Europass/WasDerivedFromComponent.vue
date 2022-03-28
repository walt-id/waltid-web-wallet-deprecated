<template>
    <span class="col-12 pb-3">
        <ItemValueComponent :title="$t('CREDENTIAL.TITLE')" :value="wasDerivedFrom.title"/>
        <ItemValueComponent :title="$t('CREDENTIAL.GRADE')" :value="wasDerivedFrom.grade"/>
        <LoopLiComponent :items="wasDerivedFrom.assessedBy" :title="$t('CREDENTIAL.ASSESSED_BY')"/>
        <!-- TODO -->
        <!-- has part -->
        <!-- specified by -->
        
    </span>    
</template>

<script>
import moment from "moment";
import LoopLiComponent from "./LoopLiComponent.vue";
import ItemValueComponent from "./ItemValueComponent.vue";

export default {
  name: "WasDerivedFromComponent",
  props: {
    wasDerivedFrom: {},
  },
  data() {
    return {
      moment: moment,
    };
  },
  components: {
    ItemValueComponent,
    LoopLiComponent,
  },
};
</script>

<style scoped>
</style>