<template>
  <Component
    :is="require(`@/assets/icons/${name}.svg`)"
    class="TIcon"
    v-bind="$attrs"
    @v-on="$listeners"
  />
<!--  <icon1/>-->
</template>

<script>
  export default {
    name: 'TIcon',
    // Transparent wrapper component
    // https://vuejs.org/v2/guide/components-props.html#Disabling-Attribute-Inheritance
    inheritAttrs: false,

    props: {
      name: {
        type: String,
        required: true,
      },
    },
  }
</script>

<style>
  .TIcon {
    /* Add some default CSS declaration blocks */
  }
</style>
