<template>
  <section class="button-group">
    <section class="group" :class="groupClass">
      <slot></slot>
    </section>
  </section>
</template>
<script>
export default {
  name: "ButtonGroup",
  components: {},
  props: {
    color: {
      default: "primary",
      validator: (v) => {
        return ["default", "primary", "secondary"].indexOf(v) !== -1;
      },
    },
    variant: {
      default: "contained",
      validator: (v) => {
        return ["contained", "text", "outlined"].indexOf(v) !== -1;
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    groupClass() {
      return this.variant + " " + this.color;
    },
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.button-group {
  .group {
    display: flex;
    margin: 8px;
  }
  //color of contained
  .group.contained.default button {
    color: rgba(0, 0, 0, 0.87);
    background-color: #e0e0e0;
  }
  .group.contained.default button:hover {
    background-color: #d5d5d5;
  }
  .group.contained.primary button {
    color: #fff;
    background-color: #1976d2;
  }
  .group.contained.primary button:hover {
    background-color: #115293;
  }
  .group.contained.secondary button {
    color: #fff;
    background-color: #dc004e;
  }
  .group.contained.secondary button:hover {
    background-color: #9a0036;
  }

  //color of text and outlined
  .group:not(.contained) button {
    box-shadow: none;
  }
  .group:not(.contained) button:hover {
    box-shadow: none;
  }
  .group:not(.contained).default button {
    color: rgba(0, 0, 0, 0.87);
    border: 1px solid rgba(0, 0, 0, 0.23);
  }
  .group:not(.contained).default button:hover {
    background-color: rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(0, 0, 0, 0.4);
  }
  .group:not(.contained).primary button {
    color: rgba(25, 118, 210, 0.8);
    border: 1px solid rgba(25, 118, 210, 0.5);
  }
  .group:not(.contained).primary button:hover {
    background-color: rgba(25, 118, 210, 0.04);
    border: 1px solid rgba(25, 118, 210, 1);
  }
  .group:not(.contained).secondary button {
    color: rgba(220, 0, 78, 0.8);
    border: 1px solid rgba(220, 0, 78, 0.5);
  }
  .group:not(.contained).secondary button:hover {
    background-color: rgba(220, 0, 78, 0.04);
    border: 1px solid rgba(220, 0, 78, 1);
  }
  //border of text
  .group.text button {
    border-color: transparent !important;
    background-color: transparent;
    border-radius: 0;
  }
  .group.text button:not(:last-child) {
    border-right-color: inherit !important;
  }

  //border of outlined and contained
  .group:not(.text) button:not(:last-child) {
    border-right-color: transparent;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .group:not(.text) button:not(:first-child) {
    margin-left: -1px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .group:not(.text) button {
    min-width: 40px;
    background-color: transparent;
  }
}
</style>