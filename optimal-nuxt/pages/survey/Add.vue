<template>
  <no-ssr>
    <div class="col-xl-9">
      <div class="card card-default">
        <div class="card-header justify-content-between card-header-border-bottom">
          <div class="float-left">
            <h4>{{$t('lbl.add_survey')}}</h4>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="row float-left">
              <div class="col-md-12 form-group">
                <label
                  for="parentCategory"
                  class="col-md-6 float-left"
                >{{$t('lbl.select_category')}}</label>
                <treeselect
                  id="parentCategory"
                  :disable-branch-nodes="true"
                  class="col-6 float-right p-0"
                  v-model="selectedCategory"
                  :options="categoryOptions"
                  :placeholder="$t('lbl.select_category')"
                  valueFormat="id"
                />
              </div>
              <div class="col-md-12 form-group">
                <label for="categoryName" class="col-md-6 float-left">{{$t('lbl.survey_title')}}</label>
                <input
                  v-model="survey.title"
                  id="categoryName"
                  :placeholder="$t('lbl.category_name')"
                  class="form-control col-md-6 float-right"
                />
              </div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="form-group row col-12">
              <button
                type="button"
                name="button"
                class="btn btn-sm btn-fill btn-round btn-primary float-right mb-2 mt-2 col-1"
                @click="addAnotherAnswer"
              >
                <i class="fa fa-plus"></i>
              </button>
            </div>
            <div
              class="form-group col-12 mt-2 card-header-border-bottom"
              v-for="(option, index) in choices"
            >
              <div class="answerLabelAndInput col-6 float-left p-0">
                <div class="col-12 p-0">
                  <label class="col-4 col-form-label float-left p-0">{{$t('lbl.answer')}} :</label>
                  <input
                    type="text"
                    class="form-control col-7 float-left"
                    v-model="option.choice_title"
                  />
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="marking col-3 float-left">
                <star-rating
                  v-bind:increment="1"
                  v-bind:max-rating="5"
                  v-model="option.marking"
                  inactive-color="#000"
                  active-color="#3a99ab"
                  v-bind:star-size="25"
                ></star-rating>
              </div>
              <!---IMAGE--->
              <div class="boxImage mr-3 float-right" @click="imageUpload(index)">
                <div
                  class="pp float-left .iconbox-40"
                  style="display: flex;align-items: center;justify-content: center; width: 40px; height: 40px"
                >
                  <img
                    :src="option.choice_image !== null ? cdnUrl+imageUrl+option.choice_image :'@/assets/img/user_40x40.png'"
                    alt="Generic placeholder image"
                    width="100%"
                    height="60px"
                  />
                </div>
                <div class="Grg65b">
                  <div class="EJFIFb"></div>
                </div>
              </div>
              <!---END IMAGE--->
              <!---REMOVE ANSWER --->
              <div class="col-1 float-right" v-if="index > 2">
                <button
                  type="button"
                  name="button"
                  class="col-11 btn btn-sm btn-fill btn-round btn-danger float-right mt-1 mb-1"
                  @click="removeAnswer(index)"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </div>
              <!---END REMOVE ANSWER--->

              <div class="clearfix"></div>
              <div class="col-12 p-0 mt-1">
                <label class="col-md-2 float-left p-0">{{$t('lbl.survey_description')}}</label>
                <vue-editor
                  :editorToolbar="customToolbar"
                  v-model="option.choice_description"
                  class="col-md-10 float-left p-0 mt-1"
                  @text-change="onTextChange($event, index)"
                ></vue-editor>
                <div class="clearfix"></div>
                <div
                  v-text="lengths[index]"
                  style="text-align: right"
                  :class="lengths[index] <= 0 && 'descriptionMaxChar'"
                ></div>
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-12 float-right">
              <button
                class="btn btn-optimal float-right"
                @click="surveySave()"
                :disabled="saving"
              >{{saving ? $t('lbl.saving') : $t('lbl.save')}}</button>
            </div>
          </div>
        </div>
      </div>
      <modal name="image-modal" height="auto" :draggable="true" :classes="['v--modal', 'm-modal']">
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col">
                <h4 class="mt-0 float-left">{{$t('lbl.add_new_image')}}</h4>
                <a href style="float: right;" @click.prevent="$modal.hide('image-modal')">X</a>
                <br />
                <hr />
                <file-upload
                  uploadType="sa"
                  :maxFiles="1"
                  @uploadSuccess="uploadSuccess"
                  :resizeSize="{width: imageSize.width, height: imageSize.height}"
                  :thumbnailSize="{width: thumbnailSize.width, height: thumbnailSize.height}"
                ></file-upload>
                <small
                  class="text-muted"
                >{{$t('lbl.suggested_image_size')}} : {{imageSize.width}} x {{imageSize.height}}</small>
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
  </no-ssr>
</template>
<script>
import { mapState } from "vuex";
import Treeselect from "@riophae/vue-treeselect";
import StarRating from "vue-star-rating";

import "vue2-editor/dist/vue2-editor.css";
import { Choice, Survey } from "@/models/definition";
import FileUpload from "~/components/common/FileUpload.vue";

export default {
  head: {
    title: "Add Survey | Optimal Rating",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ]
  },
  components: {
    FileUpload,
    Treeselect,
    StarRating
  },
  data() {
    return {
      saving: false,
      customToolbar: [[]],
      choice: new Choice(),
      survey: new Survey(),
      choices: [],
      lengths: [],
      selectedCategory: null,
      cdnUrl: process.env.cdn_url,
      imageUrl: `/images/survey_approval/`,
      uploadedImage: null,
      imageSize: {
        width: 240,
        height: 240
      },
      thumbnailSize: {
        width: 280,
        height: 280
      },
      selectUpload: null
    };
  },
  computed: {
    ...mapState("state_definition", {
      categories: state => state.categories
    }),
    categoryOptions: function() {
      let _this = this;
      function mapChildren(children) {
        return _this._.map(children, child => {
          let obj = {
            id: child.id,
            label: child.name || ""
          };
          if (child.children) obj.children = mapChildren(child.children);
          return obj;
        });
      }

      return this._.map(this.categories, item => {
        let obj = {
          id: item.id,
          label: _this.$t(item.code) || ""
        };
        if (item.children) {
          obj.children = mapChildren(item.children);
        }
        return obj;
      });
    }
  },
  watch: {
    selectedCategory: function(val) {
      if (typeof val == "undefined" || null === val) {
        this.survey.category_id = null;
      }
    }
  },
  created() {
    this.getCategories();
    this.addAnotherAnswer();
    this.addAnotherAnswer();
    this.addAnotherAnswer();

    if (process.client) {
      this.$store.dispatch("state_definition/checkLogin").then(response => {
        let res = response.result.set.user;
        if (res.status === "freeze") {
          this.$router.push("/profile-approve?status=approve");
        }
        this.userLogin = true;
      });
    }
  },
  methods: {
    onTextChange(e, i) {
      const charCount = this.choices[i].choice_description ? e.length() : 0;
      this.lengths[i] = 5000 - charCount;
    },
    surveySave() {
      if (this.lengths.find(x => x < 0)) {
        this.$toast.error(this.$t("msg.error_max_about_character"));
        return;
      }
      if(!this.selectedCategory) {
        this.$toast.error(this.$t("msg.error_select_category"));
        return;
      }
      this.saving = true;
      this.survey.category_id = this.selectedCategory;
      this.survey.choices = this.choices;
      this.$store
        .dispatch("state_definition/saveSurvey", { survey: this.survey })
        .then(() => {
          this.saving = false;
          this.$toast.success(this.$t("msg.survey_added"));
          window.location.reload();
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
      this.choices[this.selectUpload].choice_image = this.uploadedImage.name;
      this.choices[this.selectUpload].image = this.uploadedImage.name;
      this.uploadedImage = null;
      this.isChanged = true;
      this.$modal.hide("image-modal");
    },
    uploadSuccess: function(response) {
      if (response && response.result.set) {
        this.uploadedImage = response.result.set[0];
      }
    },
    getCategories() {
      this.$store
        .dispatch("state_definition/getAllCategory")
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    addAnotherAnswer() {
      let choice = this._.cloneDeep(this.choice);
      this.choices.push(choice);
      this.lengths.push(5000);
      return false;
    },
    removeAnswer(index) {
      this.lengths.splice(index, 1);
      let newChoices = this.choices.reduce(
        (accumulator, currentValue, currentIndex) => {
          if (currentIndex !== index) {
            accumulator.push(currentValue);
          }
          return accumulator;
        },
        []
      );
      this.choices = newChoices;
    }
  },
  async fetch({ store, params }) {
    await store.dispatch("state_definition/getAllCategory");
    await store.dispatch("state_definition/getHomeSpecialSurvey");
  }
};
</script>

<style>
.boxImage {
  width: 40px;
  height: 40px;
  flex-grow: 0;
  flex-shrink: 0;
  border-radius: 50%;
  margin-left: 16px;
  overflow: hidden;
  position: relative;
}
.pp {
  cursor: pointer;
  border: 1px solid lightgrey;
  width: 40px;
  height: 40px;
}
.iconbox-40 {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.iconbox-40 img {
  height: 40px !important;
}
.Grg65b {
  background-color: rgba(32, 33, 36, 0.6);
  bottom: 0;
  height: 15px;
  left: 0;
  position: absolute;
  right: 0;
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
