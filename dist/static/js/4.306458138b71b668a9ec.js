webpackJsonp([4],{gWVy:function(t,a,l){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=l("7+uW"),i=l("zL8q");e.default.use(i.Icon),e.default.use(i.Table),e.default.use(i.Dialog),e.default.use(i.TableColumn);var n={created(){localStorage.removeItem("blockchainMoNavIndex")},components:{},data:()=>({deployFlag:!1,delblockchainFlag:!1,deployStatus:!1,tableData:[]}),methods:{}},o={render:function(){var t=this,a=t.$createElement,l=t._self._c||a;return l("div",{staticClass:"outer_wrap blockchainManagement"},[l("div",{staticClass:"containerTopTitle"},[t._v("服务器管理")]),t._v(" "),l("div",{staticClass:"blockManagement_TopTile"},[l("div",[t._v("服务器列表")]),t._v(" "),l("span",{on:{click:function(a){t.deployFlag=!0}}},[t._v("+添加服务器")])]),t._v(" "),l("div",{staticClass:"blockMangement_listsWrap"},[l("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[l("el-table-column",{attrs:{fixed:"",prop:"date",label:"服务器名称"}}),t._v(" "),l("el-table-column",{attrs:{prop:"name",label:"服务器IP"}}),t._v(" "),l("el-table-column",{attrs:{prop:"province",label:"部署区块链"}}),t._v(" "),l("el-table-column",{attrs:{prop:"province",label:"状态"}}),t._v(" "),l("el-table-column",{attrs:{prop:"province",label:"在线时长"}}),t._v(" "),l("el-table-column",{attrs:{fixed:"right",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(a){return[l("span",{staticClass:"blockchainOperBtn",on:{click:function(a){t.deployStatus=!0}}},[t._v("启动")]),t._v(" "),l("span",{staticClass:"blockchainOperBtn",on:{click:function(a){t.deployStatus=!0}}},[t._v("停止")]),t._v(" "),l("span",{staticClass:"blockchainOperBtn",on:{click:function(a){t.delblockchainFlag=!0}}},[t._v("删除")])]}}])})],1)],1),t._v(" "),l("el-dialog",{attrs:{title:"添加服务器",visible:t.deployFlag},on:{"update:visible":function(a){t.deployFlag=a}}},[l("div",{staticClass:"deployContainerWrap"},[l("div",{staticClass:"deployContainerListWrap deployContainerListWrap1"},[l("span",[t._v("服务器IP:")]),t._v(" "),l("input",{attrs:{placeholder:"请输入服务器IP",type:"text"}})]),t._v(" "),l("div",{staticClass:"deployContainerListWrap"},[l("div",[l("span",[t._v("管理员账户名:")]),t._v(" "),l("input",{attrs:{type:"text"}})]),t._v(" "),l("div",[l("span",[t._v("管理员密码:")]),t._v(" "),l("input",{attrs:{type:"text"}})])])]),t._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("div",{staticClass:"deployBtnWrap"},[l("div",{on:{click:function(a){t.deployFlag=!1}}},[t._v("确定")])])])]),t._v(" "),l("el-dialog",{attrs:{title:"删除服务器",visible:t.delblockchainFlag},on:{"update:visible":function(a){t.delblockchainFlag=a}}},[l("div",{staticClass:"delblockchainContainer"},[l("input",{attrs:{placeholder:"请输入管理员密码",type:"text"}})]),t._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("div",{staticClass:"delblockchainBtnWrap"},[l("div",{staticClass:"delblockchainBtn",on:{click:function(a){t.delblockchainFlag=!1}}},[t._v("确认删除")]),t._v(" "),l("div",{staticClass:"delblockchainBtn",on:{click:function(a){t.delblockchainFlag=!1}}},[t._v("取消")])])])]),t._v(" "),t.deployStatus?l("div",{staticClass:"blockchainStatusWrap"},[t._m(0)]):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"blockChainStatusContainer"},[a("div",[this._v("区块链部署中")]),this._v(" "),a("div",{staticClass:"el-icon-loading"})])}]};var s=l("VU/8")(n,o,!1,function(t){l("otiw")},null,null);a.default=s.exports},otiw:function(t,a){}});
//# sourceMappingURL=4.306458138b71b668a9ec.js.map