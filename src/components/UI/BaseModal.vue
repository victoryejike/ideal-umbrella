<template>
  <Transition name="modal-fade">
    <div
      class="modal-backdrop"
    >
      <img
        class="close-icon "
        height="20"
        src="@svg/close-icon.svg"
        width="20"
        @click="close"
      >

      <div class="modal">
        <header
          v-if="$slots.header"
          class="modal-header"
        >
          <slot name="header" />
        </header>

        <section class="modal-body">
          <slot name="body" />
        </section>

        <footer
          v-if="$slots.footer"
          class="modal-footer"
        >
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
  padding: 10px;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  width: 32.5rem;
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
  /* margin-bottom: 2.8125rem; */
  overflow-y: auto;
  padding: 1rem;
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

.close-icon {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.625rem;
  position: absolute;
  right: 0;
  top: 0;
}

@media screen and (max-width: 30em) {
  .modal {
    border-radius: 1rem;
    margin: auto;
    position: absolute;
    width: 90%;
  }
}

@media (max-width: 62em) {
  .modal {
    height: inherit ;
  }
}
</style>
