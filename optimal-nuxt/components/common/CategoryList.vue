<template>
    <div class="col-xl-12 card card-default" v-if="category">
        <div class="card-body">
            <div class="col-12 category-title">
                <h5>{{category.name}}</h5>
            </div>
            <div class="col-12 category-item" v-for="survey in category.surveys">
                <div class="survey-image col-4 float-left">
                    <img :src="cdnUrl+imageUrl+getItem(calculateData(survey)[1], survey).choice_image" >

                </div>
                <div class="survey-detail col-8 float-left">
                    <div class="survey-title">
                        <h5>{{survey.title}}</h5>
                    </div>
                    <div class="survey-description" v-html="getItem(calculateData(survey)[1], survey).choice_description">{{calculateData(survey)[1], getItem(calculateData(survey)[1], survey)}}</div>
                    <div class="clearfix"></div>

                   <div style="padding: 15px">
                       <line-chart :survey="survey"
                                   :chartData="calculateData(survey)"
                                   rate="5"
                                   :showItem="2"
                                   :type="'approval'"
                                   :bus="bus">
                       </line-chart>
                   </div>

                </div>
                <div class="clearfix"></div>
            </div>
<!--
            <div class="page">
                <ul class="pagination pagination-sm">
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span class="sr-only">Previous</span>
                        </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </div>-->
        </div>
    </div>
</template>

<script>
  import user from "../../assets/img/user/u1.jpg"
  import LineChart from '~/components/common/Survey/LineChartApproval';
  import logo from '~/assets/img/logo.png';
  import Vue from 'vue'
  export default {
    props: ['category'],
    components:{
      LineChart,

    },
    data(){
      return {
        chartData: null,
        bus:new Vue(),
        cdnUrl : process.env.cdn_url,
        imageUrl :`/images/survey_approval/`
      }
    },
    created(){
      this.calculateData();
    },
    methods:{
      brokenUrl(event) {
        event.target.src = logo;
      },
      getItem(select, survey){

        let item = this._.find(survey.choices, (item)=>{
          console.log(item.choice_title)
          return item.choice_title === select[0]
        });

        return item;
      },
      getChoices(choices) {
        let sorting =  this._.orderBy(choices, ['id'], ['asc']);
        return sorting;
      },
      calculatePoint(survey,vote) {
        if(vote.length > 0) {
          let voteItem = this._.reduce(survey.choices, (acc, item) => {
            acc += item.votes.length
            return acc;
          }, 0);
          let votesCount = voteItem;
          let calc = (vote.length / votesCount * 100).toFixed(2);

          return calc;
        }
        return 0.00;
      },
      calculateData(survey){
        let _this = this;
        let data =[];
        if(survey) {
          data.push(this._.map(survey.choices, (item)=>{
            let legends = [];
            let votesCount = item.votes.length;
            let arithmeticMean =_this.arithmeticMean(item.votes, votesCount);
            let score = arithmeticMean * Math.sqrt(votesCount / (votesCount + Math.sqrt(votesCount)));
            legends.push(item.choice_title, score > 0 ? score  : 0);
            return legends;
          }));
          let newData = data[0];
          newData.sort((a, b)=>{
            return  a[1] - b[1]
          });
          newData.push(['VoteName', 'VoteCount']);
          let chartData = data[0].reverse();
          return chartData;
        }

      },
      arithmeticMean(vote, total){
        let _sum = this._.reduce(vote, (acc, item)=>{
          return acc + item.mark
        }, 0);

        return _sum > 0 ?  _sum / total : 0;
      },
    }
  }
</script>
<style>
    .cat-bar {
        margin-bottom: 5px;
    }
    .page {
        float: right;
        margin-top: 15px;
    }
    .pagination .page-item:first-child .page-link, .pagination .page-item:last-child .page-link {
        height: 28.3833px;
    }
    .pagination .page-link {
        color: brown;
    }

    .category-item {
        padding: 10px;
    }
    .category-title {
        border-bottom: 1px solid #ebebeb;
        padding-bottom: 15px;
    }
</style>
