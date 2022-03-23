<template>
  <span class="col-12 pb-3">
    <h5>{{ title }}</h5>
    <ul>
      <li v-for="value in items" v-bind:key="value">
        <p>{{ value }}</p>
      </li>
    </ul>
  </span>
</template>

<script>
import moment from "moment";

export default {
  name: "LoopLiComponent",
  props: {
    items: {},
    title: {}
  },
  data() {
    return {
      moment: moment
    }
  }
}
</script>

<style scoped>

</style>