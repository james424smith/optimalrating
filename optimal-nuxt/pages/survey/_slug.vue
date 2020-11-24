<template>
    <no-ssr>
        <div class="col-xl-9">
            <special-survey :survey="specialSurvey" :user="user"/>
            <hr>
            <survey-approval :survey="survey" :user="user" />
        </div>
    </no-ssr>
</template>

<script>
  import SpecialSurvey from '~/components/common/SpecialSurvey'
  import SurveyApproval from '~/components/common/SurveyApproval'
  import {mapState} from 'vuex';
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
      SurveyApproval
    },
    computed:{
      ...mapState('state_definition',{
        specialSurvey : state => state.showHomeSurvey,
        survey : state => state.survey,
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
    async fetch ({ store, params }) {
      await store.dispatch('state_definition/getAllCategory');
      await store.dispatch('state_definition/getHomeSpecialSurvey');
      await store.dispatch('state_definition/surveyDetail', {id: params.slug})
        .then(response => {
          if (response) {
            this.head.title = response.title+' | Optimal Rating';
          }
      });
    }
  }
</script>
