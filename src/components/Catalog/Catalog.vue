<template>
  <section class="catalog">
    <item
      v-for="(item, idx) in items"
      :key="idx"
      :content="item.content"
      :children="item.children"
      :selectedOne="selectedLabel"
      :layer="1"
      :layerNum="2"
      :tabSize="24"
      @select="handleSelect({ label: 'catalog', layer: 0 }, $event)"
    ></item>
  </section>
</template>
<script>
import Item from "./RecursiveItem";
export default {
  name: "Catalog",
  components: { Item },
  props: {
    //[content:Object,children?:[item]]
    items: {
      type: Array,
    },
    selectedOne:{
      type:String,
      required:false,
    }
  },
  data() {
    return {
      selectedLabel: this.selectedOne,
    };
  },
  mounted() {
    console.log(this.items);
  },
  methods: {
    handleSelect(current, where) {
      let label = current.label;
      let layer = current.layer;
      this.selectedLabel = where.label;
      console.log(
        "Here is: ",
        label,
        layer,
        " handleSelect from: ",
        where,
        " current selectedLabel: ",
        this.selectedLabel
      );
      //report to the upper cpt to go somewhere
      this.$emit("select", where);
    },
  },
};
</script>
<style lang="less" scoped>
.catalog {
  display: flex;
  flex-direction: column;
}
</style>
