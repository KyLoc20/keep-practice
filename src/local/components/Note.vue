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
      <div class="button-wrapper">
        <transition>
          <icon-button
            v-show="shouldShowController"
            icon="label"
            v-bind="buttonStyles"
            @click="handleWannaSelectLabel"
          ></icon-button
        ></transition>
        <transition name="menu">
          <div class="label-menu" v-if="isLabelSelecting">
            <div class="control-mask" @click="handleFinishSelecting"></div>
            <div class="title">Label note</div>
            <div class="list">
              <div
                class="anchor"
                v-for="(label, idx) in labels"
                :key="idx"
                @click="handleSelectedLabel($event, label.name, label.selected)"
              >
                <span class="checkbox">
                  <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      v-if="label.selected"
                      d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    ></path>
                    <path
                      v-if="!label.selected"
                      d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                    ></path>
                  </svg>
                </span>
                <span class="text">{{ label.name }}</span>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="button-wrapper">
        <transition>
          <icon-button
            v-show="shouldShowController"
            icon="palette"
            v-bind="buttonStyles"
          ></icon-button
        ></transition>
      </div>
      <div class="button-wrapper">
        <transition>
          <icon-button
            v-show="shouldShowController"
            icon="bin"
            v-bind="buttonStyles"
            @click="handleDelete"
          ></icon-button
        ></transition>
      </div>
    </div>
  </section>
</template>
<script>
import IconButton from "../../components/Button/IconButton";
export default {
  name: "Note",
  props: {
    index: {
      //convenient for editing
      type: Number,
    },
    content: {
      type: String,
    },
    labels: {
      //{name:"easy",selected:false,}
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
      devHover: false, //for dev
      isHovering: false,
      isWorking: false, //true if any button is selecting
      isLabelSelecting: false, //true if label button is selecting
    };
  },
  computed: {
    parsedContent() {
      //todo maybe its redundant
      return this.content ? this.content.replace(/\n/gm, "<br/>") : "";
    },
    buttonStyles() {
      return {
        size: 34,
        iconSize: 17,
        hoverColor: "rgba(232,234,237,0.08)",
        iconColor: "#9aa0a6",
        iconHoverColor: "e8eaed",
        disrippled: true,
      };
    },
    shouldShowController() {
      return this.isWorking || this.isHovering || this.devHover;
    },
  },
  methods: {
    handleHoverEnter() {
      this.isHovering = true;
    },
    handleHoverLeave() {
      console.log("handleHoverLeave");
      this.isHovering = false;
    },
    handleDelete() {
      this.$emit("delete", this.index);
    },
    handleWannaSelectLabel() {
      //trick to leave hover
      this.isHovering = false;
      this.isWorking = true;
      this.isLabelSelecting = true;
    },
    handleSelectedLabel(e, name, selectedBefore) {
      console.log("handleSelectedLabel", this.index, name, selectedBefore);
      this.$emit("label", {
        index: this.index,
        name,
        selected: !selectedBefore,
      });
    },
    handleFinishSelecting() {
      this.isWorking = false;
      this.isLabelSelecting = false;
      console.log(
        "handleFinishSelecting",
        this.isWorking,
        this.isLabelSelecting
      );
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
    .button-wrapper {
      position: relative;
      .icon-button {
        margin: 0 3px;
      }

      .label-menu {
        position: absolute;
        left: 0;
        top: 100%;
        background: #2d2e30;
        border-radius: 2px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.6),
          0 2px 6px 2px rgba(0, 0, 0, 0.3);
        font-size: 13px;
        max-width: 225px;
        padding-top: 11px;
        width: 225px;
        z-index: 1000;
        .control-mask {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }
        .title {
          font-size: 14px;
          padding: 0 12px;
        }
        .list {
          display: flex;
          flex-direction: column;
          max-height: 250px;
          overflow-y: auto;
          padding: 6px 0;
          position: relative;
          width: 100%;
          .anchor {
            display: flex;
            cursor: pointer;
            padding: 5px 10px 3px;
            font-size: 13px;
            height: 21px;
            transition: background 200ms cubic-bezier(0.4, 0.2, 0, 1);
            user-select: none;
            &:hover {
              background: rgba(154, 160, 166, 0.039);
            }
            &.selected {
              background: rgba(154, 160, 166, 0.122);
            }
            &.selected:hover {
              background: rgba(154, 160, 166, 0.157);
            }
            .checkbox {
              width: 18px;
              height: 18px;
              svg {
                opacity: 0.54;
                fill: currentColor;
              }
            }
            .text {
              margin-left: 7px;
            }
          }
        }
      }
    }
  }
}
.menu-enter-active,
.menu-leave-active {
  transition: opacity 100ms cubic-bezier(0.4, 0.2, 0, 1);
}
.menu-enter,
.menu-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 500ms cubic-bezier(0.4, 0.2, 0, 1);
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
