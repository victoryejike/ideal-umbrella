<template>
  <div class="container">
    <div class="top" />
    <div class="profile-img">
      <img
        class="profile"
        src="@svg/profile-sample.svg"
      >
    </div>
    <div class="profile-details">
      <div class="username">
        <h3>
          Chris Torres
          <img
            src="@svg/tick.svg"
            width="12"
          >
        </h3>
      </div>
      <div class="profile-actions">
        <BaseRoundButton
          class="btn-outline-primary btn-sm action"
          :text="$t('profile.edit_profile')"
        />
        <BaseRoundButton
          class="btn-outline-primary btn-sm action p1"
          :text="$t('profile.share')"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyNFTBaseframe',
};
</script>

<style scoped>
  .top {
    background-image: url("~@svg/profile-bg.svg");
    border-radius: 0.625rem;
    padding: 5rem;
  }

  .profile-img {
    margin: -6rem auto;
    text-align: center;
  }

  .profile {
    border: 0.1875rem solid #fff;
    border-radius: 22.5rem;
    height: 6.25rem;
    width: 6.25rem;
  }

  .profile-details {
    margin-top: 8rem;
    text-align: center;
  }

  .verified {
    background: #2c43ad;
    border-radius: 22.5rem;
    height: 0.8rem;
    width: 0.8rem;
  }

  .username h3 {
    font-size: 2rem;
  }

  .profile-actions {
    display: block ruby;
  }

  .action {
    font-size: 0.75rem;
    font-weight: 600;
    margin: 0.3125rem;
  }

  .p1 {
    padding-left: 1.3rem;
    padding-right: 1.3rem;
  }

</style>
