// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import { App } from './components';
import router from './router';

Vue.config.productionTip = false;

window.$ = window.jQuery = require('jquery'); // eslint-disable-line
require('bootstrap');
require('bootstrap/dist/css/bootstrap.css');
require('font-awesome/css/font-awesome.css');

const vueMoment = require('vue-moment');

Vue.use(vueMoment);
Vue.use(VueResource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
