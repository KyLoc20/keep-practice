<template>
  <div id="app">
    <section class="header">
      <app-bar>
        <div class="col col1">
          <div class="navigation-menu">
            <icon-button
              color="plain"
              icon="menu"
              iconColor="#e8eaed"
              @click="handleOpenMenu"
            ></icon-button>
          </div>
          <div class="logo"></div>
        </div>
      </app-bar>
    </section>
    <section class="left-container">
      <ul class="navigation">
        <li
          class="navigation-anchor"
          v-for="(item, idx) in navigationAnchors"
          :key="idx"
          :class="selctedAnchor === item.name ? 'selected' : ''"
          :style="styleNavigationAnchor"
          @click="handleSelectAnchor($event, item.name)"
        >
          <icon :name="item.icon"></icon>
          <transition>
            <span class="text" v-if="!isNavigationCollapsed">{{
              item.name
            }}</span></transition
          >
        </li>
      </ul>
    </section>
    <section class="main-container"></section>
  </div>
</template>

<script>
import AppBar from "./local/components/AppBar";
import IconButton from "./components/Button/IconButton";
import Icon from "./components/Icon/Icon";
export default {
  name: "App",
  components: { AppBar, IconButton, Icon },
  data() {
    return {
      isNavigationCollapsed: true,
      basicNavigationItems: [
        { name: "Notes", icon: "insight" },
        { name: "Reminders", icon: "bell" },
        { name: "Edit labels", icon: "pen" },
        { name: "Archive", icon: "archive" },
        { name: "Bin", icon: "bin" },
      ],
      labels: [{ name: "easy" }, { name: "medium" }, { name: "hard" }],
      selctedAnchor: "Notes",
    };
  },
  computed: {
    navigationAnchors() {
      let items = [this.basicNavigationItems[0], this.basicNavigationItems[1]];
      for (let label of this.labels) {
        items.push({ name: label.name, icon: "label" });
      }
      items.push(this.basicNavigationItems[2]);
      items.push(this.basicNavigationItems[3]);
      items.push(this.basicNavigationItems[4]);
      return items;
    },
    styleNavigationAnchor() {
      if (this.isNavigationCollapsed) {
        return {
          width: "48px",
          marginLeft: "12px",
          paddingLeft: 0,
          borderTopLeftRadius: "24px",
          borderBottomLeftRadius: "24px",
        };
      } else return {};
    },
  },
  methods: {
    handleSelectAnchor(e, label) {
      console.log("handleSelectAnchor", e, label);
      this.selctedAnchor = label;
      this.$emit("select", { anchor: label });
    },
    handleOpenMenu() {
      this.isNavigationCollapsed = !this.isNavigationCollapsed;
    },
  },
};
</script>
<style scoped lang="less">
.col {
  display: flex;
}
#app {
  display: flex;
  justify-content: center;
  position: relative;

  font-family: "Roboto", Helvetica, Arial, sans-serif;
  background-color: #202124; //#5f6368 light theme
  min-height: 100vh;
  .header {
    .col1 {
      min-width: 232px;
      padding-right: 30px;
    }
    .navigation-menu {
      margin: 0 4px;
    }
    .logo {
      width: 60px;
      height: 48px;
      background-image: url(/logo/logo_dark.png);
      background-size: 100% auto;
      background-position: center 30%;
    }
  }
  .left-container {
    ul {
      padding: 0;
      list-style: none;
    }
    .navigation {
      .navigation-anchor {
        display: flex;
        align-items: center;
        width: 280px;
        height: 48px;
        padding-left: 12px;
        border-top-right-radius: 24px;
        border-bottom-right-radius: 24px;
        box-sizing: border-box;
        cursor: pointer;
        transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 100ms;
        &:hover {
          background-color: #28292c;
        }
        .icon {
          padding: 0 12px;
          color: #9aa0a6;
        }

        .text {
          min-width: 200px;
          margin-left: 20px;
          font-size: 14px;
          color: #e8eaed;
          letter-spacing: 0.025em;
          font-weight: 600;
          line-height: 1.25rem;
        }
        &.selected {
          background-color: #41331c;
          .icon {
            color: #e8eaed;
          }
        }
      }
    }
    position: fixed;
    top: 64px; //for header
    left: 0;
    padding-top: 8px;
    // width: 280px;
    // min-height: calc(100% - 64px);
    box-sizing: border-box;
  }
  .main-container {
    flex: 1;
    margin-top: 64px; //for header
    box-sizing: border-box;
  }
}
.v-enter-active {
  transition: opacity 0ms cubic-bezier(0.4, 0, 0.2, 1) 150ms;
}
.v-leave-active {
  transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}
.v-enter,
.v-leave-to {
  opacity:0;
}
</style>
