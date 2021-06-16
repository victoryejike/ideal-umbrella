<template>
  <Transition name="modal-fade">
    <div
      class="modal-backdrop"
      @click="close"
    >
      <div class="modal">
        <header class="modal-header">
          <slot name="header" />
          <button
            class="btn-close"
            type="button"
            @click="close"
          >
            x
          </button>
        </header>

        <section class="modal-body">
          <slot name="body" />
        </section>

        <footer class="modal-footer">
          <div>
            <slot name="footer" />
          </div>
        </footer>
      </div>
    </div>
  </Transition>
</template>
<script>
export default {
  name: 'BaseModal',
  emits: ['close'],
  methods: {
    close() {
      this.$emit('close');
    },
  },

};
</script>
<style>
.modal-backdrop {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
}

.modal {
  background: #fff;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
}

.modal-header {
  font-size: 1.625rem;
  font-weight: bold;
  justify-content: space-between;
  line-height: 150%;
  margin-bottom: 1.8rem;
  margin-top: 1.8rem;
  position: relative;
}

.modal-footer {
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 2.5rem;
}

.modal-body {
  margin-bottom: 2.8125rem;
  position: relative;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.btn-close {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  position: absolute;
  right: 0;
  top: 0;
}

</style>
