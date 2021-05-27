<template>
  <section class="drawer">
    <div class="trigger">
      <vbutton
        variant="text"
        v-if="!icon"
        @click="handleToggle('button', $event)"
        ><slot></slot
      ></vbutton>
      <icon-button
        size="md"
        color="plain"
        aria-label="menu"
        v-if="icon"
        @click="handleToggle('button', $event)"
      ></icon-button>
    </div>
    <transition name="fade">
      <div
        class="control-mask"
        v-if="isToggled"
        @touchmove.prevent
        @click="handleToggle('mask', $event)"
      ></div>
    </transition>
    <transition :name="direction">
      <section class="container" v-if="isToggled" :class="direction">
        <div
          class="outer default-ripple"
          v-for="(item, idx) in items"
          :key="idx"
          @click="handleClick"
        >
          <anchor
            :label="item.label"
            :link="item.link"
            :active="anchorSelected === item.label ? true : false"
            :icon="item.icon | sizeAdder('md')"
            @select="handleToggle('anchor', $event)"
            ><span class="text">{{ item.text }}</span></anchor
          >
        </div>
      </section>
    </transition>
  </section>
</template>
<script>
import Navigable from "@/mixins/navigable";
import Rippleable from "@/mixins/rippleable";
import Vbutton from "../Button/Button";
import IconButton from "../Button/IconButton";
export default {
  name: "Drawer",
  mixins: [Navigable, Rippleable],
  components: { Vbutton, IconButton },
  props: {
    direction: {
      default: "left",
      validator: (v) => {
        return ["left", "right", "top", "bottom"].indexOf(v) !== -1;
      },
    },
    //using icon not text
    icon: {
      required: false,
      type: String,
    },
  },
  watch: {
    toggled() {
      if (this.toggled) {
        document.documentElement.style.overflow = "hidden";
      } else document.documentElement.style.overflow = "auto";
    },
  },
  computed: {
    isToggled() {
      return this.toggled;
    },
  },
  data() {
    return {
      toggled: false,
    };
  },
  methods: {
    handleClick(e) {
      this.createRipple(e,false,'default');
    },
    handleToggle(from) {
      this.toggled = !this.toggled;
      console.log(from, "handleToggle", this.toggled);
    },
  },
};
</script>
<style lang="less" scoped>
.horizontal {
  top: 0;
  min-width: 250px;
  height: 100%;
  padding: 8px 0;
}
.vertical {
  min-width: 250px;
  left: 0;
  width: 100%;
  padding: 8px 0;
}
.left {
  .horizontal();
  left: 0;
}
.right {
  .horizontal();
  right: 0;
}
.top {
  .vertical();
  top: 0;
}

.bottom {
  .vertical();
  bottom: 0;
}
.drawer {
  .container {
    position: fixed;
    margin: 0;
    background-color: #fff;
    z-index: 1200;
    box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
      0px 16px 24px 2px rgba(0, 0, 0, 0.14),
      0px 6px 30px 5px rgba(0, 0, 0, 0.12);
    .outer {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      z-index: 10;
      .anchor {
        .text {
          margin: 4px 0px 4px 32px;
        }
        padding: 8px 16px;
        font-size: 16px;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        line-height: 1.5;
        color: rgba(0, 0, 0, 0.87);
        transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        cursor: pointer;
      }
      .anchor:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
    }
  }
  .control-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.translate {
  transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.left {
  &-enter-active,
  &-leave-active {
    .translate();
  }
  &-leave-to,
  &-enter {
    transform: translateX(-100%);
  }
}
.right {
  &-enter-active,
  &-leave-active {
    .translate();
  }
  &-leave-to,
  &-enter {
    transform: translateX(100%);
  }
}
.top {
  &-enter-active,
  &-leave-active {
    .translate();
  }
  &-leave-to,
  &-enter {
    transform: translateY(-100%);
  }
}
.bottom {
  &-enter-active,
  &-leave-active {
    .translate();
  }
  &-leave-to,
  &-enter {
    transform: translateY(100%);
  }
}
</style>