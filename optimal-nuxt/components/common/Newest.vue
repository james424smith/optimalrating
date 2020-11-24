<template>
  <div>
    <div class="card">
      <div class="card-header" id="headingTwo">
        <button
          class="btn btn-link collapsed collapsed-button"
          @click="showButton"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="false"
          aria-controls="collapseTwo"
        >{{$t('lbl.newest')}}</button>
      </div>
      <div
        id="collapseTwo"
        :class="'collapse'+(show ? ' show':'')"
        aria-labelledby="headingTwo"
        data-parent="#accordion"
        style
      >
        <div class="card-body" style="padding: 0 15px">
          <ul>
            <li v-for="(newest, index) in surveys" v-if="index < 5">
              <nuxt-link class="accordion-link" :to="'/survey/'+newest.slug">{{newest.title}}</nuxt-link>
            </li>

            <li style="margin-top: 5px">
              <nuxt-link class="accordion-link" :to="'/'">{{$t('lbl.show_more_newest')}}</nuxt-link>
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
      show: false,
      newestLimit: 5
    };
  },
  methods: {
    showButton() {
      this.show = !this.show;
    }
  },
  created() {
    this.$store.dispatch("state_definition/newest");
  },
  async fetch({ store, params }) {
    await store.dispatch("state_definition/getAllCategory");
  }
};
</script>
