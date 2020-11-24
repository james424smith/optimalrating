<template>
  <img :src="url" @error="onError" :style="imgstyle" />
</template>
<script>
export default {
  name: "SurveyImg",
  props: ["path", "imgstyle"],
  data() {
    return {
      isSec: false,
      url: process.env.cdn_url + "/images/choice/" + this.path
    };
  },
  methods: {
    onError(event) {
      if (!this.isSec) {
        this.isSec = true;
        this.url = process.env.cdn_url + "/images/survey_approval/" + this.path;
      } else {
        event.target.style = "display:none";
      }
    }
  }
};
</script>