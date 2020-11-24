<template>
  <div>
    <modal name="new-choice-modal" width="500" height="auto">
      <div class="modal-header">
        <h3>{{$t('lbl.add_new_option')}}</h3>
        <a href="javascript:;" @click="$modal.hide('new-choice-modal')">X</a>
      </div>
      <div class="modal-body">
        <div class="col-lg-12 float-left">
          <div class="row float-left">
            <!---IMAGE--->
            <div
              class="boxImageBox mr-3 mb-2"
              style="cursor: pointer; right: 0 !important; position: absolute; z-index: 99;"
              @click="imageUpload()"
            >
              <div class="pp float-left .iconbox-40" :style="`pointer-events: none; ${showError && !choice.image ? 'border-color: #f00;' : ''}`">
                <img
                  :src="cdnUrl+imageUrl+choice.choice_image"
                  @error="brokenUrl"
                  alt="Generic placeholder image"
                  width="100%"
                  height="60px"
                />
              </div>
              <div class="Grg65b" style="pointer-events: none;">
                <div class="EJFIFb"></div>
              </div>
            </div>
            <!---END IMAGE--->
            <div class="marking col-12 float-left p-0 mb-3">
              <label class="col-md-4 float-left p-0">{{$t('lbl.survey_rate')}} :</label>
              <star-rating
                v-bind:increment="1"
                v-bind:max-rating="5"
                v-model="choice.marking"
                inactive-color="#000"
                active-color="#3a99ab"
                v-bind:star-size="25"
              ></star-rating>
            </div>
            <div class="answerLabelAndInput col-12 float-left p-0">
              <div class="col-12 p-0">
                <label class="col-4 col-form-label float-left p-0">{{$t('lbl.answer')}} :</label>
                <input
                  type="text"
                  :class="`form-control col-8 float-left`"
                  :style="showError && !choice.choice_title ? 'border-color: #f00' : ''"
                  v-model="choice.choice_title"
                />
              </div>
              <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>
            <div class="col-12 p-0 mt-1">
              <label class="col-md-4 float-left p-0">{{$t('lbl.description')}}</label>
              <vue-editor
                :editorToolbar="customToolbar"
                v-model="choice.choice_description"
                :class="`col-md-8 float-left p-0 mt-1 ${showError && !choice.choice_description ? 'WithError' : ''}`"
                @text-change="onTextChange"
              ></vue-editor>
              <div class="clearfix"></div>
              <div
                v-text="descriptionMaxChar"
                style="text-align: right"
                :class="descriptionMaxChar <= 0 && 'descriptionMaxChar'"
              ></div>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <slot name="footer">
          <button
            class="btn btn-secondary"
            @click="$modal.hide('new-choice-modal')"
          >{{$t('lbl.cancel')}}</button>
          <button
            class="btn btn-optimal float-right"
            @click="surveySaveChoice()"
            :disabled="saving"
          >{{saving ? $t('lbl.saving') :$t('lbl.save')}}</button>
        </slot>
      </div>
    </modal>
    <modal name="image-modal" height="auto" :draggable="true" :classes="['v--modal', 'm-modal']">
      <div class="modal-body">
        <div class="container-fluid">
          <div class="row">
            <div class="col" style="padding: 0">
              <h4 class="mt-0 float-left">{{$t('lbl.add_new_image')}}</h4>
              <a style="float: right" href="javascript:;" @click="$modal.hide('image-modal')">X</a>
              <br />
              <hr />
              <file-upload
                uploadType="sa"
                :maxFiles="1"
                @uploadSuccess="uploadSuccess"
                :resizeSize="{width: imageSize.width, height: imageSize.height}"
                :thumbnailSize="{width: thumbnailSize.width, height: thumbnailSize.height}"
              ></file-upload>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-round btn-sm px-3"
          @click="$modal.hide('image-modal')"
        >{{$t('lbl.cancel')}}</button>
        <button
          type="button"
          class="btn btn-optimal btn-sm px-4"
          :class="[uploadedImage == null ? 'disabled' : '']"
          :disabled="uploadedImage == null"
          @click.prevent="saveImage"
        >{{$t('lbl.add')}}</button>
      </div>
    </modal>
  </div>
</template>
<script>
import StarRating from "vue-star-rating";
import "vue2-editor/dist/vue2-editor.css";
import { Choice } from "@/models/definition";
import FileUpload from "~/components/common/FileUpload.vue";
import img4040 from "~/assets/img/EmptyImage.png";
export default {
  props: ["survey", "bus"],
  components: {
    FileUpload,
    StarRating
  },
  data() {
    return {
      showError: false,
      saving: false,
      choice: new Choice(),
      cdnUrl: process.env.cdn_url,
      imageUrl: `/images/survey_approval/`,
      uploadedImage: null,
      descriptionMaxChar: 5000,
      imageSize: {
        width: 240,
        height: 240
      },
      thumbnailSize: {
        width: 280,
        height: 280
      },
      customToolbar: [[]]
    };
  },
  watch: {
    "choice.choice_description": function(item) {
      let itemChar = item ? this.linkify(item) : null;
      return itemChar;
    }
  },
  methods: {
    onTextChange(e) {
      const charCount = this.choice.choice_description ? e.length() : 0;
      this.descriptionMaxChar = 5000 - charCount;
    },
    linkify(inputText) {
      let replacedText,
        replacePattern1,
        replacePattern2,
        replacePattern3,
        replacePattern4;

      //URLs starting with http://, https://, or ftp://
      replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      replacedText = inputText.replace(
        replacePattern1,
        '<a href="$1" target="_blank">$1</a>'
      );

      //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
      replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      replacedText = replacedText.replace(
        replacePattern2,
        '$1<a href="http://$2" target="_blank">$2</a>'
      );

      //Change email addresses to mailto:: links.
      replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
      replacedText = replacedText.replace(
        replacePattern3,
        '<a href="mailto:$1">$1</a>'
      );

      return replacedText;
    },
    brokenUrl(event) {
      event.target.src = img4040;
    },
    surveySaveChoice() {
      this.showError = true;
      if (this.descriptionMaxChar <= 0) {
        this.$toast.error(this.$t("msg.error_max_about_character"));
        return;
      }
      if (!this.choice.choice_title || !this.choice.choice_description || !this.choice.choice_image) {
        return;
      }
      this.saving = true;
      this.$store
        .dispatch("state_definition/addChoice", {
          data: this.choice,
          survey: this.survey.id
        })
        .then(() => {
          this.saving = false;
          this.$toast.success(this.$t("msg.survey_choice_added"));
          this.choice = new Choice();

          this.$modal.hide("new-choice-modal");
          //location.reload();
          this.loading = false;
        })
        .catch(() => {
          this.saving = false;
          this.loading = false;
        });
    },
    imageUpload(index) {
      this.selectUpload = index;
      this.$modal.show("image-modal");
    },
    saveImage: function() {
      this.choice.choice_image = this.uploadedImage.name;
      this.choice.image = this.uploadedImage.name;
      this.uploadedImage = null;
      this.isChanged = true;
      this.$modal.hide("image-modal");
    },
    uploadSuccess: function(response) {
      if (response && response.result.set) {
        this.uploadedImage = response.result.set[0];
      }
    }
  }
};
</script>
<style>
.descriptionMaxChar {
  color: red;
}
.WithError .ql-toolbar, .WithError .ql-container {
  border-color: red !important;
}
.boxImageBox {
  width: 50px !important;
  height: 50px !important;
  flex-grow: 0;
  flex-shrink: 0;
  border-radius: 50%;
  margin-left: 16px;
  overflow: hidden;
  top: -15px;
}
.pp {
  cursor: pointer;
  border: 1px solid lightgrey;
  width: 50px;
  height: 50px;
}
.iconbox-40 {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.iconbox-40 img {
  height: 40px !important;
}
.Grg65b {
  background-color: rgba(32, 33, 36, 0.6);
  height: 15px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.EJFIFb {
  background-image: url(//www.gstatic.com/images/icons/material/system/2x/photo_camera_white_24dp.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 15px 15px;
  height: 90%;
  opacity: 0.8;
}
</style>
