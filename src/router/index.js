
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);



//路由配置
const router=new VueRouter({
	mode:'history',
	linkActiveClass:'Aactive',
	routes:[

		{
			path:'/main',
			component: resolve => require(['@/pages/main'], resolve),
			meta: { 
				// requiresAuth: true
			},
			children:[
				
				{ //首页
					path:'home', 
					component:resolve => require(['@/pages/home'], resolve),
					meta: { 
						// requiresAuth: true
					},
				},//新增
				
				
				
				
				
				{
					path:'',
					redirect:'home'
				}
			]
		},
		{
			path:'/networkOverview',//网络概览
			component: resolve => require(['@/pages/networkOverview'], resolve),
			meta: { 
				// requiresAuth: true
			},
		},//新增
		
		{
			path:'/assetMonitoring',//网络概览
			component: resolve => require(['@/pages/assetMonitoring'], resolve),
			meta: { 
				// requiresAuth: true
			},
		},//新增
		{
			path:'/chainBroswer',//区块链浏览器
			component: resolve => require(['@/pages/chainBroswer'], resolve),
			meta: { 
				// requiresAuth: true
			},
		},//新增
		
		{
			path:'/allAssets',//全部资产
			component: resolve => require(['@/pages/allAssets'], resolve),
			meta: { 
				// requiresAuth: true
			},
		},//新增
		
		
		
		
		
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




export default router;