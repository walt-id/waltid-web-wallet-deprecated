<template>
    <span class="col-12 pb-3" v-if="value">
        <h5>{{ title }}</h5>
        <p>{{ value }}</p>
    </span>
</template>

<script>
import moment from "moment";

export default {
  name: "ItemValueComponent",
  props: {
    title: {},
    value: {}
  },
  data() {
    return {
      moment: moment
    }
  },
}
</script>

<style scoped>

</style>