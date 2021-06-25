<template>
  <div class="container">
    <BaseFrame
      url="/profile"
    />
    <div class="flex">
      <div class="w-50">
        <h1 class="edit-profile-text">
          {{ $t("profile.edit_profile") }}
        </h1>
      </div>
      <div class="w-50">
        <BaseNavigationTab
          :list="forgotPasswordTab"
          style="float: right; margin: 0.625rem;"
          :width="10.6"
        />
      </div>
    </div>
    <BaseForm
      class="edit-profile-form"
      @submit="onSubmit"
    >
      <div class="mt-2">
        <div class="input-group-text">
          {{ $t('edit_profile.avatar') }}
        </div>
        <div class="input-group">
          <div class="profile-img">
            <img
              class="profile"
              src="@img/default-avatar.png"
            >
          </div>
          <div class="recommend">
            <p>{{ $t('edit_profile.recommend') }}</p>
            <BaseRoundButton
              class="btn-outline-primary btn-sm"
              :text="$t('edit_profile.choose_file')"
              @click="selectProfile"
            />
            <input
              id="select-profile"
              accept="image/*"
              type="file"
            >
          </div>
        </div>
      </div>
      <BaseUnderlinedInput
        class="input-field"
        name="username"
        :placeholder="$t('edit_profile.display_name_placeholder')"
        :text="$t('edit_profile.display_name')"
      />
      <BaseUnderlinedInput
        class="input-field"
        name="bio"
        :placeholder="$t('edit_profile.bio')"
        :text="$t('edit_profile.bio_placeholder')"
      />
      <BaseUnderlinedInput
        class="input-field"
        name="bio"
        :placeholder="$t('edit_profile.portfolio_placeholder')"
        :text="$t('edit_profile.portfolio')"
      />
      <BaseUnderlinedInput
        class="input-field"
        name="bio"
        :placeholder="$t('edit_profile.email_placeholder')"
        :text="$t('edit_profile.email')"
      />
      <BaseRoundButton
        class="send-btn btn-primary btn-md btn-bold"
        icon="arrow-right"
        style="margin-bottom: 2rem;"
        :submit="true"
        :text="$t('edit_profile.update_btn')"
      />
      <div class="verified">
        <router-link
          to="/"
        >
          {{ $t("edit_profile.need_verified_account") }}
        </router-link>
      </div>
    </BaseForm>
  </div>
</template>

<script>

export default {
  name: 'EditProfile',
  data() {
    return {
      isEmail: true,
      forgotPasswordTab: [
        {
          name: this.$t('edit_profile.edit_profile'),
          handler: () => { this.isEmail = true; },
        },
        {
          name: this.$t('edit_profile.account'),
          handler: () => { this.isEmail = false; },
        },
      ],
    };
  },
  methods: {
    onSubmit(data) {
      // call API...
    },
    selectProfile() {
      document.getElementById('select-profile').click();
    },
  },
};
</script>

<style scoped>
.edit-profile-text {
  font-size: 2rem;
  margin-bottom: 2.5rem;
}

.mt-2 {
  margin-top: 2rem;
}

.profile {
  border: 0.1875rem solid #fff;
  border-radius: 22.5rem;
  height: 6.25rem;
  width: 6.25rem;
}

.input-group {
  display: flex;
}

.input-group-text {
  color: rgba(0, 0, 0, 0.75);
  font-size: 0.9rem;
  margin-bottom: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.w-50 {
  width: 50%;
}

.input-field {
  margin-top: 2.5rem;
}

.verified {
  margin-bottom: 2rem;
}

.flex {
  display: flex;
}

.edit-profile-form {
  max-width: 30rem;
}

.send-btn {
  margin-bottom: 22rem;
  margin-top: 3.125rem;
  min-width: 0;
}

.recommend {
  margin-left: 1rem;
}

.recommend p {
  color: rgba(0, 0, 0, 0.25);
  font-size: 0.9rem;
  white-space: break-spaces;
}

.recommend input {
  display: none;
}

@media (max-width: 30em) {
  .send-btn {
    min-width: 100%;
  }
}

@media (max-width: 48em) {
  .flex {
    display: block;
  }

  .w-50 div {
    float: none !important;
    margin: 0.1rem !important;
    width: 16rem !important;
  }
}
</style>
