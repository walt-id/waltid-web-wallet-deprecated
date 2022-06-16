<template>
    <div class="col-12 py-3" v-if="image">
        <div class="_image" :style="{ backgroundImage: 'url(' + image + ')' }">
        </div>
      </div>
</template>

<script>
import moment from "moment";

export default {
  name: "ImageComponent",
  props: {
    image: {}
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