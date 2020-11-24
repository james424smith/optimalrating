<template>
  <div>
    <client-only>
      <dropzone
              ref="myVueDropzone"
              id="dropzone"
              :options="dropzoneOptions"
              @vdropzone-sending="sendingEvent"
              @vdropzone-success="successEvent">
      </dropzone>
    </client-only>
  </div>
</template>

<script>

  import  'vue2-dropzone/dist/vue2Dropzone.min.css';
  export default {
    components:{
      Dropzone : ()=>
      process.client ? import('vue2-dropzone') : '',

    },
    props: ['maxFiles', 'resizeSize', 'thumbnailSize', 'uploadType'],
    data: function () {
      return {
        dropzoneOptions: {
          url: process.env.api_url + '/file/upload',
          thumbnailWidth: 200,
          addRemoveLinks: true,
          dictDefaultMessage: " <span class=\"mdi mdi-cloud-upload\"  style='font-size: 30pt'></span> ",
          headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token'),
            'Cache-Control': '', 'X-Requested-With': ''
          },
          maxFiles:  this.maxFiles ? this.maxFiles : 1,
          resizeHeight: this.resizeSize ? this.resizeSize.height : null,
          resizeWidth: this.resizeSize ? this.resizeSize.width : null,
          thumbnailWidth: this.thumbnailSize ? this.thumbnailSize.width : null,
          thumbnailHeight: this.thumbnailSize ? this.thumbnailSize.height : null,
          resizeMethod: 'contain',
          thumbnailMethod: 'contain',
          init: function() {
            this.on("maxfilesexceeded", function(file) {
              this.removeAllFiles();
              this.addFile(file);
            });
          }
        },
        item: null
      }
    },
    methods: {
      sendingEvent (file, xhr, formData) {
        formData.append('type', this.uploadType);
        formData.append('width', this.resizeSize.width);
        formData.append('height', this.resizeSize.height);
      },
      successEvent (file, response) {
        this.$emit('uploadSuccess', response);
      }
    }
  }
</script>

<style lang="css">
  /*.dropzone.dz-clickable {*/
  /*  cursor: pointer;*/
  /*}*/
  /*.vue-dropzone {*/
  /*  border: 2px solid #e5e5e5;*/
  /*  font-family: Arial,sans-serif;*/
  /*  letter-spacing: .2px;*/
  /*  color: #777;*/
  /*  transition: .2s linear;*/
  /*}*/
  /*.dropzone {*/
  /*  min-height: 150px;*/
  /*  border: 2px solid rgba(0, 0, 0, 0.3);*/
  /*  background: white;*/
  /*  padding: 20px 20px;*/
  /*}*/
  /*.dropzone, .dropzone * {*/
  /*  box-sizing: border-box;*/
  /*}*/
</style>
