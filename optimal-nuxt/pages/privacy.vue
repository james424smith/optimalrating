<template>
    <no-ssr>
        <privacy :user="user"/>
    </no-ssr>
</template>
<script>

  import Privacy from '~/components/user/Privacy'
  import {mapState} from 'vuex';
  export default {
    layout: 'profile_configuration',
    head: {
      title :'Optimal Rating | Edit Privacy',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
    components:{
      Privacy
    },
    created(){
      if (process.client) {
        this.$store.dispatch('state_definition/checkLogin').then(response =>{
          let res = response.result.set.user ;
          if (res.status === 'freeze') {
            this.$router.push('/profile-approve?status=approve');
          }
          this.userLogin = true;
        }).catch(error =>{
          this.$router.push('/')
        });
      }
    },
    computed:{
      ...mapState('state_definition',{
        user : state => state.user
      })
    },
    async fetch ({ store, params }) {
      await store.dispatch('state_definition/getAllCategory');
      await store.dispatch('state_definition/getHomeSpecialSurvey');
    }
  }
</script>
