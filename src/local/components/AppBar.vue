<template>
  <section
    class="app-bar"
    :style="{...appBarPosition,...appBarColor}"
  >
    <section class="container">
      <slot></slot> 
    </section>
  </section>
</template>
<script>
export default {
  name: "AppBar",
  props: {
    dev: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "#202124",
    },
  },
  data() {
    return {
    };
  },
  computed: {
    appBarPosition(){
        return {position:this.dev ? 'absolute' : 'fixed'}
    },
    appBarColor(){
      return {background:this.color}
    }
  },
  methods: {
  },
};
</script>
<style lang="less" scoped>
.app-bar {
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  box-sizing: border-box;
  box-shadow: inset 0 -1px 0 0 #5f6368;//tricky
  .container {
    box-sizing: border-box;
    height: 64px;
    padding:8px;
    display: flex;
    align-items: center;
  }
}
</style>
