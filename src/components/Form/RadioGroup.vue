<template>
  <ul class="radio-list">
    <li v-for="item of items" :key="`${item.label}_${item.value}`">
      <base-radio
        @change.native="changeHandler"
        :name="groupName"
        :label="item.label"
        :value="item.value"
        :checked="item.value === value"
      />
    </li>
  </ul>
</template>

<script>
import { generateRandomId } from "../../utils/utils";

import BaseRadio from "./BaseRadio";

export default {
  data() {
    return {
      groupName: generateRandomId(10),
    };
  },
  name: "RadioGroup",
  components: { BaseRadio },
  props: {
    value: {
      type: String,
      default: ``,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeHandler(event) {
      this.$emit(`update:value`, event.target.value);
    },
  },
};
</script>

<style scoped>
.radio-list {
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
