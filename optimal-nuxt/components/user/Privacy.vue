<template>
  <div class="col-9 float-right">
    <div class="card card-default">
      <div class="card-body">
        <div class="privacy-list">
          <div class="title-privacy-choice">
            <div class="col-7 float-left"></div>
          </div>
          <div class="privacy-choices">
            <!--<div class="privacy-choice">
                            <div class="choice-title col-7 float-left"></div>
                            <div class="choice-item col-5 float-right p-0">
                                <div class="col-4 p-0">Everybody</div>
                                <div class="col-4 p-0">Friends</div>
                                <div class="col-4 p-0">Nobody</div>
                            </div>
            </div>-->
          </div>
          <div class="clearfix"></div>
          <div class="privacy-choices">
            <div class="privacy-choice privacy-choices-element mb-1">
              <div class="privacy">
                <div class="choice-title col-7 float-left"></div>
                <div class="choice-item choice-element col-5 float-right p-0 text-center">
                  <h4>{{$t('lbl.who_can_see')}}</h4>
                </div>
              </div>
            </div>
            <div
              class="privacy-choice privacy-choices-element mb-1"
              v-for="(item) in privacySort(privacy)"
            >
              <div class="privacy" v-if="item && item.privacy">
                <div class="choice-title col-7 float-left">
                  <b>{{$t('lbl.'+item.privacy.translate_key)}}</b>
                  <!--<sub>{{item.privacy.description}}</sub>-->
                </div>
                <div class="choice-item choice-element col-5 float-right p-0">
                  <select class="form-control col-12" @change="onChange($event)" :name="item.id">
                    <option
                      v-for="option in item.privacy.options"
                      :value="option.id"
                      :selected="option.id === item.option.id ? 'selected' : ''"
                    >{{$t('lbl.'+option.option.toLowerCase())}}</option>
                  </select>

                  <!--<div class="col-4 p-0 flo">
                                        <input type="radio">
                                    </div>
                                    <div class="col-4 p-0">
                                        <input type="radio">
                                    </div>
                                    <div class="col-4 p-0">
                                        <input type="radio">
                  </div>-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.privacy-choices-element {
  height: 50px;
  border-bottom: 1px #ebebeb solid;
}
.privacy-choices-element:last-child {
  border-bottom: none;
}
.title-privacy-choice {
  text-align: right;
}
.choice-item div {
  float: left;
  font-size: 12px;
  text-align: center;
}

.profile-link-about a {
  color: #000;
}
.profile-link {
  display: block;
  list-style: none;
}
.profile-info {
  margin-top: 10px;
  border-top: 1px solid #ebebeb;
}

.profile-card-body {
  padding: 0 !important;
  padding-top: 15px !important;
  padding-bottom: 15px !important;
}
.privacy-profile-image img {
  max-width: 100%;
}
.privacy-list {
  width: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      privacy: []
    };
  },
  created() {
    if (process.client) {
      this.getUserPrivacy();
    }
  },
  filters: {},
  methods: {
    privacySort(items) {
        let data = [
            items[1],
            items[2],
            items[0],
            items[7],
            items[5],
            items[3],
            items[4],
            items[9],
            items[8],
            items[6],
            items[12],
            items[10],
            items[11],
            items[13],
            items[17],
            items[14],
            items[16],
            items[15],
        ];
    //   let data = this._.orderBy(items, ["privacy.id"], ["asc"]);
      return data;
    },
    onChange(event) {
      let data = {
        method: "privacySettingsChange",
        data: { privacy: event.target.name, option: event.target.value }
      };
      this.actions(data).then(response => {
        this.$toast.success(this.$t("msg.saved"));
      });
    },

    getUserPrivacy() {
      let data = { method: "getPrivacy" };
      this.actions(data).then(response => {
        this.privacy = response.result.set;
      });
    },

    actions(data) {
      return this.$store.dispatch("state_definition/privacyController", data);
    }
  }
};
</script>
