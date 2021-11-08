<template>
  <label :for="id">
    <span class="label">{{ label }}</span>
    <slot />
  </label>
</template>

<script>
export default {
  name: "WithLabel",
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: ``,
    },
  },
};
</script>

<style scoped>
.label {
  position: relative;
  display: block;
  margin-bottom: 5px;
}
</style>
