<template>
  <div class="account-setting-container">
    <div class="account-setting-header">
      <router-view name="header" />
      <BaseNavigationTab
        ref="tab"
        :active-index="$route.path === '/account/setting' ? 0 : 1"
        class="account-setting-tab"
        :list="tabList"
        :width="10"
      />
    </div>
    <div class="account-setting-content">
      <router-view name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountTabFrame',
  data() {
    return {
      tabList: [
        {
          name: this.$t('user_index_screen.account'),
          handler: () => { this.$router.push('/account/setting'); },
        },
        {
          name: this.$t('user_index_screen.edit_profile'),
          handler: () => { this.$router.push('/account/profile/edit'); },
        },
      ],
    };
  },
};
</script>

<style scoped>
.account-setting-container {
  display: flex;
  flex-direction: column;
}

.account-setting-header {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
}

.account-setting-tab {
  margin-left: auto;
}

.account-setting-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 3rem;
}

@media (max-width: 60em) {
  .account-setting-header {
    display: block;
  }

  .account-setting-tab {
    margin-top: 1.25rem;
  }
}

@media (max-width: 30em) {
  .account-setting-content button {
    font-size: 0.75rem;
    padding: 0.35rem 1rem;
  }

  .account-setting-content {
    justify-content: center;
  }
}
</style>
