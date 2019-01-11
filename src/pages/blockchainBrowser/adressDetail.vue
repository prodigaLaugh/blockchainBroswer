<template>
    <div class="adressDetail_wrap">
        <my-header/>
        <div class="detailOuterWrap adressDetail_containerWrap">
            <div class="adressDetail_addressWrap">
                <div class="adressDetail_addressTitle">地址概况</div>
                <div class="adressDetail_addressListsWrap">
                    <div class="adressDetail_addressList">
                        <span>地址</span>
                        <span>{{adressInfo.address_id}} </span>
                    </div>
                    <div class="adressDetail_addressList">
                        <span>交易总数</span>
                        <span>{{adressInfo.asset_total}} </span>
                    </div>
                    <div class="adressDetail_addressList">
                        <span>转账交易</span>
                        <span>{{adressInfo.from_txtotal}} </span>
                    </div>
                    <div class="adressDetail_addressList">
                        <span>接收交易</span>
                        <span>{{adressInfo.to_txtotal}} </span>
                    </div>
                    <div class="adressDetail_addressList">
                        <span>持有资产类型</span>
                        <span>{{assetsLists.length}} </span>
                    </div>

             
                </div>
            </div>
            <div class="adressDetail_assetsWrap" v-if="assetsLists.length">
                <div class="blockchainNavWrap">
                    <span 
                        v-for="(item,index) in assetsLists"
                        :class="{active:assetIndex===index}"
                        @click="selectNav(index,item.asset_id)"
                        :key="index">{{item.asset_name | operStrNull}}</span>
                </div>
                <div class="adressDetail_assetsDetailWrap">
                    <div class="adressDetail_assetsDetailTitle">资产概况</div>
                    <div class="adressDetail_assetsDetailList">
                        <span>当前余额</span>
                        <span>{{assetsLists[assetIndex].balance}}</span>
                    </div>
                    <div class="adressDetail_assetsDetailList">
                        <span>交易次数</span>
                        <span>{{assetsLists[assetIndex].tx_sums}}</span>
                    </div>
                    <div class="adressDetail_assetsDetailList">
                        <span>转账交易</span>
                        <span>{{assetsLists[assetIndex].from_txsums}}</span>
                    </div>
                    <div class="adressDetail_assetsDetailList">
                        <span>接收交易</span>
                        <span>{{assetsLists[assetIndex].to_txsums}}</span>
                    </div>

                </div>
            </div>

            <div class="adressDetail_transcationWrap" v-if="assetsLists.length">
                <div class="adressDetail_transcationTitle">最新交易</div>
                <div class="adressDetail_transcationListsWrap">

                    <div 
                        v-for="(item,index) in transactionLists"
                        :key="index"
                        class="adressDetail_transcationListWrap">
                        <div class="adressDetail_transcationList">
                            <div class="adressDetail_transcationLeftWrap adressDetail_transcationLeftWrap1"> 
                                <div class="adressDetail_transcationLeftIcon">{{item.type}}</div>
                                <div class="adressDetail_transcationLeftDetailWrap">
                                    <div class="adressDetail_transcationLeftDetailList">
                                        <span>交易ID:</span>
                                        <span>{{item.tx_id}}</span>
                                    </div>
                                    <div class="adressDetail_transcationLeftDetailList">
                                        <span>从:</span>
                                        <span>
                                            <div
                                                v-for="(list,i) in item.from_address"
                                                :key="i">
                                                {{list}}
                                            </div>
                                        </span>
                                    </div>
                                    <div class="adressDetail_transcationLeftDetailList">
                                        <span>到账时间:</span>
                                        <span>{{item.block_time}}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="adressDetail_transcationCenterWrap">
                                <span class="el-icon-back"></span>
                            </div>

                            <div class="adressDetail_transcationLeftWrap adressDetail_transcationRightWrap">
                                <div class="adressDetail_transcationLeftDetailList">
                                    <span>余额:</span>
                                    <span>{{item.asset_amount}}</span>
                                </div>
                                <div class="adressDetail_transcationLeftDetailList">
                                    <span>到:</span>
                                    <span>
                                        <div
                                            v-for="(list,i) in item.to_address"
                                            :key="i">{{list}}</div>
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
        this.getAdressDetail();
    },
    components: {  
		myHeader
	},
    data(){
        return {
            adressInfo:{},
            assetId:'',
            assetsLists:[],

            assetIndex:0,
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
        selectNav(index, id){
            if(this.assetIndex === index){
                return;
            }
            this.assetIndex = index;
            this.assetId = id;
            this.getTransactionLists();
        },
        getAdressDetail(){
            let url = `/chain_browser/getAddressInfo`;

            let params = this.getRouteParams(['chainid','searchText'],['chain_name','address_id'])
            this.$http.post(url, params)
                .then(({data})=>{

                    this.adressInfo = data.data;

                    let lists = data.data.asset_info;
                    this.assetsLists = lists;
                    if(lists.length){
                        this.assetId = lists[0].asset_id;
                        this.getTransactionLists(this.assetId)
                    }
                    
                })
                .catch(({data})=>{
                    console.log(data)
                })
        },
        getTransactionLists(){
            let url = `/chain_browser/getAddressTxsInfo`;

            let params = this.getRouteParams(['chainid','searchText'],['chain_name','address_id'])
            params.asset_id = this.assetId;
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
        padding-bottom:6px;
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
            padding:40px 0 20px 0;
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
        padding:40px 0;
    }
    .adressDetail_transcationListWrap{
        border:1px solid #bbb;
        padding:10px 50px;
        margin-top:-1px;
    }
    .adressDetail_transcationList{
        display:flex;
        position:relative;
        justify-content:space-between;
        align-items: center;
        
        border-bottom:1px solid #eee;
       
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

