<template>
  <section class="item">
    <div class="content" :style="itemStyle" @click="handleClick">
      {{ content.text }}
    </div>
    <section
      class="children"
      :style="childrenStyle"
      :class="isChildrenCollapsed ? 'collapsed' : ''"
    >
      <recursive-item
        v-for="(child, idx) in children"
        :key="idx"
        :content="child.content"
        :children="child.children"
        :layerNum="layerNum"
        :layer="layer + 1"
        :tabSize="tabSize + tabEach"
        :selectedOne="selectedOne"
        @select="handleSelect"
      ></recursive-item>
    </section>
  </section>
</template>
<script>
import Rippleable from "@/mixins/rippleable";
export default {
  name: "RecursiveItem",
  mixins: [Rippleable],
  props: {
    content: {
      type: Object,
    },
    children: {
      type: Array,
      default: () => {
        return [];
      },
    },
    selectedOne: {
      //selected item's label
      type: String,
    },
    layer: {
      //record the current layer
      type: Number,
    },
    layerNum: {
      //record the max num of layers
      type: Number,
    },
    tabSize: {
      //tab length of current item
      type: Number,
      default: 24,
    },
    tabEach: {
      //increasing tab length of children
      type: Number,
      default: 16,
    },
    tabBase: {
      type: Number,
      default: 24,
    },
  },
  data() {
    return {
      isChildrenCollapsed: false,
    };
  },
  computed: {
    itemStyle() {
      let label = this.content.label;
      let paddingLeft = `${this.tabSize}px`;
      let color = "rgba(0, 0, 0, 0.87)";
      if (label === this.selectedOne) color = "#1976D2";
      let fontWeight = 500;
      if (this.layerNum > this.layer || label === this.selectedOne)
        fontWeight = 600;
      return { paddingLeft, color, fontWeight };
    },
    childrenStyle() {
      return { padding: "8px 0" };
    },
  },
  methods: {
    handleClick(e) {
      this.createRipple(e, false, "default", true);
      let label = this.content.label;
      let layer = this.layer;
      let link = this.content.link;
      console.log("handleClick originally from: ", label, layer);
      this.$emit("select", { label, layer,link });
      //whether collapse its childrem items
      if (this.hasChildren()) {
        this.isChildrenCollapsed = !this.isChildrenCollapsed;
        console.log("---->", this.isChildrenCollapsed);
      }
    },
    hasChildren() {
      //to check whether it has children
      return this.layer < this.layerNum;
    },
    handleSelect(where) {
      let label = this.content.label;
      let layer = this.layer;
      console.log("Here is: ", label, layer, " handleSelect from: ", where);
      this.$emit("select", where);
    },
  },
};
</script>
<style lang="less" scoped>
.item {
  .content {
    display: flex;
    align-items: center;
    padding: 6px 8px;
    height: 24px;
    color: rgba(0, 0, 0, 0.87);
    font-family: "Roboto", Helvetica, sans-serif;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    user-select: none;
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
  .children {
    //todo leave enough space
    max-height: 500vh;
    transition: all 450ms cubic-bezier(0.4, 0, 0.2, 1) 50ms;
    overflow: hidden;
  }
  .collapsed {
    max-height: 0;
    padding: 0 !important;
  }
}
</style>
