<template>
  <div v-click-outside="closeDropdownHandler" class="dropdown">
    <BaseInput
      @click.native="toggleOpenHandler"
      ref="input"
      :label="label"
      :value.sync="inputValue"
      :placeholder="placeholder"
    />
    <ul v-show="isOpen" class="dropdown__list">
      <li
        v-for="item of filteredData"
        @click="itemClickHandler(item.value)"
        class="dropdown__item"
        :key="item.id"
      >
        {{ item.value }}
      </li>
    </ul>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import { debounce } from "lodash";

import BaseInput from "./BaseInput";

export default {
  data() {
    return {
      isOpen: false,
      filteredData: this.data,
      debouncedFilterData: debounce(this.filterData, 500),
    };
  },
  name: "BaseSelect",
  components: { BaseInput },
  directives: { ClickOutside },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: ``,
    },
    value: {
      type: String,
      default: ``,
    },
    placeholder: {
      type: String,
      default: ``,
    },
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.debouncedFilterData(newValue);
      },
    },
  },
  methods: {
    toggleOpenHandler() {
      this.isOpen = !this.isOpen;
    },
    closeDropdownHandler() {
      this.isOpen = false;
    },
    itemClickHandler(value) {
      if (this.value === value) {
        this.$refs.input.$forceUpdate();
      }

      this.$emit(`update:value`, value);
      this.closeDropdownHandler();
    },
    filterData(value) {
      this.filteredData = this.data.filter((item) =>
        item.value.toLowerCase().includes(value.toLowerCase())
      );
    },
  },
  watch: {
    isOpen() {
      if (!this.isOpen && this.inputValue) {
        this.inputValue = ``;
      }
    },
  },
};
</script>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown:before {
  content: ">";
  position: absolute;

  right: 5px;
  bottom: 0;

  transform: rotate(90deg);
}

.dropdown__list {
  position: absolute;
  list-style: none;
  margin: 5px 0 0 0;
  padding: 5px;
  width: 100%;
  max-height: 500px;
  overflow: auto;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  background-color: white;
  z-index: 100;
}

.dropdown__item {
  cursor: pointer;
}

.dropdown__item:hover {
  background-color: lightgray;
}
</style>
