<template>
    <div class="outer_wrap blockchainManagement">
   
				<div class="containerTopTitle">节点管理</div>
				
				<div class="blockManagement_TopTile">
						<span @click="deployFlag=true">+部署节点</span>
				</div>
        <div class="blockMangement_listsWrap">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                fixed
                prop="date"
                label="节点ID">
                </el-table-column>
                <el-table-column
                prop="name"
                label="所属区块链">
                </el-table-column>
                <el-table-column
                prop="province"
                label="节点类型">
                </el-table-column>
                <el-table-column
                prop="province"
                label="节点IP">
                </el-table-column>
                <el-table-column
                prop="province"
                label="端口">
                </el-table-column>
                <el-table-column
                prop="province"
                label="状态">
                </el-table-column>
                <el-table-column
                prop="province"
                label="共识时长">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作">
                    <template slot-scope="scope">
                        <span 
                            @click="deployStatus=true"
                            class="blockchainOperBtn">启动</span>
                        <span 
                            @click="deployStatus=true"
                            class="blockchainOperBtn">停止</span>
                        <span 
                            @click="delblockchainFlag=true"
                            class="blockchainOperBtn">删除</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>


        <el-dialog title="添加节点" :visible.sync="deployFlag">
            <div class="deployContainerWrap">



                <div class="deployContainerListWrap">
                    <div>
                        <span>节点IP:</span>
                        <input
                            placeholder="请输入节点IP" 
                            type="text">
                    </div>
                    <div>
                        <span>节点端口:</span>
                        <input
                            placeholder="请输入节点端口" 
                            type="text">
                    </div>
                </div>
                <div class="deployContainerListWrap">
                    <div>
                        <span>节点类型:</span>
                        <select>
                            <option value="111">1111</option>
                        </select>
                    </div>
                    <div>
                        <span>所属区块链:</span>
                        <select>
                            <option value="111">1111</option>
                        </select>
                    </div>
                </div>
                
                
            </div>
            <div slot="footer" class="dialog-footer">
                <div class="deployBtnWrap">
                    <div 
                        class=""
                        @click="deployFlag = false">确定</div>
                   
                </div>
            </div>
        </el-dialog>

        <el-dialog title="删除节点" :visible.sync="delblockchainFlag">
            <div class="delblockchainContainer">
                <span>⚠️请注意，删除区块链将导致链上数据全部清除，无法找回，请再次输入管理员密码以确认删除</span>
                <input 
                    placeholder="请输入管理员密码"
                    type="text">
                
            </div>
            <div slot="footer" class="dialog-footer">
                <div class="delblockchainBtnWrap">
                    <div 
                        class="delblockchainBtn"
                        @click="delblockchainFlag = false">确认删除</div>
                    <div 
                        class="delblockchainBtn"
                        @click="delblockchainFlag = false">取消</div>
                </div>
            </div>
        </el-dialog>

        <div 
            v-if="deployStatus"
            class="blockchainStatusWrap">
            <div class="blockChainStatusContainer">
                <div>区块链部署中</div>
                <div class="el-icon-loading">
                </div>
            </div>
            
        </div>



    </div>
</template>

<script>

import Vue from 'vue';
import { Table, TableColumn, Dialog, Icon  } from 'element-ui';
Vue.use(Icon);
Vue.use(Table);
Vue.use(Dialog);
Vue.use(TableColumn);

export default {
    created(){

    },
    components: {  
      
	},
    data(){
        return {
            deployFlag:false,
            delblockchainFlag:false,
            deployStatus:false,
            tableData: []
        }
    },
    methods:{
        
    }
}
</script>

<style lang="scss">
.blockMangement_listsWrap{
	padding:0 38px 106px 32px;
	background:#fff;
	.el-table th,
	.el-table td{
			padding-left:0;
			&:nth-of-type(1){
				padding-left:20px;
			}
			
	}
	
}
</style>
