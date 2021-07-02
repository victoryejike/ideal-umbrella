<template>
  <div class="label">
    {{ text }}
  </div>
  <div class="upload-box">
    {{ $t('collectible.file_type_text') }}
    <p>{{ fileName }}</p>
    <input
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
    };
  },
  methods: {
    fileUpload() {
      document.querySelector('.file-uploads').click();
    },
    async fileChange(event) {
      try {
        const [file] = event.target.files;
        console.log(file);
        this.fileName = file.name;
        const { cid } = await client.add(file);
        console.log(cid);
        this.ipfsHash = cid.string;
      } catch (error) {
        console.log(error);
      }
      console.log(this.ipfsHash);
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
  height: 11.25rem;
  line-height: 150%;
  margin-bottom: 2.5rem;
  margin-top: 1.375rem;
  padding-top: 1.875rem;
  width: 32.5rem;
}

.upload-button {
  margin-top: 0.5rem;
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
