<template>
  <div class="badge" :class="classBadge">
    <div class="container" :class="classContainer">
      <span class="content">{{ this.badgeContent }}</span>
      <span class="badge-ripple" :class="classRipple" v-if="rippleable"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Badge",
  props: {
    content: {
      type: Number,
      default: 0,
    },
    color: {
      default: "secondary",
      validator: (v) => {
        return ["primary", "secondary", "green"].indexOf(v) !== -1;
      },
    },
    size: {
      default: "md",
      validator: (v) => {
        return ["sm", "md", "lg", "auto"].indexOf(v) !== -1;
      },
    },
    visible: {
      default: true,
      type: Boolean,
    },
    //only appear badge not the specific content
    simple: {
      default: false,
      type: Boolean,
    },
    //to use ripple effect to express feelings of activeness
    rippleable: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  mounted() {
    console.log("Badge", this.content, this.simple);
  },
  computed: {
    classBadge() {
      let size = this.size + "-badge";
      return size;
    },
    classContainer() {
      let color = this.color;
      if (["primary", "secondary"].indexOf(color) === -1) color = "secondary";
      color += "-badge";

      if (!this.visible || this.content <= 0) return color + " invisible";
      else return color;
    },
    classRipple() {
      let color = this.color;
      if (["primary", "secondary"].indexOf(color) === -1) color = "secondary";
      return color;
    },
    badgeContent() {
      if (!this.simple) {
        if (this.content < 0) return "";
        else if (this.content < 100) return this.content;
        else if (this.content < 1000) return "99+";
        else return "999+";
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="less" scoped>
@md-size: 10px;
@sm-size: 4px;
@primary-color: #1976d2;
@secondary-color: #dc004e;
.top-right {
  z-index: 1;
  top: 0;
  right: 0;
  transform: scale(1) translate(50%, -50%);
}
.badge {
  position: absolute;
  min-width: 2em;
  height: 2em;
  border-radius: 1em;
  .top-right();
  .container {
    position: relative;
    color: #fff;
    border-radius: 1em;
    padding: 0 0.6em;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 195ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    .content {
      font-size: 12px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }
    .badge-ripple {
      z-index: 10;
      position: absolute;
      background: transparent;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      box-shadow: 0 0 0 2px currentColor;
      animation: ripple 1.2s infinite ease-in-out;
    }
    .primary {
      color: @primary-color;
    }
    .secondary {
      color: @secondary-color;
    }
  }

  .primary-badge {
    background-color: @primary-color;
  }
  .secondary-badge {
    background-color: @secondary-color;
  }
}
.md-badge {
  font-size: @md-size;
}
.sm-badge {
  font-size: @sm-size;
  .container {
    .content {
      font-size: 4px;
    }
  }
}
.invisible {
  transform: scale(0);
}
@keyframes ripple {
  from {
    transform: scale(0.5);
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  to {
    box-shadow: 0 0 0 1px currentColor;
    transform: scale(1.8);
    opacity: 0;
  }
}
</style>