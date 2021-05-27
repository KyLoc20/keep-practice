<template>
  <transition name="fade"
    ><section
      class="chip"
      :class="classChip"
      @click="handleClick"
      v-if="isAlive"
      :style="mainBgColor"
      @mouseenter="handleHoverEnter"
      @mouseleave="handleHoverLeave"
    >
      <div class="thumbnail" :style="iconColor">
        <icon v-if="iconAvailable" :name="iconName" :size="iconSize"></icon>
      </div>
      <div class="content">
        <span class="text" :style="textColor">{{ text }}</span>
      </div>
      <transition name="fade">
        <div
          class="select"
          v-if="selectable && isSelected"
          :style="actionBtnColor"
          @mouseenter="handleBtnHoverEnter"
          @mouseleave="handleBtnHoverLeave"
        >
          <icon name="check"></icon>
        </div>
      </transition>
      <div
        class="delete"
        v-if="deleteable"
        @click="handleDelete"
        :style="actionBtnColor"
        @mouseenter="handleBtnHoverEnter"
        @mouseleave="handleBtnHoverLeave"
      >
        <icon name="cross"></icon>
      </div></section
  ></transition>
</template>
<script>
const ColorThemeMap = {
  //todo too many color status causes too many logic
  primary: {
    main: [25, 118, 210, 1],
    focus: [43, 128, 213, 1], //on hover or select
    focus2: [25, 118, 210, 0.04], //on hover or select
    text: [25, 118, 210, 1],
    border: [25, 118, 210, 0.7],
    ripple: [25, 118, 210, 0.3],
  },
  secondary: {
    main: [220, 0, 78, 1],
    focus: [245, 20, 100, 1], //on hover or select
    focus2: [220, 0, 78, 0.04], //on hover or select
    text: [220, 0, 78, 1],
    border: [220, 0, 78, 0.7],
    ripple: [220, 0, 78, 0.3],
  },
  default: {
    main: [0, 0, 0, 0.08],
    focus: [0, 0, 0, 0.12], //on hover or select
    focus2: [0, 0, 0, 0.04], //on hover or select
    text: [0, 0, 0, 0.87],
    border: [189, 189, 189, 1],
    ripple: [0, 0, 0, 0.3],
  },
};
import Iconable from "../../mixins/iconable";
import Rippleable from "../../mixins/rippleable";
export default {
  name: "Chip",
  components: {},
  mixins: [Iconable, Rippleable],
  data() {
    return {
      isAlive: true,
      isSelected: this.selected,
      isHovering: false,
      isBtnHovering: false, //action btn of select and delete
    };
  },
  props: {
    text: {
      type: String,
    },
    variant: {
      default: "filled",
      validator: (v) => {
        return ["filled", "outlined"].indexOf(v) !== -1;
      },
    },
    color: {
      default: "default",
      validator: (v) => {
        return ["default", "primary", "secondary"].indexOf(v) !== -1;
      },
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    deleteable: {
      type: Boolean,
      default: false,
    },
    //whether can be selected
    selectable: {
      type: Boolean,
      default: false,
    },
    //whether be selected
    selected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classChip() {
      let variant = this.variant;
      let selected = this.selectable && this.isSelected ? "selected" : "";
      let clickable = this.clickable ? "clickable" : "";
      let selectable = this.selectable ? "selectable" : "";
      let deleteable = this.deleteable ? "deleteable" : "";
      return `${variant} ${selected} ${clickable} ${selectable} ${deleteable}`;
    },
    mainBgColor() {
      if (this.isHovering || this.isSelected) {
        //on hover or on select
        if (this.variant === "outlined")
          return {
            background: this.getColorFromTheme(this.color, "focus2"),
            border: `1px solid ${this.getColorFromTheme(this.color, "border")}`,
          };
        else {
          return { background: this.getColorFromTheme(this.color, "focus") };
        }
      } else {
        if (this.variant === "outlined")
          return {
            background: "transparent",
            border: `1px solid ${this.getColorFromTheme(this.color, "border")}`,
          };
        else {
          return { background: this.getColorFromTheme(this.color, "main") };
        }
      }
    },
    textColor() {
      if (this.variant === "filled" && this.color !== "default")
        return { color: "#fff" };
      else return { color: this.getColorFromTheme(this.color, "text") };
    },
    actionBtnColor() {
      let color = null;
      if (this.isBtnHovering) {
        //on hover
        if (this.color === "default") {
          color = "rgba(0, 0, 0, 0.4)";
        } else {
          if (this.variant === "outlined")
            color = this.getColorFromTheme(this.color, "main");
          else color = "rgba(255, 255, 255, 1)";
        }
      } else {
        if (this.color === "default") {
          color = "rgba(0, 0, 0, 0.26)";
        } else {
          if (this.variant === "outlined")
            color = this.getColorFromTheme(this.color, "border");
          else color = "rgba(255, 255, 255, 0.7)";
        }
      }
      return {
        color,
      };
    },
    iconColor() {
      let color = null;
      //on hover
      if (this.color === "default") {
        color = "rgba(97, 97, 97, 1)";
      } else {
        if (this.variant === "outlined")
          color = this.getColorFromTheme(this.color, "main");
        else color = "rgba(255, 255, 255, 1)";
      }
      return {
        color,
      };
    },
    rippleColor() {
      if (this.color === "default") {
        return "default";
      } else {
        if (this.variant === "outlined")
          return this.getColorFromTheme(this.color, "ripple");
        else return "plain";
      }
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
    handleHoverEnter() {
      if (!this.clickable) return;
      this.isHovering = true;
    },
    handleHoverLeave() {
      if (!this.clickable) return;
      this.isHovering = false;
    },
    handleBtnHoverEnter() {
      this.isBtnHovering = true;
    },
    handleBtnHoverLeave() {
      this.isBtnHovering = false;
    },
    handleClick(e) {
      if (this.clickable) {
        this.createRipple(e, false, this.rippleColor);
      }
      if (this.selectable) {
        this.handleSelect();
      }
    },
    handleDelete() {
      if (this.deleteable && this.isAlive) {
        this.isAlive = false;
        this.$emit("delete");
        console.log("chip delete: ", this.text);
      }
    },
    handleSelect() {
      console.log(this.text, "handleSelect", this.isSelected);
      if (this.selectable) {
        this.isSelected = !this.isSelected;
        this.$emit("select");
      }
    },
  },
};
</script>
<style lang="less" scoped>
@default-color: #e0e0e0;
@primary-color: #1976d2;
@secondary-color: #dc004e;
// .filled {
//   color: #fff;
//   background-color: currentColor;
// }
// .outlined {
//   box-shadow: 0 0 0 1px rgba(90, 155, 255, 0.7);
//   background-color: #fff;
// }
.chip {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  font-size: 10px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  height: 3.2em;
  border-radius: 1.6em;

  user-select: none;
  transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &.clickable,
  &.selectable {
    cursor: pointer;
  }
  &:hover .hover-mask {
    background: currentColor;
  }
  .hover-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    // z-index: -10;
  }
  .content {
    padding: 1.2em;
    .text {
      font-size: 1.4em;
      white-space: nowrap;
    }
  }
  .thumbnail {
    margin-left: 0.5em;
    margin-right: -0.6em;
    .icon {
      //todo icon svg is not responsive
      width: 2.4em;
      height: 2.4em;
    }
  }
  .delete,
  .select {
    margin-left: -0.4em;
    margin-right: 0.8em;
    .icon {
      //todo icon svg is not responsive
      width: 2.2em;
      height: 2.2em;
      cursor: pointer;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 251ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 167ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}
.fade-enter,
.fade-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>
