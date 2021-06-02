<template>
  <transition>
    <section
      class="chip"
      @mouseenter="handleHoverEnter"
      @mouseleave="handleHoverLeave"
    >
      <div class="content" :style="hoverTrick">
        <slot></slot>
      </div>
      <div class="btn-wrapper">
        <span v-if="isHovering" class="trick-hover-text"><slot></slot></span>
         <icon-button
            v-if="isHovering"
            icon="cross"
            v-bind="buttonStyles"
            @click="handleDelete"
          ></icon-button
        >
      </div>
    </section>
  </transition>
</template>
<script>
import IconButton from "../../components/Button/IconButton";
export default {
  name: "Chip",
  components: { IconButton },
  data() {
    return {
      isHovering: false,
    };
  },
  props: {},
  computed: {
    hoverTrick() {
      if (this.isHovering) return { opacity: 0 };
      else return {};
    },
    buttonStyles() {
      return {
        size: 16,
        iconSize: 11,
        hoverColor: "rgba(232,234,237,0.08)",
        iconColor: "#9aa0a6",
        iconHoverColor: "#e8eaed",
        disrippled: true,
      };
    },
  },
  methods: {
    handleHoverEnter() {
      this.isHovering = true;
    },
    handleHoverLeave() {
      this.isHovering = false;
    },
    handleClick() {},
    handleDelete() {},
  },
};
</script>
<style lang="less" scoped>
.chip {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
  max-width: 100%;
  height: 24px;
  border-radius: 12px;
  user-select: none;
  cursor: pointer;
  border: 1px solid #5f6368;
  transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  .content {
    display: flex;
    justify-content: center;
    min-width: 35px;
    padding: 3px 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 11px;
  }
  .btn-wrapper {
    position: absolute;
    width: 100%;
    right: 0;
    display: flex;
    align-items: center;
    .trick-hover-text {
      text-align: center;
      box-sizing: border-box;
      padding: 3px 0 3px 3px;
      font-size: 11px;
      width: calc(100% - 18px);
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 251ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 167ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}
.v-enter,
.v-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>
