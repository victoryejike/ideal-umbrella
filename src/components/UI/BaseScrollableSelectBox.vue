<template>
  <div
    class="selector-group"
    :style="{width: width + 'rem'}"
  >
    <span
      v-if="text"
      class="selector-group-text"
    >{{ text }}</span>
    <div
      ref="selector"
      class="selector-root"
      :onClick="() => {toogleMenu()}"
      :style="customCSS"
    >
      <img
        v-if="selectedItem.image"
        class="options-image"
        :src="selectedItem.image"
      >
      <span class="options-text">{{ selectedItem.name || selectedItem }}</span>
      <i
        class="selector-arrow"
        :class="{'rotate':isPullDown}"
        :style="customCSS"
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
          :onClick="() => {selectItem(item, index)}"
          :style="customCSS"
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
    activeColor: { type: String, required: false, default: '#31459f' },
    arrowColor: { type: String, required: false, default: '#9ba6d8' },
    bgColor: { type: String, required: false, default: '#374db1' },
    borderColor: { type: String, required: false, default: '#697ac5' },
    hoverColor: { type: String, required: false, default: '#31459f' },
    options: { type: [Array, Object], required: true },
    text: { type: String, required: false, default: null },
    value: { type: Number, required: false, default: 0 },
    width: { type: Number, required: false, default: 14 },
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
        '--active-color': this.activeColor,
        '--arrow-color': this.arrowColor,
        '--bg-color': this.bgColor,
        '--border-color': this.borderColor,
        '--hover-color': this.hoverColor,
        '--width': `${this.width - 2.4}rem`,
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
    toogleMenu() {
      this.isPullDown = !this.isPullDown;
    },
  },

};
</script>

<style scoped>
.selector-group {
  display: flex;
  flex-direction: column;
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
  text-overflow: ellipsis;
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
