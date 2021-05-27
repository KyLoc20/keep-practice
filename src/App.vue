<template>
  <div id="app">
    <section class="header">
      <app-bar>
        <div class="col col1">
          <div class="main-menu">
            <icon-button
              color="plain"
              icon="menu"
              iconColor="#e8eaed"
            ></icon-button>
          </div>
          <div class="logo"></div>
        </div>
      </app-bar>
    </section>
    <section class="left-container"></section>
    <section class="main-container"></section>
  </div>
</template>

<script>
import AppBar from "./local/components/AppBar";
import IconButton from "./components/Button/IconButton";
export default {
  name: "App",
  components: { AppBar, IconButton },
  data() {
    return {
      isMenuCollapsed: false,
    };
  },
};
</script>
<style scoped lang="less">
.col{
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
    .col1{
      min-width:232px;
      padding-right:30px;
    }
    .main-menu {
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
  .main-container {
    flex: 1;
    margin-top: 64px; //for header
    box-sizing: border-box;
  }
  .left-container {
    &.collapsed {
      width: 80px;
    }
    margin-top: 64px; //for header
    padding-top: 8px;
    width: 280px;
    min-height: calc(100% - 64px);
    box-sizing: border-box;
  }
}
</style>
