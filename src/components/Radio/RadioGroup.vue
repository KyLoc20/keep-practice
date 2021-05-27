<template>
  <section class="radio-group">
    <div class="group-header" v-if="name" :class="isFocused ? 'focused' : ''">
      <span class="text">{{ name }}</span>
    </div>
    <div class="group-content" :class="horizontal ? 'horizontal' : ''">
      <div class="outer" v-for="(item, idx) in items" :key="idx">
        <Radio
          :label="item.label"
          :text="item.text"
          :groupIndex="idx"
          :placement="item.placement"
          :disabled="item.disabled"
          :checked="item.label === cValue"
          @select="handleSelect"
          @focus="handleFocus"
          @blur="handleBlur"
        ></Radio>
      </div>
    </div>
  </section>
</template>
<script>
import Radio from "./Radio";
import Rippleable from "../../mixins/rippleable";
export default {
  name: "RadioGroup",
  components: { Radio },
  mixins: [Rippleable],
  props: {
    name: {
      //group title
      type: String,
      required: false,
    },
    items: {
      //{label,text}
      type: Array,
    },
    defaultValue: {
      type: String,
      required: false,
    },
    horizontal: {
      //lay out the radios horizontally
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cValue: null,
      isFocused: null,
    };
  },
  mounted() {
    this.initValue();
  },
  computed: {},
  methods: {
    initValue() {
      if (
        this.defaultValue &&
        this.confirmFieldExisted(this.items, "label", this.defaultValue)
      ) {
        this.cValue = this.defaultValue;
      }
    },
    confirmFieldExisted(arr, field, value) {
      //to check value v3 of field label whether exists in a certain entry of the arr:[{label:v1},{label:v2},{label:v3},]
      for (let entry of arr) {
        if (entry[field] && entry[field] === value) return true;
      }
      return false;
    },
    handleSelect(e) {
      console.log("handleSelect from group", e);
      this.cValue = e.label;
      this.$emit("change", { label: e.label, index: e.index });
    },
    handleFocus(e) {
      this.isFocused = true;
      return e;
    },
    handleBlur(e) {
      this.isFocused = false;
      return e;
    },
  },
};
</script>
<style lang="less" scoped>
.base-font {
  font-size: 16px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  letter-spacing: 0.01em;
}
.round-shape {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.radio-group {
  display: flex;
  flex-direction: column;

  .group-header {
    &.focused {
      color: #1976d2;
    }
    .base-font();
    line-height: 1.5;
    padding: 0;
    margin-left: 9px;
    color: rgba(0, 0, 0, 0.6);
    transition: color 1000ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    user-select: none;
  }
  .group-content {
    display: flex;
    flex-direction: column;
    &.horizontal {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
}
</style>
