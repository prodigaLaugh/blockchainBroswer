<template>
    <div class="outer_wrap blockchainManagement">
   
        
        <div class="containerTopTitle">区块链管理</div>

        <div class="blockManagement_TopTile">
            <span @click="deployFlag=true">+部署区块链</span>
        </div>

        <div class="blockMangement_listsWrap">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                fixed
                prop="date"
                label="链名称">
                </el-table-column>
                <el-table-column
                prop="name"
                label="区块链类型">
                </el-table-column>
                <el-table-column
                prop="province"
                label="建立时间">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作">
                    <template slot-scope="scope">
                        <span 
                            @click="deployStatus=true"
                            class="blockchainOperBtn">监控</span>
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


        <el-dialog title="部署区块链" :visible.sync="deployFlag" width="70%">
            <div class="deployContainerWrap">

                <div class="deployContainerListWrap deployContainerListWrap1">
                    <span>链名称:</span>
                    <input
                        placeholder="请输入区块链名称 仅支持英文字母和数字" 
                        type="text">
                </div>


                <div class="deployContainerListWrap">
                    <div>
                        <span>共识节点数:</span>
                        <input
                            placeholder="" 
                            type="text">
                    </div>
                    <div>
                        <span>数据节点数:</span>
                        <input
                            placeholder="" 
                            type="text">
                    </div>
                </div>
                <div class="deployContainerListWrap">
                    <div>
                        <span>部署服务器:</span>
                        <select>
                            <option value="111">1111</option>
                        </select>
                    </div>
                    <div>
                        <span>部署节点数:</span>
                        <input
                            type="text">
                    </div>
                </div>
                <div class="deployContainerAddlistBtn">+添加服务器</div>
                
                
            </div>
            <div slot="footer" class="dialog-footer">
                <div class="deployBtnWrap">
                    <div 
                        class=""
                        @click="deployFlag = false">部署</div>
                   
                </div>
            </div>
        </el-dialog>

        <el-dialog title="删除区块链" :visible.sync="delblockchainFlag" width="432px">
            <div class="delblockchainContainer">
                <span>请注意，删除区块链将导致链上数据全部清除，无法找回，请再次输入管理员密码以确认删除</span>
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
<style lang="scss" scoped>
    .blockMangement_listsWrap{  
        padding:0 38px 106px 32px;
        background:#fff;
    }
</style>





