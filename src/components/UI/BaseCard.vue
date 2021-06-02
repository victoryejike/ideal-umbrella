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
    body: { type: String, required: false, default: null },
    icon: { type: String, required: false, default: null },
    notes: { type: String, required: false, default: null },
    title: { type: String, required: false, default: null },
  },
};
</script>

<style scoped>
.card {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 1rem;
  width: 23.75rem;
}

.card-padding {
  display: flex;
  flex-direction: column;
  height: 8.75rem;
  overflow: hidden;
  padding: 1.25rem 1.75rem 1.25rem 2.5rem;
}

.card-header,
.card-footer {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.card-header-title {
  font-weight: bold;
  overflow: hidden;
  text-transform: uppercase;
  white-space: nowrap;
  width: 92%;
}

.card-footer {
  margin-top: 0.625rem;
}

.card-header-icon {
  height: 1rem;
  width: 1rem;
}

.card-body {
  color: #808080;
  flex-grow: 1;
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 0.625rem;
  overflow: hidden;
  width: 92%;
}

.card-footer-notes {
  color: #5e6ec2;
}

@media only screen and (max-width: 23em) {
  .card-footer-notes {
    font-size: 0.8rem;
  }

  .card-padding {
    padding: 1.25rem 0.975rem 1.25rem 0.975rem;
  }
}
</style>
