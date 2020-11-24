<template>
  <div class="card card-default" v-if="survey">
    <div class="card-header justify-content-between card-header-border-bottom">
      <h2>{{survey.title}}</h2>
    </div>
    <div class="card-body">
      <div class="chartSpecialSurvey row">
        <div class="choice col-md-12 mb-1" v-for="choice in getChoices(survey.choices)">
          <div class="col-md-4 col-4 float-left titleChoice">
            <label class="choiceLabel">
              <input
                class="ml-3"
                :id="'survey_'+survey.id"
                name="special_survey"
                v-model="choiceSelected"
                :value="choice.id"
                type="radio"
              />
              &nbsp;{{choice.choice_title}}
            </label>
          </div>
          <div class="col-md-8 col-8 float-left inputChoice">
            <div class="gray-bar">
              <span class="choicePoint">{{calculatePoint(choice.votes)}}%</span>
              <div class="blue-bar" :style="'width:'+calculatePoint(choice.votes)+'%;'"></div>
            </div>
          </div>
        </div>
        <button
          class="btn btn-optimal buttonSurvey"
          @click="votePush"
          :disabled="saving"
        >{{saving ? $t('lbl.voting') : $t('lbl.vote')}}</button>
      </div>
      <div class="clearfix"></div>
      <div class="row">
        <timeline-comment
          class="comment-timeline"
          :comments="survey.comments"
          :bus="bus"
          :survey="survey"
          :user="user"
        />
      </div>
    </div>
    <modal name="special-vote-cancel" width="500" height="auto">
      <div class="modal-header">
        <h3>{{$t('lbl.title_cancel_vote')}}</h3>
        <a href="javascript:;" @click="$modal.hide('special-vote-cancel')">X</a>
      </div>
      <div class="modal-body">{{$t('lbl.already_voted')}}</div>
      <div class="modal-footer">
        <slot name="footer">
          <button
            :disabled="saving"
            class="btn btn-optimal"
            style="width:300px !important;"
            @click="pushVoteSubmit"
          >{{saving ? $t('lbl.processing') : $t('lbl.okay')}}</button>
        </slot>
      </div>
    </modal>
  </div>
</template>
<script>
import TimelineComment from "~/components/common/TimelineComment";
import Vue from "vue";

export default {
  components: {
    TimelineComment
  },
  props: ["survey", "user"],
  data() {
    return {
      saving: false,
      bus: new Vue(),
      votesCount: 0,
      choiceSelected: null,
      message: null
    };
  },
  created() {
    let _this = this;
    this.bus.$on("refreshSurvey", () => {
      _this.refreshSurvey();
    });
    if (process.client) {
      if (this.survey) {
        let vote = this._.reduce(
          this.survey.choices,
          (acc, item) => {
            acc += item.votes.length;
            return acc;
          },
          0
        );
        this.votesCount = vote;
        let vot = this._.filter(this.survey.choices, item => {
          let vote = this._.filter(item.votes, item2 => {
            if (this.user && this.user.id === item2.user_id) {
              this.choiceSelected = item2.choice_id;
            }
          });
        });
      }
    }
  },
  methods: {
    getChoices(choices) {
      let _c = [...choices];
      return _c;
      // let sorting =  this._.orderBy(choices, ['id'], ['asc']);
      // return sorting;
    },
    refreshSurvey() {
      this.$store.dispatch("state_definition/getHomeSpecialSurvey");
    },
    calculatePoint(vote) {
      if (vote.length > 0) {
        let voteItem = this._.reduce(
          this.survey.choices,
          (acc, item) => {
            acc += item.votes.length;
            return acc;
          },
          0
        );
        let votesCount = voteItem;
        let calc = ((vote.length / votesCount) * 100).toFixed(2);

        return calc;
      }
      return 0.0;
    },
    votePush() {
      if (this.choiceSelected === null) {
        this.$toast.error(this.$t("lbl.select_vote"));
        return;
      }

      if (this.user && this.user.status !== "approved") {
        this.$modal.show("profile-verify-message-modal");
        return;
      }
      this.saving = true;
      this.$store
        .dispatch("state_definition/checkVote", { survey: this.survey.id, choice: this.choiceSelected })
        .then(response => {
          this.saving = false;
          if (response.code !== 400) {
            this.message =
              "(" +
              response.result.set.choice.choice_title +
              ") " +
              response.message;
            this.$modal.show("special-vote-cancel");
          } else {
            this.pushVoteSubmit();
            this.$modal.hide("special-vote-cancel");
          }
        })
        .catch(() => {
          this.saving = false;
          this.$modal.show("login-modal");
        });
    },

    pushVoteSubmit() {
      this.saving = true;
      this.$store
        .dispatch("state_definition/checkLogin")
        .then(() => {
          this.$store
            .dispatch("state_definition/pushVote", {
              choice_id: this.choiceSelected,
              survey_id: this.survey.id
            })
            .then(response => {
              this.saving = false;
              this.$toast.success(this.$t("msg.vote_success"));
              this.refreshSurvey();
              this.$modal.hide("special-vote-cancel");
            })
            .catch(() => (this.saving = false));
        })
        .catch(() => {
          this.saving = false;
          this.$modal.show("login-modal");
        });
    }
  }
};
</script>
<style>
.buttonSurvey {
  margin: 5px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.chartSpecialSurvey {
  margin-bottom: 15px;
  border-bottom: 1px solid #ebebeb;
}

.choice,
.titleChoice,
.inputChoice {
  margin: 0;
  padding: 0;
}

.choicePoint {
  z-index: 9;
  position: absolute;
  text-align: center;
  width: 100%;
  color: #fff;
  height: 25px;
  padding: 2px;
}

.choiceChart input {
  margin-left: 0 !important;
}

.gray-bar {
  width: 100%;
  background: #bbb;
  height: 25px;
}

.blue-bar {
  background: #3a99ab;
  height: 25px;
  top: 0;
}

.comment-timeline {
  width: 100%;
}
</style>
