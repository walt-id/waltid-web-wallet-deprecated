<template>
<div></div>
</template>

<script>

export default {
  name: 'Credentials',
  middleware: [
    function ({redirect}) {
      redirect('/Credentials')
    }
  ]
};
</script>
