<template>
  <div
    class="menu-3line-btn"
    :class="{ 'active' : active }"
    @click="$store.commit('toggleMenu')"
  >
    <div
      class="btn-root"
    >
      <span class="btn-line btn-line-1" />
      <span class="btn-line btn-line-2" />
      <span class="btn-line btn-line-3" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'MobileMenuButton',
  props: {
    active: { type: Boolean, required: false, default: false },
  },
};
</script>
<style scoped>
.btn-root {
  background-color: transparent;
  cursor: pointer;
  display: fixed;
  height: 2rem;
  position: relative;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  width: 2rem;
}

.btn-line {
  background-color: #130f40;
  border-radius: 1.4rem;
  height: 0.1875rem;
  left: 0.375rem;
  position: absolute;
  top: 0.9rem;
  transition:
    transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1),
    opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    background-color 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  width: 1rem;
}

.btn-line-1 {
  transform: translateY(-0.43rem);
}

.btn-line-2 {
  width: 1.25rem;
}

.btn-line-3 {
  transform: translateY(0.43rem);
}

.menu-3line-btn.active .btn-root {
  transform: rotate(-180deg);
}

.menu-3line-btn.active .btn-line {
  background-color: #fff;
}

.menu-3line-btn.active .btn-line-1 {
  transform: rotate(45deg);
  width: 1.25rem;
}

.menu-3line-btn.active .btn-line-2 {
  opacity: 0;
}

.menu-3line-btn.active .btn-line-3 {
  transform: rotate(-45deg);
  width: 1.25rem;
}
</style>
