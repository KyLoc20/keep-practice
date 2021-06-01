<template>
  <section
    class="note"
    @mouseenter="handleHoverEnter"
    @mouseleave="handleHoverLeave"
  >
    <div class="content-context">
      <div class="text" v-html="parsedContent"></div>
    </div>
    <div class="control-context">
      <transition>
        <icon-button
          v-show="isHovering"
          icon="label"
          :size="34"
          :iconSize="17"
          hoverColor="rgba(232,234,237,0.08)"
          iconColor="#9aa0a6"
          iconHoverColor="#e8eaed"
          disrippled
        ></icon-button
      ></transition>
      <transition>
        <icon-button
          v-show="isHovering"
          icon="palette"
          :size="34"
          :iconSize="17"
          hoverColor="rgba(232,234,237,0.08)"
          iconColor="#9aa0a6"
          iconHoverColor="#e8eaed"
          disrippled
        ></icon-button
      ></transition>
            <transition>
        <icon-button
          v-show="isHovering"
          icon="bin"
          :size="34"
          :iconSize="17"
          hoverColor="rgba(232,234,237,0.08)"
          iconColor="#9aa0a6"
          iconHoverColor="#e8eaed"
          disrippled
          @click="handleDelete"
        ></icon-button
      ></transition>
    </div>
  </section>
</template>
<script>
import IconButton from "../../components/Button/IconButton";
export default {
  name: "Note",
  props: {
    index:{
      //convenient for editing
      type:Number,
    },
    content: {
      type: String,
    },
    labels: {
      type: Array,
    },
    color: {
      type: String,
      required: false,
    },
  },
  components: {
    IconButton,
  },
  data() {
    return {
      isHovering: false,
    };
  },
  computed: {
    parsedContent() {
      //todo maybe its redundant
      return this.content ? this.content.replace(/\n/gm, "<br/>") : "";
    },
  },
  methods: {
    handleHoverEnter() {
      this.isHovering = true;
    },
    handleHoverLeave() {
      this.isHovering = false;
    },
    handleDelete(){
      this.$emit('delete',this.index)
    },
  },
};
</script>
<style lang="less" scoped>
.note {
  width: 240px;
  margin: 8px;
  background-color: #202124;
  box-sizing: border-box;
  border: 1px solid transparent;
  border-color: #5f6368;
  border-radius: 8px;
  transition: box-shadow 200ms cubic-bezier(0.4, 0.2, 0, 1);
  white-space: pre-wrap;
  &:hover {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.6), 0 2px 6px 2px rgba(0, 0, 0, 0.3);
  }
  .content-context {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    min-height: 60px;
    .text {
      box-sizing: border-box;
      padding: 12px 16px;
      width: 100%;
      font-size: 1.125rem;
      font-weight: 600;
      letter-spacing: 0;
      line-height: 1.5rem;
    }
    .label {
    }
  }
  .control-context {
    display: flex;
    width: 100%;
    height: 34px;
    margin: 4px 0;
    .icon-button {
      margin: 0 3px;
    }
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 400ms cubic-bezier(0.4, 0.2, 0, 1);
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
