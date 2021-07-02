<template>
  <div class="telephone">
    <img
      class="phone"
      src="@svg/phone.svg"
      style="filter: saturate(100%) brightness(0);"
      width="15"
    >
    <span>{{ phone }}</span>
  </div>
  <div class="flex">
    <BaseRoundButton
      class="ver-btn btn-outline-danger btn-unclickable btn-sm"
      text="No ID Verification"
    />
    <BaseRoundButton
      class="logout-btn btn-outline-primary"
      text="Logout"
      @click="$store.dispatch('auth/logout')"
    />
  </div>
</template>

<script>

export default {
  name: 'IndexHeader',
  data() {
    return {
      phone: '****1234',
      uid: '884850286305316608',
    };
  },
};
</script>

<style scoped>
.phone {
  margin-right: 0.9375rem;
}

.telephone {
  font-size: 2rem;
  font-weight: bold;
  line-height: 150%;
  white-space: nowrap;
}

.ver-btn {
  margin-left: 3.125rem;
}

.logout-btn {
  margin-left: 3rem;
  padding: 0.45rem 2.1rem;
}

.uid {
  color: #808080;
  margin-top: 0.625rem;
}

.flex {
  align-items: center;
  display: flex;
}

@media (max-width: 60em) {
  .flex {
    padding-top: 1.25rem;
  }

  .ver-btn {
    margin-left: 0;
  }

  .logout-btn {
    margin-left: 1.25rem;
  }

  .uid {
    margin-top: 1.25rem;
  }
}
</style>
