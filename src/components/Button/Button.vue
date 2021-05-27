<template>
  <button :class="classButton" @click="handleButtonClick">
    <div class="content">
      <span class="icon-placeholder start" v-if="startIcon">
        <LoadingEffect v-if="loading"></LoadingEffect>
        <Icon v-else :name="startIcon" :size="'sm'" class="start-icon"></Icon>
      </span>
      <span class="text-placeholder">
        <transition>
          <LoadingEffect
            v-if="loading && !startIcon && !endIcon"
            :indicator="loadingIndicator"
          ></LoadingEffect>
        </transition>
        <span
          class="text"
          :class="loading && !startIcon && !endIcon ? 'loading' : ''"
          ><slot></slot
        ></span>
      </span>
      <span class="icon-placeholder end" v-if="endIcon">
        <LoadingEffect v-if="loading"></LoadingEffect>
        <Icon v-else :name="endIcon" :size="'sm'" class="end-icon"></Icon>
      </span>
    </div>
  </button>
</template>
<script>
import Rippleable from "../../mixins/rippleable";
import Icon from "../../components/Icon/Icon";
import LoadingEffect from "./LoadingEffect";
export default {
  name: "Button",
  components: { Icon, LoadingEffect },
  mixins: [Rippleable],
  props: {
    variant: {
      default: "contained",
      validator: (v) => {
        return ["contained", "text", "outlined", "iconed"].indexOf(v) !== -1;
      },
    },
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
    flat: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    rippleFixed: {
      default: false,
      type: Boolean,
    },
    delayed: {
      default: false,
      type: Boolean,
    },
    //icon
    startIcon: {
      type: String,
      required: false,
    },
    endIcon: {
      type: String,
      required: false,
    },
    //loading
    loading: {
      default: false,
      type: Boolean,
    },
    loadingIndicator: {
      //content when loading, by default its a circular animation
      required: false,
      type: String,
    },
  },
  data() {
    return {};
  },
  computed: {
    isActive() {
      return !this.disabled;
    },
    classButton() {
      let clazz = "btn ";
      let variant = this.variant + "-btn";
      let color = this.color + "-btn";
      let size = this.size + "-btn";
      clazz += variant + " " + color + " " + size;
      if (this.disabled) clazz += " disabled";
      if (this.flat) clazz += " flat";
      return clazz;
    },
  },
  mounted() {},
  methods: {
    handleButtonClick(e) {
      if (!this.isActive) return;
      console.log("Inner onButtonClick");
      // this.$emit("click", e);
      this.createRippleByAddingLayer(
        e,
        this.rippleFixed,
        this.getRippleColor()
      );
      //todo deley to wait for ripple finishing
      if (this.delayed) {
        setTimeout(() => {
          this.$emit("click", e);
        }, 200);
      } else {
        this.$emit("click", e);
      }
    },
    getRippleColor() {
      //default rgba(0, 0, 0, 0.3);
      //plain rgba(255, 255, 255, 0.3);
      //primary rgba(25, 118, 210, 0.3);
      //secondary rgba(220, 0, 78, 0.3);

      let rippleColor = "";
      switch (this.variant) {
        case "contained":
          if (["primary", "secondary", "plain"].indexOf(this.color) > -1) {
            rippleColor = "plain";
          } else {
            rippleColor = "default";
          }
          break;
        case "text":
        case "outlined":
        case "iconed":
          rippleColor = this.color;
          break;

        default:
          break;
      }
      return rippleColor;
    },
  },
};
</script>
<style lang="less" scoped>
button {
  margin: 0;
  outline: none;

  border: none;
  border-radius: 0.25rem;
  box-sizing: content-box;

  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-weight: 600;
  background: transparent;

  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  cursor: pointer;
  user-select: none;
  .content {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: nowrap;

    .text-placeholder {
      position: relative;
      .text {
        transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        &.loading {
          opacity: 0;
        }
      }
    }
    .icon-placeholder {
      position: relative;
      width: 20px;
      height: 20px;
      &.start {
        margin-left: -4px;
        margin-right: 8px;
      }
      &.end {
        margin-right: -4px;
        margin-left: 8px;
      }
    }
  }
}
.sm-btn {
  padding: 4px 10px;
  height: 22px;
  font-size: 13px;
}
.md-btn {
  padding: 6px 16px;
  height: 24px;
  font-size: 14px;
}
.lg-btn {
  padding: 8px 22px;
  height: 26px;
  font-size: 15px;
}
.contained-btn {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  &:not(.flat):not(.disabled):hover {
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }
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
  &.disabled {
    color: rgba(0, 0, 0, 0.26);
    background: rgba(0, 0, 0, 0.12);
    &:hover {
      color: rgba(0, 0, 0, 0.26);
      background: rgba(0, 0, 0, 0.12);
    }
  }
}
.text-btn {
  box-shadow: none;
  background: transparent;
  &.default-btn {
    color: rgba(0, 0, 0, 0.87);
    &:hover {
      background: rgba(0, 0, 0, 0.04);
    }
  }
  &.primary-btn {
    color: rgba(25, 118, 210, 0.8);
    &:hover {
      background: rgba(25, 118, 210, 0.04);
    }
  }
  &.secondary-btn {
    color: rgba(220, 0, 78, 0.8);
    &:hover {
      background: rgba(220, 0, 78, 0.04);
    }
  }
  &.plain-btn {
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
  &.disabled {
    color: rgba(0, 0, 0, 0.26);
    &:hover {
      color: rgba(0, 0, 0, 0.26);
      background: transparent;
    }
  }
}
.iconed-btn {
  box-shadow: none;
  background: transparent;
  &.default-btn {
    color: rgba(0, 0, 0, 0.54);
    &:hover {
      background: rgba(0, 0, 0, 0.04);
    }
  }
  &.primary-btn {
    color: rgba(25, 118, 210, 0.8);
    &:hover {
      background: rgba(25, 118, 210, 0.04);
    }
  }
  &.secondary-btn {
    color: rgba(220, 0, 78, 0.8);
    &:hover {
      background: rgba(220, 0, 78, 0.04);
    }
  }
  &.plain-btn {
    color: #fff;
    &:hover {
      background: rgba(232, 234, 237, 0.08);
    }
  }
  &.disabled {
    color: rgba(0, 0, 0, 0.26);
    &:hover {
      color: rgba(0, 0, 0, 0.26);
      background: transparent;
    }
  }
}
.outlined-btn {
  box-shadow: none;
  background-color: transparent;
  &.default-btn {
    color: rgba(0, 0, 0, 0.87);
    border: 1px solid rgba(0, 0, 0, 0.23);
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
      border: 1px solid rgba(0, 0, 0, 0.4);
    }
  }
  &.primary-btn {
    color: rgba(25, 118, 210, 0.8);
    border: 1px solid rgba(25, 118, 210, 0.5);
    &:hover {
      background-color: rgba(25, 118, 210, 0.04);
      border: 1px solid rgba(25, 118, 210, 1);
    }
  }
  &.secondary-btn {
    color: rgba(220, 0, 78, 0.8);
    border: 1px solid rgba(220, 0, 78, 0.5);
    &:hover {
      background-color: rgba(220, 0, 78, 0.04);
      border: 1px solid rgba(220, 0, 78, 1);
    }
  }
  &.disabled {
    color: rgba(0, 0, 0, 0.26);
    border: 1px solid rgba(0, 0, 0, 0.12);
    &:hover {
      color: rgba(0, 0, 0, 0.26);
      border: 1px solid rgba(0, 0, 0, 0.12);
      background: transparent;
    }
  }
}
.flat {
  box-shadow: none;
}
.disabled {
  cursor: default;
  box-shadow: none;
}

.v-enter-active {
  transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 100ms;
}
.v-leave-active {
  transition: opacity 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}
.v-enter, .v-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
