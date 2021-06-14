<template>
  <div id="app">
    <section class="header">
      <app-bar>
        <div class="col col1">
          <div class="navigation-menu">
            <icon-button
              color="plain"
              icon="menu"
              :iconSize="24"
              iconColor="#e8eaed"
              @click="handleOpenMenu"
            ></icon-button>
          </div>
          <div class="logo"></div>
        </div>
      </app-bar>
    </section>
    <section class="left-container" :style="leftContainerWidth">
      <ul class="navigation">
        <li
          class="navigation-anchor"
          v-for="(item, idx) in navigationAnchors"
          :key="idx"
          :class="selectedAnchor === item.name ? 'selected' : ''"
          :style="styleNavigationAnchor"
          @click="handleSelectAnchor($event, item.name)"
        >
          <icon :name="item.icon"></icon>
          <transition>
            <span class="text" v-if="!isNavigationCollapsed">{{
              item.name
            }}</span></transition
          >
        </li>
      </ul>
    </section>
    <section class="main-container">
      <section class="input-component">
        <div class="text-field" :class="isInputFocused ? 'focused' : ''">
          <!-- <section class="title-space"  v-if="isInputFocused"></section> -->
          <input
            ref="input"
            type="text"
            class="input-context"
            placeholder="Write a note..."
            v-model.trim="currentInputContent"
            @keyup.enter="handleInputDone"
            @focus="handleInputFocus"
            @blur="handleInputBlur"
          />
          <section class="control-context" v-if="isInputFocused">
            <section class="tool-context">
              <icon-button
                icon="label"
                :size="34"
                :iconSize="17"
                hoverColor="rgba(232,234,237,0.08)"
                iconColor="#9aa0a6"
                iconHoverColor="#e8eaed"
                disrippled
              ></icon-button>
              <icon-button
                icon="palette"
                :size="34"
                :iconSize="17"
                hoverColor="rgba(232,234,237,0.08)"
                iconColor="#9aa0a6"
                iconHoverColor="#e8eaed"
                disrippled
              ></icon-button>
            </section>
            <section class="action-context">
              <div class="btn" @click="handleInputDone">Done</div>
            </section>
          </section>
        </div>
      </section>
      <section class="note-group-component">
        <vnote
          :content="note.content"
          :labels="genLabelStatus(note.labels)"
          :color="note.color"
          :index="idx"
          :id="note.id"
          @delete="handleDeleteNote"
          @label="handleUpdateNoteLabels"
          v-for="(note, idx) in filteredNotes"
          :key="note.id"
        ></vnote>
      </section>
      <section class="dev-monitor" v-if="true">
        <div>[selectedAnchor]: {{ selectedAnchor }}</div>
        <div>[selectedLabel]: {{ selectedLabel }}</div>
      </section>
    </section>
  </div>
</template>

<script>
import AppBar from "./local/components/AppBar";
import Vnote from "./local/components/Note";
import IconButton from "./components/Button/IconButton";
import Icon from "./components/Icon/Icon";
import { NoteManager, Note } from "./local/controller/note";
export default {
  name: "App",
  components: { AppBar, Vnote, IconButton, Icon },
  data() {
    return {
      isNavigationCollapsed: true,
      isInputFocused: false,
      basicNavigationItems: [
        { name: "Notes", icon: "insight" },
        { name: "Reminders", icon: "bell" },
        { name: "Edit labels", icon: "pen" },
        { name: "Archive", icon: "archive" },
        { name: "Bin", icon: "bin" },
      ],
      labels: [{ name: "sweet" }, { name: "high" }, { name: "pro" }],
      selectedAnchor: "Notes",
      managerNote: null,
      currentInputContent: null,
      testStr: "1\n2",
    };
  },
  computed: {
    selectedLabel() {
      if (this.labels.map((v) => v.name).indexOf(this.selectedAnchor) > -1)
        return this.selectedAnchor;
      else return null;
    },
    filteredNotes() {
      if (!this.managerNote) return [];
      if (this.selectedLabel) {
        //filtered by label
        console.log(
          "filteredNotes",
          this.managerNote.collection.filter(
            (note) => note.labels.indexOf(this.selectedLabel) > -1
          )
        );
        return this.managerNote.collection.filter(
          (note) => note.labels.indexOf(this.selectedLabel) > -1
        );
      } else return this.managerNote.collection;
    },
    leftContainerWidth() {
      if (this.isNavigationCollapsed) return { width: "80px" };
      else return { width: "280px" };
    },
    navigationAnchors() {
      let items = [this.basicNavigationItems[0], this.basicNavigationItems[1]];
      for (let label of this.labels) {
        items.push({ name: label.name, icon: "label" });
      }
      items.push(this.basicNavigationItems[2]);
      items.push(this.basicNavigationItems[3]);
      items.push(this.basicNavigationItems[4]);
      return items;
    },
    styleNavigationAnchor() {
      if (this.isNavigationCollapsed) {
        return {
          width: "48px",
          marginLeft: "12px",
          paddingLeft: 0,
          borderTopLeftRadius: "24px",
          borderBottomLeftRadius: "24px",
        };
      } else return {};
    },
  },
  methods: {
    initNoteManager() {
      let note = new Note("123", "red", [1, 2, 3]);
      console.log("initNoteManager", note.obj);
      this.managerNote = NoteManager.getInstance();
    },
    genLabelStatus(selectedLabels) {
      //according to given selected labels of a note, generate its labels prop
      let propLabels = [];
      for (let availableLabel of this.labels) {
        propLabels.push({
          name: availableLabel.name,
          selected:
            selectedLabels.indexOf(availableLabel.name) > -1 ? true : false,
        });
      }
      // console.log('genLabelStatus',selectedLabels,propLabels)
      return propLabels;
    },
    handleSelectAnchor(e, label) {
      console.log("handleSelectAnchor", e, label);
      this.selectedAnchor = label;
      this.$emit("select", { anchor: label });
    },
    handleOpenMenu() {
      this.isNavigationCollapsed = !this.isNavigationCollapsed;
    },
    handleSubmit(submitContent) {
      console.log("handleSubmit from TextField: ", submitContent);
      //todo checker
      if (submitContent) this.currentInputContent = submitContent;
    },
    handleInputFocus() {
      console.log("handleInputFocus", this.$refs.input);
      this.isInputFocused = true;
      //todo when other el displays at the position of input el, the input will blur
    },
    handleInputBlur(e) {
      console.log("handleInputBlur", e);
    },
    resetInputContent() {
      this.currentInputContent = "";
    },
    handleInputDone() {
      console.log("handleInputDone", this.currentInputContent);
      //console.log(this.managerNote.renderNotesToArray())
      this.$emit("submit", this.currentInputContent);
      //add note
      this.managerNote.add(this.currentInputContent);
      //clean
      this.resetInputContent();
      this.isInputFocused = false;
    },
    handleDeleteNote(e) {
      console.log("handleDeleteNote", e);
      this.managerNote.delete(e.id);
    },
    handleUpdateNoteLabels(e) {
      console.log("handleUpdateNoteLabels", e);
      this.managerNote.updateLabels(e.id, e.name, e.selected);
    },
  },
  mounted() {
    this.initNoteManager();
  },
};
</script>
<style scoped lang="less">
.col {
  display: flex;
}
#app {
  display: flex;
  position: relative;

  font-family: "Roboto", Helvetica, Arial, sans-serif;
  background-color: #202124; //#5f6368 light theme
  min-height: 100vh;
  .header {
    .col1 {
      min-width: 232px;
      padding-right: 30px;
    }
    .navigation-menu {
      margin: 0 4px;
      .icon-button {
        width: 48px;
        height: 48px;
      }
    }
    .logo {
      width: 60px;
      height: 48px;
      background-image: url(/logo/logo_dark.png);
      background-size: 100% auto;
      background-position: center 30%;
    }
  }
  .left-container {
    position: relative;
    //todo its width should be decided by inner el
    margin-top: 64px; //for header
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 100ms;
    flex-shrink: 0;
    ul {
      padding: 0;
      list-style: none;
    }
    .navigation {
      position: fixed;
      top: 64px; //for headerF
      left: 0;
      padding-top: 8px;
      // width: 280px;
      // min-height: calc(100% - 64px);
      box-sizing: border-box;
      .navigation-anchor {
        display: flex;
        align-items: center;
        width: 280px;
        height: 48px;
        padding-left: 12px;
        border-top-right-radius: 24px;
        border-bottom-right-radius: 24px;
        box-sizing: border-box;
        cursor: pointer;
        transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 100ms;
        &:hover {
          background-color: #28292c;
        }
        .icon {
          padding: 0 12px;
          color: #9aa0a6;
        }

        .text {
          min-width: 200px;
          margin-left: 20px;
          font-size: 14px;
          color: #e8eaed;
          letter-spacing: 0.025em;
          font-weight: 600;
          line-height: 1.25rem;
        }
        &.selected {
          background-color: #41331c;
          .icon {
            color: #e8eaed;
          }
        }
      }
    }
  }
  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 64px; //for header
    box-sizing: border-box;
    background-color: #202124;
    color: #e8eaed;
    .input-component {
      margin: 32px 0 16px;
      display: flex;
      justify-content: center;
      .text-field {
        //component
        width: 600px;
        box-sizing: border-box;
        border: 1px solid transparent;
        background-color: #202124;
        border-color: #5f6368;
        border-radius: 8px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.6),
          0 2px 6px 2px rgba(0, 0, 0, 0.3);

        input.input-context {
          border: none;
          box-sizing: border-box;
          width: 100%;
          height: 46px;
          padding: 12px 16px;
          background: transparent;
          color: #e8eaed;
          caret-color: rgba(255, 255, 255, 0.87);
          font-size: 14px;
          letter-spacing: 0.01428571em;
          font-weight: 600;
        }
        input:focus {
          outline: none;
        }
        .title-space {
          width: 100%;
          height: 44px;
        }
        .control-context {
          width: 100%;
          height: 36px;
          margin: 4px 0;
          display: flex;
          justify-content: space-between;
          .tool-context {
            flex: 1;
            display: flex;
            align-items: center;
            .icon-button {
              margin: 0 8px;
            }
          }
          .action-context {
            .btn {
              margin-right: 15px;
              padding: 8px 24px;
              width: 86px;
              height: 36px;
              box-sizing: border-box;
              color: #dadce0;
              overflow: hidden;
              white-space: nowrap;
              letter-spacing: 0.01785714em;
              font-size: 0.875rem;
              font-weight: 600;
              border-radius: 4px;
              cursor: pointer;
              transition: background 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
              &:hover {
                background: rgba(154, 160, 166, 0.039);
              }
            }
          }
        }
      }
    }
    .note-group-component {
      display: flex;
      width: 100%;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      padding: 0 38px;
      box-sizing: border-box;
    }
  }
  .dev-monitor {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px;
  }
}
.v-enter-active {
  transition: opacity 0ms cubic-bezier(0.4, 0, 0.2, 1) 150ms;
}
.v-leave-active {
  transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
