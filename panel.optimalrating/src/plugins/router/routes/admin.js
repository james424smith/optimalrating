import AdminLayout from 'components/Dashboard/Layout/DashboardLayout.vue';
import Dashboard from 'components/Dashboard/Views/Dashboard.vue';
import Category from 'components/Dashboard/Views/Category.vue';
import Country from 'components/Dashboard/Views/Country.vue';
import CountryPage from 'components/Dashboard/Views/CountryPage.vue';
import Keyword from 'components/Dashboard/Views/Keyword.vue';
import Member from 'components/Dashboard/Views/Member.vue';
import MemberDetail from 'components/Dashboard/Views/Member/MemberDetail.vue';
import SurveyApproval from 'components/Dashboard/Views/SurveyApproval.vue';
import SurveyEdit from 'components/Dashboard/Views/Survey/Edit.vue';
import SpecialSurvey from 'components/Dashboard/Views/SpecialSurvey.vue';
import Subject from 'components/Dashboard/Views/Subject.vue';
import Comments from 'components/Dashboard/Views/Comments.vue';
import Page from 'components/Dashboard/Views/Page.vue';
/*******CountryAdmin****************************************/
import KeywordCountryAdmin from 'components/Dashboard/Views/CountryAdmin/Keyword.vue';
import CityCountryAdmin from 'components/Dashboard/Views/CountryAdmin/City.vue';

import auth from '../../../middleware/auth'

const admin = {
  path: '/admin',
  component: AdminLayout,
  redirect: '/admin/dashboard',
  name: 'admin',
  meta: {
    auth : true,
  },
  children: [
    {
      path: 'dashboard',
      name: 'admin.dashboard',
      component: Dashboard,
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: 'category',
      name: 'admin.category',
      component: Category,
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: 'country',
      name: 'admin.country',
      component: Country,
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: 'subjects',
      name: 'admin.subjects',
      component: Subject,
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: 'keywords',
      name: 'admin.keyword',
      component: Keyword,
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: 'page-management',
      name: 'admin.page',
      component: Page,
      meta: {
        middleware: [
          auth
        ]
      }
    },
    /*************Country Admin****************/
    {
      path: 'country/keywords',
      name: 'admin.keyword',
      component: KeywordCountryAdmin,
      meta: {
        middleware: [
          auth
        ]
      }

    },
    {
      path: 'add-cities',
      name: 'admin.cities',
      component: CityCountryAdmin,
      meta: {
        middleware: [
          auth
        ]
      }

    },
    {
      path: 'survey-approval',
      name: 'admin.survey_approval',
      component: SurveyApproval,
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: 'surveys/:id?/edit',
      name: 'admin.survey_edit',
      component: SurveyEdit,
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: 'special-survey',
      name: 'admin.special_survey',
      component: SpecialSurvey,
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: 'comments',
      name: 'admin.comments',
      component: Comments,
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: 'member/:username',
      name: 'admin.members.detail',
      component: MemberDetail,
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: 'member',
      name: 'admin.members',
      component: Member,
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: 'country-page-management',
      name: 'admin.country.page',
      component: CountryPage,
      meta: {
        middleware: [
          auth
        ]
      }
    },
    {
      path: 'comment-management',
      name: 'admin.comment',
      component: Comments,
      meta: {
        middleware: [
          auth
        ]
      }
    },
  ],
};

export default admin;
