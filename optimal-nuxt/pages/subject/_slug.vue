<template>
    <no-ssr>
        <div class="col-xl-9">
            <div class="card card-default">
                <div class="card-header justify-content-between card-header-border-bottom">
                    <h2>{{subjectDetail.title}}</h2>
                </div>
                <div class="card-body ">
                    <div class="chartSpecialSurvey row pb-2">
                        <div
                                class="col-3 box"
                                v-if="subjectDetail.surveys"
                                v-for="survey in subjectDetail.surveys"  >
                            <div class="box-title"><nuxt-link :to="'/survey/'+survey.id" >{{survey.title}}</nuxt-link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </no-ssr>
</template>
<style>
    .box {

    }
    .box-title {
        font-size: 18px;
    }
</style>
<script>
  import {mapState} from 'vuex';
  import SurveyPieChart from '~/components/common/Survey/SurveyPieChart';
  import Vue from 'vue';

  export default {
    components:{
      SurveyPieChart
    },
    head: {
      title :'Futbool | Optimal Rating',
      link: [],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
    data(){
      return {
        bus: new Vue()
      }
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
    computed:{
      ...mapState('state_definition',{
        subjectDetail : state => state.subjectDetail,
      }),
    },
    methods: {
      chartData(survey) {
        let data =[];

        if (survey){
          data.push(this._.map(survey.choices, (item)=>{
            let legends = [];
            let votesCount = item.votes.length;

            let _sum = this._.reduce(item.votes, (acc, item)=>{
              return acc + item.mark
            }, 0);

            let arithmeticMean = _sum > 0 ?  _sum / votesCount : 0;

            let score = arithmeticMean * Math.sqrt(votesCount / (votesCount + Math.sqrt(votesCount)));
            legends.push(item.choice_title, score > 0 ? score  : 0);
            return legends;
          }));

          let newData = data[0];
          newData.sort((a, b)=>{
            return  a[1] - b[1]
          });
          newData.push(['VoteName', 'VoteCount']);
          console.log(data);
          return data[0].reverse();
        }
      }
    },
    async fetch ({ store, params }) {
      await store.dispatch('state_definition/getAllCategory');
      this.slug = params;
      await store.dispatch('state_definition/subjectDetail', {id: params.slug})
        .then(response => {
          this.head.title = response.title+' | Optimal Rating';
        });
    }
  }
</script>
