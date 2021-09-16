<template>
  <div class="share">
    <a id="share">Share: </a>
    <div class="platform">
      <img
        src="@/assets/svg/fb.svg"
        width="25"
      >
      <div class="p2">
        <a
          class="p2"
          :href="'https://www.facebook.com/sharer/sharer.php?u='+ href"
          target="_blank"
        >Facebook</a>
      </div>
    </div>
    <div class="platform">
      <img
        src="@/assets/svg/tweet.svg"
        width="25"
      >
      <div class="p2">
        <a
          :href="'http://twitter.com/share?url='+ href"
          target="_blank"
        >
          Twitter
        </a>
      </div>
    </div>
    <div class="platform">
      <img
        src="@/assets/svg/share.svg"
        width="25"
      >
      <div class="p2">
        <a>Copy Link</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Share',
  data() {
    return {
      href: window.location.href,
    };
  },
};
</script>

<style scoped>
  .share {
    max-width: 27rem;
    border: 1px solid rgba(44, 67, 173, 0.25);
    border-radius: 32px;
    background: rgba(255, 255, 255, 0.25);
    margin: 2rem auto;
    display: flex;
    padding: 0.5rem;
  }
  #share {
    margin-top: 0.2rem;
  }
  .share a {
    color: #5D6EC2;
    font-size: 0.9rem;
    margin-left: 1rem;
  }
  .platform {
    margin-left: 0.9rem;
    display: flex;
  }
  .p2 {
    padding: 2px;
  }
  @media only screen and (max-width: 520px) {
    .share {
      display: none;
    }
  }
</style>
