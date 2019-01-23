<template>
    <div class="assetListsWrap assetListsOuterWrap">
        <my-header/>

		<div class="containerTopTitle">链上资产</div>
        <div class="assetLists">
            <el-table
                :data="assetsLists"
                @sort-change="sortLists"
                border
                style="width: 100%">
                <el-table-column
                    prop="asset_id"
                    label="资产ID"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="asset_name"
                    label="资产名称">
                </el-table-column>
                <el-table-column
                    prop="late_txtime"
                    sortable="custom"
                    label="最后交易">
                </el-table-column>
                <el-table-column
                    prop="issue_amount"
                    sortable="custom"
                    label="发行总量">
                </el-table-column>
                <el-table-column
                    prop="market_value"
                    sortable="custom"
                    label="总市值">
                </el-table-column>
                <el-table-column
                    prop="holders"
                    sortable="custom"
                    label="持有人数">
                </el-table-column>
                <el-table-column
                    prop="txs_num"
                    sortable="custom"
                    label="近一个月交易数">
                </el-table-column>
            </el-table>
        </div>

    </div>

</template>


<script>
import myHeader from '@/components/headerSearch'

import Vue from 'vue';
import { Table, TableColumn } from 'element-ui';
Vue.use(Table);
Vue.use(TableColumn);

export default {
    created(){
        this.getAssetLists();
    },
    mounted(){
        this.scroll();
    },
    components: {  
		myHeader
	},
    data(){
        return {
            orderParams:{
                condition:'',
                order_by:'',
                chain_name:'m0',
                page:0,
                page_size:10,
            },
            isLoading:true,

            assetsLists:[],

            
        }
    },
    methods: {
        sortLists(val){
            if(val.prop){
                this.orderParams.condition = val.prop;
                this.orderParams.order_by = val.order === 'ascending' ? "ASC" : "DESC";
                
            }else{
                this.orderParams.condition = '';
                this.orderParams.order_by = '';
            }
            this.assetsLists = [];
            this.getAssetLists();
        },
        
        getAssetLists(){
            let url = `/chain_browser/getChainAssetInfoList`
            if(!this.isLoading){
                return false;
            }
            this.$http.post(url,this.orderParams)
                .then(({data})=>{
                    let lists = data.data.asset_list;
                    if(lists&&lists.length){
                        this.assetsLists = [...this.assetsLists,...lists];
                        this.isLoading = true;
                    }else{
                        this.isLoading = false;
                    }
                    
                })
                .catch((data)=>{

                })
        },
        scroll(person) {
            window.onscroll = () => {
                let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 200
				console.log(bottomOfWindow,this.isLoading,1111)
                if (bottomOfWindow && this.isLoading) {
                    let page = this.orderParams.page;
                    this.orderParams.page = (page + 1);
                    this.getAssetLists();
                }
            }
        }
    }
}
</script>

<style lang="scss">
.assetListsOuterWrap{
	padding:0 40px 40px;
	.containerTopTitle {
		padding: 30px 0 20px 32px;
		font-size: 20px;
	}
	.el-table th:nth-of-type(7){
		padding-left:0;
	}
	.el-table th,
	.el-table td{
		padding-left:50px;
	}
	.el-table td:last-of-type{
		padding-left:0;
	}
}

</style>

