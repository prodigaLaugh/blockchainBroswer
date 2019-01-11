<template>
    <div class="adressDetail_wrap">
        <my-header/>
        <div class="detailOuterWrap adressDetail_containerWrap">
            <div class="adressDetail_addressWrap">
                <div class="adressDetail_addressTitle">资产概况</div>
                <div class="adressDetail_addressListsWrap">
                    <div class="adressDetail_addressList">
                        <span>资产名称</span>
                        <span>{{assetInfo.asset_name | operStrNull}} </span>
                    </div>
                    <div class="adressDetail_addressList">
                        <span>发行总量</span>
                        <span>{{assetInfo.issue_amount}} </span>
                    </div>
                    <div class="adressDetail_addressList">
                        <span>总持有者</span>
                        <span>{{assetInfo.holder_total}} </span>
                    </div>
                    <div class="adressDetail_addressList">
                        <span>资产交易量</span>
                        <span>{{assetInfo.asset_txtotal}} </span>
                    </div>
                    <div class="adressDetail_addressList">
                        <span>创建时间</span>
                        <span>{{assetInfo.create_time}} </span>
                    </div>

                    
                </div>
            </div>
           
            <div class="adressDetail_transcationWrap">
                <div class="adressDetail_transcationTitle">交易列表</div>
                <div class="adressDetail_transcationListsWrap">

                    <div 
                        v-for="(item,index) in transactionLists"
                        :key="index"
                        class="adressDetail_transcationListWrap">
                        <div class="adressDetail_transcationList">
                            <div class="adressDetail_transcationLeftWrap adressDetail_transcationLeftWrap1"> 
                                <!-- <div class="adressDetail_transcationLeftIcon">left</div> -->
                                <div class="adressDetail_transcationLeftDetailWrap">
                                    <div class="adressDetail_transcationLeftDetailList">
                                        <span>交易ID:</span>
                                        <span>{{item.tx_id | operStrNull}}</span>
                                    </div>
                                    <div class="adressDetail_transcationLeftDetailList">
                                        <span>从:</span>
                                        <span>
                                            <div
                                                v-for="(list,i) in item.from_address"
                                                :key="i">{{list}}</div>
                                        </span>
                                    </div>
                                    <div class="adressDetail_transcationLeftDetailList">
                                        <span>到账时间:</span>
                                        <span>{{item.to_time}}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="adressDetail_transcationCenterWrap">
                                <span class="el-icon-back"></span>
                            </div>

                            <div class="adressDetail_transcationLeftWrap adressDetail_transcationRightWrap">
                                <div class="adressDetail_transcationLeftDetailList">
                                    <span>余额:</span>
                                    <span>34</span>
                                </div>
                                <div class="adressDetail_transcationLeftDetailList">
                                    <span>到:</span>
                                    <span>
                                        <div 
                                            v-for="(list,i) in item.to_address"
                                            :key="i">
                                            {{list}}
                                        </div>
                                    </span>
                                </div>
                                <div class="adressDetail_transcationLeftDetailList">
                                    <span> </span>
                                    <span> </span>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="params_assetPagination.page"
                    
                    :page-size="params_assetPagination.page_size"
                  
                    layout="prev, pager, next "
                    :total="totalNum"
                    class="center"
                >
                </el-pagination>


            </div>


        </div>
    </div>
</template>

<script>
import myHeader from '@/components/headerSearch'

import Vue from 'vue';
import {Pagination} from 'element-ui';

Vue.use(Pagination);

export default {
    created(){
        this.getAssetsDetail()
        this.getTransactionLists()
    },
    components: {  
		myHeader
	},
    data(){
        return {
            assetInfo:{},

            params_assetPagination:{
                page:0,
                page_size:2,
            },
            totalNum:0,

            transactionLists:[],

            
        }
    },
    methods:{
        handleCurrentChange(val) {
            this.params_assetPagination.page = val;
            this.getTransactionLists();
        },
        getAssetsDetail(){
            let url = `/chain_browser/getAssetInfo`;
            let params = this.getRouteParams(['chainid','searchText'],['chain_name','asset_id'])

            this.$http.post(url, params)
                .then(({data})=>{
                    console.log(data,7777)
                    this.assetInfo = data.data;
                    
                })
                .catch(({data})=>{
                    console.log(data)
                })
        },
        getTransactionLists(){
            let url = `/chain_browser/getAssetTxInfo`;
            let params = this.getRouteParams(['chainid','searchText'],['chain_name','asset_id'])
            let currrentParams = Object.assign({}, params, this.params_assetPagination)

            this.$http.post(url, currrentParams)
                .then(({data})=>{
                    if(data.code === '0'){
                        this.transactionLists = data.data.tx_list;
                        this.totalNum = data.data.total_item;
                    }
                    
                })
                .catch(({data})=>{
                    console.log(data,87787)
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.adressDetail_addressWrap{
    .adressDetail_addressTitle{
        font-size:20px;
        padding:30px 0 20px 0;
        color:#333;
    }
  
    .adressDetail_addressList{
        display:flex;
        line-height:20px;
        span{
            font-size:12px;
            color:#333;
            &:nth-of-type(1){
                width:100px;
            }
        }
    }
}
.adressDetail_assetsWrap{
    padding-top:20px;
    .adressDetail_assetsNavWrap{
        border-bottom:2px solid #ddd;
        display:flex;
        >span{
            padding-right:50px;
            padding-bottom:6px;
            &.active{
                color:blue;
            }
        }
    }
    .adressDetail_assetsDetailWrap{
        padding-top:10px;
        .adressDetail_assetsDetailTitle{
            padding:20px 0 10px 0;
            font-size:20px;
            margin-bottom:10px;
        }
        .adressDetail_assetsDetailList{
            display:flex;
            >span{
                text-align:center;
                line-height:30px;
                border:1px solid #ddd;
                margin-left:-1px;
                margin-top:-1px;
                &:nth-of-type(1){
                    width:100px;
                }
                &:nth-of-type(2){
                    width:300px;
                }
            }
        }
    }
}

.adressDetail_transcationWrap{
    .adressDetail_transcationTitle{
        font-size:20px;
        padding:20px 0;
    }
    .adressDetail_transcationListWrap{
        border:1px solid #bbb;
        margin-top:-1px;
    }
    .adressDetail_transcationList{
        display:flex;
        position:relative;
        justify-content:space-between;
        align-items: center;
        border-bottom:1px solid #eee;
        padding: 10px 40px;
        
       
        .adressDetail_transcationLeftWrap{
            .adressDetail_transcationLeftDetailList{
                display:flex;
                line-height:30px;
                >span{
                    font-size:12px;
                    &:nth-of-type(1){
                        width:80px;
                    }
                    &:nth-of-type(2){
                        color:blue;
                    }
                }
            }
        }
        .adressDetail_transcationCenterWrap{
            span{
                transform: rotate(180deg);
                font-size:20px;
                font-weight: bold;
            }
        }
        .adressDetail_transcationRightWrap{
            display:flex;
            flex-direction: column;
            justify-content: center;
        }
        .adressDetail_transcationLeftWrap1{
            display:flex;
            align-items: center;
            .adressDetail_transcationLeftIcon{
                margin-left:20px;
                margin-right:20px;
            }
        }
        
      
    }
}
</style>

