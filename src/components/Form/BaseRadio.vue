<template>
  <label>
    <input type="radio" :name="name" :value="value" :checked="checked" />
    {{ label }}
  </label>
</template>

<script>
export default {
  name: "BaseRadio",
  props: {
    name: {
      type: String,
      default: ``,
    },
    label: {
      type: String,
      default: ``,
    },
    value: {
      type: String,
      default: ``,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
