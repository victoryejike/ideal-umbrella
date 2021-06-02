<template>
  <div
    class="selector-group"
    :style="{width:(width + 4) + 'rem'}"
  >
    <span
      v-if="text"
      class="selector-group-text"
    >{{ text }}</span>
    <div
      ref="selector"
      class="selector-root"
      :style="customCSS"
      :onClick="() => {toogleMenu()}"
    >
      <img
        v-if="selectedItem.image"
        class="options-image"
        :src="selectedItem.image"
      >
      <span class="options-text">{{ selectedItem.name || selectedItem }}</span>
      <i
        :style="customCSS"
        class="selector-arrow"
        :class="{'rotate':isPullDown}"
      />
    </div>
    <div style="position: relative;">
      <div
        v-if="isPullDown"
        class="selector-menu"
        :style="[customCSS]"
      >
        <div
          v-for="(item, index) in options"
          :key="index"
          class="selector-options"
          :class="{'active': optionStatus[index]}"
          :style="customCSS"
          :onClick="() => {selectItem(item, index)}"
        >
          <img
            v-if="item.image"
            class="options-image"
            :src="item.image"
          >
          <span
            class="options-text"
          >{{ item.name || item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseScrollingSlectBox',
  props: {
    text: { type: String, required: false, default: null },
    options: { type: [Array, Object], required: true },
    width: { type: Number, required: false, default: 10 },
    bgColor: { type: String, required: false, default: '#374db1' },
    borderColor: { type: String, required: false, default: '#697ac5' },
    hoverColor: { type: String, required: false, default: '#31459f' },
    activeColor: { type: String, required: false, default: '#31459f' },
    arrowColor: { type: String, required: false, default: '#9ba6d8' },
    value: { type: Number, required: false, default: 0 },
  },
  emits: ['selected'],
  data() {
    return {
      isPullDown: false,
      optionStatus: [],
      selectedItem: '',
    };
  },
  computed: {
    customCSS() {
      return {
        '--width': `${this.width}rem`,
        '--bg-color': this.bgColor,
        '--border-color': this.borderColor,
        '--active-color': this.activeColor,
        '--hover-color': this.hoverColor,
        '--arrow-color': this.arrowColor,
      };
    },
  },
  created() {
    this.activeIndex = this.value;
    if (this.options.length > this.value) {
      this.selectedItem = this.options[this.value];
    }

    for (let i = 0; i < this.options.length; i += 1) {
      this.optionStatus.push(i === this.value);
    }
  },
  methods: {
    toogleMenu() {
      this.isPullDown = !this.isPullDown;
    },
    selectItem(item, index) {
      this.isPullDown = !this.isPullDown;
      if (index !== this.activeIndex) {
        this.$emit('selected', index);
        this.selectedItem = item;
        this.optionStatus[this.activeIndex] = false;
        this.optionStatus[index] = true;
        this.activeIndex = index;
      }
    },
  },

};
</script>

<style scoped>
.selector-group {
  display: flex;
  flex-direction: column;
  width: var(--width);
}

.selector-root,
.selector-options {
  align-items: center;
  background: var(--bg-color);
  border: 0.1rem solid var(--border-color);
  cursor: pointer;
  display: flex;
  height: 2.5rem;
  padding: 0 1.2rem;
  transition: background 0.3s ease-in-out;
  width: var(--width);
}

.selector-options:hover {
  background: var(--hover-color);
}

.selector-group-text {
  font-size: 0.9rem;
  margin-bottom: 1.3rem;
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
  max-height: 10.4rem;
  overflow-y: scroll;
  position: absolute;
  scrollbar-width: none;
  z-index: 1000;
}

.selector-menu::-webkit-scrollbar {
  width: 0;
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

</style>
