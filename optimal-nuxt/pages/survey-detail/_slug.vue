<template>
    <no-ssr>
        <div class="col-xl-9">
            <survey-choices-list :survey="surveyDetail" />
        </div>
    </no-ssr>
</template>

<script>
  import {mapState} from 'vuex';
  import SurveyChoicesList from "@/components/common/SurveyChoicesList"

  export default {
    components: {SurveyChoicesList},
    head: {
      title: 'Optimal Rating | Survey Detail',
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      ],
    },
    computed:{
      ...mapState('state_definition',{
        surveyDetail : state => state.surveyDetail,
      })
    },
    async fetch ({ store, params }) {
      await store.dispatch('state_definition/getAllCategory');
      await store.dispatch('state_definition/getHomeSpecialSurvey');
      let slug = params.slug.split('-');
      let data = { url: `surveys/detail/${slug[slug.length -1]}` };
      await store.dispatch('state_definition/getData', data)
        .then(response => {
          if (response) {
            store.dispatch('state_definition/setState', {key:'surveyDetail', data:response})
            this.head.title = response.title+' | Optimal Rating';
          }
        });
    }
  }
</script>
