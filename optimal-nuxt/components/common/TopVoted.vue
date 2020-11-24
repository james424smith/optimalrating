<template>
  <div>
    <div class="card">
      <div class="card-header" id="headingOne">
        <button
          @click="showButton"
          class="btn btn-link collapsed collapsed-button"
          data-toggle="collapse"
          data-target="#collapseOne"
          aria-expanded="false"
          aria-controls="collapseOne"
        >{{$t('lbl.top_voted')}}</button>
      </div>
      <div
        id="collapseOne"
        :class="'collapse'+(show ? ' show':'')"
        aria-labelledby="headingOne"
        data-parent="#accordion"
        style
      >
        <div class="card-body" style="padding: 0 15px">
          <ul>
            <li v-for="(survey, index) in surveys" v-if="index < 5">
              <nuxt-link class="accordion-link" :to="'/survey/'+survey.slug">{{survey.title}}</nuxt-link>
            </li>
            <li style="margin-top: 5px">
              <nuxt-link class="accordion-link" :to="'/'">{{$t('lbl.show_more_top_voted')}}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("state_definition", {
      surveys: state => state.newest
    })
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    showButton() {
      this.show = !this.show;
    }
  },
  created() {
    // this.$store.dispatch('state_definition/topVoted');
  },
  async fetch({ store, params }) {
    await store.dispatch("state_definition/getAllCategory");
  }
};
</script>
