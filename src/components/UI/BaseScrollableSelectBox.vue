<template>
  <div
    class="selector-group"
    :style="{width: css?.width}"
  >
    <span
      v-if="text"
      class="selector-group-text"
      :class="{'label-error-effect': isError}"
    >{{ text }}</span>
    <Field
      v-model="selectedValue"
      :name="name"
      :rules="rules"
      type="hidden"
    />
    <div
      ref="selector"
      class="selector-root"
      :class="id"
      :onClick="() => {toogleMenu()}"
      :style="customCSS"
      tabindex="0"
      @focusout="handleFocusout"
    >
      <img
        v-if="options[activeIndex]?.image"
        class="options-image"
        :src="require('@/assets/'+options[activeIndex].image+'')"
      >
      <span class="options-text">
        {{ options[activeIndex]?.[valueName] || $t('components.select_placeholder') }}
      </span>
      <i
        class="selector-arrow"
        :class="{'rotate': isPullDown}"
        :style="{'--arrow-color': arrowColor}"
      />
    </div>
    <div style="position: relative;">
      <div
        v-if="isPullDown"
        class="selector-menu"
        :class="dropClass"
        :style="{'--border-color': customCSS['--border-color']}"
      >
        <!-- <div class="selector-options">
          <input
            v-model="searchValue"
            class="search-bar"
            type="search"
          >
        </div> -->
        <div
          v-for="(item, index) in options"
          :key="index"
          class="selector-options"
          :class="{'active': index === activeIndex}"
          :onClick="() => {selectItem(index)}"
          :style="customCSS"
        >
          <img
            v-if="item?.image"
            class="options-image"
            :src="require(`@/assets/${item.image}`)"
          >
          <span class="options-text">
            {{ item[valueName] }}
          </span>
        </div>
      </div>
    </div>
    <div
      ref="error-msg"
      class="input-error-msg"
    >
      <ErrorMessage
        class="input-error-msg-effect"
        :name="name"
      />
    </div>
  </div>
</template>

<script>
import { Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'BaseScrollableSelectBox',
  components: { Field, ErrorMessage },
  props: {
    css: {
      type: Object,
      required: false,
      default: null,
      validator(value) {
        const whiteList = ['activeColor', 'arrowColor', 'bgColor', 'borderColor', 'hoverColor', 'width'];
        const keys = Object.keys(value);
        for (let i = 0; i < keys.length; i += 1) {
          if (!whiteList.includes(keys[i])) { return false; }
        }
        return true;
      },
    },
    options: { type: Array, required: true },
    keyName: { type: String, required: false, default: null },
    valueName: { type: String, required: false, default: 'name' },
    text: { type: String, required: false, default: null },
    value: { type: [String, Number], required: false, default: 0 },
    defaultSelected: { type: Boolean, required: false, default: true },
    name: { type: String, required: true },
    rules: { type: String, required: false, default: null },
    id: { type: String, required: false, default: null },
    dropClass: { type: String, required: false, default: null },
  },
  emits: ['selected'],
  data() {
    return {
      isPullDown: false,
      isError: false,
      activeIndex: null,
      selectedValue: null,
    };
  },
  computed: {
    customCSS() {
      return {
        '--active-color': this.css?.activeColor || '#dde1fb',
        '--bg-color': this.css?.bgColor || '#e5e5e5',
        '--border-color': this.css?.borderColor || 'none',
        '--hover-color': this.css?.hoverColor || '#dde1fb',
        '--width': `${(this.css?.width || 14) - 2.4}rem`,
      };
    },
    arrowColor() { return this.css?.arrowColor || '#9ba6d8'; },
  },
  mounted() {
    // TODO: Better Implementation
    this.observer = new MutationObserver(((mutations) => {
      this.isError = (mutations[1]?.addedNodes[0]?.className === 'input-error-msg-effect');
    }));
    this.observer.observe(this.$refs['error-msg'], { childList: true });
  },
  created() {
    if (this.defaultSelected) {
      this.activeIndex = typeof this.value === 'string'
        ? this.options.findIndex((item) => item.[this.keyName] === this.value)
        : this.value || 0;
    }
    this.selectedValue = this.options[this.activeIndex]?.[this.keyName] || this.activeIndex;
  },
  methods: {
    selectItem(index) {
      this.toogleMenu();
      if (index !== this.activeIndex) {
        this.selectedValue = this.options[index]?.[this.keyName] || index;
        this.$emit('selected', this.selectedValue);
        this.activeIndex = index;
      }
    },
    toogleMenu() {
      this.isPullDown = !this.isPullDown;
    },
    handleFocusout() {
      setTimeout(() => { this.isPullDown = false; }, 150);
    },
  },

};
</script>

<style scoped>
.selector-group {
  display: flex;
  flex-direction: column;
}

.coinList {
  width: 6rem !important;
}

.listWidth {
  width: 8.4rem;
}

.selector-root,
.selector-options {
  align-items: center;
  background: var(--bg-color);
  border: 0.1rem solid var(--border-color);
  cursor: pointer;
  display: flex;
  font-weight: bold;
  height: 2.5rem;
  padding: 0 1.2rem;
  transition: background 0.3s ease-in-out, width 0.5s;
  width: var(--width);
}

.selector-options:hover {
  background: var(--hover-color);
}

.selector-group-text {
  font-size: 0.9rem;
  margin-bottom: 1.3rem;
  transition: color 0s;
}

.selector-arrow {
  border-left: 0.4rem solid transparent;
  border-right: 0.4rem solid transparent;
  border-top: 0.4rem solid var(--arrow-color);
  margin-left: 0.4rem;
  transform: rotate(-360deg);
  transition: transform 150ms ease;
}

.selector-menu {
  border-bottom: 0.1rem solid var(--border-color);
  max-height: 10.6rem;
  overflow: hidden scroll;
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  position: absolute;
  scrollbar-width: none;  /* Firefox */
  z-index: 1;
}

.selector-menu::-webkit-scrollbar {
  display: none;  /* Safari and Chrome */
}

.options-image {
  margin-right: 0.8rem;
  max-width: 1rem;
}

.options-text {
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
}

.active {
  background: var(--active-color);
}

.rotate {
  transform: rotate(-180deg);
  transition: transform 150ms ease;
}

/* .search-bar {
  background-color: transparent;
  border: 0;
  border-bottom: 0.1rem #fff solid;
  color: #fff;
  outline: 0;
  padding: 0 0  0;
} */
</style>
