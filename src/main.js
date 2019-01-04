// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import  'babel-polyfill';
import 'element-ui/lib/theme-chalk/index.css';
import * as commonFilters from '@/util/filter.js'


import './util/config.js'
import Vue from 'vue'
// 区块浏览器 区块链监控 用户管理

Object.keys(commonFilters).forEach(key => {
  Vue.filter(key, commonFilters[key])
})

import VueRouter from 'vue-router'
Vue.use(VueRouter);

import router from './router'


import commonFn from './util/common.js'
Vue.use(commonFn)



//公共组建
import Layout from './components/layout'

new Vue({
  el: '#app',
  template: '<Layout/>',
  router,
  components: { Layout },
  
})
