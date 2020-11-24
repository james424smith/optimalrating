<template>
  <aside class="left-sidebar bg-sidebar" v-show="show">
    <div id="sidebar" class="sidebar sidebar-with-footer" style="border:1px solid #e5e9f2">
      <div class="sidebar-scrollbar">
        <h5 class="sidebar-title">
          <span class="mdi mdi-view-list"></span>
          {{$t('lbl.sidebar_categories')}}
        </h5>
        <ul class="nav sidebar-inner" id="sidebar-menu">
          <li
            :class="'has-sub pointer-event' + (nav.id === isParentActive ? ' active' : 'expand')"
            v-for="nav in navs"
            v-if="!nav.deleted_at"
          >
            <a class="sidenav-item-link" @click="parentClick(nav.url, nav.id, nav)">
              <span class="nav-text">
                {{nav.code !== null || nav.code !== ''
                ? ($t(nav.code) === nav.code ? nav.label : $t(nav.code)) : nav.label }}
              </span>
              <b class="caret" v-if="nav.children && nav.children.length > 0"></b>
            </a>
            <ul
              :class="'collapse' + (nav.id === isParentActive ? ' show' : '')"
              data-parent="#sidebar-menu"
            >
              <div v-for="child in nav.children" v-if="!child.deleted_at" class="sub-menu">
                <li
                  :class="'has-sub pointer-event' + (child.id === clickSurveyShow ? ' active' : 'expand')"
                >
                  <a class="sidenav-item-link child-link" @click="showChildSurvey(child)">
                    <span class="nav-text">{{child.label}}</span>
                    <b
                      class="caret"
                      v-show="child.surveys.filter(x => x.status !== '0').length > 0"
                    ></b>
                  </a>
                  <ul
                    :class="'collapse show'"
                    v-show="child.surveys.filter(x => x.status !== '0').length > 0 && clickSurveyShow === child.id"
                  >
                    <div
                      class="sub-menu last-child"
                      v-for="survey in child.surveys.filter(x => x.status !== '0')"
                    >
                      <li>
                        <nuxt-link :to="'/survey/'+survey.id" class="sidenav-item-link">
                          <span class="nav-text">{{survey.title}}</span>
                        </nuxt-link>
                      </li>
                    </div>
                  </ul>
                </li>
              </div>
              <div class="sub-menu add-link">
                <a href="javascript:;" @click="addNewCategory(nav)">
                  <i class="fa fa-plus"></i>
                  {{$t('lbl.new_category')}}
                </a>
              </div>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <modal name="category-modal" width="400" height="auto">
      <div class="modal-header">
        <h3>{{$t('lbl.new_category')}}</h3>
        <a href="javascript:;" @click="$modal.hide('category-modal')">X</a>
      </div>
      <div class="modal-body">
        <div class="row float-left">
          <div class="col-md-12 form-group">
            <label for="parentCategory" class="col-md-6 float-left">{{$t('lbl.select_category')}}</label>
            <treeselect
              :placeholder="$t('lbl.select_category')"
              id="parentCategory"
              class="col-md-6 p-0 float-right"
              v-model="userCategory.parent"
              :options="selectCategoryOptions()"
            />
          </div>
          <div class="col-md-12 form-group">
            <label for="subCategoryName" class="col-md-6 float-left">{{$t('lbl.sub_category_name')}}</label>
            <input
              v-model="userCategory.name"
              id="subCategoryName"
              :placeholder="$t('lbl.sub_category_name')"
              class="form-control col-md-6 float-right"
            />
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="modal-footer">
        <slot name="footer">
          <button
            class="btn btn-secondary"
            @click="$modal.hide('category-modal')"
          >{{$t('lbl.cancel')}}</button>
          <button
            :disabled="saving"
            class="btn btn-optimal"
            @click="saveUserCategory"
          >{{saving ? $t('lbl.saving') : $t('lbl.save')}}</button>
        </slot>
      </div>
    </modal>
  </aside>
</template>

<style>
.sidebar-inner,
.sidenav-item-link {
  font-family: "Verdana", sans-serif !important;
}
.sub-menu {
  padding: 0 !important;
}
.sub-menu li {
  padding-left: 15px;
}
.child-link {
  padding-bottom: 0 !important;

  height: 40px !important;
}
.add-link {
  padding-left: 30px !important;
}
.last-child {
  padding: 0 !important;
  height: 30px;
  padding-left: 30px !important;
}
.sidebar-title {
  padding: 10px;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
}
.sidebar-title span {
  font-size: 18px;
}
</style>
<script>
import { mapState } from "vuex";
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  components: {
    Treeselect
  },
  data() {
    return {
      saving: false,
      navs: [],
      show: false,
      isParentActive: null,
      hasSurveyList: [],
      clickSurveyShow: null,
      userCategory: {
        parent: null,
        name: null
      },
      // define options
      options: []
    };
  },
  watch: {
    categories: function(item) {
      this.navs = this.treeOption(item);
      this.selectCategoryOptions();
    }
  },
  computed: {
    ...mapState("state_definition", {
      categories: state => state.categories
    })
  },
  created() {
    if (process.client) {
      this.show = true;
    }
    this.userCategory = {
      parent: null,
      name: null
    };
    // this.navs = this.treeOption(this.categories);
    this.selectCategoryOptions();
  },
  mounted() {
    this.$store.dispatch("state_definition/getAllCategory").then(r => {
      console.log("ALOHA", this.categories, r);
      this.navs = this.treeOption(this.categories);
    });
  },
  methods: {
    showChildSurvey(child) {
      if (this.clickSurveyShow === child.id) {
        this.clickSurveyShow = null;
        return;
      }
      if (child.surveys && child.surveys.length > 0) {
        this.clickSurveyShow = child.id;
      } else {
        this.$router.push("/" + child.url);
      }
    },
    hasSurvey(id) {
      return this.$store
        .dispatch("state_definition/hasSurvey", { id })
        .then(response => {
          return response;
        });
    },
    parentClick(url, id, item) {
      if (this.isParentActive === id) {
        this.$router.push("/" + url);
      } else {
        this.isParentActive = id;
      }
    },
    treeOption(category) {
      return category
        .filter(x => !x.deleted_at)
        .sort((a, b) => parseInt(a.sort_order) - parseInt(b.sort_order))
        .map(item => {
          if (item.children && item.children.length > 0) {
            return {
              id: item.id,
              label: item.name,
              code: item.code,
              url: item.slug,
              deleted_at: item.deleted_at,
              children: this.treeOption(item.children)
            };
          } else {
            return {
              id: item.id,
              label: item.name,
              url: item.slug,
              code: item.code,
              surveys: item.surveys
            };
          }
        });
    },
    addNewCategory(nav) {
      this.selectCategoryOptions();
      let country = localStorage.getItem("country");
      this.$store
        .dispatch("state_definition/checkLogin")
        .then(response => {
          let user = response.result.set.user;
          if (user.phone_verify == 0) {
            this.$modal.show("profile-verify-message-modal");
            return;
          }
          if (user.country.code !== country) {
            this.$toast.error(this.$t("msg.error_not_country_category"));
            return;
          }
          this.$modal.show("category-modal");
        })
        .catch(err => {
          console.log(err);
          this.$modal.show("login-modal");
        });
    },
    saveUserCategory() {
      if (!this.userCategory.parent) {
        this.$toast.error(this.$t("msg.error_select_parent"));
        return;
      }
      if (!this.userCategory.name) {
        this.$toast.error(this.$t("msg.error_enter_name"));
        return;
      }
      this.saving = true;
      this.$store
        .dispatch("state_definition/userCategory", { data: this.userCategory })
        .then(() => {
          this.saving = false;
          this.$toast.success(this.$t("msg.category_created_and_pending"));
          this.$modal.hide("category-modal");
        })
        .catch(error => {
          this.saving = false;
          this.$toast.error(this.$t("msg.error_category_not_saved"));
        });
    },
    selectCategoryOptions() {
      let options = this._.map(this.navs, item => {
        return {
          id: item.id,
          label: this.$t(item.code)
        };
      });

      this.options = options;
      return options;
    }
  }
};
</script>
