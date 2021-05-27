<template>
  <section class="card">
    <section class="card-media" :style="styleMedia"></section>
    <section class="card-header">
      <span class="title">Card title</span>
      <span class="sub-title">Secondary text</span>
    </section>
    <section class="card-content">
      <span class="text"
        >Greyhound divisively hello coldly wonderfully marginally far upon
        excluding.</span
      >
    </section>
    <section class="card-actions">
      <vbutton variant="text" color="primary">ACTION1</vbutton>
      <vbutton variant="text" color="primary">ACTION2</vbutton>
    </section>
  </section>
</template>
<script>
import Vbutton from "../Button/Button";
export default {
  name: "Card",
  components: { Vbutton },
  mixins: [],
  data() {
    return {};
  },
  props: {
    mediaUrl: {
      type: String,
      default:
        //default cover
        "/defaultMediaCover.svg",
    },
  },
  computed: {
    styleMedia() {
      // :style="{ backgroundImage: `url(${mediaUrl})` }"
      let style = { backgroundImage: `url(${this.mediaUrl})` };
      console.log("styleMedia", style);
      return style;
    },
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.border-radius-1 {
  border-top-right-radius: inherit;
}
.border-radius-2 {
  border-top-left-radius: inherit;
}
.border-radius-3 {
  border-bottom-left-radius: inherit;
}
.border-radius-4 {
  border-bottom-right-radius: inherit;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  width: 34.4em;
  font-size: 10px;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);

  .card-header {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 1.6em 1.6em 0;
    font-family: Roboto, sans-serif;
    color: black;
    cursor: pointer;
    .title {
      font-size: 2em;
      line-height: 2rem;
      font-weight: 500;
      letter-spacing: 0.0125em;
    }
    .sub-title {
      font-size: 1.4em;
      line-height: 1.25rem;
      font-weight: 400;
      opacity: 0.6;
    }
  }
  .card-media {
    // width:34.4em;
    cursor: pointer;
    width: 100%;
    min-height: 19.4em;
    .border-radius-1();
    .border-radius-2();
  }
  .card-content {
    display: flex;
    box-sizing: border-box;
    padding: 1.8em 1.6em 0;
    color: black;
    font-family: Roboto, sans-serif;
    .text {
      font-size: 1.4em;
      line-height: 1.25rem;
      font-weight: 400;
      opacity: 0.6;
      //word-wrap: break-word;
    }
  }
  .card-actions {
    display: flex;
    width: 100%;
    min-height: 5.2em;
    padding: 0.8em;
    box-sizing: border-box;
    button {
      width: 88px;
      height: 36px;
      padding: 0;
      margin-right: 8px;
      font-size: 0.875rem;
      font-family: Roboto, sans-serif;
      line-height: 2.25rem;
      font-weight: 600;
      letter-spacing: 0.0892857143em;
    }
  }
}
</style>
