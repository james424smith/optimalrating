<template>
  <div>
    <div class="card card-default" v-if="survey">
      <div
        class="card-header justify-content-between card-header-border-bottom"
        style="padding: 28px 0px;"
      >
        <div class="col-md-7">
          <h3>{{survey.title}}</h3>
        </div>
        <div class="col-md-4" style="text-align: right;">
          <a href="javascript:;" @click="beforeAction('addSurvey')">
            <i class="fa fa-plus"></i>
            {{$t('lbl.do_you_want_add_survey')}}
          </a>
        </div>
      </div>
      <div class="card-body" style="padding: 15px">
        <div v-if="chartData && chartData.length >0">
          <survey-pie-chart :chartItem="chartData" :survey="survey" :bus="bus"></survey-pie-chart>
        </div>
        <div class="col-md-12 survey-button" style="padding: 0;">
          <div class="col-md-5 float-left" style="padding-left: 0;">
            <button
              class="btn btn-optimal"
              style="width: auto !important; background-color: #fff; color: #4c84ff;"
              @click="beforeAction('addNewChoice')"
            >{{$t('lbl.add_new_choice')}}</button>
          </div>
          <div class="col-md-7 social-button float-right pt-2 text-right" style="padding-right: 0;">
            <AddThis publicId="ra-5dab62af5eff73c6" />
          </div>
          <div class="clearfix"></div>
        </div>
        <hr />
        <div v-if="chartData && chartData.length >0">
          <line-chart
            :survey="survey"
            :chartData="chartData"
            rate="5"
            :showItem="5"
            :type="'approval'"
            :bus="bus"
          ></line-chart>
        </div>
        <div class="row" v-if="showComment">
          <timeline-comment
            class="comment-timeline"
            :comments="survey.comments"
            :bus="bus"
            :survey="survey"
            :user="user"
          />
        </div>
      </div>
      <add-survey-choice :survey="survey" :bus="bus"></add-survey-choice>
      <modal name="vote-modal" class="vote-modal" width="500" height="auto">
        <div class="modal-header" v-if="selectChoice">
          <h3>{{selectChoice.choice_title}}</h3>
          <a href="javascript:;" @click="$modal.hide('vote-modal')">X</a>
        </div>
        <div class="modal-body" v-if="selectChoice">
          <div class="col-12" style="margin-bottom: 30px; padding: 0;">
            <div
              class="col-6 float-left choice"
              v-html="linkifyMethod(selectChoice.choice_description)"
            ></div>
            <div class="col-6 float-right">
              <survey-image :path="selectChoice.choice_image" imgstyle="" />
            </div>
            <div class="clearfix"></div>
          </div>
          <hr />
          <div class="col-12" style="margin-bottom: 30px; padding: 0;">
            <div class="col-4 float-left" style="padding: 0;">
              <star-rating
                v-bind:increment="1"
                v-bind:max-rating="5"
                v-model="newMark"
                inactive-color="#000"
                active-color="#3a99ab"
                v-bind:star-size="25"
              ></star-rating>
              <!-- @rating-selected="voteCheck" -->
            </div>
            <div class="col-4 float-right" style="padding: 0; text-align: right;">
              <button
                type="button"
                class="btn btn-optimal btn-sm px-4"
                style="padding-left: 8px !important; padding-right: 8px !important;"
                @click="submitMark"
              >{{$t('lbl.submit_rating')}}</button>
            </div>
          </div>
        </div>
      </modal>
      <modal name="vote-cancel" width="500" height="auto">
        <div class="modal-header">
          <h3>{{$t('lbl.title_cancel_vote')}}</h3>
          <a href="javascript:;" @click="$modal.hide('vote-cancel')">X</a>
        </div>
        <div class="modal-body">{{$t('lbl.already_voted_category')}}</div>
        <div class="modal-footer">
          <slot name="footer">
            <button
              class="btn btn-optimal"
              style="width:300px !important;"
              @click="cancelVote"
            >{{$t('lbl.okay')}}</button>
            <button
              class="btn btn-optimal"
              style="width:300px !important;"
              @click="$modal.hide('vote-cancel')"
            >{{$t('lbl.cancel')}}</button>
          </slot>
        </div>
      </modal>
    </div>
    <div class="car card-default" v-else>
      <div class="card-header justify-content-between card-header-border-bottom">
        <div class="col-md-4">
          <a href="javascript:;" @click="beforeAction('addSurvey')">
            <i class="fa fa-plus"></i>
            {{$t('lbl.do_you_want_add_survey')}}
          </a>
        </div>
      </div>
    </div>
    <modal name="sss-modal" height="auto">
      <div class="modal-header">
        <h3>{{$t('lbl.profile_terms_of_use_title')}}</h3>
        <a href="javascript:;" @click="$modal.hide('sss-modal')">X</a>
      </div>
      <div class="modal-body">
        <div class="col-lg-12 float-left">
          <p>{{$t('lbl.profile_terms_of_use_body')}}</p>
          <br />
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="modal-footer">
        <slot name="footer">
          <button class="btn btn-secondary" @click="$modal.hide('sss-modal')">{{$t('lbl.cancel')}}</button>
          <button class="btn btn-optimal" @click="afterAction">{{$t('lbl.approve')}}</button>
        </slot>
      </div>
    </modal>
  </div>
</template>
<style>
.vote-modal .v--modal {
  left: 50% !important;
}
</style>
<script>
/**
   *
   P: Üyenin adaya verdiği Puan (1-5 arası)
   N: Adaya oy veren toplam üye sayısı
   Aritmetik ortalama = (P1 + P2 + P3......) / N
   Adayın elde ettiği net score = A x √(N / (N + √N))
   */
import TimelineComment from "~/components/common/TimelineComment";
import { CalculateChoices, linkify } from "~/helpers";
import SurveyPieChart from "~/components/common/Survey/SurveyPieChart";
import AddSurveyChoice from "~/components/common/Survey/AddSurveyChoice";
import LineChart from "~/components/common/Survey/LineChartApproval";
import SurveyImage from "~/components/common/Approval/SurveyImage";
import Vue from "vue";
import StarRating from "vue-star-rating";

import AddThis from "vue-simple-addthis-share";
export default {
  props: ["user", "survey", "showComment"],
  components: {
    SurveyImage,
    TimelineComment,
    SurveyPieChart,
    LineChart,
    AddThis,
    AddSurveyChoice,
    StarRating
  },
  data() {
    return {
      isValid: false,
      cdnUrl: process.env.cdn_url,
      imageUrl: `/images/choice/`,
      chartData: null,
      pieData: null,
      bus: new Vue(),
      choices: null,
      newMark: null,
      selectChoice: null,
      message: null,
      ssType: null,
      customToolbar: [["video"]]
    };
  },
  watch: {
    chartData: function(item) {
      return item;
    },
    survey: function(item) {
      this.chartData = CalculateChoices(item);
    }
  },
  created() {
    let _this = this;
    this.bus.$on("refreshSurvey", () => {
      _this.refreshSurvey();
    });
    this.bus.$on("choice", item => {
      _this.newMark =
        item.votes[0].user_id === _this.user.id ? item.votes[0].mark : 0;
      _this.selectChoice = item;
      _this.$modal.show("vote-modal");
    });
  },
  mounted() {
    if (this.survey) {
      this.chartData = CalculateChoices(this.survey);
    }
  },
  methods: {
    linkify,
    beforeAction(type) {
      this.$store
        .dispatch("state_definition/checkLogin")
        .then(response => {
          if (this.user && this.user.status !== "approved") {
            this.$modal.show("profile-verify-message-modal");
            return;
          } else {
            this.$modal.show("sss-modal");
            this.ssType = type;
          }
        })
        .catch(error => {
          this.$modal.show("login-modal");
          this.userLogin = false;
        });
    },
    afterAction() {
      switch (this.ssType) {
        case "addSurvey":
          this.addSurvey();
          break;
        case "addNewChoice":
          this.addNewChoice();
          break;
        default:
          console.log("No Action");
      }
      this.$modal.hide("sss-modal");
    },
    brokenUrl(event) {
      event.target.style = "display:none";
    },
    submitMark() {
      let country = localStorage.getItem("country");
      if (this.user && this.user.status !== "approved") {
        this.$modal.show("profile-verify-message-modal");
        return;
      }
      this.$store
        .dispatch("state_definition/checkLogin")
        .then(response => {
          let user = response.result.set.user;

          if (user.country.code !== country) {
            this.$toast.error(this.$t("msg.error_not_country_mark"));
            return;
          }

          this.$store
            .dispatch("state_definition/checkVote", {
              survey: this.survey.id,
              choice: this.selectChoice.id
            })
            .then(response => {
              if (response.code !== 400) {
                this.message =
                  "(" +
                  response.result.set.choice.choice_title +
                  ") " +
                  response.message;
                this.$modal.show("vote-cancel");
              } else {
                this.$store
                  .dispatch("state_definition/submitVote", {
                    survey: this.survey.id,
                    data: {
                      mark: this.newMark,
                      choice_id: this.selectChoice.id
                    }
                  })
                  .then(response => {
                    this.$toast.success(this.$t("msg.marking_success"));
                    this.$modal.hide("vote-modal");
                    window.location.reload();
                  });
              }
            });
        })
        .catch(error => {
          this.$modal.show("login-modal");
          this.userLogin = false;
        });
    },
    voteCheck() {
      this.isValid = false;
      this.$store
        .dispatch("state_definition/checkLogin")
        .then(response => {
          if (this.user.phone_verify === 0 || this.user.status == "pending") {
            this.$modal.show("profile-verify-message-modal");
            this.newMark = 0;
            return;
          }
          this.$store
            .dispatch("state_definition/checkVote", {
              survey: this.survey.id,
              choice: this.selectChoice.id
            })
            .then(response => {
              if (response.code !== 400) {
                this.message =
                  "(" +
                  response.result.set.choice.choice_title +
                  ") " +
                  response.message;
                this.$modal.show("vote-cancel");
              } else {
                this.isValid = true;
              }
            });
        })
        .catch(error => {
          this.$modal.show("login-modal");
          this.userLogin = false;
        });
    },
    cancelVote() {
      this.$store
        .dispatch("state_definition/cancelVote", {
          survey: this.survey.id,
          choice: this.selectChoice.id
        })
        .then(response => {
          if (response.code !== 400) {
            this.message =
              "(" +
              response.result.set.choice.choice_title +
              ") " +
              response.message;
            this.$store
              .dispatch("state_definition/submitVote", {
                survey: this.survey.id,
                data: {
                  mark: this.newMark,
                  choice_id: this.selectChoice.id
                }
              })
              .then(response => {
                this.$toast.success(this.$t("msg.marking_success"));
                this.$modal.hide("vote-cancel");
                this.$modal.hide("vote-modal");
                window.location.reload();
              });
          }
        });
    },
    refreshSurvey() {
      this.$store.dispatch("state_definition/getHomeSurveyApproval");
    },
    addNewChoice() {
      let country = localStorage.getItem("country");
      if (this.user.phone_verify === 0 || this.user.status == "pending") {
        this.$modal.show("profile-verify-message-modal");
        return;
      }
      this.$store
        .dispatch("state_definition/checkLogin")
        .then(response => {
          let user = response.result.set.user;
          if (user.phone_verify === 0) {
            this.$modal.show("profile-verify-message-modal");
            return;
          }
          if (user.country.code !== country) {
            this.$toast.error(this.$t("msg.error_not_country_choice"));
            return;
          }
          this.$modal.show("new-choice-modal");
        })
        .catch(error => {
          this.$modal.show("login-modal");
          this.userLogin = false;
        });
    },
    addSurvey() {
      this.$store
        .dispatch("state_definition/checkLogin")
        .then(response => {
          if (this.user.phone_verify === 0 || this.user.status == "pending") {
            this.$modal.show("profile-verify-message-modal");
            return;
          }
          this.$router.push("/survey/add");
        })
        .catch(error => {
          this.$modal.show("login-modal");
          this.userLogin = false;
        });
    },
    linkifyMethod(text) {
      return text ? linkify(text) : null;
    }
  }
};
</script>
<style>
.survey-chart {
  height: 500px;
  margin-top: -50px;
}
@media only screen and (max-width: 600px) {
  .survey-chart {
    width: 100%;
    height: 00px;
    margin-top: -100px;
  }
}

@media only screen and (min-width: 700px) and (max-width: 1330px) {
  .survey-chart {
    width: 100%;
    height: 600px;
    margin-top: -100px;
  }
}
.survey-button,
.card-header {
  z-index: 1;
}
</style>
