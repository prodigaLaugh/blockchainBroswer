webpackJsonp([7],{"8doK":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("x7qL"),o=e("7+uW"),r=e("zL8q");o.default.use(r.Table),o.default.use(r.TableColumn);var i={created(){this.getAssetLists()},mounted(){this.scroll()},components:{myHeader:a.a},data:()=>({orderParams:{condition:"",order_by:"",chain_name:"m0",page:0,page_size:10},isLoading:!0,assetsLists:[]}),methods:{sortLists(t){console.log(t,t.prop,111),t.prop?(this.orderParams.condition="market_value"==t.prop?"issue_amount":t.prop,this.orderParams.order_by="ascending"===t.order?"ASC":"DESC"):(this.orderParams.condition="",this.orderParams.order_by=""),this.assetsLists=[],this.getAssetLists()},getAssetLists(){if(!this.isLoading)return!1;this.$http.post("/chain_browser/getChainAssetInfoList",this.orderParams).then(({data:t})=>{let s=t.data.asset_list;s&&s.length?(this.assetsLists=[...this.assetsLists,...s],this.isLoading=!0):this.isLoading=!1}).catch(t=>{})},scroll(t){window.onscroll=(()=>{let t=document.documentElement.offsetHeight-document.documentElement.scrollTop-window.innerHeight<=200;if(console.log(t,this.isLoading,1111),t&&this.isLoading){let t=this.orderParams.page;this.orderParams.page=t+1,this.getAssetLists()}})}}},l={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"assetListsWrap assetListsOuterWrap"},[e("my-header"),t._v(" "),e("div",{staticClass:"containerTopTitle"},[t._v("链上资产")]),t._v(" "),e("div",{staticClass:"assetLists"},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.assetsLists,border:""},on:{"sort-change":t.sortLists}},[e("el-table-column",{attrs:{prop:"asset_id",label:"资产ID",width:"180"}}),t._v(" "),e("el-table-column",{attrs:{prop:"asset_name",label:"资产名称"}}),t._v(" "),e("el-table-column",{attrs:{prop:"late_txtime",sortable:"custom",label:"最后交易"}}),t._v(" "),e("el-table-column",{attrs:{prop:"issue_amount",sortable:"custom",label:"发行总量"}}),t._v(" "),e("el-table-column",{attrs:{prop:"market_value",sortable:"custom",label:"总市值"}}),t._v(" "),e("el-table-column",{attrs:{prop:"holders",sortable:"custom",label:"持有人数"}}),t._v(" "),e("el-table-column",{attrs:{prop:"txs_num",sortable:"custom",label:"近一个月交易数"}})],1)],1)],1)},staticRenderFns:[]};var n=e("VU/8")(i,l,!1,function(t){e("ziYm")},null,null);s.default=n.exports},ziYm:function(t,s){}});
//# sourceMappingURL=7.3ec151907ce94ea93d50.js.map