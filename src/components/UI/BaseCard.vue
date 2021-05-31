<template>
  <div class="card">
    <div class="card-padding">
      <div class="card-header">
        <span
          class="card-header-title"
        >
          {{ title }}
        </span>
        <img
          v-if="icon === 'lock'"
          src="@svg/password-lock-blue.svg"
          class="card-header-icon"
        >
        <img
          v-else-if="icon === 'identity'"
          src="@svg/identity.svg"
          class="card-header-icon"
        >
        <img
          v-else-if="icon === 'mail'"
          src="@svg/mail-blue.svg"
          class="card-header-icon"
        >
        <img
          v-else-if="icon === 'phone'"
          src="@svg/phone-blue.svg"
          class="card-header-icon"
        >
      </div>
      <div class="card-body">
        {{ body }}
      </div>
      <div class="card-footer">
        <span class="card-footer-notes">
          {{ notes }}
        </span>
        <slot name="button" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BaseCard',
  props: {
    title: { type: String, required: false, default: null },
    icon: { type: String, required: false, default: null },
    body: { type: String, required: false, default: null },
    notes: { type: String, required: false, default: null },
  },
};
</script>

<style scoped>
.card {
  backdrop-filter: blur(4px);
  background: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  height: 180px;
  overflow: hidden;
  width: 350px;
}

.card-padding {
  height: 100%;
  padding: 20px 30px 20px 40px;
}

.card-header {
  align-items: center;
  display: flex;
  height: 15%;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
}

.card-header-title {
  font-weight: bold;
  overflow: hidden;
  text-transform: uppercase;
  width: 72%;
}

.card-header-icon {
  height: 16px;
  width: 16px;
}

.card-body {
  color: #808080;
  font-size: 14px;
  font-weight: 600;
  height: 45%;
  margin-bottom: 10px;
  overflow: hidden;
  width: 92%;
}

.card-footer {
  align-items: center;
  align-self: flex-end;
  display: flex;
  justify-content: space-between;
}

.card-footer-notes {
  color: #3671e9;
}

button {
  font-size: 0.7rem;
}
</style>
