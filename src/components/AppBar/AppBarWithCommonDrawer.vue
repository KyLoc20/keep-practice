<template>
  <section
    class="app-bar"
    :style="{ position: dev ? 'absolute' : 'fixed', backgroundColor: color }"
  >
    <section class="container">
      <section class="navigation">
        <drawer :items="itemsDrawer" :icon="'menu'"></drawer>
      </section>
      <section class="title"><slot></slot></section>
      <section class="contextual-actions">
        <icon-button
          v-for="(item,idx) in itemsContext"
          :key="idx"
          size="md"
          color="plain"
          :aria-label="item.icon"
        ></icon-button>
      </section>
      <section class="overflow-menu" v-if="itemsOverflowed">
        <simple-menu :items="itemsOverflowed" :icon="'more2' | sizeAdder('md')" position="right"> </simple-menu>
      </section>
    </section>
  </section>
</template>
<script>
import Navigable from "@/mixins/navigable";
import Rippleable from "@/mixins/rippleable";
import Drawer from "../Drawer/Drawer";
import IconButton from "../Button/IconButton";
import SimpleMenu from "../Menu/Menu"
const menuItems=[
        {
          label: "profile",
          text: "Profile",
        },
        {
          label: "account",
          text: "My account",
        },
        {
          label: "logout",
          text: "Logout",
        },
      ]
export default {
  name: "AppBar",
  components: { Drawer, IconButton,SimpleMenu },
  mixins: [Rippleable,Navigable],
  props: {
    dev: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "#1976d2",
    },
    itemsDrawer: {
      type: Array,
    },
    itemsContext: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  computed: {
    itemsOverflowed() {
      return menuItems;
    },
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.app-bar {
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  .container {
    //todo margin-right:negative doesnt work in fixed
    height: 64px;
    margin-right: calc(100% - 100vw);
    display: flex;
    align-items: center;
    padding: 0 24px;
    box-sizing: border-box;
    .navigation {
      margin-left: -12px;
      margin-right: 16px;
    }
    .title {
      flex: 1;
      font-size: 1.25rem;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 500;
      line-height: 1.6;
      letter-spacing: 0.0075em;
      color: white;
      user-select: none;
    }
    .contextual-actions{
      display: flex;
    }
  }
}
</style>
