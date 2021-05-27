<template>
  <section
    class="float-action-button br-round"
    :class="buttonClass"
    @click="handleButtonClick"
  >
    <icon :name="icon" size="md"></icon>
    <span class="text" v-if="variant === 'extended'">{{ text }}</span>
  </section>
</template>
<script>
import Rippleable from "../../mixins/rippleable";
import Icon from "../Icon/Icon";
export default {
  name: "FloatActionButton",
  props: {
    icon: {
      type: String,
      default:"add",
    },
    variant: {
      validator: (v) => {
        return ["regular", "extended"].indexOf(v) > -1;
      },
      default: "regular",
    },
    text: {
      type: String,
      required: false,
    },
    color: {
      validator: (v) => {
        return ["default", "primary", "secondary","green"].indexOf(v) > -1;
      },
      default: "default",
    },
    size: {
      validator: (v) => {
        return ["sm", "md", "lg"].indexOf(v) > -1;
      },
      default: "lg",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  components: { Icon },
  mixins: [Rippleable],
  data() {
    return {};
  },
  computed: {
    buttonClass() {
      let clazz = "";
      let variant = this.variant;
      clazz += variant + "-btn ";
      let color = this.color;
      clazz += color + "-btn ";
      let disabled = this.disabled;
      if (disabled) {
        clazz += "disabled ";
      }
      let size = this.size;
      clazz += size + " ";
      return clazz;
    },
  },
  methods: {
    handleButtonClick(e) {
      if (!this.disabled) {
        this.createRipple(e, false, this.getRippleColor(),800);
         this.$emit("click", e);
      }
    },
    getRippleColor() {
      //default rgba(0, 0, 0, 0.3);
      //plain rgba(255, 255, 255, 0.3);
      //primary rgba(25, 118, 210, 0.3);
      //secondary rgba(220, 0, 78, 0.3);
      if(this.color==='default')return 'default'
      else return 'plain'
    },
  },
};
</script>
<style lang="less" scoped>
.float-action-button {
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:not(.disabled):hover {
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }
  //color
  &.default-btn {
    color: rgba(0, 0, 0, 0.87);
    background: #e0e0e0;
    &:hover {
      background: #d5d5d5;
    }
  }
  &.primary-btn {
    color: #fff;
    background: #1976d2;
    &:hover {
      background: #115293;
    }
  }
  &.secondary-btn {
    color: #fff;
    background: #dc004e;
    &:hover {
      background: #9a0036;
    }
  }
  &.green-btn {
    color: #fff;
    background: #4caf50;
    &:hover {
      background: #43a047;
    }
  }
  &.disabled {
    color: rgba(0, 0, 0, 0.26);
    background: rgba(0, 0, 0, 0.12);
    &:hover {
      color: rgba(0, 0, 0, 0.26);
      background: rgba(0, 0, 0, 0.12);
    }
  }
  &.sm {
    &.regular-btn {
      height: 40px;
      width: 40px;
    }
    &.extended-btn {
      height: 34px;
      padding: 0 8px;
      border-radius: 17px;
    }
  }
  &.md {
    &.regular-btn {
      width: 48px;
      height: 48px;
    }
    &.extended-btn {
      height: 40px;
      padding: 0 16px;
      border-radius: 20px;
    }
  }
  &.lg {
    &.regular-btn {
      width: 56px;
      height: 56px;
    }
    &.extended-btn {
      height: 48px;
      padding: 0 16px;
      border-radius: 24px;
    }
  }
  .icon {
    width: 24px;
    height: 24px;
  }
  &.extended-btn {
    .icon {
      margin-right: 8px;
    }
  }
  .text {
    font-size: 14px;
    letter-spacing: 0.02857em;
    font-weight: 500;
    line-height: 1.75;
    user-select: none;
    text-transform: uppercase;
  }
}
.disabled {
  cursor: default;
  box-shadow: none;
}
</style>