<template>
    <no-ssr>
       <div class="col-xl-9">
           <survey-approval :survey="hitSurvey"
                            :user="user"
                            :showComment="false"
           />
           <category-list
                   :category="categoryDetail"
           />
       </div>
    </no-ssr>
</template>
<style>
    .category-title {
        border-bottom: 1px solid #ebebeb;
        padding-bottom: 15px;
    }
</style>
<script>
  import CategoryList from "@/components/common/CategoryList"
  import SurveyApproval from '~/components/common/SurveyApproval'
  import {mapState} from 'vuex';
  export default {
    head: {
      title :'Optimal Rating | Category',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
    data(){
      return {
        category : null
      }
    },
    components: {
      CategoryList,
      SurveyApproval
    },
    computed:{
      ...mapState('state_definition',{
        categoryDetail : state => state.categoryDetail,
        hitSurvey : state => state.hitSurvey,
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
    },
    async fetch ({ store, params }) {
      await store.dispatch('state_definition/getAllCategory');
      await store.dispatch('state_definition/getHomeSpecialSurvey');

      let data = { url: 'categories/'+params.category };
      await store.dispatch('state_definition/getData', data)
            .then(response => {
              if (response) {
                store.dispatch('state_definition/setState', {key:'categoryDetail', data:response})
                this.head.title = response.name+' | Optimal Rating';
              }
            });

      let requestData = { url: 'hit-survey/'+params.category };
      await store.dispatch('state_definition/getData', requestData)
            .then(response => {
              if (response) {
                store.dispatch('state_definition/setState', { key:'hitSurvey', data:response })
              }
            });
    }
  }
</script>

