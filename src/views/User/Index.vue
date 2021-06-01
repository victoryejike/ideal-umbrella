<template>
  <div class="container">
    <div class="header">
      <div class="telephone">
        <img
          class="phone"
          width="15"
          src="@svg/phone.svg"
        >
        <span>{{ phone }}</span>
      </div>
      <BaseRoundButton
        class="ver-btn"
        text="No ID Verification"
        type="outline-danger"
        size="s"
      />
      <BaseRoundButton
        class="logout-btn"
        text="Logout"
        type="outline"
        size="m"
      />
      <BaseNavigationTab
        class="settings-tab"
        :list="tabTitle"
        :width="10"
      />
    </div>
    <span class="uid">{{ $t('user_index_screen.uid') + ' ' + uid }}</span>
    <div class="main-settings">
      <BaseCard
        v-for="(item,index) in settingList"
        :key="index"
        class="settings-card"
        :title="item.title"
        :body="item.body"
        :notes="item.notes"
        :icon="item.icon"
      >
        <template #button>
          <BaseRoundButton
            :text="item.btnText"
            size="m"
            :bold="true"
            :url="item.url"
          />
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UserIndex',
  data() {
    return {
      phone: '****1234',
      uid: '884850286305316608',
      tabTitle: [
        this.$t('user_index_screen.edit_profile'), this.$t('user_index_screen.account'),
      ],
      settingList: [
        {
          title: this.$t('user_index_screen.settings.header.login_pwd'),
          body: null,
          notes: null,
          btnText: this.$t('user_index_screen.settings.button.change'),
          icon: 'lock',
          url: '/account-setting/reset-password',
        },
        {
          title: this.$t('user_index_screen.settings.header.email'),
          body: this.$t('user_index_screen.settings.body.for_security'),
          notes: 'f******n@gmail.com',
          btnText: this.$t('user_index_screen.settings.button.rebind'),
          icon: 'mail',
          url: '',
        },
        {
          title: this.$t('user_index_screen.settings.header.phone'),
          body: this.$t('user_index_screen.settings.body.for_security'),
          notes: '****1234',
          btnText: this.$t('user_index_screen.settings.button.rebind'),
          icon: 'phone',
          url: '',
        },
        {
          title: this.$t('user_index_screen.settings.header.id_ver'),
          body: this.$t('user_index_screen.settings.body.id_ver'),
          notes: null,
          btnText: this.$t('user_index_screen.settings.button.verify'),
          icon: 'identity',
          url: '/user/id-verification',
        },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.header {
  align-items: center;
  display: flex;
}

.phone {
  margin-right: 15px;
}

.telephone {
  font-size: 32px;
  font-weight: bold;
  line-height: 150%;
}

.ver-btn {
  margin-left: 50px;
}

.logout-btn {
  margin-left: 50px;
}

.settings-tab {
  margin-left: auto;
}

.uid {
  color: #808080;
  margin-top: 10px;
}

.main-settings {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 50px;
}

.settings-card {
  margin-bottom: 40px;
}
</style>
