<template>
  <section class="text-field" :class="classTextField">
    <input
      type="text"
      :id="id"
      placeholder=" "
      v-model.trim="content"
      @keyup.enter="handleInput"
      ref="input"
    />

    <label :for="id" class="placeholder">{{ this.placeholder }}</label>
    <div class="line-bottom" v-if="variant !== 'outlined'"></div>
    <div class="line-focus" v-if="variant !== 'outlined'"></div>
    <span class="synchronizing-trick-focused" v-show="false">{{
      statusFocus
    }}</span>
  </section>
</template>
<script>
export default {
  name: "TextField",
  components: {},
  props: {
    variant: {
      default: "default",
      validator: (v) => {
        return ["default", "filled", "outlined"].indexOf(v) !== -1;
      },
    },
    placeholder: {
      default: "",
      type: String,
    },
    quickfocus: {
      type: Boolean,
      default: false,
    },
    //api for parent cpt controling its focus
    statusFocus: {
         validator: (v) => {
        return ["focus", "blur","none"].indexOf(v) !== -1;
      },
      required:false,
    },
  },
  data() {
    return {
      id: null,
      apiWhenUpdate: "change", //change should be implemented in its father
      content: "",
      isFocused: false,
    };
  },
  computed: {
    classTextField() {
      return this.variant;
    },
  },
  mounted() {
    this.id = this._uid;
    if (this.quickfocus) this.setKeyEvent();
    if (this.focused) this.$refs.input.focus();
  },
  updated() {
    console.log("--------updated", this.statusFocus);
    if (this.statusFocus==="focus") this.$refs.input.focus();
    else if(this.statusFocus==="blur") this.$refs.input.blur();
    else ;
  },
  methods: {
    resetContent() {
      this.content = "";
    },
    handleInput() {
      console.log("handleInput", this.content);
      this.$emit("submit", this.content);
      this.resetContent();
    },
    setKeyEvent() {
      //prevent default actions of given keydown events
      window.addEventListener("keydown", this.preventKeyEvents, false);
    },
    preventKeyEvents(e) {
      //prevent but continue to propagate
      //NOT ALLOWED TO PREVENT: ctrl + s(save),ctrl + w(close current tab),ctrl + n(new window),ctrl + t(new tab)
      if (e.key === "r" && e.ctrlKey) {
        //shortcuts Ctrl+R
        console.log("KeyEvent", e.key, " AUTOFOCUS");
        e.preventDefault();
        let oInput = this.$refs.input;
        if (oInput) {
          //todo this is the way to check if the element has focus
          if (oInput === document.activeElement) {
            oInput.blur();
          } else {
            oInput.focus();
          }
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.text-field {
  margin-top: 16px;
  letter-spacing: 1px;
  position: relative;

  input {
    color: rgba(0, 0, 0, 0.87);
    font-weight: 400;
    font-size: 1rem;
    padding: 6px 0;
    border: none;
    box-sizing: border-box;
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  input:focus {
    outline: none;
  }
  input:focus + label {
    color: #1976d2;
    transform: translateY(-100%) translateX(-10%) scale(0.8);
  }
  input:not(:placeholder-shown) + label {
    transform: translateY(-100%) translateX(-10%) scale(0.8);
  }
  input:hover ~ .line-bottom {
    border-bottom: 2px solid;
    opacity: 0.87;
  }
  input:focus ~ .line-focus {
    width: 100%;
  }
  input:not(:focus) ~ .line-focus {
    transform: scaleX(0);
  }
  .placeholder {
    position: absolute;
    bottom: 7px;
    left: 0;
    cursor: text;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.42);
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
    user-select: none;
  }

  .line-bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-bottom: 1px solid;
    opacity: 0.42;
    transition: opacity 400ms ease-in-out;
  }
  .line-focus {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 100ms;
    border-bottom: 2px solid #1976d2;
  }
}
.text-field.filled {
  margin: 0;
  input {
    background-color: rgba(0, 0, 0, 0.09);
    padding: 27px 12px 10px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  input:hover {
    background-color: rgba(0, 0, 0, 0.13);
  }
  input:hover ~ .line-bottom {
    border-bottom: 1px solid;
  }
  .placeholder {
    left: 12px;
    bottom: 15px;
  }
  input:focus + label {
    color: #1976d2;
    transform: translateY(-80%) translateX(-10%) scale(0.8);
  }
  input:not(:placeholder-shown) + label {
    transform: translateY(-80%) translateX(-10%) scale(0.8);
  }
}
//todo translate will cause a shake of below el
.text-field.outlined {
  margin: 0;
  input {
    padding: 18px 14px;
    border: 1px solid rgba(0, 0, 0, 0.23);
    border-radius: 4px;
  }
  .placeholder {
    left: 14px;
    bottom: 18px;
    padding: 0 2px;
    background-color: white;
  }
  input:focus {
    padding: 17px 13px;
    border: 2px solid #1976d2;
  }
  input:focus + label {
    color: #1976d2;
    transform: translateY(-150%) translateX(-10%) scale(0.8);
  }
  input:not(:placeholder-shown) + label {
    transform: translateY(-150%) translateX(-10%) scale(0.8);
  }
  input:hover:not(:focus) {
    border: 1px solid rgba(0, 0, 0, 1);
  }
}
</style>