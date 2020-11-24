<template>
  <div class="col-9 float-right ProfilePage">
    <div class="card card-default">
      <div
        class="card-header justify-content-between card-header-border-bottom"
        style="padding: 20px 14px;"
      >
        <div class="float-left">
          <h4 v-if="isFreezeRoute">{{$t('lbl.profile_verify')}}</h4>
          <h4 v-else>
            {{$t('lbl.profile_info')}}
            <!--<i class="fa fa-check isRealProfile" v-if="user.is_real"></i>-->
          </h4>
        </div>
      </div>
      <div class="card-body" v-if="isLoading">
        <div class="row">
          <table v-if="!isFreezeRoute" class="col-md-12 profile-table">
            <tr>
              <td width="%25">
                <label for="name">{{$t('lbl.profile_image')}}</label>
              </td>
              <td width="%75">
                <!-- <div class="float-left mt-3">{{$t('lbl.profile_image_info')}}</div> -->
                <div class="boxImage mr-3" v-if="isLoading">
                  <div class="pp float-left iconbox-60" @click="newImage('us')">
                    <img :src="imageUrl" @error="brokenUrl" width="100%" height="100%" />
                  </div>
                  <div class="Grg65b">
                    <div class="EJFIFb"></div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td width="%25">
                <label for="name">{{$t('lbl.username')}}</label>
              </td>
              <td width="%75">
                <input
                  type="text"
                  id="username"
                  :placeholder="$t('lbl.username')"
                  v-model="user.username"
                  :class="'form-control '+(!user.username && isVerifyRoute ? 'verify-input' :'') "
                />
              </td>
            </tr>
            <tr>
              <td width="%25">
                <label for="name">{{$t('lbl.firstname')}}</label>
              </td>
              <td width="%75">
                <input
                  type="text"
                  id="name"
                  :placeholder="$t('lbl.firstname')"
                  v-model="user.firstname"
                  :class="'form-control '+(!user.firstname  && isVerifyRoute ? 'verify-input' :'') "
                />
              </td>
            </tr>
            <tr>
              <td width="%25">
                <label for="middle_name">{{$t('lbl.middle_name')}}</label>
              </td>
              <td width="%75">
                <input
                  type="text"
                  id="middle_name"
                  :placeholder="$t('lbl.middle_name')"
                  v-model="user.middlename"
                  :class="'form-control '"
                />
              </td>
            </tr>
            <tr>
              <td width="%25">
                <label for="surname">{{$t('lbl.lastname')}}</label>
              </td>
              <td width="%75">
                <input
                  type="text"
                  id="surname"
                  :placeholder="$t('lbl.lastname')"
                  v-model="user.lastname"
                  :class="'form-control '+(!user.lastname && isVerifyRoute ? 'verify-input' :'') "
                />
              </td>
            </tr>
            <tr>
              <td width="%25">
                <label class="col-form-label">{{$t('lbl.birthdate')}}</label>
              </td>
              <td width="%75">
                <select
                  name="year"
                  :class="`form-control ${!year && isVerifyRoute ? 'verify-input' : ''}`"
                  id="year"
                  v-model="year"
                  :placeholder="$t('lbl.year')"
                  style="width:38%;min-width:100px;;display:inline-block;"
                >
                  <option :value="0">{{$t('lbl.year')}}</option>
                  <option :value="2021 - i" v-for="i in 81">{{2021 - i}}</option>
                </select>

                <select
                  name="month"
                  :class="`form-control ${!month && isVerifyRoute ? 'verify-input' : ''}`"
                  style="width:30%;display:inline-block;"
                  id="month"
                  :placeholder="$t('lbl.month')"
                  v-model="month"
                >
                  <option :value="0">{{$t('lbl.month')}}</option>
                  <option :value="month" v-for="month in 12">{{month}}</option>
                </select>

                <select
                  name="day"
                  :class="`form-control ${!day && isVerifyRoute ? 'verify-input' : ''}`"
                  style="width:30%;display:inline-block;"
                  id="day"
                  :placeholder="$t('lbl.day')"
                  v-model="day"
                >
                  <option :value="0">{{$t('lbl.day')}}</option>
                  <option :value="day" v-for="day in 31">{{day}}</option>
                </select>
              </td>
            </tr>
            <tr>
              <td width="%25">
                <label class="col-form-label">{{$t('lbl.gender')}}</label>
              </td>
              <td width="%75">
                <select
                  name="day"
                  class="form-control"
                  :class="'form-control '+(!user.user_details.gender && isVerifyRoute ? 'verify-input' :'') "
                  v-model="user.user_details.gender"
                  style="width:100%;display:inline-block;"
                  id="gender"
                >
                  <option value="male">{{$t('lbl.male')}}</option>
                  <option value="female">{{$t('lbl.female')}}</option>
                  <option value="0">{{$t('lbl.gender_other')}}</option>
                </select>
              </td>
            </tr>
            <tr>
              <td width="%25">
                <label class="col-form-label">{{$t('lbl.education')}}</label>
              </td>
              <td width="%75">
                <select
                  class="form-control input-md"
                  name="education"
                  style="width: 100%;"
                  id="education"
                  :class="'form-control '+(!user.user_details.education && isVerifyRoute ? 'verify-input' :'') "
                  v-model="user.user_details.education"
                >
                  <option selected="selected" value="university">{{$t('lbl.university')}}</option>
                  <option value="high_school">{{$t('lbl.high_school')}}</option>
                  <option value="school">{{$t('lbl.school')}}</option>
                </select>
              </td>
            </tr>
            <tr>
              <td width="%25">
                <label class="col-form-label">{{$t('lbl.country')}}</label>
              </td>
              <td width="%75">
                <select
                  name="country"
                  class="form-control"
                  style="width:100%;display:inline-block;"
                  id="country"
                  disabled
                  :value="selectedCountry"
                >
                  <option :value="item.id" v-for="item in countries">{{item.name}}</option>
                </select>
              </td>
            </tr>
            <tr>
              <td width="%25">
                <label class="col-form-label">{{$t('lbl.city')}}</label>
              </td>
              <td width="%75">
                <select
                  name="country"
                  :class="'form-control '+(!selectedCity && isVerifyRoute ? 'verify-input' :'') "
                  style="width:100%;display:inline-block;"
                  id="city"
                  v-model="selectedCity"
                >
                  <option :value="item.id" v-for="item in cities">{{item.name}}</option>
                </select>
              </td>
            </tr>
            <tr>
              <td width="%25">
                <label class="col-form-label">{{$t('lbl.phone_number')}}</label>
              </td>
              <td width="%75">
                <vue-tel-input
                  v-if="defaultCountry"
                  :placeholder="$t('lbl.phone_number')"
                  v-model="phone"
                  :default-country="defaultCountry"
                  :class="'col-8 float-left vue-tel-custom'+(isVerifyRoute && false ? 'verify-input' :'') "
                  @onInput="onInput"
                  :enabledCountryCode="true"
                  :preferredCountries="['us', 'gb', 'ua']"
                ></vue-tel-input>

                <i
                  :class="'fa fa-check fa-2x '+(user.phone_verify == 1 ? 'fa-check-green':'' )"
                  v-if="user.phone_verify"
                ></i>
                <button
                  class="btn btn-optimal float-right"
                  @click="changeSendVerifySms()"
                  :disabled="sending"
                >{{sending ? $t('lbl.processing') : $t('lbl.change')}}</button>
              </td>
            </tr>
            <tr>
              <td width="%25">
                <label class="col-form-label">{{$t('lbl.user_email')}}</label>
              </td>
              <td width="%75">
                <input
                  type="text"
                  id="user_email"
                  :placeholder="$t('lbl.user_email')"
                  class="form-control col-8 float-left"
                  :class="'form-control col-8 float-left '+(!user.email && isVerifyRoute ? 'verify-input' :'') "
                  v-model="user.email"
                />
                <button
                  class="btn btn-optimal float-right"
                  @click="changeEmailAddress()"
                  :disabled="emailSending"
                >{{emailSending ? $t('lbl.processing') : $t('lbl.change')}}</button>
              </td>
            </tr>
            <tr>
              <td width="%25">
                <label class="col-form-label">{{$t('lbl.occupation')}}</label>
              </td>
              <td width="%75">
                <input
                  type="text"
                  id="occupation"
                  :placeholder="$t('lbl.occupation')"
                  v-model="user.user_details.occupation"
                  class="form-control"
                />
              </td>
            </tr>
            <tr>
              <td width="%25">
                <label class="col-form-label">{{$t('lbl.marital_status')}}</label>
              </td>
              <td width="%75">
                <select
                  class="form-control input-md"
                  name="status"
                  id="status"
                  v-model="user.user_details.marital_status"
                >
                  <option value="single">{{$t('lbl.single')}}</option>
                  <option value="married">{{$t('lbl.married')}}</option>
                  <option value="divorced">{{$t('lbl.divorced')}}</option>
                </select>
              </td>
            </tr>
            <tr>
              <td width="%25">
                <label class="col-form-label">{{$t('lbl.about')}}</label>
              </td>
              <td width="%75">
                <auto-height-text-area
                  v-model="user.user_details.about"
                  id="about_me"
                  :placeholder="$t('lbl.about')"
                  :bus="bus"
                />
                <div
                  v-text="aboutMaxCharacter"
                  style="text-align: right"
                  :class="aboutMaxCharacter <= 0 && 'aboutMaxCharacter'"
                ></div>
              </td>
            </tr>

            <tr>
              <td width="%25">
                <label class="col-form-label">{{$t('lbl.facebook_url')}}</label>
              </td>
              <td width="%75">
                <input
                  type="text"
                  class="form-control"
                  id="facebook_url"
                  :placeholder="$t('lbl.facebook_url')"
                  v-model="user.user_details.facebook_url"
                />
              </td>
            </tr>
            <tr>
              <td width="%25">
                <label class="col-form-label">{{$t('lbl.instagram_url')}}</label>
              </td>
              <td width="%75">
                <input
                  type="text"
                  class="form-control"
                  id="instagram_url"
                  :placeholder="$t('lbl.instagram_url')"
                  v-model="user.user_details.instagram_url"
                />
              </td>
            </tr>
            <tr>
              <td width="%25">
                <label class="col-form-label">{{$t('lbl.twitter_url')}}</label>
              </td>
              <td width="%75">
                <input
                  type="text"
                  class="form-control"
                  id="twitter_url"
                  :placeholder="$t('lbl.twitter_url')"
                  v-model="user.user_details.twitter_url"
                />
              </td>
            </tr>
            <tr>
              <td width="%25">
                <label class="col-form-label">{{$t('lbl.skype_url')}}</label>
              </td>
              <td width="%75">
                <input
                  type="text"
                  class="form-control"
                  id="skype_url"
                  :placeholder="$t('lbl.skype_url')"
                  v-model="user.user_details.skype_url"
                />
              </td>
            </tr>
            <tr>
              <td width="%25">
                <label class="col-form-label">{{$t('lbl.web_url')}}</label>
              </td>
              <td width="%75">
                <input
                  type="text"
                  class="form-control"
                  id="web_url"
                  :placeholder="$t('lbl.web_url')"
                  v-model="user.user_details.web_url"
                />
              </td>
            </tr>
            <tr>
              <td width="%25">
                <label class="col-form-label">{{$t('lbl.another_url')}}</label>
              </td>
              <td width="%75">
                <input
                  type="text"
                  class="form-control"
                  id="another_url"
                  :placeholder="$t('lbl.another_url')"
                  v-model="user.user_details.another_url"
                />
              </td>
            </tr>
          </table>
          <table v-else="isFreezeRoute" class="col-md-12 profile-table">
            <tr>
              <td colspan="3">
                <div class="text-danger">{{$t('lbl.profile_approved_page_message')}}</div>
              </td>
            </tr>
            <tr>
              <td width="%25">
                <label for="name">{{$t('lbl.valid_identity')}}</label>
              </td>
              <td width="%75">
                <div class="float-left mt-3">{{$t('lbl.valid_identity')}}</div>
                <div class="boxImageNationality mr-3 float-right" v-if="isLoading">
                  <div class="camera float-left" @click="newImage('un')">
                    <img :src="userNationality" @error="brokenImage" width="100%" height="100%" />
                    <!--@error="brokenImage"-->
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td width="%25">
                <label for="name">{{$t('lbl.recent_picture')}}</label>
              </td>
              <td width="%75">
                <div class="float-left mt-3">{{$t('lbl.recent_picture')}}</div>
                <div class="boxImageNationality mr-3 float-right" v-if="isLoading">
                  <div class="camera float-left" @click="newImage('up')">
                    <img :src="userPortrait" @error="brokenImage" width="100%" height="100%" />
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="card-footer" style="padding: 12px 16px;">
        <button
          class="btn"
          @click="deleteAccount"
          :disabled="deleting"
        >{{saving? $t('lbl.processing') : $t('lbl.delete_account')}}</button>
        <div class="float-right" v-if="isLoading">
          <button
            class="btn btn-optimal"
            @click="saveProfile"
            :disabled="saving"
          >{{saving? $t('lbl.saving') : $t('lbl.save')}}</button>
        </div>
      </div>
      <div>
        <modal
          name="upload-modal"
          height="auto"
          :draggable="true"
          :classes="['v--modal', 'm-modal']"
        >
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col">
                  <h4 class="mt-0 float-left">{{$t('lbl.new_image')}}</h4>
                  <i
                    class="fa fa-times fa-2x btn-modal-close text-success"
                    slot="top-right"
                    @click="$modal.hide('upload-modal')"
                  ></i>
                  <br />
                  <hr />
                  <file-upload
                    :uploadType="uploadType"
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
              @click="$modal.hide('upload-modal')"
            >{{$t('lbl.cancel')}}</button>
            <button
              style="width: auto !important; padding: 8px 16px !important;"
              type="button"
              class="btn btn-optimal btn-sm px-4"
              :class="[uploadedImage == null ? 'disabled' : '']"
              :disabled="uploadedImage == null"
              @click.prevent="saveImage"
            >{{$t('lbl.button_add_image')}}</button>
          </div>
        </modal>
      </div>
      <modal name="verify-code" height="auto">
        <div class="modal-header">
          <h3>{{$t('lbl.sms_verify_code')}}</h3>
          <a href="javascript:;" @click="$modal.hide('verify-code')">X</a>
        </div>
        <div class="modal-body">
          <div class="col-md-12 group mb-3">
            <input type="text" required="required" v-model="verfiyCode" />
            <label>{{$t('lbl.sms_verify_code')}}</label>
            <div class="text-danger"></div>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="$modal.hide('verify-code')"
            >{{$t('lbl.cancel')}}</button>
            <button
              :disabled="savingPhone"
              class="btn btn-optimal"
              @click="saveNewPhoneNumber"
            >{{savingPhone ? $t('lbl.saving') : $t('lbl.save')}}</button>
          </slot>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AutoHeightTextArea from "~/components/common/AutoHeightTextArea.vue";
import FileUpload from "~/components/common/FileUpload.vue";
import img4040 from "~/assets/img/user_40x40.png";
import camera80 from "~/assets/img/camera_80.png";
import Vue from "vue";
export default {
  components: {
    FileUpload,
    AutoHeightTextArea
  },
  computed: {
    ...mapState("state_definition", {
      countries: state => state.countries
    })
  },
  data() {
    return {
      defaultCountry: null,
      savingPhone: false,
      sending: false,
      emailSending: false,
      saving: false,
      deleting: false,
      user: [],
      isVerifyRoute: false,
      isFreezeRoute: false,
      isLoading: false,
      verfiyCode: null,
      yearsArray: [],
      day: 0,
      month: 0,
      year: 0,
      cities: [],
      phone: "",
      user_phone: null,
      cdnUrl: process.env.cdn_url,
      baseUrl: process.env.base_url,
      imageUrl: `/images/user/`,
      uploadedImage: null,
      imageSize: {
        width: 240,
        height: 240
      },
      thumbnailSize: {
        width: 280,
        height: 280
      },
      selectedCountry: null,
      selectedCity: null,
      uploadType: "us",
      userPortrait: null,
      userNationality: null,
      aboutMaxCharacter: 1000,
      bus: new Vue()
    };
  },
  watch: {
    selectedCountry: function(item) {
      if (item !== undefined && item !== "") {
        this.getCityList(item);
      }
    },
    isLoading: function(item) {
      return item;
    },
    isFreezeRoute: function(item) {
      return item;
    },
    phone: function(item) {
      console.log(item);
    },
    "user.user_details.about": function(item) {
      const length = item ? item.length : 0;
      this.aboutMaxCharacter = 1000 - length;
      return item;
    }
  },
  created() {
    if (process.client) {
      let query = window.location.search.split("?");
      if (query.length > 1) {
        let param = query[1].split("=")[1];
        if (param === "verify") {
          this.isVerifyRoute = true;
        }

        if (param === "approve") {
          this.isFreezeRoute = true;
        }
      }
      this.getProfile();
      this.bus.$on("autoTextArea", value => {
        this.user.user_details.about = value;
      });
    }
  },
  methods: {
    deleteAccount() {
      if (confirm(this.$t("lbl.delete_account_sure"))) {
        this.deleting = true;
        this.$store
          .dispatch("state_definition/deleteAccount")
          .then(response => {
            this.$toast.success(this.$t("lbl.delete_account_success"));
            this.deleting = false;
          })
          .catch(() => {
            this.deleting = false;
          });
      }
    },
    newImage(type) {
      this.uploadType = type;
      this.$modal.show("upload-modal");
    },
    saveImage: function() {
      let image = null;
      let action = null;

      if (this.uploadType === "us") {
        this.user.user_details.profile_image = this.uploadedImage.name;
        image = this.uploadedImage.name;
        action = "state_definition/updateProfileImage";
      }

      if (this.uploadType === "un") {
        this.user.national_image = this.uploadedImage.name;
        image = this.uploadedImage.name;
        action = "state_definition/updateNational";
      }

      if (this.uploadType === "up") {
        this.user.portrait_image = this.uploadedImage.name;
        image = this.uploadedImage.name;
        action = "state_definition/updatePortrait";
      }

      this.cdnUrl = this.uploadedImage.cdnPath;
      this.imageUrl = this.uploadedImage.name;
      this.uploadedImage = null;
      this.isChanged = true;
      this.$modal.hide("upload-modal");

      this.$store.dispatch(action, { image: image }).then(response => {
        if (this.uploadType === "us") {
          location.reload();
        }
        this.$toast.success(this.$t("msg.saved"));
      });
    },
    getProfile() {
      this.$store.dispatch("state_definition/getProfile").then(response => {
        this.user = response;
        this.isLoading = true;
        this.selectedCountry = this.user.country_id;
        this.selectedCity = this.user.city_id;
        this.defaultCountry = this.countries.find(
          x => x.id === parseInt(response.country_id)
        ).code;
        this.phone = this.user.user_details.phone_number
          ? this.user.user_details.phone_number
          : "";
        this.imageUrl = `${this.cdnUrl}/images/user/${this.user.user_details.profile_image}`;
        this.userPortrait = `${this.cdnUrl}/images/user_portrait/${this.user.portrait_image}`;
        this.userNationality = `${this.cdnUrl}/images/user_nationality/${this.user.national_image}`;
        if (this.user.user_details.birthdate) {
          this.getDay(this.user.user_details.birthdate);
          this.getMonth(this.user.user_details.birthdate);
          this.getYear(this.user.user_details.birthdate);
        }
        this.aboutMaxCharacter =
          this.aboutMaxCharacter -
          (this.user.user_details.about
            ? this.user.user_details.about.length
            : 0);
      });
    },
    brokenImage(event) {
      event.target.src = camera80;
    },
    brokenUrl(event) {
      event.target.src = img4040;
    },
    saveProfile() {
      this.user.country_id = this.selectedCountry;
      this.user.city_id = this.selectedCity;
      this.user.user_details.phone_number = this.phone;
      if (this.year && this.month && this.day) {
        this.user.user_details.birthdate =
          this.year + "-" + this.month + "-" + this.day;
      } else {
        this.user.user_details.birthdate = null;
      }

      if (this.aboutMaxCharacter <= 0) {
        this.$toast.error(this.$t("msg.error_max_about_character"));
        return;
      }
      this.saving = true;
      this.$store
        .dispatch("state_definition/updateProfile", { user: this.user })
        .then(response => {
          this.saving = false;
          this.$toast.success(this.$t("msg.profile_updated"));
        })
        .catch(() => (this.saving = false));
    },
    uploadSuccess: function(response) {
      if (response && response.result.set) {
        this.uploadedImage = response.result.set[0];

        if (this.uploadType === "un") {
          this.userNationality =
            this.baseUrl + this.uploadedImage.cdnPath + this.uploadedImage.name;
        }

        if (this.uploadType === "up") {
          this.userPortrait =
            this.baseUrl + this.uploadedImage.cdnPath + this.uploadedImage.name;
        }

        if (this.uploadType === "us") {
          this.imageUrl =
            this.baseUrl + this.uploadedImage.cdnPath + this.uploadedImage.name;
        }
      }
    },
    onInput({ number, country }) {
      if (number.e164 !== undefined) {
        this.user_phone = number.e164.replace("+", "");
      }
    },
    getDay(date) {
      let dateObj = new Date(date);
      this.day = dateObj.getDate();
    },
    getMonth(date) {
      let dateObj = new Date(date);
      this.month = dateObj.getMonth() + 1;
    },
    getYear(date) {
      let dateObj = new Date(date);
      this.year = dateObj.getFullYear();
    },
    getCityList(item) {
      this.$store
        .dispatch("state_definition/getCityList", { country: item })
        .then(response => {
          this.cities = response;
        });
    },
    changeEmailAddress() {
      if (this.user.email == null || this.user.email === "") {
        this.$toast.error(this.$t("msg.email_required", { duration: 5000 }));
        return;
      }
      this.loading = true;
      this.emailSending = true;
      let data = {
        method: "postData",
        url: "email-change",
        data: {
          email: this.user.email
        }
      };
      return this.$store
        .dispatch("state_definition/userController", data)
        .then(response => {
          this.sending = false;
          this.emailSending = false;
          if (response.message === "msg.error.email_already_used") {
            this.$toast.error(this.$t("msg.error_email_already_used"), {
              duration: 5000
            });
          } else {
            this.$toast.success(this.$t("msg.email_change_sent"), {
              duration: 5000
            });
          }
        })
        .catch(() => (this.emailSending = false));
    },
    changeSendVerifySms() {
      if (this.user_phone == null || this.user_phone === "") {
        this.$toast.error(
          this.$t("msg.phone_number_required", { duration: 5000 })
        );
        return;
      }
      this.loading = true;
      this.sending = true;
      this.successSendSms = false;

      let data = {
        method: "postData",
        url: "send-sms-verify",
        data: {
          phone_number: this.user_phone
        }
      };
      return this.$store
        .dispatch("state_definition/userController", data)
        .then(response => {
          this.sending = false;
          this.$toast.success(this.$t("msg.verify_sms_sent"), {
            duration: 5000
          });
          this.$modal.show("verify-code");
        })
        .catch(() => (this.sending = false));
    },
    saveNewPhoneNumber() {
      if (
        this.user_phone == null ||
        this.user_phone === "" ||
        this.verfiyCode === null ||
        this.verfiyCode === ""
      ) {
        this.$toast.error(this.$t("msg.sms_verify_code_required"));
        return;
      }
      this.savingPhone = true;
      this.$store
        .dispatch("state_definition/savePhoneNumber", {
          to: this.user_phone,
          verify_code: this.verfiyCode
        })
        .then(response => {
          this.savingPhone = false;
          this.$toast.success(this.$t("msg.phone_number_saved"));
          this.$modal.hide("verify-code");
        })
        .catch(() => (this.savingPhone = false));
    }
  }
};
</script>

<style>
.ProfilePage label {
  text-transform: inherit !important;
}
.vue-tel-custom {
  border: 1px solid #ced4da !important;
  height: 40px !important;
}
.vue-tel-input:focus-within {
  box-shadow: none !important;
  border-color: #ccdcff !important;
}
.autosize-textarea {
  padding: 8px;
  border: 1px solid #aeaeae;
  resize: none;
  overflow: hidden;
}
.isRealProfile {
  background: #3a99ab;
  color: #fff;
  padding: 3px;
  font-size: 10px;
  border-radius: 10px;
  float: right;
  margin-top: 5px;
  margin-left: 5px;
}
.camera {
  cursor: pointer;
  width: 40px;
  height: 60px;
}

.camera img {
  margin-top: 10px;
}

.verify-input {
  border: 1px solid red !important;
}
.boxImage {
  width: 60px;
  height: 60px;
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
  width: 60px;
  height: 60px;
}
.iconbox-60 {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.Grg65b {
  background-color: rgba(32, 33, 36, 0.6);
  bottom: 0;
  height: 20px;
  left: 0;
  position: absolute;
  right: 0;
}
.EJFIFb {
  background-image: url(//www.gstatic.com/images/icons/material/system/2x/photo_camera_white_24dp.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20px 20px;
  height: 100%;
  opacity: 0.8;
}
.btn-modal-close {
  float: right;
}
.fa-check-green {
  color: green !important;
}
.image_upload {
  width: 90% !important;
}
.profile-table tr {
  height: 60px;
}
#profileForm input {
  float: right;
}
.image-container {
  padding: 10px;
}
.image-container img {
  max-width: 100%;
  max-height: 100%;
}
.upload-container {
  border-top: 1px solid #ebebeb;
  text-align: center;
  display: block;
  padding-top: 10px;
  width: 100%;
}
.no-image {
  display: block;
  min-height: 120px;
  line-height: 120px;
  text-align: center;
  width: 100%;
}
.no-image > i {
  color: #ccc;
}
.btn.btn-fill {
  color: #ffffff;
  background-color: #888888;
  opacity: 1;
  filter: alpha(opacity=100);
  width: 80%;
  filter: alpha(opacity=100);
  margin: 10px;
}
.form-image-upload {
  border: 1px solid #e3e3e3;
  border-radius: 6px;
}
</style>
