<template>
  <div class="container">
    <div class="header">
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
          class="ver-btn btn-outline-danger btn-sm"
          text="No ID Verification"
        />
        <BaseRoundButton
          class="logout-btn btn-outline-primary btn-md"
          text="Logout"
          @click="$store.dispatch('auth/logout')"
        />
      </div>
      <BaseNavigationTab
        :action-index="1"
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
          url: '/account-setting/rebind-email',
        },
        {
          title: this.$t('user_index_screen.settings.header.phone'),
          body: this.$t('user_index_screen.settings.body.for_security'),
          notes: '****1234',
          btnText: this.$t('user_index_screen.settings.button.rebind'),
          icon: 'phone',
          url: '/account-setting/rebind-phone',
        },
        {
          title: this.$t('user_index_screen.settings.header.id_ver'),
          body: this.$t('user_index_screen.settings.body.id_ver'),
          notes: null,
          btnText: this.$t('user_index_screen.settings.button.verify'),
          icon: 'identity',
          url: '/account-setting/id-verification',
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
  margin-bottom: 20rem;
}

.header {
  align-items: center;
  display: flex;
}

.phone {
  margin-right: 0.9375rem;
}

.telephone {
  font-size: 2rem;
  font-weight: bold;
  line-height: 150%;
}

.ver-btn {
  margin-left: 3.125rem;
}

.logout-btn {
  margin-left: 3.125rem;
  margin-right: 3.125rem;
}

.settings-tab {
  margin-left: auto;
}

.uid {
  color: #808080;
  margin-top: 0.625rem;
}

.main-settings {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-right: -1.25rem;
  margin-top: 3.125rem;
}

.settings-card {
  margin-bottom: 1.25rem;
  margin-right: 1.25rem;
}

.flex {
  align-items: center;
  display: flex;
}

@media (max-width: 60em) {
  .header {
    display: block;
  }

  .flex {
    padding-bottom: 1.25rem;
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

@media (max-width: 30em) {
  .main-settings button {
    font-size: 0.75rem;
    padding: 0.35rem 1rem;
  }

  .main-settings {
    justify-content: center;
  }
}
</style>
