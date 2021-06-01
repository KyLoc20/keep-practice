<template>
  <section
    class="icon-button"
    :class="disabled ? 'disabled' : ''"
    :style="buttonSize"
  >
    <button
      @click="handleButtonClick"
      @mouseenter="handleHoverEnter"
      @mouseleave="handleHoverLeave"
      :style="mainBgColor"
    >
      <icon
        :size="iconSize ? iconSize : size"
        :name="icon ? icon : ariaLabel"
        :color="iconFillColor"
      ></icon>
    </button>
  </section>
</template>
<script>
import Icon from "../../components/Icon/Icon";
import Rippleable from "../../mixins/rippleable";
import { requireOneOf, requirePositiveNumber } from "../common/validator";
const ColorThemeMap = {
  primary: {
    main: [0, 0, 0, 0],
    focus: [25, 118, 210, 0.04], //on hover or select
    icon: [25, 118, 210, 0.8],
    ripple: [25, 118, 210, 0.3],
  },
  secondary: {
    main: [0, 0, 0, 0],
    focus: [220, 0, 78, 0.04], //on hover or select
    icon: [220, 0, 78, 0.8],
    ripple: [220, 0, 78, 0.3],
  },
  default: {
    main: [0, 0, 0, 0],
    focus: [0, 0, 0, 0.04], //on hover or select
    icon: [0, 0, 0, 0.54],
    ripple: [0, 0, 0, 0.3],
  },
  plain: {
    main: [0, 0, 0, 0],
    focus: [232, 234, 237, 0.08], //on hover or select
    icon: [255, 255, 255, 1],
    ripple: [255, 255, 255, 0.3],
  },
};
const ButtonSizeMap = {
  sm: 44,
  md: 48,
  lg: 60,
};
export default {
  name: "IconButton",
  components: { Icon },
  mixins: [Rippleable],
  props: {
    color: {
      default: "default",
      validator: (v) => {
        return ["plain", "default", "primary", "secondary"].indexOf(v) !== -1;
      },
    },
    icon: {
      type: String,
    },
    //size of button
    //the size of button is also controlled by outer css
    size: {
      required: false,
      validator: (v) => {
        return [
          requireOneOf(["sm", "md", "lg"]),
          requirePositiveNumber(),
        ].some((test) => test(v));
      },
    },
    iconSize: {
      default: "md",
      validator: (v) => {
        return [
          requireOneOf(["sm", "md", "lg"]),
          requirePositiveNumber(),
        ].some((test) => test(v));
      },
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    disrippled: {
      default: false,
      type: Boolean,
    },
    hoverColor: {
      type: String,
      required: false,
    },
    iconColor: {
      type: String,
      required: false,
    },
    //this is not a standard api of material design
    iconHoverColor: {
      type: String,
      required: false,
    },
    rippleColor: {
      type: String,
      required: false,
    },
    //alias icon
    ariaLabel: {
      type: String,
    },
    //todo to implement apis below

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
      isHovering: false,
    };
  },
  computed: {
    buttonSize() {
      if (this.size) {
        return {
          width: `${this.getSize(this.size)}px`,
          height: `${this.getSize(this.size)}px`,
        };
      } else {
        return {};
      }
    },
    mainBgColor() {
      //todo disabled
      if (this.isHovering)
        return {
          background:
            this.hoverColor || this.getColorFromTheme(this.color, "focus"),
        };
      else {
        return {
          background: "transparent",
        };
      }
    },
    iconFillColor() {
      if (!this.isActive) return "rgba(0, 0, 0, 0.26)";
      if (this.isHovering && this.iconHoverColor) return this.iconHoverColor;
      else return this.iconColor || this.getColorFromTheme(this.color, "icon");
    },
    rippleRenderColor() {
      return this.rippleColor || this.getColorFromTheme(this.color, "ripple");
    },
  },
  methods: {
    getColorFromTheme(theme, type) {
      let colorSet = ColorThemeMap[theme] || ColorThemeMap["default"];
      let rgba = colorSet[type];
      if (!rgba) throw Error(`Not Found the ${type}-color of ${theme}`);
      return this.parseColor(rgba);
    },
    parseColor(inputColorArray, alpha) {
      let arr = [...inputColorArray];
      if (alpha) arr[3] = alpha;
      return `rgba(${arr[0]},${arr[1]},${arr[2]},${arr[3]})`;
    },
    getSize(input) {
      if (ButtonSizeMap[input] !== undefined) return ButtonSizeMap[input];
      else return input;
    },
    handleButtonClick(e) {
      if (!this.isActive) return;
      console.log("Inner Icon onButtonClick");
      this.$emit("click", e);
      if (!this.disrippled)
        this.createRippleByAddingLayer(e, true, this.rippleRenderColor);
    },
    handleHoverEnter() {
      if (!this.isActive) return;
      this.isHovering = true;
    },
    handleHoverLeave() {
      if (!this.isActive) return;
      this.isHovering = false;
    },
  },
};
</script>
<style lang="less" scoped>
.remove-button-default {
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  cursor: pointer;
  user-select: none;
}
.default-size {
  width: 48px;
  height: 48px;
}
.center-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.icon-button {
  border-radius: 50%;
  background: transparent;
  //default
  .default-size();
  button {
    .remove-button-default();
    border-radius: 50%;
    .center-layout();
    box-sizing: border-box;
    height: 100%;
    width: 100%;
  }
  &.disabled button {
    cursor: default;
  }
}
</style>
