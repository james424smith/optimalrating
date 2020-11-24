<template>
  <div class="col-xl-12 card card-default" v-if="survey">
    <div class="card-body">
      <div class="col-12 category-title">
        <h5>{{survey.title}}</h5>
        <b-dropdown class="buttonDropdown" style="float: right; top:-30px">
          <template v-slot:button-content>
            <i class="fa fa-sort-amount-desc" aria-hidden="true"></i>
            &nbsp;{{$t('lbl.sort_comments')}}
          </template>
          <b-dropdown-item
            href="javascript:;"
            @click="sortChoices('score','desc')"
          >{{$t('lbl.sort_score')}}</b-dropdown-item>
          <b-dropdown-item
            style="margin-left:0 !important"
            href="javascript:;"
            @click="sortChoices('choice_title', 'asc')"
          >{{$t('lbl.sort_alphabetic')}}</b-dropdown-item>
        </b-dropdown>
      </div>
      <div class="col-12 category-item" v-for="choice in pageData">
        <div class="survey-image col-4 float-left">
          <survey-image
            :path="choice.choice_image"
            imgstyle="width: 80px; height: 80px; margin-top: 10px;"
          />
        </div>
        <div class="survey-detail col-8 float-left">
          <div class="survey-title">
            <h5>{{choice.choice_title}}</h5>
          </div>
          <div class="survey-description" v-html="choice.choice_description"></div>
          <div class="col-md-8 col-8 float-left inputChoice">
            <div class="gray-bar">
              <span class="choicePoint">{{rateCalculate(choice.score)}}%</span>
              <div class="blue-bar" :style="'width:'+rateCalculate(choice.score)+'%;'"></div>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="page">
        <ul class="pagination pagination-sm">
          <li class="page-item">
            <a
              class="page-link"
              href="javascript:;"
              aria-label="Previous"
              @click="pagination.page--"
            >
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">{{$t('lbl.previous')}}</span>
            </a>
          </li>

          <li class="page-item" v-for="page in pagination.pageCount">
            <a class="page-link" href="javascript:;" @click="pagination.page = (page -1)">{{page}}</a>
          </li>

          <li class="page-item">
            <a class="page-link" href="javascript:;" aria-label="Next" @click="pagination.page++">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">{{$t('lbl.next')}}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "~/components/common/Survey/LineChartApproval";
import SurveyImage from "~/components/common/Approval/SurveyImage";
import logo from "~/assets/img/logo.png";
import Vue from "vue";
import { Score, CalculateChoices, RateCalculate } from "../../helpers";
export default {
  props: ["survey"],
  components: {
    LineChart,
    SurveyImage
  },
  data() {
    return {
      pageData: null,
      pagination: {
        size: 4,
        pageCount: 0,
        page: 0,
        data: null
      },
      chartData: null,
      bus: new Vue(),
      cdnUrl: process.env.cdn_url,
      imageUrl: `/images/choice/`,
      choices: []
    };
  },
  watch: {
    "pagination.page": function(item) {
      this.paginationData();
      return item;
    }
  },
  created() {
    this.choicesData();
    this.pageCount();
    this.paginationData();
  },
  methods: {
    sortChoices(sort, type) {
      this.pagination.page = 0;
      this.pageData = this._.orderBy(this.pageData, [sort], [type]);
    },
    rateCalculate(score) {
      return RateCalculate(score, this.chartData);
    },
    async choicesData() {
      this.chartData = CalculateChoices(this.survey);
      await this.choices.push(
        this._.map(
          this.survey.choices.filter(x => x.status !== "0"),
          item => {
            let score = Score(item, item.votes.length);
            return {
              id: item.id,
              choice_title: item.choice_title,
              choice_image: item.choice_image,
              choice_description: item.choice_description,
              score: score
            };
          }
        )
      );
    },
    pageCount() {
      let l = this.choices[0].length,
        s = this.pagination.size;
      this.pagination.pageCount = Math.ceil(l / s);
    },
    async paginationData() {
      const start = this.pagination.page * this.pagination.size,
        end = start + this.pagination.size;
      this.pageData = this.choices[0].slice(start, end);
    },
    rateCalculate(rate) {
      let total = this._.reduce(
        this.chartData,
        (acc, item, index) => {
          if (index !== 0) {
            acc = acc + item[1];
          }
          return acc;
        },
        0
      );
      return ((rate / total) * 100).toFixed(2);
    },
    brokenUrl(event) {
      event.target.src = logo;
    }
  }
};
</script>
<style>
.cat-bar {
  margin-bottom: 5px;
}
.page {
  float: right;
  margin-top: 15px;
}
.pagination .page-item:first-child .page-link,
.pagination .page-item:last-child .page-link {
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
