<template>
  <section
    class="app-bar"
    :style="{ position: dev ? 'absolute' : 'fixed', backgroundColor: color }"
  >
    <section class="container">
      <section class="navigation">
        <drawer
          :icon="'menu'"
          :active="isDrawerActive"
          @ready="handleReadyToOpenDrawer"
        >
          <section class="menu-header">
            <section class="title">MyMaterial-UI</section>
            <section class="version">v0.0.1</section>
          </section>
          <divider></divider>
          <catalog
            :items="itemsDrawer"
            :selectedOne="curSelectedOne"
            @select="handleSelectFromCatalog"
          ></catalog>
        </drawer>
      </section>
      <section class="title"><slot></slot></section>
      <section class="contextual-actions">
        <icon-button
          v-for="(item, idx) in itemsContext"
          :key="idx"
          size="md"
          color="plain"
          :aria-label="item.icon"
        ></icon-button>
      </section>
      <section class="overflow-menu" v-if="itemsOverflowed">
        <simple-menu
          :items="itemsOverflowed"
          :icon="'more2' | sizeAdder('md')"
          position="right"
        >
        </simple-menu>
      </section>
    </section>
  </section>
</template>
<script>
import Navigable from "@/mixins/navigable";
import Rippleable from "@/mixins/rippleable";
import Drawer from "../Drawer/CustomDrawer";
import IconButton from "../Button/IconButton";
import SimpleMenu from "../Menu/Menu";
import Catalog from "../Catalog/Catalog";
import Divider from "../Divider/Divider";
const menuItems = [
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
];
export default {
  name: "AppBar",
  components: { Drawer, IconButton, SimpleMenu, Catalog, Divider },
  mixins: [Rippleable, Navigable],
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
    return {
      isDrawerActive: true,
      curSelectedOne: null,
    };
  },
  computed: {
    itemsOverflowed() {
      return menuItems;
    },
  },
  methods: {
    handleSelectFromCatalog(where) {
      //deal with going somewhere
      console.log("handleSelectFromCatalog", where);
      let link = where.link;
      if (link) {
        this.curSelectedOne = where.label;
        this.goToLink(link);
        //control to close the drawer
        this.closeDrawer();
      }
    },
    handleReadyToOpenDrawer() {
      this.isDrawerActive = true;
      //when the drawer is open
      //todo not recommended
      document.documentElement.style.overflow = "hidden";
    },
    closeDrawer() {
      this.isDrawerActive = false;
      //when the drawer is close
      //todo not auto for position:sticky
      document.documentElement.style.overflow = "visible";
    },
    goToLink(link) {
      if (link) {
        console.log("------>goToLink: ", this.$route.params, this.$route);
        //todo check valid link
        this.$router.push("/" + link);
      }
    },
  },
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
    .contextual-actions {
      display: flex;
    }
    .menu-header {
      padding: 0 0 0 24px;
      margin-top: -8px;
      color: rgba(0, 0, 0, 0.54);
      min-height: 64px;
      box-sizing: border-box;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .title {
        font-size: 20px;
        font-weight: 500;
        max-height: 32px;
        margin-bottom: 4px;
        color: currentColor;
        letter-spacing: 0.0075em;
        cursor: pointer;
        transition: color 200ms cubic-bezier(0.4, 0.2, 0, 1);
        &:hover {
          text-decoration: underline;
          color: #1976d2;
        }
      }
      .version {
        font-size: 12px;
        color: currentColor;
        letter-spacing: 0.03333em;
        line-height: 20px;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
