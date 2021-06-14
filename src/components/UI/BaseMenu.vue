<template>
  <div
    class="menu-root"
    :class="{active: isActive}"
  >
    <div
      ref="menu-container"
      class="menu-container"
      tabindex="0"
      @focusout="handleFocusout"
    >
      <div
        v-for="(item, index) in list"
        :key="index"
        class="menu-item"
        @click="routerPush(item.url)"
      >
        <span class="menu-item-text">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BaseMenu',
  props: {
    list: { type: Array, required: true },
  },
  data() {
    return {
      isActive: false,
      host: null,
    };
  },
  methods: {
    routerPush(url) {
      this.$router.push(url);
      this.isActive = false;
    },
    toogle(e) {
      this.isActive = !this.isActive;
      if (this.host === null) { this.host = e.target; }
      this.$refs['menu-container'].focus();
    },
    handleFocusout(e) {
      if (e.explicitOriginalTarget !== this.host) { this.isActive = false; }
    },
  },
};
</script>

<style scoped>
.menu-root {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.menu-container {
  background: #fff;
  border-radius: 0.625rem;
  margin-top: 2rem;
  min-width: 11.25rem;
  outline: none;
  position: absolute;
  transform: translateX(-100%);
  z-index: 1;
}

.menu-item {
  border-radius: 0.625rem;
  cursor: pointer;
  padding: 0.8rem 1rem;
  text-align: center;
  transition: background 0s;
}

.menu-item:hover {
  background: #5d6ec2;
  transition: background 0s;
}

.menu-item-text {
  font-size: 0.9rem;
  font-weight: bold;
}

.active {
  opacity: 100;
  pointer-events: all;
  transition: opacity 0.3s;
}
</style>
