<template>
  <div>
    <GChart
      type="PieChart"
      :data="finalChart"
      class="survey-chart"
      :events="chartEvents"
      :options="chartOptions"
      :resizeDebounce="700"
      ref="chart"
    />
  </div>
</template>

<script>
export default {
  props: ["chartItem", "survey", "bus"],
  watch: {
    charItem: function(item) {
      console.log(item, "asd");
    }
  },
  data() {
    return {
      chartData: [["VoteName", "VoteCount"]],
      chartOptions: {
        pieSliceText: "label",
        legend: {
          position: "bottom"
        }
      },
      chartEvents: {
        select: evt => {
          this.$store
            .dispatch("state_definition/checkLogin")
            .then(response => {
              let chart = this.$refs.chart.chartObject.getSelection();

              if (chart.length === 0) {
                return;
              }

              let selectRow = this.$refs.chart.data[chart[0].row + 1];

              let item = this._.find(this.survey.choices, item => {
                return item.choice_title === selectRow[0];
              });
              this.bus.$emit("choice", item);
              // console.log(chart.getSelection());
            })
            .catch(error => {
              this.$modal.show("login-modal");
              this.userLogin = false;
            });
        }
      }
    };
  },
  computed: {
    finalChart() {
      let data = [...this.chartItem];
      data.splice(0, 1);
      let total = data.map(x => x[1]).reduce((a, b) => a + b, 0);
      data = data.map(x => {
        let rate = ((100 * x[1]) / total).toFixed(2);
        return [x[0], x[1], `${x[0]} (${rate}%)`];
      });
      return [
        [
          "VoteName",
          "VoteCount",
          { type: "string", role: "tooltip", p: { html: true } }
        ],
        ...data
      ];
    }
  }
};
</script>
<style>
.survey-chart {  
  position: relative;
  z-index: 999;
}
.survey-chart rect {
  opacity: 0;
}
</style>