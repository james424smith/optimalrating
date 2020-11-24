<template>
    <div  class="sidebar-fixed sidebar-dark header-light header-fixed sidebar- " id="body">
        <div class="mobile-sticky-body-overlay"></div>
        <no-ssr>
            <nav class="navbar navbar-static-top navbar-expand-lg"
                 style="position:fixed; width: 100%; z-index:1000">
                <!-- Sidebar toggle button -->
                <nuxt-link to="/" class="dropdown-toggle logo-toggle">
                    <img src="~/assets/img/logo.png" alt="Optimal Rating Logo" style="height: 45px; margin-left: 10px; margin-right: auto; margin-right: 50px">
                </nuxt-link>
                <!-- search form -->
                <div class="search-form d-none d-lg-inline-block container">
                    <div class="input-group">
                        <input type="text" name="query" id="search-input" class="form-control" placeholder="Aramak istediğiniz metni giriniz."
                               autofocus autocomplete="off" />
                    </div>
                    <button type="button"
                            name="search"
                            id="search-btn"
                            class="btn btn-flat ">
                        <i class="mdi mdi-magnify"></i>
                    </button>
                </div>
                <!-- search form -->
                <div class="navbar-right ">
                    <ul class="nav navbar-nav">
                        <li class="dropdown notifications-menu">
                            <nuxt-link to="/" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-home" aria-hidden="true"></i>
                            </nuxt-link>
                        </li>

                        <li class="dropdown notifications-menu" v-if="user && user.pending_friends"><!--style="font-size: 16px;"-->
                            <button class="dropdown-toggle drp-toggle"
                                    @click="requestFriendDropDown"
                                    data-toggle="dropdown" >
                                <i class="fa fa-user" aria-hidden="true"></i>
                                <sup
                                        v-if="user && user.pending_friends && user.pending_friends.length >0"
                                        style="
                                font-size: 10px;
                                background: red none repeat scroll 0% 0%;
                                padding: 2px 4px;
                                border-radius: 15px;
                                top: -1.5em;
                                left: -0.75em;
                            ">{{user && user.pending_friends ? user.pending_friends.length : 0}}</sup>
                            </button>
                            <ul :class="'dropdown-user-list dropdown-menu dropdown-menu-right '
                            +(toggleRequestFriends && user.pending_friends.length > 0 ? 'show': '')">
                                <li><h6 class="request-friend-title">{{$t('lbl.request_friend_notification')}}</h6></li>
                                <li v-for="(pends, index) in user.pending_friends" v-if="user.pending_friends.length > 0">
                                    <div class="notify-friend-list">
                                        <div class="friend-image">
                                            <img
                                                    :src="`${cdn_url}/images/user/${pends.user.user_details.profile_image}`"
                                                    @error="brokenUrl"
                                                    style="width: 100%; "
                                                    class="img-circle"
                                                    alt="User Image" />
                                        </div>
                                        <div class="friend-name-surname">
                                            <nuxt-link :to="'/'+pends.user.username" >
                                                {{pends.user.firstname|capitalize}} {{pends.user.middlename|capitalize}}
                                                {{pends.user.lastname|capitalize|truncate}}
                                            </nuxt-link>
                                        </div>
                                        <div class="friend-button">
                                            <button class="approve-friend btn-optimal" @click="answerFriend(pends.user,index, 'yes')">
                                                <i class="fa fa-check"></i>
                                            </button>
                                            <button class="approve-friend btn-secondary" @click="answerFriend(pends,index, 'no')">
                                                <i class="fa fa-times" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                </li>
                            </ul>
                        </li>
                        <!-- User Account -->
                        <li class="dropdown notifications-menu">
                            <div class="imagebox-30 drp-toggle"  data-toggle="dropdown" @click="loginDropDown" v-if="userLogin">
                                <img v-if="user.user_details && user.user_details.profile_image"
                                     :src="`${cdn_url}/images/user/${user.user_details.profile_image}`"
                                     @error="brokenUrl"

                                     class="img-circle"
                                     alt="User Image" />
                                <img src="~/assets/img/user.png" v-else>
                            </div>
                            <button class="dropdown-toggle drp-toggle"
                                    @click="userDropDown"
                                    data-toggle="dropdown" v-else>
                                <i class="fa fa-user-circle" aria-hidden="true"></i>
                            </button>
                            <ul v-if="userLogin"
                                :class="'dropdown-menu dropdown-menu-right '+(toggleProfile ? 'show': '')">
                                <li>
                                    <nuxt-link to="profile">
                                        <i class="fa fa-cog" aria-hidden="true"></i>{{$t('lbl.profile_settings')}}
                                    </nuxt-link>
                                </li>

                                <!--<li>
                                    <nuxt-link to="my-friens">
                                        <i class="mdi mdi-email"></i> {{$t('lbl.my_friend')}}
                                    </nuxt-link>
                                </li>-->
                                <li class="dropdown-footer">
                                    <a href="javascript:;" @click="logout()"> <i class="mdi mdi-logout"></i>{{$t('lbl.logout')}}  </a>
                                </li>
                            </ul>
                            <ul v-else :class="'dropdown-menu dropdown-menu-right '+(toggleUser ? 'show': '')">
                                <li>
                                    <a href="#"  @click="loginPopup"> <i class="mdi mdi-account-key"></i>{{$t('lbl.login')}}</a>
                                    <a href="#"  @click="registerPopup"> <i class="mdi mdi-account-plus"></i>{{$t('lbl.register')}}</a>
                                </li>
                            </ul>
                        </li>
                        <li class="dropdown notifications-menu"><!--style="font-size: 16px;"-->
                            <button class="dropdown-toggle drp-toggle"
                                    @click="langDropDown"
                                    data-toggle="dropdown" >
                                <i class="fa fa-flag"></i>
                            </button>
                            <ul :class="'dropdown-menu dropdown-menu-right '+(toggleLang ? 'show': '')">
                                <li v-for="country in countries">
                                    <a href="#" class="countryLang" @click="changeLanguage(country.code)" >
                                        <img :src="cdn_url+'/images/country/'+country.flag" width="25"> {{country.name}}
                                        <md-tooltip md-direction="right">{{country.locale_lang}}</md-tooltip>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="wrapper">
                <div class="container privacy-row">
                    <div class="col-3 float-left" >
                        <div class="col-11 card card-default float-none m-auto">
                            <div class="card-body profile-card-body">
                                <div class="profile-info">
                                    <ul class="profile-link">
                                        <li class="profile-link-friend">
                                            <nuxt-link to="profile" class="profile-link">
                                                <i class="fa fa-user"></i> {{$t('lbl.my_profile')}}
                                            </nuxt-link>
                                        </li>
                                        <li class="profile-link-friend">
                                            <nuxt-link to="privacy" class="profile-link" >
                                                <i class="fa fa-eye"></i> {{$t('lbl.privacy')}}
                                            </nuxt-link>
                                        </li>
                                        <li class="profile-link-friend">
                                            <nuxt-link to="change-password" class="profile-link">
                                                <i class="fa fa-key"></i> {{$t('lbl.change_my_password')}}
                                            </nuxt-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nuxt/>
                </div>
            </div>
            <footer-tab/>
        </no-ssr>
    </div>
</template>

<script>
  import SideBarMenu from '~/components/theme/SideBarMenu';
  import HeaderMenu from '~/components/theme/HeaderMenu';
  import FooterTab from '~/components/theme/Footer';
  import AccordionMenu from '~/components/theme/Accordion';
  import TimelineComment from '~/components/common/TimelineComment';
  import {mapState} from 'vuex';
  import img4040 from '~/assets/img/user_40x40.png';
  import Vue from 'vue'
  export default {
    components:{
      SideBarMenu,
      HeaderMenu,
      FooterTab,
      AccordionMenu,
      TimelineComment
    },
    computed:{
      ...mapState('state_definition',{
        'countries' : state => state.countries,
        'user' : state => state.user,
      })
    },
    watch:{
      "toggleUser":function (item) {
        return item;
      },
      "showFreze":function (item) {
        return item
      },
      "pendingFreeze":function (item) {
        return item
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      },
      truncate: function (string) {
        if (string) {
          let truncate = string.slice(0,1)+"."
          return truncate;
        }
      }
    },
    data(){
      return {
        bus: new Vue(),
        userLogin : false,
        cdn_url : process.env.cdn_url,
        toggle : true,
        toggleUser: false,
        toggleLang: false,
        toggleProfile: false,
        showFreeze:true,
        showPendingFreeze: true,
        toggleRequestFriends: false,
      }
    },
    created(){
      if (process.client) {
        this.$store.dispatch('state_definition/checkLogin').then(response =>{
          this.userLogin = true;
        }).catch(error =>{
          this.userLogin = false;
        });
        document.onclick = this.visibleDropDown;
        let lang = localStorage.getItem('country');;
        if (lang !== undefined || lang !== null) {
          this.$i18n.locale = lang;
        }
      }
      this.$store.dispatch('state_definition/getAllLangCountries');
    },
    methods:{
      answerFriend(pends, index, answer){
        this.$store.dispatch('state_definition/requestAnswer',{id:pends.id, data:{answer:answer}}).then(response =>{
          if (response.code !== 200) {
            this.$toast.error(this.$t('msg.error_answer_failed'));
          }else{
            this.$store.dispatch('state_definition/checkLogin')
          }
        });
      },
      freezeShowClose(){
        this.showFreeze = false;
        this.showPendingFreeze = false;
      },
      visibleDropDown(e){
        let dropdown_selector = $('.drp-toggle');
        if (!dropdown_selector.is(e.target) && dropdown_selector.has(e.target).length === 0) {
          this.toggleLang = false;
          this.toggleProfile = false;
        }
      },
      requestFriendDropDown(){
        if (this.toggleUser) {
          this.toggleUser = false;
        }
        if (this.toggleProfile) {
          this.toggleProfile = false;
        }
        if (this.toggleLang) {
          this.toggleLang = false;
        }
        this.toggleRequestFriends = !this.toggleRequestFriends;
      },
      loginDropDown(){
        if (this.toggleLang) {
          this.toggleLang = false
        }
        if (this.toggleUser) {
          this.toggleUser = false;
        }
        if (this.toggleRequestFriends) {
          this.toggleRequestFriends = false;
        }
        this.toggleProfile = !this.toggleProfile;
      },
      userDropDown(){
        if (this.toggleLang) {
          this.toggleLang = false
        }
        if (this.toggleProfile) {
          this.toggleProfile = false;
        }
        if (this.toggleRequestFriends) {
          this.toggleRequestFriends = false;
        }
        this.toggleUser = !this.toggleUser;
      },
      langDropDown(){
        if (this.toggleUser) {
          this.toggleUser = false;
        }
        if (this.toggleProfile) {
          this.toggleProfile = false;
        }
        if (this.toggleRequestFriends) {
          this.toggleRequestFriends = false;
        }
        this.toggleLang = !this.toggleLang;
      },
      brokenUrl(event) {
        event.target.src = img4040;
      },
      changeLanguage(code){
        this.$i18n.locale = code;
        localStorage.setItem('country', code);
        this.$store.dispatch('state_definition/getAllCategory');
        this.$store.dispatch('state_definition/getHomeSpecialSurvey');
        this.$store.dispatch('state_definition/getHomeSurveyApproval');
        this.$store.dispatch('state_definition/newest');
        this.$store.dispatch('state_definition/getAllSubjects');
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
    .profile-link {
        color:#000;
    }
    .profile-link:hover {
        color:#3a99ab;
        text-decoration: none !important;
    }
    .dropdown-user-list  {
        width: 300px !important;
        padding: 20px;
    }
    .reject-icon{
        font-size: 16px;
    }
    .not_friend_request{
        text-align: center;
    }
    .notify-friend-list{
        padding: 10px;
    }
    .request-friend-title{
        color:#000;
        padding: 10px;
    }
    .approve-friend{
        width: 20px;
        height: 20px;
        border-radius:25px;
    }
    .friend-button {
        float:right;
        padding-top: 5px;
        max-width: 45px;
    }
    .friend-name-surname{
        line-height: 30px;
        float:left;
        padding-left: 5px;
        max-width: 150px;
    }
    .friend-name-surname a {
        padding:0 !important;
    }
    .friend-name-surname a:hover {
        background-color: #fff !important;
    }
    .friend-image {
        width: 30px;
        border-radius: 50px;
        overflow: hidden;
        float: left;

    }
    .notify-friend-list{
        padding: 5px;
        height: 40px;
        color:#999;
        margin-bottom: 5px;
    }
    .pendingFreeze {
        background: orange;
        border: 1px solid #fff;
        color: #FFF;
        padding: 5px;
        left: -18px;
        position: relative;
        width: 102%;
    }
    .freze {
        background: red;
        border: 1px solid #fff;
        color: #FFF;
        padding: 5px;
        left: -18px;
        position: relative;
        width: 102%;

    }
    .pendingFreeze a, .freze a {
        color: #FFF;
    }

    @media (max-width: 767.98px) {
        .freze {
            left: 0;

            position: static;
            width: 100%;
        }
        .logo-toggle {
            display: none;
        }
        .page-wrapper {
            margin-top: 55px;
        }
    }

    .navbar .navbar-right .navbar-nav .notifications-menu .dropdown-toggle {
        line-height:0 !important;
    }
    .sidebar-minified-out .left-sidebar {
        transform: translateX(0px);
    }
    .privacy-row {
        width: 100%;
        margin-top:65px;
    }
    .profile-link-friend{
        margin-top: 5px;
        padding: 5px;
    }
    .profile-link-about{
        background: #cccccc;
        margin-top: 10px;
        padding: 5px;
    }
</style>
