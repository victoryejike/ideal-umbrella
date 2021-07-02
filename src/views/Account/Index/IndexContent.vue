<template>
  <BaseCard
    v-for="(item,index) in settingList"
    :key="index"
    :body="item.body"
    class="settings-card"
    :icon="item.icon"
    :notes="item.notes"
    :title="item.title"
  >
    <template #button>
      <BaseRoundButton
        class="btn-primary btn-md btn-bold"
        :text="item.btnText"
        :url="item.url"
      />
    </template>
  </BaseCard>
</template>

<script>

export default {
  name: 'Default',
  data() {
    return {
      settingList: [
        {
          title: this.$t('user_index_screen.settings.header.login_pwd'),
          body: null,
          notes: null,
          btnText: this.$t('user_index_screen.settings.button.change'),
          icon: 'lock',
          url: '/account/setting/reset-password',
        },
        {
          title: this.$t('user_index_screen.settings.header.email'),
          body: this.$t('user_index_screen.settings.body.for_security'),
          notes: 'f******n@gmail.com',
          btnText: this.$t('user_index_screen.settings.button.rebind'),
          icon: 'mail',
          url: '/account/setting/rebind-email',
        },
        {
          title: this.$t('user_index_screen.settings.header.phone'),
          body: this.$t('user_index_screen.settings.body.for_security'),
          notes: '****1234',
          btnText: this.$t('user_index_screen.settings.button.rebind'),
          icon: 'phone',
          url: '/account/setting/rebind-phone',
        },
        {
          title: this.$t('user_index_screen.settings.header.id_ver'),
          body: this.$t('user_index_screen.settings.body.id_ver'),
          notes: null,
          btnText: this.$t('user_index_screen.settings.button.verify'),
          icon: 'identity',
          url: '/account/setting/id-verification',
        },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  text-align: center;
}

.settings-card {
  margin-bottom: 1.25rem;
}
</style>
