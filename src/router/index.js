
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import {setCookie, getCookie, delCookie } from '@/util/cookie'


//login
import Login from '@/pages/login'

var redirectUrl = '/login';

let token = getCookie('USERTOKEN');
let autoLogin = getCookie('autoLogin');
if(token){
	let hour = autoLogin == 'true' ? 24*3 : 24;
	delCookie('USERTOKEN')
	setCookie('USERTOKEN',token,hour)

	delCookie('autoLogin')
	setCookie('autoLogin',autoLogin,hour)
	redirectUrl = '/main'
}

//路由配置
const router=new VueRouter({
	mode:'history',
	linkActiveClass:'Aactive',
	routes:[
// 		{ 
// 			path:'/login',//登录
// 			component:Login,
// 		},
		{
			path:'/main',
			component: resolve => require(['@/pages/main'], resolve),
			meta: { 
				// requiresAuth: true
			},
			children:[
				{
					path:'blockchainManagement',
					component:resolve => require(['@/pages/blockchainManagement/index'], resolve),
					meta: { 
						// requiresAuth: true
					},
				},
				{
					path:'blockchainBrowser',
					component:resolve => require(['@/pages/blockchainBrowser/index'], resolve),
					meta: { 
						// requiresAuth: true
					},
				},
				{
					path:'blockchainMonitor',//区块链监控
					component:resolve => require(['@/pages/blockchainMonitor'], resolve),
					meta: { 
						// requiresAuth: true
					},
				},
				{
					path:'userManagement',//用户管理
					component:resolve => require(['@/pages/userManagement'], resolve),
					meta: { 
						// requiresAuth: true
					},
				},
				{
					path:'serverManagement',//服务器管理
					component:resolve => require(['@/pages/serverManagement'], resolve),
					meta: { 
						// requiresAuth: true
					},
				},
				{
					path:'nodeManagement',//服务器管理
					component:resolve => require(['@/pages/nodeManagement'], resolve),
					meta: { 
						// requiresAuth: true
					},
				},
				{
					path:'',
					redirect:'blockchainManagement'
				}
			]
		},
		{
			path:'/blockchainBrowser_assetList',//资产一览
			component: resolve => require(['@/pages/blockchainBrowser/assetList'], resolve),
			meta: { 
				// requiresAuth: true
			},
		},
		{
			path:'/blockchainBrowser_adressDetail',//地址详情
			component: resolve => require(['@/pages/blockchainBrowser/adressDetail'], resolve),
			meta: { 
				// requiresAuth: true
			},
		},
		{
			path:'/blockchainBrowser_transactionDetail',//交易详情
			component: resolve => require(['@/pages/blockchainBrowser/transactionDetail'], resolve),
			meta: { 
				// requiresAuth: true
			},
		},
		{
			path:'/blockchainBrowser_blockchainDetail',//区块详情
			component: resolve => require(['@/pages/blockchainBrowser/blockchainDetail'], resolve),
			meta: { 
				// requiresAuth: true
			},
		},
		{
			path:'/blockchainBrowser_assetsDetail',//资产详情
			component: resolve => require(['@/pages/blockchainBrowser/assetsDetail'], resolve),
			meta: { 
				// requiresAuth: true
			},
		},
		{
			path:'/blockchainBrowser_UTXODetail',//UTXO详情
			component: resolve => require(['@/pages/blockchainBrowser/UTXODetail'], resolve),
			meta: { 
				// requiresAuth: true
			},
		},
		{
			path:'/blockchainBrowser_noresult',//无结果
			component: resolve => require(['@/pages/blockchainBrowser/noresult'], resolve),
			meta: { 
				// requiresAuth: true
			},
		},
		{
			path:'',
			redirect:'/main'
		}
		
	],
	scrollBehavior (to, from, savedPosition) {
	  if (savedPosition) {
	    return savedPosition
	  } else {
	    return { x: 0, y: 0 }
	  }
	},
})



// router.beforeEach((to, from, next) => {
// 	const USERTOKEN=window.localStorage.USERTOKEN;
// 	if (to.matched.some(record => record.meta.requiresAuth)) {
// // 		if (!USERTOKEN) {
// // 			next({
// // 				path: '/login',
// // 				query: { redirect: to.fullPath }
// // 			})
// // 	    } else {
// // 	      	next()
// // 		}
// 		next()
// 	} else {
// 	    next() // 确保一定要调用 next()
// 	}
// })

export default router;