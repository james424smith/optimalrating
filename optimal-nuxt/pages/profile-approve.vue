<template>
    <no-ssr>
        <div class="col-xl-12">
            <profile-edit/>
        </div>
    </no-ssr>
</template>
<script>
  import ProfileEdit from '~/components/user/ProfileEdit'
  import {mapState} from 'vuex';
  import Modals from '~/components/common/Modals'
  export default {
    components:{
      Modals
    },
    layout: 'profile_configuration',
    head: {
      title :'Optimal Rating | Survey',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },

    data(){
      return{
        isLoading:false
      }
    },
    computed:{
      ...mapState('state_definition',{
        user : state => state.user
      })
    },
    created(){
      if (process.client) {
        this.$store.dispatch('state_definition/checkLogin').then(response =>{
          let res = response.result.set.user ;
          if (res.status === 'freeze') {
            this.$modal.show('profile-approved-modal')
            this.$router.push('/profile-approve?status=approve');
          }else{
            this.isLoading = true;
          }
          this.userLogin = true;
        }).catch(error =>{
          this.$router.push('/')
        });
      }
    },
    components:{
      ProfileEdit
    },
    async fetch ({ store, params }) {
      await store.dispatch('state_definition/getAllCategory');
      await store.dispatch('state_definition/getHomeSpecialSurvey');
    }
  }
</script>

<style>

</style>
