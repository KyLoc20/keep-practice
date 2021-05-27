<template>
  <section class="stepper">
    <div class="step" v-for="(item, idx) in steps" :key="idx">
      <div class="wrapper" :class="classStatus(idx)">
        <span
          class="connector"
          :class="classConnector + ' ' + classStatus(idx)"
          :style="connectorPos"
          v-if="idx !== 0"
        ></span>
        <span class="index" :class="classIndex + ' ' + classStatus(idx)">
          <span v-if="iconable" class="iconable"
            ><Icon :name="item.icon" size="sm"></Icon
          ></span>
          <span v-else-if="simple" class="simple">
            <span v-if="isDone(idx)"><Icon name="check" size="sm"></Icon></span>
            <span v-else></span>
          </span>
          <span v-else class="default">
            <span v-if="isDone(idx)"><Icon name="check" size="sm"></Icon></span>
            <span v-else>{{ idx + 1 }}</span>
          </span>
        </span>
        <span class="label" :class="classStatus(idx)">{{ item.label }}</span>
      </div>
    </div>
  </section>
</template>
<script>
import Icon from "../Icon/Icon";
export default {
  name: "Stepper",
  components: { Icon },
  props: {
    //finishedCount
    progress: {
      type: Number,
      default: 0,
    },
    steps: {
      type: Array,
    },
    color: {
      default: "primary",
      validator: (v) => {
        return ["primary", "secondary", "purple", "gradient"].indexOf(v) !== -1;
      },
    },
    //only a spot without index
    simple: {
      type: Boolean,
      default: false,
    },
    iconable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      connectorTop: 12,
    };
  },
  mounted() {
    this.updateConnectorPosition();
  },
  updated() {
    this.updateConnectorPosition();
  },
  computed: {
    classIndex() {
      let isSimple = this.simple,
        isIconable = this.iconable;
      let clazz = this.color + "-stepper";
      if (isSimple) {
        clazz += " simple";
      } else if (isIconable) {
        clazz += " iconable";
      } else {
        clazz += " default";
      }
      return clazz;
    },
    classConnector() {
      let isSimple = this.simple,
        isIconable = this.iconable;
      let clazz = "";
      if (isSimple) {
        clazz += this.color + "-stepper" + " thick simple";
      } else if (isIconable) {
        clazz += this.color + "-stepper" + " thick iconable";
      } else {
        clazz += "default-stepper default";
      }
      return clazz;
    },
    isDone() {
      return function (idx) {
        return idx < this.progress;
      };
    },
    classStatus() {
      return function (idx) {
        if (idx < this.progress) {
          return "done";
        } else if (idx === this.progress) {
          return "doing";
        } else {
          return "todo";
        }
      };
    },
    connectorPos() {
      return { top: this.connectorTop + "px" };
    },
  },
  methods: {
    updateConnectorPosition() {
      let oIndex = this.$el.getElementsByClassName("index")[0];
      if (!oIndex) return;
      this.connectorTop = oIndex.getBoundingClientRect().height / 2;
    },
  },
};
</script>
<style lang="less" scoped>
@primary-color: #1976d2;
@secondary-color: #dc004e;
@purple-color: #784af4;
.primary-stepper {
  background: @primary-color;
  color: @primary-color;
}
.secondary-stepper {
  background: @secondary-color;
  color: @secondary-color;
}
.purple-stepper {
  background: @purple-color;
  color: @purple-color;
}
.default-stepper {
  background: #bdbdbd;
}
.gradient-stepper {
  background: linear-gradient(
    136deg,
    rgb(242, 113, 33) 0%,
    rgb(233, 64, 87) 50%,
    rgb(138, 35, 135) 100%
  );
}
.stepper {
  display: flex;
  padding: 24px;
  min-width: 727px;
  font-family: "Roboto", "Helvetica";
  .step {
    display: flex;
    flex: 1;
    padding: 0 8px;
    align-items: center;
    justify-content: center;
    .wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      .connector {
        height: 1px;
        width: calc(100% - 24px);
        position: absolute;
        right: calc(50% + 20px);
        &.thick {
          height: 3px;
        }
        &.defaulat {
          background: #bdbdbd;
        }
        &.simple,
        &.iconable {
          &::before {
            position: absolute;
            content: "";
            width: 100%;
            height: 100%;
            background: #eaeaf0;
            transform-origin: 100% 50%;
            transition: transform 300ms cubic-bezier(0.4, 0.2, 0, 1);
          }
          &.doing::before {
            transform: scaleX(0);
          }
          &.done::before {
            transform: scaleX(0);
          }
        }
      }
      .index {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        font-size: 12px;
        z-index: 10;
        transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1);
        .icon {
          color: currentColor;
        }
        user-select: none;
        &.default {
          height: 24px;
          width: 24px;
          color: #fff;
          &.todo {
            background: rgba(0, 0, 0, 0.38);
          }
        }
        &.simple {
          height: 8px;
          width: 8px;
          transition: none;
          &.done {
            background: transparent;
          }
          &.todo {
            background: #eaeaf0;
          }
        }
        &.iconable {
          height: 50px;
          width: 50px;
          color: #fff;
          transition: none;
          &.todo {
            background: #ccc;
          }
        }
      }
      .label {
        margin-top: 16px;
        letter-spacing: 0.01em;
        font-size: 14px;
        line-height: 20px;
        &.todo {
          color: rgba(0, 0, 0, 0.54);
          font-weight: 400;
        }
        &.doing,
        &.done {
          color: rgba(0, 0, 0, 0.87);
          font-weight: 600;
        }
      }
    }
  }
}
</style>
