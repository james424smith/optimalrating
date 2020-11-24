<template>
  <div class="col-12">
    <div class="row comment-title">
      <div class="col-12 mb-2">
        <ul class="comment-sort" style="list-style: none">
          <li class="comment-count">
            <h4>{{comments.length}} {{$t('lbl.comments')}}</h4>
          </li>
          <li>
            <b-dropdown class="buttonDropdown">
              <template v-slot:button-content>
                <i class="fa fa-sort-amount-desc" aria-hidden="true"></i>
                &nbsp;{{$t('lbl.sort_comments')}}
              </template>
              <b-dropdown-item
                href="javascript:;"
                @click="sortComment('created_at')"
              >{{$t('lbl.sort_newest')}}</b-dropdown-item>
              <b-dropdown-item
                style="margin-left:0 !important"
                href="javascript:;"
                @click="sortComment('likes')"
              >{{$t('lbl.sort_best_comments')}}</b-dropdown-item>
            </b-dropdown>
          </li>
        </ul>
      </div>
    </div>
    <!---Survey Answer Comment --->
    <div class="comment-footer row media mt-1 mb-2 profile-timeline-media" v-if="user">
      <div class="col-md-12 float-left">
        <div class="align-self-start iconbox-45 overflow-hidden mr-0 float-left">
          <img
            v-if="user && user.user_details && user.user_details.profile_image && user.user_details.profile_image !== ''"
            :src="cdnUrl+imageUrl+user.user_details.profile_image"
            @error="brokenUrl"
            alt="Generic placeholder image"
          />
          <img src="~/assets/img/user_40x40.png" style="width:100%" v-else />
        </div>
        <comment-text-area
          v-model="newComment"
          id="about_me"
          :placeholder="$t('lbl.comment_write_placeholder')"
          :bus="bus"
          emitName="newComment"
          class="col-11 m-0 p-0 float-right"
        />
        <div class="clearfix"></div>
        <div class="comment-submit-action col-8 float-right" v-if="submitAction">
          <button
            :disabled="saving"
            class="btn btn-optimal float-right btn-save"
            @click="saveComment()"
          >{{saving ? $t('lbl.processing') : $t('lbl.survey_comment_answer')}}</button>
          <button
            class="btn btn-secondary float-right mr-1"
            @click="actionSubmitHide()"
          >{{$t('lbl.cancel')}}</button>
        </div>
      </div>
    </div>
    <!---Survey Answer Comment --->
    <div v-if="showFriendTooltip">
      <AddFriendTooltip
        :refInfo="refInfo"
        :position="friendTooltipPosition"
        :profile="showProfile"
        :user="user"
      ></AddFriendTooltip>
    </div>
    <!---Comment List----->
    <div class="comment-list">
      <div
        v-for="(comment, index) in commentTable"
        v-if="index < showCommentCount"
        class="parentComment media mt-1 profile-timeline-media col-12"
        style="padding-right: 0"
      >
        <div class="align-self-start iconbox-45 overflow-hidden mr-3 mt-3">
          <img
            :ref="'userImageRef'"
            class="cursor-pointer select-profile"
            :src="comment.user.user_details
                        ? cdnUrl+imageUrl+comment.user.user_details.profile_image :''"
            @error="brokenUrl"
            @click="$router.push('/user/'+comment.user.username)"
            alt="Generic placeholder image"
          />
          <!--@mouseover="openFriendPopup(comment.user, 'userImageRef', index)"-->
        </div>
        <div class="media-body" style="position: relative">
          <div class="comment-text col-12 float-left" style="padding-right: 0">
            <div class="comment-header">
              <div class="comment-name col-7 float-left cursor-pointer" :ref="'userNameRef'">
                <!--@mouseover="openFriendPopup(comment.user, 'userNameRef' ,index)"-->
                <h6
                  class="mt-0 text-dark float-left select-profile"
                  :ref="'userNameRef'"
                  @click="$router.push('/user/'+comment.user.username)"
                  v-if="comment.user.firstname !== null && comment.user.firstname !== ''"
                >
                  {{comment.user.firstname|capitalize}} {{comment.user.middlename|capitalize}}
                  {{comment.user.lastname|capitalize}}
                  <i
                    class="fa fa-check isReal"
                    v-if="comment.user.is_real == 1"
                  ></i>
                </h6>
                <h6
                  class="mt-0 text-dark float-left select-profile"
                  @click="$router.push('/user/'+comment.user.username)"
                  v-else
                >{{comment.user.username|capitalize}}</h6>
                &nbsp; &nbsp;{{getDate(comment.updated_at)}}
              </div>
              <div class="clearfix"></div>
            </div>
            <span v-if="comment.id !== editCommentId">{{comment.body}}</span>
            <div v-if="comment.id === editCommentId" class="col-12">
              <comment-text-area
                v-model="editCommentText"
                id="editCommentText"
                :placeholder="$t('lbl.comment_write_placeholder')"
                :bus="bus"
                emitName="editCommentText"
                class="comment-textarea col-12 float-right"
              />

              <div class="clearfix"></div>
              <div class="col-12 float-right mt-1 mr-0 pr-0">
                <div
                  @click="editCommentSave"
                  class="editCommentSaveButton btn btn-optimal"
                >{{$t('lbl.save')}}</div>
                <div
                  @click="editCommentCancel"
                  class="editCommentCancelButton btn btn-secondary"
                >İptal</div>
              </div>
            </div>
            <br />
            <span class="comment-ans mr-2" @click="likeComment(comment)">
              <i
                :class="'fa fa-thumbs-up fa-1x like-button'+( comment.likes && (checkLike(comment.likes)) ? '':  ' not-like' )"
                aria-hidden="true"
              ></i>
              {{comment.likes ? comment.likes.length : 0}}
            </span>
            <span
              class="comment-ans"
              @click="commentToComment(comment)"
            >{{$t('lbl.comment_answer')}}</span>
            <div class="commentToComment" v-if="comment.id === parentCommentId">
              <comment-text-area
                v-model="childEditCommentText"
                id="childEditCommentText"
                :placeholder="$t('lbl.comment_write_placeholder')"
                :bus="bus"
                emitName="childEditCommentText"
                class="comment-textarea col-12 float-right"
              />
              <div class="clearfix"></div>
              <div class="col-8 float-right mt-1 mr-0 pr-0">
                <div
                  @click="saveCommentToComment"
                  class="editCommentSaveButton btn btn-optimal"
                  style="width: auto !important"
                >{{$t('lbl.comment_answer')}}</div>
                <div
                  @click="cancelCommentToComment"
                  class="editCommentCancelButton btn btn-secondary"
                >{{$t('lbl.cancel')}}</div>
              </div>
            </div>
            <br />
            <a
              class="show-comment-ans"
              v-if="showSubComments !== comment.id"
              @click="showSubComment(comment.id, comment.comments)"
            >{{$t('lbl.comments_show')}}({{comment.comments.length}})</a>
            <a
              class="show-comment-ans"
              v-if="showSubComments === comment.id"
              :ref="'comment_show_'+comment.id"
              @click="showSubComment(comment.id, comment.comments)"
            >{{$t('lbl.comments_hide')}}</a>

            <!-------Child Comment --->
            <div
              class="sub-comment"
              v-if="showSubComments === comment.id && comment.comments.length > 0"
            >
              <div
                v-for="subComment in comment.comments"
                class="media mt-2 profile-timeline-media col-12"
                style="padding-right: 0"
              >
                <div class="align-self-start iconbox-45 overflow-hidden mr-3">
                  <img
                    :src="cdnUrl+imageUrl+subComment.user.user_details.profile_image"
                    @error="brokenUrl"
                    @click="$router.push('/user/'+subComment.user.username)"
                    alt="Generic placeholder image"
                  />
                </div>
                <div class="media-body" style="position: relative">
                  <div class="comment-text col-12 float-left" style="padding-right: 0">
                    <div class="comment-header">
                      <div class="comment-name col-10 float-left">
                        <h6
                          class="mt-0 text-dark float-left"
                          @click="$router.push('/user/'+subComment.user.username)"
                          v-if="subComment.user.firstname !== null && subComment.user.firstname !== ''"
                        >
                          {{subComment.user.firstname|capitalize}} {{subComment.user.middlename|capitalize}} {{subComment.user.lastname|capitalize}}
                          <i
                            class="fa fa-check isReal"
                            v-if="comment.user.is_real"
                          ></i>
                        </h6>
                        <h6
                          class="mt-0 text-dark float-left"
                          @click="$router.push('/user/'+subComment.user.username)"
                          v-else
                        >{{subComment.user.username|capitalize}}</h6>
                        &nbsp; &nbsp;{{getDate(subComment.updated_at)}}
                      </div>
                      <div class="clearfix"></div>
                    </div>
                    <span v-if="subComment.id !== parentCommentEdit">{{subComment.body}}</span>
                    {{parentCommentEdit}}
                    <div v-if="subComment.id === editCommentId" class="col-12">
                      <comment-text-area
                        v-model="editCommentText"
                        :placeholder="$t('lbl.comment_write_placeholder')"
                        :bus="bus"
                        emitName="editCommentText"
                        class="comment-textarea col-12 float-right"
                      />
                      <div class="clearfix"></div>
                      <div class="col-7 float-right mt-1 mr-0 pr-0">
                        <div
                          @click="editCommentSave"
                          class="editCommentSaveButton btn btn-optimal"
                          style="width: auto !important"
                        >{{$t('lbl.save')}}</div>
                        <div
                          @click="editCommentCancel"
                          class="editCommentCancelButton btn btn-secondary"
                        >{{$t('lbl.cancel')}}</div>
                      </div>
                    </div>
                    <br />
                    <span class="comment-ans mr-2" @click="likeComment(subComment)">
                      <i
                        :class="'fa fa-thumbs-up fa-1x like-button'+( subComment.likes && (checkLike(subComment.likes)) ? '':  ' not-like' )"
                        aria-hidden="true"
                      ></i>
                      {{subComment.likes ? subComment.likes.length : 0}}
                    </span>
                    <span
                      class="comment-ans"
                      @click="commentToComment(subComment, true, comment)"
                    >{{$t('lbl.comment_answer')}}</span>
                    <div class="commentToComment" v-if="subComment.id === parentCommentId">
                      <comment-text-area
                        v-model="childEditCommentText"
                        :placeholder="$t('lbl.comment_write_placeholder')"
                        :bus="bus"
                        emitName="childEditCommentText"
                        class="comment-textarea col-12 float-right"
                      />
                      <div class="clearfix"></div>
                      <div class="col-8 float-right mt-1 mr-0 pr-0">
                        <div
                          @click="saveCommentToComment"
                          class="editCommentSaveButton btn btn-optimal"
                          style="width: auto !important"
                        >{{$t('lbl.comment_answer')}}</div>
                        <div
                          @click="cancelCommentToComment"
                          class="editCommentCancelButton btn btn-secondary"
                        >{{$t('lbl.cancel')}}</div>
                      </div>
                    </div>
                    <!--  <span class="comment-ans" v-if="user && user.id === subComment.user.id" @click="editComment(subComment)">{{$t('lbl.comment_edit')}}</span>
                                          <span class="comment-ans" v-if="user && user.id === subComment.user.id" @click="deleteComment(subComment.id)">{{$t('lbl.comment_delete')}}</span>
                    <br>-->
                  </div>
                  <div
                    class="comment-action col-1 float-right sub-comment-action"
                    ref="comment-1"
                    style="position: absolute; right: 0; top: 0;"
                  >
                    <b-dropdown
                      class="buttonDropdown"
                      v-if="user && user.id === subComment.user.id"
                    >
                      <template v-slot:button-content>
                        <i class="mdi mdi-dots-vertical" aria-hidden="true"></i>
                      </template>
                      <b-dropdown-item @click="editComment(subComment)">{{$t('lbl.comment_edit')}}</b-dropdown-item>
                      <b-dropdown-item
                        @click="deleteComment(subComment.id)"
                      >{{$t('lbl.comment_delete')}}</b-dropdown-item>
                    </b-dropdown>
                  </div>
                </div>
              </div>
            </div>
            <!------Child Comment ---->
          </div>
          <div
            class="comment-action col-1 float-left"
            ref="comment-1"
            style="position: absolute; right: -12px; top: 10px;"
          >
            <b-dropdown class="buttonDropdown" v-if="user && user.id === comment.user.id">
              <template v-slot:button-content>
                <i class="mdi mdi-dots-vertical" aria-hidden="true"></i>
              </template>
              <b-dropdown-item @click="editComment(comment)">{{$t('lbl.comment_edit')}}</b-dropdown-item>
              <b-dropdown-item @click="deleteComment(comment.id)">{{$t('lbl.comment_delete')}}</b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>
    </div>

    <div class="show-more-comment">
      <a href="javascript:;" @click="showMoreComment" v-if="showCommentCount === 2">
        <i class="fa fa-angle-down" aria-hidden="true"></i>
        {{$t('lbl.show_more_comment')}}
      </a>
      <a href="javascript:;" @click="showMoreComment" v-else>
        <i class="fa fa-angle-up" aria-hidden="true"></i>
        {{$t('lbl.hide_comment')}}
      </a>
    </div>
    <!---Comment List----->
  </div>
</template>
<script>
import img4040 from "~/assets/img/user_40x40.png";
import AddFriendTooltip from "~/components/user/AddFriendTooltip";
import CommentTextArea from "~/components/common/CommentTextArea.vue";
import Vue from "vue";
export default {
  props: ["comments", "survey", "user", "bus"],
  components: {
    AddFriendTooltip,
    CommentTextArea
  },
  data() {
    return {
      saving: false,
      submitAction: false,
      showSubComments: null,
      currentClick: null,
      parentCommentEdit: null,
      newComment: null,
      editCommentText: null,
      editCommentId: null,
      cdnUrl: process.env.cdn_url,
      imageUrl: `/images/user/`,
      userImage: null,
      parentCommentId: null,
      childEditCommentText: null,
      ifChildThenParentId: null,
      isChild: false,
      commentTable: [],
      showCommentCount: 2,
      showFriendTooltip: null,
      showProfile: null,
      friendTooltipPosition: null,
      refInfo: null
    };
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    truncate: function(string) {
      if (string) {
        let truncate = string.slice(0, 1) + ".";
        return truncate;
      }
    }
  },
  watch: {
    comments: function(item) {
      this.commentTable = item;
    },
    showFriendTooltip: function(item) {
      return item;
    }
  },
  created() {
    this.bus.$on("newComment", value => {
      this.newComment = value;
    });
    this.bus.$on("editCommentText", value => {
      this.editCommentText = value;
    });
    this.bus.$on("childEditCommentText", value => {
      this.childEditCommentText = value;
    });
    this.bus.$on("actionSubmitShowOn", value => {
      this.actionSubmitShow();
    });
  },
  mounted() {
    this.commentTable = this.comments;

    document.onmouseover = this.closeFriendPopup;
    //document.onclick = this.visibleComment;
    //this.userImage = this.user.user_details.profile_image;
  },
  methods: {
    getDate(dateStr) {
      let date = this.$moment(dateStr);
      let difference = new Date().getTimezoneOffset() / -60;
      date.add(difference, "hours");
      return date.format('DD.MM.YYYY hh:mm');
    },
    goProfile(profile) {
      console.log(profile.username);
      this.$router.push("/" + profile.username);
    },
    openFriendPopup(profile, refName, itemIndex) {
      this.showFriendTooltip = false;
      this.showProfile = profile;
      this.refInfo = { refName, itemIndex };
      let position = this.$refs[refName][0].getBoundingClientRect();
      let extraPixel = this.user ? 130 : 0;
      this.friendTooltipPosition =
        itemIndex === 0 ? -66 : (itemIndex + 1) * 92 + itemIndex - extraPixel;
      this.showFriendTooltip = true;

      if (this.user) {
        let find = this._.map(this.user.pending_friends, item => {
          return item && item.user && item.user === profile.id;
        });
      }
    },
    closeFriendPopup(e) {
      let tooltipSelector = $(".tooltip-profile");
      let selectProfile = $(".select-profile");

      let selectCheck =
        !selectProfile.is(e.target) && selectProfile.has(e.target).length === 0;
      let toolCheck =
        !tooltipSelector.is(e.target) &&
        tooltipSelector.has(e.target).length === 0;

      if (selectCheck && toolCheck) {
        this.showFriendTooltip = false;
      }
    },
    showMoreComment() {
      this.showCommentCount =
        this.showCommentCount === 2 ? this.commentTable.length : 2;
    },
    sortComment(sort) {
      this.commentTable = this._.orderBy(this.commentTable, [sort], ["desc"]);
    },
    brokenUrl(event) {
      event.target.src = img4040;
      event.target.style = "height:45px";
    },
    showSubComment(id) {
      if (this.showSubComments === id) {
        this.showSubComments = null;
      } else {
        this.showSubComments = id;
      }
    },
    actionSubmitShow() {
      if (this.user === null) {
        this.$modal.show("login-modal");
        return;
      }
      if (this.user && this.user.status !== "approved") {
        this.$modal.show("profile-verify-message-modal");
        return;
      }
      this.submitAction = true;
    },
    actionSubmitHide() {
      this.submitAction = !this.submitAction;
    },
    saveComment() {
      this.saving = true;
      this.$store
        .dispatch("state_definition/saveComment", {
          body: this.newComment,
          survey_id: this.survey.id
        })
        .then(response => {
          this.saving = false;
          this.actionSubmitShow();
          this.newComment = null;
          this.$toast.success(this.$t("msg.comment_saved"));
          this.bus.$emit("refreshSurvey");
        })
        .catch(() => (this.saving = false));
    },
    editCommentSave() {
      this.$store
        .dispatch("state_definition/editComment", {
          body: this.editCommentText,
          comment_id: this.editCommentId
        })
        .then(response => {
          this.$toast.success(this.$t("msg.comment_saved"));
          this.bus.$emit("refreshSurvey");
          this.editCommentCancel();
        });
    },
    deleteComment(comment) {
      this.$store
        .dispatch("state_definition/deleteComment", { id: comment })
        .then(response => {
          this.$toast.success(this.$t("msg.comment_deleted"));
          this.bus.$emit("refreshSurvey");
          this.editCommentCancel();
        });
    },
    editCommentCancel() {
      this.parentCommentEdit = null;
      this.editCommentText = null;
      this.editCommentId = null;
    },
    editComment(comment) {
      this.editCommentId = comment.id;
      this.editCommentText = comment.body;
    },
    saveCommentToComment() {
      let id = this.isChild ? this.ifChildThenParentId : this.parentCommentId;
      this.$store
        .dispatch("state_definition/saveComment", {
          body: this.childEditCommentText,
          comment_id: id
        })
        .then(response => {
          this.$toast.success(this.$t("msg.comment_saved"));
          this.bus.$emit("refreshSurvey");
          this.showSubComments = this.parentCommentId;
          this.parentCommentId = null;
          this.childEditCommentText = null;
        });
    },
    cancelCommentToComment() {
      this.parentCommentId = null;
    },
    commentToComment(comment, isChild = false, commentParent = null) {
      if (this.user === null) {
        this.$modal.show("login-modal");
        return;
      }
      if (this.user && this.user.status !== "approved") {
        this.$modal.show("profile-verify-message-modal");
        return;
      }
      if (isChild) {
        this.childEditCommentText = "";
        this.isChild = true;
        this.ifChildThenParentId = commentParent.id;
      }
      this.parentCommentId = comment.id;
    },
    likeComment(comment) {
      if (this.user === null) {
        this.$modal.show("login-modal");
        return;
      }
      if (this.user && this.user.status !== "approved") {
        this.$modal.show("profile-verify-message-modal");
        return;
      }
      let _this = this;
      this.$store
        .dispatch("state_definition/likeComment", { comment_id: comment.id })
        .then(response => {
          this.$toast.success(this.$t("msg.comment_liked"));
          _this.bus.$emit("refreshSurvey");
        });
    },
    checkLike(likes) {
      if (this.user === null) {
        return;
      }
      let myLike = this._.filter(likes, item => {
        if (item.user_id == this.user.id) return item;
      });

      return myLike.length > 0 ? 1 : 0;
    }
  }
};
</script>
<style>
.sub-comment-action {
  position: relative;
  right: -67px;
}
.cursor-pointer {
  cursor: pointer;
}
.isReal {
  background: #3a99ab;
  color: #fff;
  padding: 3px;
  font-size: 10px;
  border-radius: 10px;
  float: right;
  margin-top: 1px;
  margin-left: 5px;
}
.show-more-comment {
  text-align: center;
  margin-top: 10px;
}
.show-more-comment a {
  color: #3a99ab;
}
.show-more-comment a:hover {
  color: #3a99ab;
}
.comment-sort {
  list-style: none;
}
.comment-sort li {
  float: left;
}
.comment-sort li:last-child {
  margin-left: 10px;
}
.comment-count {
  color: #000;
}
.comment-sort button {
  padding: 0 !important;
  color: #606060 !important;
  font-style: 1rem;
}
.comment-sort button i {
  color: #606060 !important;
}
textarea::-webkit-input-placeholder {
  color: grey !important;
}
textarea:-moz-placeholder {
  /* Firefox 18- */
  color: grey !important;
}
textarea::-moz-placeholder {
  /* Firefox 19+ */
  color: grey !important;
}
textarea:-ms-input-placeholder {
  color: grey !important;
}
textarea::placeholder {
  color: grey !important;
}
textarea::-webkit-scrollbar {
  width: 12px;
  background-color: #f5f5f5;
}
textarea::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #4285f4;
}
.like-button {
  font-size: 18px;
}
.not-like {
  color: #606060;
}
.editCommentSaveButton,
.editCommentCancelButton {
  height: 30px;
  margin-top: 5px;
  width: 80px !important;
  float: left;
  margin-left: 10px;
  padding-top: 3px;
  float: right;
}
.parentComment {
  padding: 0;
  padding-bottom: 5px;
  border-bottom: 1px solid lightgrey;
}
.parentComment:last-child {
  border-bottom: none;
}
.show-comment-ans {
  cursor: pointer;
}
.comment-submit-action {
  margin-top: 15px;
}
.comment-ans {
  font-weight: bolder;
  color: #606060;
  cursor: pointer;
  font-size: 15px;
  line-height: 2rem;
}
.comment-text:hover {
}
.profile-timeline-media {
  padding-top: 5px !important;
}
.comment-header {
  margin-bottom: 5px;
}
.comment-name {
  padding: 0;
}
.comment-action {
  /*margin-top: 35px;*/
}
.comment-sort {
  font-size: 16px;
  padding: 0;
}
.comment-action button {
  font-size: 26px;
  width: 25px;
}
.comment-footer textarea,
.answerTextArea {
  resize: none;
  height: 45px !important;
  display: block;
  width: 100%;
  border: 0;
  padding: 10px 5px;
  background: white no-repeat;
  background-image: linear-gradient(to bottom, black, lightgrey),
    linear-gradient(to bottom, silver, silver);
  background-size: 0 2px, 100% 1px;
  background-position: 50% 100%, 50% 100%;
  transition: background-size 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
}
.comment-footer textarea:focus,
.answerTextArea:focus,
.comment-textarea textarea:focus,
textarea:focus {
  background-size: 100% 2px, 100% 1px;
  outline: none;
}
.buttonDropdown {
  border: none;
}
.buttonDropdown button {
  border: none;
  width: 30px !important;
  margin-right: 15px;
  background: none !important;
}
.buttonDropdown button i {
  color: #000;
}
</style>
