<template>
  <section class="icon-button" :class="classIconButton">
    <vbutton
      variant="iconed"
      :color="color"
      :rippleFixed="true"
      :disabled="disabled"
      @click="handleButtonClick('button', $event)"
    >
      <icon
        :size="size"
        :name="icon?icon:ariaLabel"
        :color="iconColor"
        :badge="badge | badgeAdder('md', this.badgeColor, this.badgeVisible)"
      ></icon>
    </vbutton>
  </section>
</template>
<script>
import Vbutton from "./Button";
import Icon from "../../components/Icon/Icon";
export default {
  name: "IconButton",
  components: { Vbutton, Icon },
  mixins: [],
  filters: {
    badgeAdder(content, size, color, visible) {
      if (content === undefined) return undefined;
      else
        return {
          content,
          size,
          color: color ? color : "secondary",
          visible: visible === undefined ? true : visible,
        };
    },
  },
  props: {
    color: {
      default: "default",
      validator: (v) => {
        return ["plain", "default", "primary", "secondary"].indexOf(v) !== -1;
      },
    },
    size: {
      default: "md",
      validator: (v) => {
        return ["sm", "md", "lg"].indexOf(v) !== -1;
      },
    },
    icon: {
      type: String,
    },
    iconColor: {
      type: String,
    },
    //alias ariaLabel
    ariaLabel: {
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    badge: {
      required: false,
      type: Number,
    },
    badgeColor: {
      required: false,
      type: String,
    },
    badgeVisible: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      isActive: !this.disabled,
    };
  },
  computed: {
    classIconButton() {
      return this.disabled
        ? " disabled"
        : this.color + (this.isFlat ? " flat" : "");
    },
  },
  methods: {
    handleButtonClick(e) {
      if (!this.isActive) return;
      console.log("Inner Icon onButtonClick");
      this.$emit("click", e);
    },
  },
};
</script>
<style lang="less" scoped>
.icon-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    user-select: none;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    box-shadow: none;
    //todo padding and size need to be specified
    //size 44 48 60
    padding: 12px;
  }
}
</style>