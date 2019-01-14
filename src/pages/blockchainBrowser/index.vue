<template>
    <div class="outer_wrap">
     
        <div class="blockchainBrowser_Top_wrap">
            <div class="blockchainBrowser_Top_title">
                区块链浏览器
            </div>
            <div class="blockchainBrowser_top_selectWrap">
                <span class="blockchainBrowser_top_selectLeftBox">指定区块链</span>
                <select 
                    v-model="blockchain_select"
                    class="blockchainBrowser_top_select">
                    <option 
                        v-for="(item,index) in lists"
                        :key="index"
                        :value="item.Chainid">{{item.Chainid}}</option>
                </select>
            </div>
            <div class="blockchainBrowser_top_inpWrap">
                <input 
                    placeholder="搜索地址/交易ID/区块高度/资产名/资产ID/UTXO"
                    v-model="searchText"
                    @keyup.enter="search"
                    type="text">
                <span @click="search">搜索</span>
            </div>
        </div>

        <div class="blockchainBrowser_container_title">最近区块（Latest 10）</div>
        <div class="blockchainBrowser_container_listsWrap">
            <el-table
                :data="indexInfo.block_list"
                border
                style="width: 100%">
                <el-table-column
                prop="block_height"
                label="区块高度">
                </el-table-column>
                <el-table-column
                prop="create_time"
                label="生成时间">
                </el-table-column>
                <el-table-column
                prop="tx_nums"
                label="交易量">
                </el-table-column>
                <el-table-column
                prop="block_size"
                label="区块大小(KB)">
                </el-table-column>
            </el-table>
        </div>
        

        <div class="blockchainBrowser_container_title">最活跃数字资产（Top 10）</div>
        <div class="blockchainBrowser_container_listsWrap">
            <el-table
                :data="indexInfo.asset_toplist"
                border
                style="width: 100%">
                <el-table-column
                    prop="assetid"
                    label="资产ID">
                </el-table-column>
                <el-table-column
                    prop="assetname"
                    label="资产名称">
                </el-table-column>
                <el-table-column
                    prop="issueamount"
                    label="发行总量">
                </el-table-column>
                <el-table-column
                    prop="holdernums"
                    label="持有人数(KB)">
                </el-table-column>
                <el-table-column
                    prop="txnumsmonth"
                    label="近一个月交易次数">
                </el-table-column>
            </el-table>
        </div>


    </div>
</template>

<script>



import Vue from 'vue';
import { Table, TableColumn } from 'element-ui';
Vue.use(Table);
Vue.use(TableColumn);

export default {
    created(){
        this.getBlockchains();
    },
    components: {  
        
	},
    data(){
        return {
            searchText:'',
            blockchain_select:'',
            lists:[],

            indexInfo:{}
        }
    },
    methods:{
        search(){
            if(!this.searchText){
                this.$message({
                    message: '搜索内容不能为空！',
					type: 'warning'
                })
                return false;
            }
            let params = {
                chain_name:this.blockchain_select,
                search:this.searchText.trim()
            }
            this.getSearchType(params,(data)=>{
                let params = {
                    chainid:this.blockchain_select,
                    searchText:this.searchText
                }
                this.goUrlByType(data.data, params)
            },(data)=>{
                this.$message({
                    message: data.msg,
					type: 'warning'
                })
            })
        },
        getBlockchains(){
            this.getBlockchainLists((data)=>{
                this.lists = data.data;
                this.blockchain_select = this.lists[0].Chainid;
                this.getIndexInfo(this.blockchain_select)
            },()=>{

            })
        },
        getIndexInfo(){
            let url = `/chain_browser/initChainBrowser/${this.blockchain_select}`;
            this.$http.get(url)
                .then(({data})=>{
                    console.log(data)
                    this.indexInfo = data.data
                })
                .catch(()=>{

                })
        }
    }
}
</script>
<style lang="scss" scoped>

.blockchainBrowser_Top_title{
    padding:30px 0 20px 0;
    font-size:20px;
}
.blockchainBrowser_Top_wrap{
    select,input{
        height:30px;
        padding-left:8px;
    }
}
.blockchainBrowser_top_selectWrap{
    display:flex;
    align-items:center;
    margin-bottom:20px;
    font-size:14px;
    .blockchainBrowser_top_selectLeftBox{
        padding-right:20px;
    }
    .blockchainBrowser_top_select{
        width:300px;
    }
}

.blockchainBrowser_top_inpWrap{
    display:flex;
    align-items: center;
    font-size:14px;
    >input{
        border:1px solid #ddd;
        width:400px;
    }
    >span{
        margin-left:20px;
        width:100px;
        height:30px;
        line-height:30px;
        border-radius:2px;
        text-align:center;
        background:#169BD5;
        color:#fff;
        @include pointer;
    }
}
.blockchainBrowser_container_title{
    padding:40px 0 20px 0;
    font-size:20px;
}

.blockchainBrowser_container_listsWrap{
    margin-right:5px;
    .el-row{
        line-height:40px;
        text-align:center;
    }
    .el-col{
        border:1px solid #ddd;
        margin-top:-1px;
        margin-left:-1px;
    }
}
.blockchainBrowser_container_listsWrap{
	background:#fff;
}


</style>


