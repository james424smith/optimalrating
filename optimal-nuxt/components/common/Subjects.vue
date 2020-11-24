<template>
  <div>
    <div class="card">
      <div class="card-header" id="headingThree">
        <button
          class="btn btn-link collapsed collapsed-button"
          @click="showButton"
          data-toggle="collapse"
          data-target="#collapseThree"
          aria-expanded="false"
          aria-controls="collapseThree"
        >{{$t('lbl.subjects')}}</button>
      </div>
      <div
        id="collapseThree"
        :class="'collapse'+(show ? ' show':'')"
        aria-labelledby="headingThree"
        data-parent="#accordion"
        style
      >
        <div class="card-body" style="padding: 0 15px; padding-bottom: 20px">
          <ul>
            <li v-for="(subject,index) in subjects" v-if="index < 5">
              <nuxt-link
                class="accordion-link"
                :to="'/subject/'+subject.slug"
              >{{$t(subject.translate_key)}}</nuxt-link>
            </li>
            <li style="margin-top: 5px">
              <nuxt-link class="accordion-link" :to="'/'">{{$t('lbl.show_more_subjects')}}</nuxt-link>
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
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapState("state_definition", {
      subjects: state => state.subjects
    })
  },
  methods: {
    showButton() {
      this.show = !this.show;
    }
  },
  updated() {
    console.log(this.subjects);
  },
  created() {
    this.$store.dispatch("state_definition/getAllSubjects");
  },
  async fetch({ store, params }) {
    await store.dispatch("state_definition/getAllCategory");
  }
};
</script>
