<template>
  <modal name="login-modal" :width="300" :height="450" ref="modalLogin">
    <div class="modal-header" style="border-bottom: none">
      <h3></h3>
      <a href="javascript:;" @click="$modal.hide('login-modal')">X</a>
    </div>
    <div class="modal-body">
      <div class="col-lg-12 float-left">
        <div class="login_form_inner">
          <div class="text-danger"></div>
          <div id="contactForm" class="row login_form">
            <social-login></social-login>

            <div class="col-md-12 group mb-3">
              <input type="text" required="required" v-model="email" />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>{{$t('lbl.user_email')}}</label>
              <div class="text-danger"></div>
            </div>
            <br />
            <div class="col-md-12 group">
              <input type="password" required="required" v-model="password" />
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>{{$t('lbl.password')}}</label>
              <div class="text-danger"></div>
              <div class="text-danger"></div>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="modal-footer">
      <slot name="footer">
        <div style="width: 100%">
          <div style="margin-bottom: 15px">
            {{$t('lbl.if_you_want_reset_your_password')}} <a href="forgot-password">{{$t('lbl.click_here')}}</a>
          </div>
          <button
            class="btn btn-optimal"
            style="width:100% !important;"
            @click="login"
            :disabled="saving"
          >{{saving ? $t('lbl.logging_in') : $t('lbl.login')}}</button>
          <div style="text-align: center; margin-top: 5px">
            <a href="javascript:;" @click="onRegisterClick">{{$t('lbl.register')}}</a>
          </div>
        </div>
      </slot>
    </div>
  </modal>
</template>
<style>
</style>
<script>
import SocialLogin from "../common/SocialLogin";
export default {
  components: {
    SocialLogin
  },
  data() {
    return {
      saving: false,
      email: null,
      password: null,
      googleSignInParams: {
        client_id:
          "722889493686-63jca5m719trfc5dgf4q3g1b12ena4it.apps.googleusercontent.com"
      }
    };
  },
  methods: {
    onRegisterClick() {
      this.$modal.hide("login-modal");
      this.$modal.show("register-modal");
    },
    login() {
      if (
        this.email == null ||
        this.email == "" ||
        this.password == null ||
        this.password == ""
      ) {
        this.$toast.error(this.$t("msg.error_username_required"));
        this.$toast.error(this.$t("msg.error_password_required"));
        return;
      }
      this.saving = true;
      this.$store
        .dispatch("state_definition/login", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.saving = false;
          if (response && response.code && response.code === 401) {
            this.$toast.error(this.$t("msg.error_invalid_login"));
          } else {
            this.$toast.success(this.$t("msg.login_success"));
            location.reload();
            this.$modal.hide("login-modal");
          }
        })
        .catch(() => (this.saving = false));
    }
  }
};
</script>
<style>
.btn-optimal {
  background: #3a99ab;
  color: white;
}
.btn {
  padding: 0.5rem;
}
</style>
