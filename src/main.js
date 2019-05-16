// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import mapboxgl from 'mapbox-gl'
// Vue.prototype.mbgl = mapboxgl;

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
