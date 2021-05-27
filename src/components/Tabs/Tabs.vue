<template>
  <section class="tabs">
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
        :icon="item.icon"
        :style="{ color: anchorSelected === item.label ? selectColor : '' }"
        @select="handleSelect"
      >
        <template
          ><span class="text">{{ item.text }}</span></template
        >
      </anchor>
    </div>
    <div
      class="indicator"
      :style="{ width: indicatorWidth, left: indicatorPos }"
    ></div>
  </section>
</template>
<script>
import Navigable from "@/mixins/navigable";
import Rippleable from "@/mixins/rippleable";
export default {
  name: "Tabs",
  components: {},
  mixins: [Navigable, Rippleable],
  props: {
    selectColor: {
      default: "#1976d2",
      type: String,
    },
  },
  data() {
    return {
      tabWidth: null,
    };
  },
  mounted() {
    this.anchorSelected = this.items[0].label;
    this.calcTabWidth();
  },
  updated() {
    //necessary when changing cpt width
    this.calcTabWidth();
  },
  computed: {
    indicatorPos() {
      let cnt = 0;
      for (let item of this.items) {
        if (this.anchorSelected === item.label) break;
        else cnt++;
      }
      let size = this.tabWidth;
      let left = `${size * cnt}px`;
      return left;
    },
    indicatorWidth() {
      //todo problem if it doesnt return num+'px' it wont take effect and no error msg
      return `${this.tabWidth}px`;
    },
    itemLabels(){
      return this.items.map(v=>v.label)
    }
  },
  methods: {
    calcTabWidth() {
      let oTab = this.$el.getElementsByClassName("outer")[0];
      if (oTab) {
        this.tabWidth = oTab.getBoundingClientRect().width;
      }
    },
    handleSelect(label) {
      let lastOne = {
        label: this.anchorSelected,
        index: this.itemLabels.indexOf(this.anchorSelected),
      };
      let nextOne = { label: label, index: this.itemLabels.indexOf(label) };
      this.reportChange(lastOne, nextOne);
      this.anchorSelected = label;
      console.log("handleSelect", label);
    },
    handleClick(e) {
      console.log("handleClick");
      this.createRipple(e, false, "primary", "fast");
    },
    reportChange(last, next) {
      this.$emit("change", { last, next });
    },
  },
};
</script>
<style lang="less" scoped>
.tabs {
  display: flex;
  position: relative;
  .outer {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 48px;
    min-width: 160px;
    .anchor {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 6px 12px;
      box-sizing: border-box;
      color: rgba(0, 0, 0, 0.54);
      line-height: 24px;
      font-size: 14px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 600;
      white-space: normal;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
  }
  .indicator {
    position: absolute;
    background: #1976d2;
    width: auto;
    bottom: 0;
    height: 3px;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
}

</style>
