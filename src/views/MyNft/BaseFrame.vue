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
    border-radius: 10px;
    padding: 5rem;
  }

  .profile-img {
    margin: -6rem auto;
    text-align: center;
  }

  .profile {
    border: 3px solid #fff;
    border-radius: 360px;
    height: 100px;
    width: 100px;
  }

  .profile-details {
    margin-top: 8rem;
    text-align: center;
  }

  .verified {
    background: #2c43ad;
    border-radius: 360px;
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
    font-size: 12px;
    font-weight: 600;
    margin: 5px;
  }

  .p1 {
    padding-left: 1.3rem;
    padding-right: 1.3rem;
  }

</style>
