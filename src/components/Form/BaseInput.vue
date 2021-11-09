<template>
  <with-label :id="id" :label="label">
    <input
      @input="inputHandler"
      @focus="focusHandler"
      class="input"
      :class="{ invalid: isInvalid }"
      :id="id"
      :value="value"
      :type="type"
      :placeholder="placeholder"
    />
    <div v-if="isInvalid" class="invalid-message">
      {{ invalidMessage }}
    </div>
  </with-label>
</template>

<script>
import { generateRandomId } from "../../utils/utils";

import WithLabel from "../HOC/WithLabel";

export default {
  data() {
    return {
      id: `input-${generateRandomId(10)}`,
    };
  },
  name: "BaseInput",
  components: { WithLabel },
  props: {
    label: {
      type: String,
      default: ``,
    },
    type: {
      type: String,
      default: `text`,
    },
    value: {
      type: String,
      default: ``,
    },
    placeholder: {
      type: String,
      default: ``,
    },
    isInvalid: {
      type: Boolean,
      default: false,
    },
    invalidMessage: {
      type: String,
      default: `Введите корректное значение`,
    },
  },
  methods: {
    inputHandler(event) {
      this.$emit(`update:value`, event.target.value);
    },
    focusHandler() {
      this.$emit(`update:isInvalid`, false);
    },
  },
};
</script>

<style scoped>
.input {
  min-width: 300px;
  width: 100%;
}

.invalid {
  border-color: red;
  outline-color: red;
}

.invalid-message {
  position: absolute;
  margin-top: 5px;
  color: red;
  font-size: 0.75em;
  max-width: 300px;
}
</style>
