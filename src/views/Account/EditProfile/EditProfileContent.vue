<template>
  <BaseForm
    ref="edit-profile-form"
    v-slot="{ isLoading }"
    class="edit-profile-form"
    @submit="onSubmit"
  >
    <div class="avatar-text">
      {{ $t('edit_profile.avatar') }}
    </div>
    <div class="avatar-group">
      <img
        class="profile"
        :onerror="$global.handleAvatarError"
        :src="$global.handleAvatarURL(avatar)"
      >
      <div class="recommend">
        <p>{{ $t('edit_profile.recommend') }}</p>
        <BaseRoundButton
          class="btn-outline-primary btn-sm"
          :icon="isUploadingImage ? 'transparent-loading-sm' : null"
          :text="$t('edit_profile.choose_file')"
          @click="$refs.file.click()"
        />
        <input
          ref="file"
          accept="image/*"
          type="file"
          @change="uploadImage($event, index)"
        >
      </div>
    </div>
    <BaseUnderlinedInput
      v-model="username"
      class="input-field"
      name="display_name"
      :placeholder="$t('edit_profile.display_name_placeholder')"
      :text="$t('edit_profile.display_name')"
    />
    <BaseUnderlinedInput
      v-model="about"
      class="input-field"
      name="about"
      :placeholder="$t('edit_profile.bio')"
      :text="$t('edit_profile.bio_placeholder')"
    />
    <BaseUnderlinedInput
      v-model="portfolio"
      class="input-field"
      name="portfolio_link"
      :placeholder="$t('edit_profile.portfolio_placeholder')"
      :text="$t('edit_profile.portfolio')"
    />
    <BaseRoundButton
      class="send-btn btn-primary btn-md btn-bold"
      :icon="isLoading ? 'loading' : 'arrow-right'"
      :submit="true"
      :text="$t('edit_profile.update_btn')"
    />
    <div class="verified">
      <router-link
        to="/account/setting/id-verification"
      >
        {{ $t("edit_profile.need_verified_account") }}
      </router-link>
    </div>
  </BaseForm>
</template>

<script>

export default {
  name: 'EditProfileContent',
  data() {
    return {
      isUploadingImage: false,
    };
  },
  computed: {
    avatar() { return this.$store.getters['auth/avatar']; },
    username() { return this.$store.getters['auth/username']; },
    about() { return this.$store.getters['auth/about']; },
    portfolio() { return this.$store.getters['auth/portfolio']; },
  },
  mounted() {
    if (this.$route.params?.errorMsg) {
      this.$refs['edit-profile-form'].form.setFieldError('display_name', this.$route.params?.errorMsg);
    }
  },
  methods: {
    async onSubmit(editProileData) {
      let response = null;
      try {
        const { data } = await this.$api.UPDATEPROFILE(editProileData);
        response = data;
      } catch (error) {
        response = error?.response?.data;
      }

      if (response?.success) {
        await this.updateStoreValue();
        this.$router.push({ name: 'Profile' });
      } else {
        //
      }
    },
    async uploadImage() {
      this.isUploadingImage = true;
      const file = this.$refs.file.files[0];
      const formData = new FormData();
      formData.append('image', file);
      let response = null;
      try {
        const { data } = await this.$api.UPLOADAVATAR(formData);
        response = data;
      } catch (error) {
        response = error?.response?.data;
      }

      if (response?.success) {
        await this.updateStoreValue();
      } else {
        //
      }
      this.isUploadingImage = false;
    },
    async updateStoreValue() {
      const { data } = await this.$api.GET_PROFILE();
      this.$store.dispatch('auth/updateProfile', data.data);
    },
  },
};
</script>

<style scoped>
.edit-profile-form {
  max-width: 24rem;
}

.profile {
  border: 0.1875rem solid #fff;
  border-radius: 50%;
  height: 6.25rem;
  object-fit: cover;
  width: 6.25rem;
}

.avatar-group {
  display: flex;
}

.avatar-text {
  font-size: 0.9rem;
  margin-bottom: 1.2rem;
}

.input-field {
  margin-top: 2.5rem;
}

.verified {
  margin-bottom: 2rem;
}

.send-btn {
  margin-bottom: 2rem;
  margin-top: 3.125rem;
  min-width: 0;
}

.recommend {
  margin-left: 1rem;
}

.recommend p {
  color: rgba(0, 0, 0, 0.25);
  font-size: 0.9rem;
}

.recommend input {
  display: none;
}

@media (max-width: 30em) {
  .send-btn {
    min-width: 100%;
  }
}
</style>
