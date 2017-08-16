import Vue from 'vue';
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './App';
import {routes} from './routes'
import {store} from './store'

Vue.use(VueRouter);
Vue.prototype.$http = axios;

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),

  beforeMount(){
    
    let fb_script = document.createElement('script');
    fb_script.setAttribute('id', 'facebook-jssdk');
    fb_script.setAttribute('src', '//connect.facebook.net/ko_KR/sdk.js');
    this.$el.appendChild(fb_script);

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1470389209695242',
        xfbml      : true,
        version    : 'v2.10'
      });
      FB.getLoginStatus(function(response) {
        console.log(response);
      });
    };

  }
});