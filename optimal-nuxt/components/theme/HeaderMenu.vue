<template>
    <header class="main-header " id="header">
        <no-ssr>
            <register-modal/>
            <login-modal/>
            <profile-verify-modal :user="user"/>
        </no-ssr>
    </header>
</template>


<script>
  import {mapState} from 'vuex';
  import RegisterModal from '@/components/theme/Register';
  import LoginModal from '@/components/theme/Login';
  import ProfileVerifyModal from '@/components/theme/ProfileVerify';
  import img4040 from '~/assets/img/user_40x40.png';
  export default {
    components:{
      RegisterModal, LoginModal, ProfileVerifyModal
    },
    data(){
      return {
        userLogin : false,
        cdn_url : process.env.cdn_url,
        toggle : true
      }
    },
    computed:{
      ...mapState('state_definition',{
        'countries' : state => state.countries,
        'user' : state => state.user,
      })
    },
    created(){
      this.$store.dispatch('state_definition/checkLogin').then(response =>{
        this.userLogin = true;
      }).catch(error =>{
        this.userLogin = false;
      });
      this.$store.dispatch('state_definition/getAllLangCountries');
    },
    methods:{
      brokenUrl(event) {
        event.target.src = img4040;
      },
      changeLanguage(code){
        this.$i18n.locale = code;
        localStorage.setItem('country', code);
        this.$store.dispatch('state_definition/getAllCategory');
        this.$store.dispatch('state_definition/getHomeSpecialSurvey');
        this.$store.dispatch('state_definition/getHomeSurveyApproval');
      },
      loginPopup(){
        this.$modal.show('login-modal');
      },
      registerPopup(){
        this.$modal.show('register-modal');
      },
      logout (){
        localStorage.clear();
        window.location.replace('/');
      },
      navToggle(){
        this.toggle = !this.toggle;

        let element = document.getElementById('body');
        let pageWrapper = document.getElementById('pageWrapper');

        if (this.toggle) {
          element.classList.add('sidebar-minified-out');
          element.classList.remove('sidebar-minified');
          pageWrapper.classList.add('pageTogglePadding')
        }else {
          element.classList.remove('sidebar-minified-out');
          element.classList.add('sidebar-minified');
          pageWrapper.classList.remove('pageTogglePadding')
        }
      }
    }
  }
</script>


<style>
    .imagebox-30{
        width: 25px;
        height:  25px;
        border-radius:50px;
        overflow: hidden;
        margin: 0 auto;
        cursor: pointer;
        background: black;
    }
    .navbar {
        min-height: 56px !important;
    }
    .navbar-expand-lg{
        height: 56px !important;
    }
    .search-form{
        height: 32px;
        max-width: 640px;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        padding-right: 0;

    }
    .input-group{
        height: 32px;
    }
    #search-btn {
        position: relative;
        left: 0;
        top: -32px;
        /* right: 100px; */
        float: right;
        height: 32px;
        width: 65px;
        background: #f8f8f8;
        border: 1px solid #d3d3d3;

        border-radius: 0 2px 2px 0;

        cursor: pointer;

    }
    #search-btn i{
        top: -2px;
        padding-top: 0;
        position: relative;
        color: #999;
    }
    #search-btn i:before{
        line-height: normal;
    }
</style>
