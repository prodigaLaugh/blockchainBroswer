webpackJsonp([3],{i6rj:function(t,a){},kPpD:function(t,a,l){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=l("7+uW"),i=l("zL8q");e.default.use(i.Icon),e.default.use(i.Table),e.default.use(i.Dialog),e.default.use(i.TableColumn);var o={created(){localStorage.removeItem("blockchainMoNavIndex")},components:{},data:()=>({deployFlag:!1,delblockchainFlag:!1,deployStatus:!1,tableData:[]}),methods:{}},s={render:function(){var t=this,a=t.$createElement,l=t._self._c||a;return l("div",{staticClass:"outer_wrap blockchainManagement"},[l("div",{staticClass:"containerTopTitle"},[t._v("节点管理")]),t._v(" "),l("div",{staticClass:"blockManagement_TopTile"},[l("div",[t._v("节点列表")]),t._v(" "),l("span",{on:{click:function(a){t.deployFlag=!0}}},[t._v("+部署节点")])]),t._v(" "),l("div",{staticClass:"blockMangement_listsWrap"},[l("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[l("el-table-column",{attrs:{fixed:"",prop:"date",label:"节点ID"}}),t._v(" "),l("el-table-column",{attrs:{prop:"name",label:"所属区块链"}}),t._v(" "),l("el-table-column",{attrs:{prop:"province",label:"节点类型"}}),t._v(" "),l("el-table-column",{attrs:{prop:"province",label:"节点IP"}}),t._v(" "),l("el-table-column",{attrs:{prop:"province",label:"端口"}}),t._v(" "),l("el-table-column",{attrs:{prop:"province",label:"状态"}}),t._v(" "),l("el-table-column",{attrs:{prop:"province",label:"共识时长"}}),t._v(" "),l("el-table-column",{attrs:{fixed:"right",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(a){return[l("span",{staticClass:"blockchainOperBtn",on:{click:function(a){t.deployStatus=!0}}},[t._v("启动")]),t._v(" "),l("span",{staticClass:"blockchainOperBtn",on:{click:function(a){t.deployStatus=!0}}},[t._v("停止")]),t._v(" "),l("span",{staticClass:"blockchainOperBtn",on:{click:function(a){t.delblockchainFlag=!0}}},[t._v("删除")])]}}])})],1)],1),t._v(" "),l("el-dialog",{attrs:{title:"添加节点",visible:t.deployFlag},on:{"update:visible":function(a){t.deployFlag=a}}},[l("div",{staticClass:"deployContainerWrap"},[l("div",{staticClass:"deployContainerListWrap"},[l("div",[l("span",[t._v("节点IP:")]),t._v(" "),l("input",{attrs:{placeholder:"请输入节点IP",type:"text"}})]),t._v(" "),l("div",[l("span",[t._v("节点端口:")]),t._v(" "),l("input",{attrs:{placeholder:"请输入节点端口",type:"text"}})])]),t._v(" "),l("div",{staticClass:"deployContainerListWrap"},[l("div",[l("span",[t._v("节点类型:")]),t._v(" "),l("select",[l("option",{attrs:{value:"111"}},[t._v("1111")])])]),t._v(" "),l("div",[l("span",[t._v("所属区块链:")]),t._v(" "),l("select",[l("option",{attrs:{value:"111"}},[t._v("1111")])])])])]),t._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("div",{staticClass:"deployBtnWrap"},[l("div",{on:{click:function(a){t.deployFlag=!1}}},[t._v("确定")])])])]),t._v(" "),l("el-dialog",{attrs:{title:"删除节点",visible:t.delblockchainFlag},on:{"update:visible":function(a){t.delblockchainFlag=a}}},[l("div",{staticClass:"delblockchainContainer"},[l("span",[t._v("⚠️请注意，删除区块链将导致链上数据全部清除，无法找回，请再次输入管理员密码以确认删除")]),t._v(" "),l("input",{attrs:{placeholder:"请输入管理员密码",type:"text"}})]),t._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("div",{staticClass:"delblockchainBtnWrap"},[l("div",{staticClass:"delblockchainBtn",on:{click:function(a){t.delblockchainFlag=!1}}},[t._v("确认删除")]),t._v(" "),l("div",{staticClass:"delblockchainBtn",on:{click:function(a){t.delblockchainFlag=!1}}},[t._v("取消")])])])]),t._v(" "),t.deployStatus?l("div",{staticClass:"blockchainStatusWrap"},[t._m(0)]):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"blockChainStatusContainer"},[a("div",[this._v("区块链部署中")]),this._v(" "),a("div",{staticClass:"el-icon-loading"})])}]};var n=l("VU/8")(o,s,!1,function(t){l("i6rj")},null,null);a.default=n.exports}});
//# sourceMappingURL=3.611cc2718e01343cb17e.js.map