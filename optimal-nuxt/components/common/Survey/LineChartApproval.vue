<template>
  <div>
    <div class="chartSpecialSurvey row" style="padding: 0px 15px;">
      <div
        class="choice col-md-12 mb-2"
        v-for="(chart,index) in chartData"
        v-if="index != 0 && showMoreItemCount > index"
      >
        <div class="col-md-4 col-4 float-left titleChoice">
          <label
            :class="'choiceLabel' +(checkType ? ' cursor-pointer': '') "
            @click="selectItem(chart[0])"
          >{{chart[0]}}</label>
        </div>
        <div class="col-md-8 col-8 float-left inputChoice">
          <div class="gray-bar">
            <span class="choicePoint">{{rateCalculate(chart[1])}}%</span>
            <div class="blue-bar" :style="'width:'+rateCalculate(chart[1])+'%;'"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="show-more-comment">
      <a
        href="javascript:;"
        @click="showMoreItem(chartData.length)"
        v-if="showMoreItemCount === showItem"
      >
        <i class="fa fa-angle-down" aria-hidden="true"></i>
        {{$t('lbl.show_more_item')}}
      </a>
      <a href="javascript:;" @click="showMoreItem(showItem)" v-else>
        <i class="fa fa-angle-up" aria-hidden="true"></i>
        {{$t('lbl.hide_item')}}
      </a>
    </div>
  </div>
</template>
<style>
.cursor-pointer {
  cursor: pointer;
  color: #0a6975;
}
</style>
<script>
export default {
  props: ["survey", "chartData", "rate", "showItem", "type", "bus"],
  data() {
    return {
      showMoreItemCount: 5
    };
  },
  created() {
    this.showMoreItemCount = this.showItem;
  },
  methods: {
    showMoreItem(chart) {
      console.log(this.survey);
      this.$router.push(
        "/survey-detail/" + this.survey.slug + "-" + this.survey.id
      );
      //this.showMoreItemCount = chart
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
      return rate === 0 ? 0 : ((rate / total) * 100).toFixed(2);
    },
    selectItem(select) {
      this.$store
        .dispatch("state_definition/checkLogin")
        .then(response => {
          if (this.checkType()) {
            let item = this._.find(this.survey.choices, item => {
              return item.choice_title === select;
            });

            this.bus.$emit("choice", item);
          }
        })
        .catch(error => {
          this.$modal.show("login-modal");
          this.userLogin = false;
        });
    },
    checkType() {
      return this.type === "approval";
    }
  }
};
</script>
