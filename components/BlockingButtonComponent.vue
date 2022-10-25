<template>
    <button type="submit" name="submit" class="_bounce btn text-white mt-3" style="width: 200px" :disabled="loading">
      <span v-if="loading">
        <img src="/dark-loader.gif" width="30px" style="opacity: 0.7" />
      </span>
      <span v-else>{{ label }}</span>
    </button>
</template>

<script>
import moment from "moment";

export default {
  name: "BlockingButtonComponent",
  props: {
    loading: Boolean,
    label: String,
  },
  data() {
    return {
      moment: moment
    }
  },
}
</script>