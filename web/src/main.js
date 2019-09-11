import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from  './vuex/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'
import utils from './utils/index';
import VueClipboard from 'vue-clipboard2';
import 'font-awesome/css/font-awesome.min.css'; // ICONT
import $ from 'jquery';

let isPcDeviceType = utils.getDeviceType();
Vue.prototype.$isPcDeviceType = isPcDeviceType;
 
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper);

Vue.use(ElementUI);
Vue.use(VueI18n);
Vue.use(VueClipboard);

localStorage.setItem('langType', 'en');
const i18n = new VueI18n({
  locale: 'en', // 语言标识
  messages: {
    'zh': require('./assets/lang/ch.js'),
    'en': require('./assets/lang/en.js')
  }
});
 

import VueSocketio from 'vue-socket.io';
// import socketio from 'socket.io-client';
Vue.use(new VueSocketio({
    debug: true,
    connection: 'https://www.tronoscar.pro/',
    options: { path: "/ringSocket" } //Optional options
}));//与服务端链接

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
