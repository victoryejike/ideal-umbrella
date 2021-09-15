<template>
  <div class="label">
    {{ text }}
  </div>
  <div class="upload-box">
    {{ message }}

    <video
      v-if="fileType === 'video'"
      controls
      height="240"
      width="320"
    >
      <source
        :src="video"
        type="video/mp4"
      >
      <source
        :src="video"
        type="video/ogg"
      >
      Your browser does not support the video tag.
    </video>
    <img
      v-else-if="fileType === 'image'"
      class="p1"
      :src="img"
      width="200"
    >
    <!-- <p>{{ fileName }}</p> -->
    <input
      ref="file"
      class="file-uploads"
      hidden
      name="file-uploads"
      type="file"
      @change="fileChange"
    >
    <BaseRoundButton
      class="upload-button btn-primary btn-md btn-bold"
      :text="$t('collectible.upload_button_text')"
      @click="fileUpload"
    />
  </div>
</template>
<script>
import store from '@/store';

const { create } = require('ipfs-http-client');

const ipfsClient = {
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
};

const client = create(ipfsClient);

export default {
  name: 'UploadCard',
  props: {
    text: { type: String, required: false, default: null },
  },
  data() {
    return {
      fileName: '',
      img: '',
      fileType: '',
      video: '',
      message: 'PNG, GIF, WEBP, MP4 or MP3. Max 20mb.',
    };
  },
  methods: {
    fileUpload() {
      document.querySelector('.file-uploads').click();
    },
    async fileChange(event) {
      try {
        const type = this.$refs.file.files[0];
        const [file] = event.target.files;
        this.fileName = file.name;

        const size = (type.size / 1024 / 1024);
        if (size > 20) {
          this.message = 'File size is to large. Try a file lesser than 20MB';
        } else {
          // eslint-disable-next-line prefer-destructuring
          this.fileType = type.type.split('/')[0];
          this.message = 'PNG, GIF, WEBP, MP4 or MP3. Max 20mb.';
          store.commit('data/setAssetsType', type.type.split('/')[0]);
          if (type.type.split('/')[0] === 'image') {
            this.img = URL.createObjectURL(type);
          } else if (type.type.split('/')[0] === 'video') {
            this.video = URL.createObjectURL(type);
          }
          const { cid } = await client.add(file);
          this.ipfsHash = cid.string;
          console.log(this.ipfsHash);
        }
      } catch (error) {
        //
      }
      sessionStorage.setItem('ipfsHash', this.ipfsHash);
    },
  },
};
</script>
<style scoped>
.upload-box {
  align-items: center;
  background: rgba(255, 255, 255, 0.25);
  border: 0.0625rem dashed rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  box-sizing: border-box;
  color: #808080;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  height: inherit;
  line-height: 150%;
  margin-bottom: 2.5rem;
  margin-top: 1.375rem;
  padding: 1.8rem;
  width: 32.5rem;
}

.upload-button {
  margin-top: 0.5rem;
}

.p1 {
  padding: 1rem;
}

.label {
  color: rgba(0, 0, 0, 0.75);
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 1.37rem;
}

@media (max-width: 37em) {
  .upload-box {
    font-size: 0.75rem;
    width: 100%;
  }
}
</style>
