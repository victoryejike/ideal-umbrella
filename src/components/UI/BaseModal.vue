<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header" />
      </header>

      <section class="modal-body">
        <slot name="body" />
      </section>

      <footer class="modal-footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BaseModal',

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
  overflow-x: auto;
  padding: 2.5rem;
}

.modal-header {
  font-size: 1.625rem;
  font-weight: bold;
  justify-content: space-between;
  line-height: 150%;
  margin-bottom: 1.875rem;
  position: relative;
}

.modal-footer {
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  margin-bottom: 2.8125rem;
  position: relative;
}

</style>
