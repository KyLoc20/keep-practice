<template>
  <section class="switch" @click="handleSwitch">
    <div class="thumb-outer" :class="selected ? 'selected' : ''">
      <div class="thumb" :class="classColor"></div>
      <div class="base" :class="classColor"></div>
    </div>
    <div class="track" :class="classColor"></div>
  </section>
</template>
<script>
import Rippleable from "../../mixins/rippleable";
export default {
  name: "VSwitch",
  mixins: [Rippleable],
  props: {
    color: {
      default: "primary",
      validator: (v) => {
        return ["primary", "secondary"].indexOf(v) !== -1;
      },
    },
  },
  data() {
    return {
      selected: false,
    };
  },
  methods: {
    handleSwitch() {
      this.selected = !this.selected;
      this.$emit("select", { state: this.selected });
    },
  },
  computed: {
    classColor() {
      let color = this.color;
      if (this.selected) {
        return color + "-switch";
      } else {
        return "default-switch";
      }
    },
  },
};
</script>

<style lang="less" scoped>
@md-size: 20px;
@default-color: #000;
@primary-color: #1976d2;
@secondary-color: #dc004e;
.switch {
  width: 58px;
  height: 38px;
  padding: 12px;
  box-sizing: border-box;
  z-index: 0;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  cursor: pointer;

  .track {
    border-radius: 7px;
    z-index: -1;
    opacity: 0.5;
    width: 100%;
    height: 100%;
  }
  .thumb-outer {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    padding: 9px;
    border-radius: 50%;
    transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    cursor: pointer;
    .thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
        0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    }
    .base {
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 50%;
      opacity: 0;
    }
  }
  .thumb-outer:hover {
    .base {
      opacity: 0.04;
    }
  }
  .thumb-outer.selected {
    transform: translateX(20px);
  }
}
.default-switch.track {
  opacity: 0.38;
}
.default-switch.thumb {
  background-color: #fff;
}
.default-switch {
  background-color: @default-color;
}
.primary-switch {
  background-color: @primary-color;
}
.secondary-switch {
  background-color: @secondary-color;
}
</style>
