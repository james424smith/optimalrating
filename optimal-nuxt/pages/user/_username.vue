<template>
    <no-ssr>
        <div class="col-xl-12">
            <profile/>
        </div>
    </no-ssr>
</template>
<script>

  import Profile from '~/components/user/Profile'
  import {mapState} from 'vuex';
  export default {
    layout: 'profile',
    head: {
      title :'Optimal Rating | User',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
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
            this.$router.push('/profile-approve?status=approve');
          }
          this.userLogin = true;
        })
      }
    },
    components:{
      Profile
    },
    async fetch ({ store, params }) {
      await store.dispatch('state_definition/getAllCategory');
      await store.dispatch('state_definition/getHomeSpecialSurvey');
    }
  }
</script>
