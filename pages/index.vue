<template>
<div></div>
</template>

<script>
import {config} from '/config.js'

export default {
  name: 'Home',
  middleware: [
    function ({redirect}) {
      redirect(config.home)
    }
  ]
};
</script>
