<template>
  <a class="anchor" @click="handleClick" :class="classAnchor">
    <icon v-if="icon" :name="iconName" :size="iconSize" :class="icon"></icon>
    <slot></slot>
    <slot name="separator"></slot>
  </a>
</template>
<script>
import Icon from "../Icon/Icon";
export default {
  name: "Anchor",
  components: { Icon },
  props: {
    link: {
      type: String,
      default: null,
    },
    active: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
    icon: {
      type: [String, Object],
      required: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    classAnchor() {
      let clazz = this.active ? "selected" : "";
      if (this.label === "$more") clazz += " more";
      if (this.vertical) clazz += " vertical";
      return clazz;
    },
    iconName() {
      if (typeof this.icon === "object") return this.icon.name;
      else return this.icon;
    },
    iconSize() {
      console.log("iconSize", this.icon);
      if (typeof this.icon === "object") return this.icon.size;
      else return "sm";
    },
  },
  mounted() {
  },
  methods: {
    handleClick() {
      console.log("Inner handleClickAnchor", this.label);
      this.$emit("select", this.label);
      //this.$emit("expand");
      //todo using $name to refer to some instructions
      if (this.label === "$more") this.$emit("expand");
      if(this.label==="$special")this.$emit("special");
    },
  },
};
</script>
<style lang="less" scoped>
.anchor {
  margin: 0;
  font-size: 1rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  letter-spacing: 0.01em;

  color: rgba(0, 0, 0, 0.54);
  cursor: pointer;
  user-select: none;
  transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

}
.anchor.vertical {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.anchor.selected {
  color: rgba(0, 0, 0, 0.87);
  .icon {
    fill: rgba(0, 0, 0, 0.87);
  }
}
.anchor.more {
  .icon {
    background-color: #f5f5f5;
    width: 24px;
    height: 16px;
  }
}
.anchor.more:hover {
  .icon {
    background-color: #eeeeee;
  }
}
</style>