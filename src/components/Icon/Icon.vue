<template>
  <span
    class="icon"
    :style="{ fill: color ? color : 'currentColor', ...iconSize }"
  >
    <badge
      v-if="badge"
      :content="badge.content"
      :size="badge.size"
      :color="badge.color"
      :visible="badge.visible"
    ></badge>
    <svg
      :style="iconSize"
      focusable="false"
      :viewBox="viewBox"
      aria-hidden="true"
    >
      <path :d="path" v-for="(path, idx) in iconPaths" :key="idx"></path>
    </svg>
  </span>
</template>
<script>
//todo IMPORTANT Icon Component is based on the prop name to control the path, API is name not path.When name changed, the path must be updated.
import Badge from "../Badge/Badge";
import { iconMap, iconList } from "./icons";
const mapSize = {
  sm: 20,
  md: 24,
  lg: 36,
};
export default {
  name: "Icon",
  components: { Badge },
  props: {
    name: {
      default: "unknown",
      validator: (v) => {
        return iconList.indexOf(v) !== -1;
      },
    },
    size: {
      default: "md",
      validator: (v) => {
        if (typeof v === "string" && ["sm", "md", "lg"].indexOf(v) !== -1)
          return true;
        else if (typeof v === "number" && v > 0) return true;
        else return false;
      },
    },
    color: {
      type: String,
      required: false,
    },
    badge: {
      required: false,
      //todo {content,size,color,visible}
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    iconPaths() {
      let oPath = iconMap[this.name].path;
      if (typeof oPath === "string") return [oPath];
      else return oPath;
    },
    viewBox() {
      return iconMap[this.name].viewBox;
    },
    iconSize() {
      let size = this.getIconSize(this.size);
      return { width: `${size}px`, height: `${size}px` };
    },
  },
  mounted() {},
  methods: {
    getIconSize(inputSize) {
      if (typeof inputSize === "string") return mapSize[inputSize] || 24;
      else if (typeof inputSize === "number") return inputSize;
      else return 24;
    },
  },
};
</script>
<style lang="less" scoped>
//todo its width and height need to be assigned outside
.icon {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  text-align: center;
  transition: fill, background-color 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}
</style>
