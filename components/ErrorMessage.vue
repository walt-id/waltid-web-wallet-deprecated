<template>
    <div :class="isActive === true ? 'alert alert-danger mx-5 _bounce' : 'invisible'">
        {{messageContent}}
    </div>
</template>

<script>
export default {
    name: "ErrorMessage",
    props: [
        'messageContent',
        'isActive'],
}
</script>
