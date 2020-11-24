<template>
  <div v-if="user">
    <div class="col-3 float-left">
      <div class="col-11 card card-default float-none pt-3" style="padding: 16px">
        <div class="card-body profile-card-body p-0 m-0">
          <div class="profile-status">
            <i class="fa fa-check isRealProfile"></i>
          </div>
          <div class="privacy-profile-image">
            <!-- <i class="isPremium">P</i> -->
            <img :src="cdnUrl+imageUrl+user.user_details.profile_image" @error="brokenUrl" />
            <div class="profile-name">
              <h5>
                <b>{{user.firstname|capitalize}} {{user.middlename|capitalize}} {{user.lastname|capitalize}}</b>
              </h5>
              <h6>{{user.city ? user.city.name : null}}</h6>
            </div>
          </div>
          <div class="profile-info">
            <ul class="profile-link">
              <li class="profile-link-about" style="background-color: rgba(57, 153, 171, 0.7)">
                <nuxt-link to="/" style="color: #fff">{{$t('lbl.about')}}</nuxt-link>
              </li>
              <li class="profile-link-friend">
                <nuxt-link to="/" style="color: rgba(57, 153, 171, 1)">{{$t('lbl.friends')}}</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="col-9 float-right">
      <div class="card card-default p-0 m-0">
        <div class="card-body">
          <div class="profile-element col-12">
            <div class="element-name col-3 float-left">{{$t('lbl.firstname')}}</div>
            <div class="element-value col-9 float-left">{{user.firstname|capitalize}}</div>
            <div class="clearfix"></div>
          </div>
          <div class="profile-element col-12">
            <div class="element-name col-3 float-left">{{$t('lbl.middlename')}}</div>
            <div class="element-value col-9 float-left">{{user.middlename|capitalize}}</div>
            <div class="clearfix"></div>
          </div>
          <div class="profile-element col-12">
            <div class="element-name col-3 float-left">{{$t('lbl.lastname')}}</div>
            <div class="element-value col-9 float-left">{{user.lastname|capitalize}}</div>
            <div class="clearfix"></div>
          </div>
          <div class="profile-element col-12">
            <div class="element-name col-3 float-left">{{$t('lbl.birthdate')}}</div>
            <div class="element-value col-9 float-left">{{user.user_details.birthdate || '-'}}</div>
            <div class="clearfix"></div>
          </div>
          <div class="profile-element col-12">
            <div class="element-name col-3 float-left">{{$t('lbl.gender')}}</div>
            <div
              class="element-value col-9 float-left"
            >{{$t(`lbl.${user.user_details.gender || '-'}`)}}</div>
            <div class="clearfix"></div>
          </div>
          <div class="profile-element col-12">
            <div class="element-name col-3 float-left">{{$t('lbl.education')}}</div>
            <div class="element-value col-9 float-left">{{$t(`lbl.${user.user_details.education}`)}}</div>
            <div class="clearfix"></div>
          </div>
          <div class="profile-element col-12">
            <div class="element-name col-3 float-left">{{$t('lbl.country')}}</div>
            <div
              class="element-value col-9 float-left"
            >{{user.country ? $t(`country.${user.country.code}`) : '-'}}</div>
            <div class="clearfix"></div>
          </div>
          <div class="profile-element col-12">
            <div class="element-name col-3 float-left">{{$t('lbl.city')}}</div>
            <div class="element-value col-9 float-left">{{user.city ? user.city.name : '-'}}</div>
            <div class="clearfix"></div>
          </div>
          <div class="profile-element col-12">
            <div class="element-name col-3 float-left">{{$t('lbl.phone_number')}}</div>
            <div class="element-value col-9 float-left">{{user.user_details.phone_number || '-'}}</div>
            <div class="clearfix"></div>
          </div>
          <div class="profile-element col-12">
            <div class="element-name col-3 float-left">{{$t('lbl.email')}}</div>
            <div class="element-value col-9 float-left">{{user.email || '-'}}</div>
            <div class="clearfix"></div>
          </div>
          <div class="profile-element col-12">
            <div class="element-name col-3 float-left">{{$t('lbl.occupation')}}</div>
            <div class="element-value col-9 float-left">{{user.user_details.occupation || '-'}}</div>
            <div class="clearfix"></div>
          </div>
          <div class="profile-element col-12">
            <div class="element-name col-3 float-left">{{$t('lbl.marital_status')}}</div>
            <div class="element-value col-9 float-left">{{user.user_details.marital_status ? $t(`lbl.${user.user_details.marital_status}`) : '-'}}</div>
            <div class="clearfix"></div>
          </div>
          <div class="profile-element col-12">
            <div class="element-name col-3 float-left">{{$t('lbl.about')}}</div>
            <div class="element-value col-9 float-left">{{user.user_details.about || '-'}}</div>
            <div class="clearfix"></div>
          </div>
          <div class="profile-element col-12">
            <div class="element-name col-3 float-left">Facebook</div>
            <div class="element-value col-9 float-left">{{user.user_details.facebook_url || '-'}}</div>
            <div class="clearfix"></div>
          </div>
          <div class="profile-element col-12">
            <div class="element-name col-3 float-left">Instagram</div>
            <div class="element-value col-9 float-left">{{user.user_details.instagram_url || '-'}}</div>
            <div class="clearfix"></div>
          </div>
          <div class="profile-element col-12">
            <div class="element-name col-3 float-left">Twitter</div>
            <div class="element-value col-9 float-left">{{user.user_details.twitter_url || '-'}}</div>
            <div class="clearfix"></div>
          </div>
          <div class="profile-element col-12">
            <div class="element-name col-3 float-left">Skype</div>
            <div class="element-value col-9 float-left">{{user.user_details.skype_url || '-'}}</div>
            <div class="clearfix"></div>
          </div>
          <div class="profile-element col-12">
            <div class="element-name col-3 float-left">{{$t('lbl.web_url')}}</div>
            <div class="element-value col-9 float-left">{{user.user_details.web_url || '-'}}</div>
            <div class="clearfix"></div>
          </div>
          <div class="profile-element col-12">
            <div class="element-name col-3 float-left">{{$t('lbl.another_url')}}</div>
            <div class="element-value col-9 float-left">{{user.user_details.another_url || '-'}}</div>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.profile-name {
  font-weight: bold;
  text-align: center;
  padding-top: 10px;
}
.profile-name h5 {
  font-size: 18px;
}
.profile-name h6 {
  font-size: 14px;
}
.profile-element {
  padding: 10px;
}
.element-name {
  font-weight: bolder;
}
.isPremium {
  background: gold;
  color: #000;
  font-size: 17px;
  border-radius: 15px;
  float: right;
  margin-top: 5px;
  margin-left: 5px;
  position: absolute;
  left: 20px;
  padding: 2px 7px;
  border: 1px solid #000;
}
.isRealProfile {
  background: #3a99ab;
  color: #fff;
  padding: 3px;
  font-size: 10px;
  border-radius: 10px;
  float: right;
  position: absolute;
  right: 20px;
  top: 30px;
}
</style>
<script>
import img4040 from "~/assets/img/user_40x40.png";

export default {
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    truncate: function(string) {
      if (string) {
        let truncate = string.slice(0, 1) + ".";
        return truncate;
      }
    }
  },
  data() {
    return {
      user: null,
      cdnUrl: process.env.cdn_url,
      imageUrl: `/images/user/`
    };
  },
  created() {
    let user = this.$route.params.username;
    this.getUserProfile(user);
  },
  methods: {
    brokenUrl(event) {
      event.target.src = img4040;
      event.target.style = "width:100%;";
    },
    getUserProfile(user) {
      let data = {
        url: "user-profile/" + user,
        method: "getData"
      };
      this.actions(data).then(response => {
        this.user = response.result.set;
      });
    },

    actions(data) {
      return this.$store.dispatch("state_definition/userController", data);
    }
  }
};
</script>
