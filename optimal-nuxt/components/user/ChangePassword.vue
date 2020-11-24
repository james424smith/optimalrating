<template>
  <div class="col-9 float-right">
    <div class="card card-default">
      <div class="card-body" style="padding: 12px 0;">
        <div class="col-12 mt-2">
          <div class="col-3 float-left" style="line-height: 40px;">
            <label for="password">{{$t('lbl.old_password')}}</label>
          </div>
          <div class="col-9 float-left">
            <input type="password" id="oldPassword" class="form-control" v-model="oldPassword" />
            <div
              class="text-danger text-right"
              v-if="oldPasswordError"
            >{{$t('msg.old_password_required')}}</div>
          </div>
          <div class="clearfix"></div>
        </div>
        <hr />
        <div class="col-12 mt-2">
          <div class="col-3 float-left" style="line-height: 40px;">
            <label for="password">{{$t('lbl.password')}}</label>
          </div>
          <div class="col-9 float-left">
            <input type="password" id="password" class="form-control" v-model="password" />
            <div class="text-danger text-right" v-if="passwordError">{{$t('msg.password_required')}}</div>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="col-12 mt-2">
          <div class="col-3 float-left" style="line-height: 40px;">
            <label for="passwordConfirm">{{$t('lbl.password_confirm')}}</label>
          </div>
          <div class="col-9 float-left">
            <input
              type="password"
              id="passwordConfirm"
              class="form-control"
              v-model="passwordConfirm"
            />
            <div
              class="text-danger text-right"
              v-if="passwordConfirmError"
            >{{$t('msg.password_confirm_required')}}</div>
            <div
              class="text-danger text-right"
              v-if="confirmError"
            >{{$t('msg.error_password_not_match')}}</div>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
      <div class="card-footer" style="padding: 12px 30px;">
        <div class="float-right">
          <button
            :disabled="saving"
            class="btn btn-optimal"
            @click="savePassword"
          >{{saving ? $t('lbl.saving') : $t('lbl.save')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
</style>

<script>
export default {
  data() {
    return {
      saving: false,
      password: null,
      oldPassword: null,
      passwordConfirm: null,
      passwordError: false,
      oldPasswordError: false,
      passwordConfirmError: false,
      confirmError: false
    };
  },
  methods: {
    savePassword() {
      this.passwordConfirmError = false;
      this.passwordError = false;
      this.confirmError = false;
      this.oldPasswordError = false;

      if (this.password === null || this.password === "") {
        this.passwordError = true;
      }

      if (this.passwordConfirm === null || this.passwordConfirm === "") {
        this.passwordConfirmError = true;
      }

      if (this.password !== this.passwordConfirm) {
        this.confirmError = true;
      }

      if (
        this.passwordConfirmError ||
        this.passwordError ||
        this.confirmError
      ) {
        return;
      }

      let data = {
        url: "check-password",
        method: "postData",
        data: { password: this.oldPassword }
      };
      this.saving = true;
      this.actions(data)
        .then(response => {
          if (response.code !== 200) {
            this.passwordConfirmError = false;
            this.$toast.error(this.$t('msg.error_old_password_wrong'));
            return;
          }
          this.changePassword();
        })
        .catch(() => (this.saving = false));
    },

    changePassword() {
      let data = {
        url: "password-change",
        method: "postData",
        data: { password: this.password }
      };
      this.actions(data)
        .then(response => {
          this.saving = false;
          if (response.code !== 200) {
            this.oldPasswordError = true;
            this.$toast.error(this.$t('msg.error_password_change'));
            return;
          }
          this.passwordConfirm = null;
          this.password = null;
          this.oldPassword = null;
          this.$toast.success(this.$t('msg.password_changed'));
        })
        .catch(() => (this.saving = false));
    },
    actions(data) {
      return this.$store.dispatch("state_definition/userController", data);
    }
  }
};
</script>
