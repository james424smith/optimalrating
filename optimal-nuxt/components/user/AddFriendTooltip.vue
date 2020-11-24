<template>
    <div>
        <div :ref="'friendTooltip'"  :style="'top:'+top+'px; left:-10px'" class="tooltip-profile">
            <div class="tooltip-img">
                <img v-if="profile && profile.user_details && profile.user_details.profile_image && profile.user_details.profile_image !== ''"
                     :src="cdnUrl+imageUrl+profile.user_details.profile_image"
                     @error="brokenUrl"
                     alt="Generic placeholder image">

            </div>
            <div class="tooltip-name">
                <h3>  {{profile.firstname|capitalize}} {{profile.middlename|capitalize}}
                    {{profile.lastname|capitalize|truncate}}</h3>
            </div>
            <div class="tooltip-button" v-if="user && user.id !== profile.id">
                <button class="add-friend-button"
                        @click="requestFriend"
                        v-if="pendingRequestFriends"
                >
                    <i class="fa fa-check" aria-hidden="true" ></i>{{$t('lbl.pending_request')}}
                </button>
                <button class="add-friend-button"
                        @click="isMyFriend"
                        v-else-if="isMyFriend"
                >
                    <i class="fa fa-user" aria-hidden="true"></i>{{$t('lbl.profile')}}
                </button>
                <button class="add-friend-button"
                        @click="requestFriend"
                        v-else
                >
                    <i class="fa fa-user-plus" aria-hidden="true" ></i> {{$t('lbl.add_friend')}}
                </button>
                <button class="add-friend-button"><i class="fa fa-commenting" aria-hidden="true"></i> {{$t('lbl.send_message')}}</button>
                <button class="add-friend-button"><i class="fa fa-rss-square" aria-hidden="true"></i></button>
            </div>

            <div class="tooltip-button" v-else>

                <nuxt-link class="add-friend-button"
                           style="position: relative; bottom: -40px;"
                   :to="'/profile'">
                    <i class="fa fa-edit" aria-hidden="true" ></i> {{$t('lbl.edit_profile')}}
                </nuxt-link>
                <nuxt-link class="add-friend-button"
                           style="position: relative; bottom: -40px; margin-left: 10px;"
                       :to="'/'+profile.username">
                    <i class="fa fa-eye" aria-hidden="true" ></i> {{$t('lbl.view_profile')}}
                </nuxt-link>
            </div>
        </div>

    </div>
</template>
<script>
  import img4040 from '~/assets/img/user_40x40.png';
    export default {
      props:["refInfo","position","profile","user"],
      data(){
       return {
         loading:false,
         top:0,
         left:0,
         cdnUrl : process.env.cdn_url,
         imageUrl :`/images/user/`,
       }
      },
      watch: {
        "position":function (item) {
          return item;
        },

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
      mounted() {
        this.tooltipShow()
      },
      methods:{
        gotoEditProfile(){
          this.$router.push('/profile')
        },
        pendingRequestFriends(){
          let find = this._.map(this.user.pending_request_friends, (item)=>{
            return item.user === this.profile.id
          })
          return find.length
        },
        isMyFriend(){
          if (_this.user) {
            let _this  = this;
            let find = this._.find(this.user.frineds, (item)=>{
              return item.id === _this.profile.id
            })
            return find === undefined || find === null ? true : false
          }
          return false;
        },
        requestFriend(){
          this.$store.dispatch('state_definition/requestFriend',{id: this.profile.id})
            .then((response)=>{
              if (response.code==200) {
                this.$toast.success(this.$t('msg.friend_requested'));
              }else {
                this.$toast.info(this.$t('msg.friend_request_failed'));
              }
            })
        },
        brokenUrl(event) {
          event.target.src = img4040;
          event.target.style = 'height:45px'
        },
        tooltipShow(){
          this.top = this.position
        }
      }
    }
</script>
<style>
    .add-friend-button {
        background: white;
        color: #333;
        font-size: 14px;
        padding: 5px;
        border-radius: 5px;
        margin-top: 35px;
    }

    .tooltip-img {
        width: 80px;
        height: 80px;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 50px;
    }
    .tooltip-name {
        text-align: center;
    }
    .tooltip-profile{
        position: absolute;
        z-index: 9;
        width: 300px;
        height: 200px;
        border: 1px #ebebeb solid;
        background: #3a99ab;
        color: #fff;
        border-radius: 5px;
        padding: 10px;
    }
</style>
