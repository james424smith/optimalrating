<template>
    <no-ssr>
        <div class="col-xl-9">
            <special-survey :survey="specialSurvey" :user="user"/>
            <hr>
           <survey-approval :survey="approvalSurvey"
                            :user="user" :showComment="true"/>
        </div>
    </no-ssr>
</template>
<script>

  import SpecialSurvey from '~/components/common/SpecialSurvey'
  import SurveyApproval from '~/components/common/SurveyApproval'
  import {mapState} from 'vuex';
  import Modals from '~/components/common/Modals'
  export default {

    head: {
      title :'Optimal Rating | Survey',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
    components:{
      SpecialSurvey,
      SurveyApproval,
      Modals
    },
    computed:{
      ...mapState('state_definition',{
        specialSurvey : state => state.showHomeSurvey,
        approvalSurvey : state => state.homeSurveyApproval,
        user : state => state.user
      })
    },
    created(){
      if (process.client) {
        this.$store.dispatch('state_definition/checkLogin').then(response => {
          let res = response.result.set.user ;
          if (res.status === 'freeze') {
            this.$modal.show('profile-approved-modal')
            this.$router.push('/profile-approve?status=approve');
          }
        });
      }
     this.$store.dispatch('state_definition/getHomeSpecialSurvey');
      this.$store.dispatch('state_definition/getHomeSurveyApproval');
    },
    async fetch ({ store, params }) {
        await store.dispatch('state_definition/getAllCategory');
    }
  }
</script>

<style>

</style>
