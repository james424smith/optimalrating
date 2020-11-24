<template>
  <div class="register">
    <modal name="register-modal" height="auto">
      <div class="modal-header" style="border-bottom: none">
        <h3></h3>
        <a href="javascript:;" @click="closeModal">X</a>
      </div>
      <div class="modal-body">
        <div class="col-lg-12 float-left">
          <!-- Register Form Created -->
          <div id="contactForm" class="row login_form">
            <div class="text-danger" v-text="(error.global)"></div>

            <div class="col-md-12 form-group">
              <div class="group col-md-4 float-left pr-1">
                <input type="text" required="required" v-model="register.firstname" />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>{{$t('lbl.firstname')}}</label>
                <div
                  v-if="showError && !register.firstname"
                  class="text-danger"
                >{{$t("msg.register_firstname_required")}}</div>
              </div>
              <div class="group col-md-4 float-left pr-1">
                <input type="text" required="required" v-model="register.middle_name" />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>{{$t('lbl.middle_name')}}</label>
                <div class="text-danger" v-text="(error.middle_name)"></div>
              </div>
              <div class="group col-md-4 float-right">
                <input type="text" required="required" v-model="register.lastname" />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>{{$t('lbl.lastname')}}</label>
                <div
                  v-if="showError && !register.lastname"
                  class="text-danger"
                >{{this.$t("msg.register_lastname_required")}}</div>
              </div>
            </div>
            <div class="col-md-12 form-group">
              <vue-tel-input
                :placeholder="$t('lbl.phone_number')"
                v-model="phone"
                @onInput="onInput"
                :enabledCountryCode="true"
                :preferredCountries="['us', 'gb', 'ua']"
              ></vue-tel-input>
              <div
                v-if="showError && !phone"
                class="text-danger"
              >{{$t("msg.phone_number_required")}}</div>
            </div>
            <div class="col-md-12 form-group">
              <div class="group col-md-12">
                <input type="text" required="required" v-model="register.email" />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>{{$t('lbl.user_email')}}</label>
                <div
                  v-if="showError && !register.email"
                  class="text-danger"
                >{{$t("msg.mail_required")}}</div>
              </div>
            </div>

            <div class="col-md-12 form-group">
              <div class="group col-md-12">
                <input type="password" required="required" v-model="register.password" />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>{{$t('lbl.password')}}</label>
                <div
                  v-if="showError && !register.password"
                  class="text-danger"
                >{{$t("msg.password_required")}}</div>
              </div>
            </div>

            <div class="col-md-12 form-group">
              <div class="group col-md-12">
                <input type="password" required="required" v-model="register.confirm" />
                <span class="highlight"></span>
                <span class="bar"></span>
                <label>{{$t('lbl.user_password_confirm')}}</label>
                <div
                  v-if="showError && !register.confirm"
                  class="text-danger"
                >{{$t('msg.password_confirm_required')}}</div>
              </div>
            </div>
            <!--  -->
          </div>
          <div
            style="text-align: center; margin-bottom: 10px"
            v-if="showError && (register.confirm !== register.password)"
            class="text-danger"
          >{{$t('msg.error_password_not_match')}}</div>
          <!-- Register Form Created -->
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="modal-footer" style="padding: 16px 32px">
        <slot name="footer">
          <a
            href="javascript:;"
            @click="onLoginClick"
            style="margin-right: auto"
          >{{$t('lbl.login')}}</a>
          <button class="btn btn-secondary" @click="closeModal">{{$t('lbl.cancel')}}</button>
          <button
            class="btn btn-optimal"
            @click="checkRegister"
            :disabled="registering"
          >{{registering ? $t('lbl.registering') : $t('lbl.register')}}</button>
        </slot>
      </div>
    </modal>
    <modal name="smsverify-modal" height="auto">
      <div class="modal-header" style="border-bottom: none">
        <h3></h3>
        <a href="javascript:;" @click="$modal.hide('smsverify-modal')">X</a>
      </div>
      <div class="modal-body">
        <div class="col-md-11 form-group">
          <div class="group col-md-12 float-left">
            <input type="text" required="required" v-model="register.sms_verify_code" />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label style="text-transform:none">{{$t('lbl.sms_verify_code')}}</label>
            <div class="text-danger text-right" v-text="(error.sms_verify_code)"></div>
          </div>
          <div class="smsSend text-left col-md-12 float-right mt-3 mb-2">
            <p style="color: black;font-size: 9px;text-align: left;">
              {{$t('lbl.free_sms_info')}}
              &nbsp;
              <a
                href="javascript:;"
                @click="sendVerifySms"
              >{{$t('lbl.send_again')}}</a>
              <a class="spinner" v-if="loading"></a>
              <a class="success-send-sms" style="color: green" v-if="successSendSms">
                <span class="fa fa-check"></span>
              </a>
            </p>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="clearfix"></div>
      <div class="modal-footer">
        <slot name="footer">
          <button
            class="btn btn-secondary"
            @click="$modal.hide('smsverify-modal')"
          >{{$t('lbl.cancel')}}</button>
          <button
            class="btn btn-optimal"
            @click="registerSave"
            :disabled="verifying"
          >{{verifying ? $t('lbl.verifying') : $t('lbl.verify')}}</button>
        </slot>
      </div>
    </modal>

    <modal name="reset-password-modal" height="auto">
      <div class="modal-header" style="border-bottom: none">
        <h3></h3>
        <a href="javascript:;" @click="$modal.hide('reset-password-modal')">X</a>
      </div>
      <div class="modal-body">
        <div class="col-12">
          {{$t('msg.error_email_already_used')}} {{$t('lbl.if_you_want_reset_your_password')}}
          <a
            href="forgot-password"
          >{{$t('lbl.click_here')}}</a>
        </div>
      </div>
    </modal>
  </div>
</template>
<style>
.btn-optimal {
  background: #3a99ab;
  color: white;
}
.btn {
  padding: 0.5rem;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.spinner:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 35%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  border-radius: 50%;
  border: 2px solid #ccc;
  border-top-color: #000;
  animation: spinner 0.6s linear infinite;
}
</style>
<script>
import { Register } from "~/models/definition";
import { mapState } from "vuex";
export default {
  data() {
    return {
      selectedCountry: "tr",
      registering: false,
      verifying: false,
      register: new Register(),
      error: new Register(),
      phone: "",
      loading: false,
      successSendSms: false,
      showError: false,
      already_message: null
    };
  },
  computed: {
    ...mapState("state_definition", {
      state: state => state
    })
  },
  mounted() {
    this.register = new Register();
  },
  methods: {
    onLoginClick() {
      this.$modal.hide("register-modal");
      this.$modal.show("login-modal");
    },
    onInput({ number, country }) {
      this.selectedCountry = country.iso2.toLowerCase();
      if (number.e164 !== undefined) {
        this.register.phone_number = number.e164.replace("+", "");
      }
    },

    checkRegister() {
      this.error = new Register();
      this.showError = true;

      if (this.register.firstname == null) {
        this.error.firstname = this.$t("msg.register_firstname_required");
      }

      if (this.register.firstname == null) {
        this.error.lastname = this.$t("msg.register_lastname_required");
      }

      if (this.register.phone_number == null) {
        this.error.phone_number = this.$t("msg.phone_number_required");
      }

      if (this.register.email == null) {
        this.error.email = this.$t("msg.mail_required");
      }

      if (this.register.password == null) {
        this.error.password = this.$t("msg.password_required");
      }

      if (
        this.register.password !== this.register.confirm ||
        this.register.confirm == null ||
        this.register.confirm == ""
      ) {
        this.error.confirm = this.$t("msg.password_confirm_required");
      }

      if (
        this.error.firstname ||
        this.error.phone_number ||
        this.error.sms_verify_code ||
        this.error.email ||
        this.error.password ||
        this.error.confirm
      ) {
        return;
      }
      this.registering = true;
      let data = {
        method: "postData",
        url: "send-sms-verify",
        data: {
          phone_number: this.register.phone_number
        }
      };

      this.actions(data)
        .then(response => {
          this.registering = false;
          if (response.code != 200) {
            this.$toast.error(this.$t("msg.error_register_failed"));
            return;
          }
          this.$modal.show("smsverify-modal");
        })
        .catch(error => {
          /**@todo error içinden mesaj alınacak **/
          this.registering = false;
          this.$toast.error(this.$t("msg.error_send_verify_sms"));
        });
    },

    registerSave() {
      if (this.register.sms_verify_code == null) {
        this.error.sms_verify_code = this.$t("msg.sms_verify_code_required");
        return;
      }
      this.verifying = true;
      let data = {
        method: "postData",
        url: "check-sms-verify",
        data: {
          sms_verify_code: this.register.sms_verify_code,
          phone_number: this.register.phone_number
        }
      };

      this.actions(data)
        .then(response => {
          this.verifying = false;
          if (response.code != 200) {
            this.$toast.error(this.$t("msg.verify_code_not_correct"));
            return;
          }
          this.$modal.hide("smsverify-modal");
          this.saveUser();
        })
        .catch(() => (this.verifying = false));
    },

    sendVerifySms() {
      if (
        this.register.phone_number == null ||
        this.register.phone_number === ""
      ) {
        this.$toast.error(
          this.$t("msg.phone_number_required", { duration: 5000 })
        );
        return;
      }

      this.loading = true;
      this.successSendSms = false;

      let data = {
        method: "postData",
        url: "send-sms-verify",
        data: {
          phone_number: this.register.phone_number
        }
      };

      this.actions(data).then(response => {
        this.loading = false;
        if (response.code !== 200) {
          this.successSendSms = false;
          this.$toast.error(this.$t("msg.error_send_verify_sms"), {
            duration: 5000
          });
        } else {
          this.successSendSms = true;
          this.$toast.success(this.$t("msg.verify_sms_sent"), {
            duration: 5000
          });
        }
      });
    },

    closeModal() {
      this.$modal.hide("register-modal");
    },

    saveUser() {
      this.$store
        .dispatch("state_definition/registerUser", {
          register: { ...this.register, country: this.selectedCountry }
        })
        .then(response => {
          if (response.code == 409) {
            this.already_message = response.message;
            this.$modal.show("reset-password-modal");
            return;
          }
          this.$toast.success(this.$t("msg.register_success"));
          location.reload();
          this.$modal.hide("register-modal");
        })
        .catch(error => {
          this.$toast.error(this.$t("msg.error_register_failed"), {
            duration: 5000
          });
        });
    },

    actions(data) {
      return this.$store.dispatch("state_definition/userController", data);
    }
  }
};
</script>














