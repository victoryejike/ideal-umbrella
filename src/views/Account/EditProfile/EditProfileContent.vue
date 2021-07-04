<template>
  <BaseForm
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
        :src="avatarURL"
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
      class="input-field"
      name="display_name"
      :placeholder="$t('edit_profile.display_name_placeholder')"
      :text="$t('edit_profile.display_name')"
    />
    <BaseUnderlinedInput
      class="input-field"
      name="about"
      :placeholder="$t('edit_profile.bio')"
      :text="$t('edit_profile.bio_placeholder')"
    />
    <BaseUnderlinedInput
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
      avatarURL: '',
    };
  },
  mounted() {
    this.getProfile();
  },
  methods: {
    async getProfile() {
      let response = null;
      try {
        const { data } = await this.$api.GET_PROFILE();
        response = data;
      } catch (error) {
        response = error?.response?.data;
      }

      if (response?.success) {
        console.log(response.data);
        this.avatarURL = response?.data?.image; // Temporarily implementation, for demo
        if (response.data.display_name !== undefined) {
          document.querySelector('input[name=display_name]').value = response.data.display_name;
          document.querySelector('input[name=about]').value = response.data.about;
          document.querySelector('input[name=portfolio_link]').value = response.data.portfolio_link;
        }
      } else {
        //
      }
    },
    async onSubmit(editProileData) {
      let response = null;
      try {
        const { data } = await this.$api.UPDATEPROFILE(editProileData);
        response = data;
      } catch (error) {
        response = error?.response?.data;
      }

      if (response?.success) {
        this.getProfile();
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
        this.avatarURL = URL.createObjectURL(file);
      } else {
        //
      }
      this.isUploadingImage = false;
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
