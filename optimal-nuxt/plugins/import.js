import Vue from 'vue';
import VueGoogleCharts from 'vue-google-charts'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/index.css';
import VModal from 'vue-js-modal'

import VueSlimScroll from 'vue-slimscroll'
import VueTelInput from 'vue-tel-input'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import VueMoment from 'vue-moment'
import ToggleButton from 'vue-js-toggle-button'
import VueEditor from 'vue2-editor';

Vue.use(VueEditor)
Vue.use(ToggleButton)

Vue.use(VueMoment);
Vue.use(VueMaterial)
Vue.use(VueTelInput);

Vue.use(VueSlimScroll)
Vue.use(VModal)
Vue.use(VueGoogleCharts);
Vue.use(VueToast,{
  position: 'top-right',
  duration: 5000,
});


//Vue.component('input-mask', InputMask)
