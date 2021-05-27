<template>
  <section class="menu">
    <section class="trigger">
      <vbutton
        v-if="text && icon"
        variant="text"
        :class="classTrigger"
        @click="handleOpenMenu"
        >{{ this.text }}</vbutton
      >
      <icon-button
        v-else-if="icon"
        :size="icon.size"
        color="plain"
        :aria-label="icon.name"
        :class="classTrigger"
        @click="handleOpenMenu"
      ></icon-button>
      <vbutton
        v-else
        variant="text"
        :class="classTrigger"
        @click="handleOpenMenu"
        >{{ this.text }}</vbutton
      >
      <transition :name="position+'fade'"
        ><section class="container" :class="position" v-if="isOpened">
          <div
            class="control-mask"
            v-if="isMaskOpened"
            @click="handleCloseMask"
          ></div>
          <div
            class="outer"
            v-for="(item, idx) in items"
            :key="idx"
            @click="handleClick"
          >
            <anchor
              :label="item.label"
              :link="item.link"
              :active="anchorSelected === item.label ? true : false"
              :class="anchorSelected === item.label ? 'primary' : ''"
              :icon="item.icon | sizeAdder('md')"
              @select="handleSelect"
            >
              <template>{{ item.text }}</template>
            </anchor>
          </div>
        </section></transition
      >
    </section>
  </section>
</template>
<script>
import Navigable from "@/mixins/navigable";
import Rippleable from "@/mixins/rippleable";
import Vbutton from "../Button/Button";
import IconButton from "../Button/IconButton";
export default {
  name: "Menu",
  mixins: [Navigable, Rippleable],
  components: { Vbutton, IconButton },
  props: {
    text: {
      type: String,
      required: false,
    },
    icon: {
      type: [String, Object],
      required: false,
    },
    //menu generating position
    position: {
      default: "left",
      validator: (v) => {
        return ["left", "right"].indexOf(v) !== -1;
      },
    },
    items: {
      type: Array,
    },
    dev: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classTrigger() {
      return this.isOpened ? "transparent" : "";
    },
  },
  mounted() {},
  data() {
    return {
      isOpened: false,
      isMaskOpened: false,
      anchorSelected: null,
    };
  },
  watch: {
    anchorSelected: function () {
      this.openMenu(false);
    },
  },
  methods: {
    openMenu(opened) {
      this.isOpened = opened;
      this.isMaskOpened = opened;
    },
    handleClick(e) {
      this.createRipple(e,false,'default');
    },
    handleOpenMenu() {
      this.openMenu(true);
    },
    handleCloseMask() {
      this.openMenu(false);
    },
  },
};
//todo IMPORTANT width:100% make it grow and  enable display: flex + justify-content
// bottom: 0;
// left:0;
// z-index: 100;
// width:100%;
</script>
<style lang="less" scoped>
.menu {
  .trigger {
    position: relative;
    // .transparent{
    //   opacity: 0;
    // }
  }
  .left {
    left: 0;
  }
  .right {
    right: 0;
  }
  .container {
    position: absolute;
    top: 0;
    padding: 8px 0;
    box-sizing: border-box;
    white-space: nowrap;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
      0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    .control-mask {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .outer {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      z-index: 10;
      .anchor {
        padding: 6px 16px;
        font-size: 16px;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        color: rgba(0, 0, 0, 0.87);
        transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        cursor: pointer;
      }
      .anchor:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
    }
  }
}
.fade {
  transition: opacity 251ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 167ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}
.fade-action {
  transform: scale(0);
  opacity: 0;
}
.leftfade {
  &-enter-active,
  &-leave-active {
    .fade();
    transform-origin: 0px 26px;
  }
  &-leave-to,
  &-enter {
    .fade-action();
  }
}
.rightfade {
  &-enter-active,
  &-leave-active {
    .fade();
    transform-origin: 100% 26px;
  }
  &-leave-to,
  &-enter {
    .fade-action();
  }
}
</style>