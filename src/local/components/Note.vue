<template>
  <section class="note">
    <div class="content-context" v-html="parsedContent"></div>
    <div class="control-context"></div>
  </section>
</template>
<script>
export default {
  name: "Note",
  props: {
    content: {
      type: String,
    },
  },
  data() {
    return {};
  },
  computed: {
    parsedContent(){
      //todo maybe its redundant
      return this.content ? this.content.replace(/\n/gm,"<br/>") : "";
    }
  },
  methods: {
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
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 12px 16px;
    width: 100%;
    font-size: 1.125rem;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 1.5rem;
  }
  .control-context {
    display: flex;
    width: 100%;
    height: 34px;
    margin: 4px 0;
  }
}
</style>
