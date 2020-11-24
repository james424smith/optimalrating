<template>
  <no-ssr>
    <div class="col-xl-12">
      <div v-if="loading" style="padding: 20px; text-align: center;">{{$t('lbl.loading')}}</div>
      <profile-edit v-if="!loading && isOk" />
    </div>
  </no-ssr>
</template>
<script>
import ProfileEdit from "~/components/user/ProfileEdit";
import { mapState } from "vuex";
export default {
  layout: "profile_configuration",
  head: {
    title: "Optimal Rating | Edit Profile",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ]
  },
  data() {
    return {
      loading: true,
      isOk: false
    };
  },
  computed: {
    ...mapState("state_definition", {
      user: state => state.user
    })
  },
  created() {
    if (process.client) {
      this.$store
        .dispatch("state_definition/checkLogin")
        .then(response => {
          this.loading = false;
          let res = response.result.set.user;
          let query = window.location.search.split("?");
          let param = "";
          if (query.length > 1) {
            param = query[1].split("=")[1];
          }

          if (res.status === "freeze" && param !== "approve") {
            this.$router.push("/profile-approve?status=approve");
          }
          this.isOk = true;
          this.userLogin = true;
        })
        .catch(error => {
          this.loading = false;
          this.$router.push("/");
        });
    }
  },
  components: {
    ProfileEdit
  },
  async fetch({ store, params }) {
    await store.dispatch("state_definition/getAllCategory");
    await store.dispatch("state_definition/getHomeSpecialSurvey");
  }
};
</script>
