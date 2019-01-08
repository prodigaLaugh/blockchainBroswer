// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import  'babel-polyfill';
import 'element-ui/lib/theme-chalk/index.css';
import * as commonFilters from '@/util/filter.js'


import './util/config.js'
import Vue from 'vue'

import commonFn from './util/common.js'
Vue.use(commonFn)


Object.keys(commonFilters).forEach(key => {
  Vue.filter(key, commonFilters[key])
})



import router from './router'



import http from '@/util/http.js'
Vue.use(http);

import {  Message  } from 'element-ui';
Vue.prototype.$message = Message;


//公共组建
import Layout from './components/layout'

new Vue({
  el: '#app',
  template: '<Layout/>',
  router,
  components: { Layout },
  
})
