<template>
    <div class="col-12 p-0">
        <div class="group mb-3">
            <g-signin-button
                    class="btn btn-block btn-social btn-google col-12"
                    style="width:100% !important; background: #DD4B39; color:#fff"
                    :params="googleSignInParams"
                    @success="onSignInSuccessGoogle"
                    @error="onSignInError">
                <span class="fa fa-google"></span>Google
            </g-signin-button>
        </div>
        <div class="group mb-3">
            <fb-signin-button
                    class="btn btn-block btn-social btn-facebook col-12"
                    style="width:100% !important; color:#fff"
                    :params="fbSignInParams"
                    @success="onSignInSuccessFacebook"
                    @error="onSignInError">
                <span class="fa fa-facebook"></span>Facebook
            </fb-signin-button>
        </div>
        <hr>
    </div>
</template>
<style>

</style>
<script>
  export default {

    data(){

      return {
        googleSignInParams: {
          client_id: '722889493686-63jca5m719trfc5dgf4q3g1b12ena4it.apps.googleusercontent.com'
        },
        fbSignInParams: {
          scope: 'email,user_likes',
          return_scopes: true
        }
      }
    },
    methods:{
      onSignInSuccessGoogle (response) {
        this.loginSocial(response.getAuthResponse().id_token, 'google');
      },
      onSignInSuccessFacebook (response) {
        this.loginSocial(response.authResponse.accessToken, 'facebook');
      },
      loginSocial(token, social){
        this.$store.dispatch('state_definition/login',{token:token, social:social})
          .then(response =>{
            if (response && response.code && response.code === 401) {
              this.$toast.error(this.$t('msg.login_failed'));
            }else {
              this.$toast.success(this.$t('msg.login_success'));
              location.reload();
              this.$modal.hide('login-modal');
            }
          });
      },
      onSignInError (error) {
        console.log('OH NOES', error)
      },
    }
  }
</script>
