<template>
    <div class="adressDetail_wrap">
        <my-header/>
        <div class="detailOuterWrap adressDetail_containerWrap">
            <div class="adressDetail_addressWrap">
                <div class="adressDetail_addressTitle">区块{{blockInfo.block_height}}</div>
                <div class="adressDetail_addressListsWrap">
                    <div class="adressDetail_addressListWrap">
                        <div class="adressDetail_addressList">
                            <span>区块链</span>
                            <span>{{chainid}} </span>
                        </div>
                        <div class="adressDetail_addressList">
                            <span>包含交易数</span>
                            <span>{{blockInfo.tx_total}} </span>
                        </div>
                        <div class="adressDetail_addressList">
                            <span>区块高度</span>
                            <span>{{blockInfo.block_height}} </span>
                        </div>
                        <div class="adressDetail_addressList">
                            <span>出块时间</span>
                            <span>{{blockInfo.block_time}} </span>
                        </div>
                        <div class="adressDetail_addressList">
                            <span>块哈希</span>
                            <span>{{blockInfo.block_hash}} </span>
                        </div>

                    </div>
                    <div class="adressDetail_addressListWrap">
                        <div class="adressDetail_addressList">
                            <span>出块节点</span>
                            <span>{{blockInfo.propose_nodename}} </span>
                        </div>
                        <div class="adressDetail_addressList">
                            <span>出块耗时</span>
                            <span>{{blockInfo.createblock_time}} </span>
                        </div>
                        <div class="adressDetail_addressList">
                            <span>上个块</span>
                            <span>{{blockInfo.preblock_height}} </span>
                        </div>
                        <div class="adressDetail_addressList">
                            <span>下个块</span>
                            <span>{{blockInfo.nextblock_height}} </span>
                        </div>
                        <div class="adressDetail_addressList">
                            <span>块大小(kB)</span>
                            <span>{{blockInfo.block_size}} </span>
                        </div>

                    </div>
                    
                </div>
            </div>
            <div class="adressDetail_assetsWrap">
                <div class="blockchainNavWrap">
                    <span 
                        v-for="(item,index) in assetsLists"
                        :class="{active:assetIndex===index}"
                        @click="selectNav(index,item.asset_id)"
                        :key="index">{{item.asset_name | operStrNull}}</span>
                </div>
                
            </div>

            
            <div class="adressDetail_transcationWrap">
                <div class="adressDetail_transcationTitle">交易列表</div>
                <div class="adressDetail_transcationListsWrap">

                    <div 
                        v-for="(item,index) in transactionLists"
                        :key="index"
                        class="adressDetail_transcationListWrap">
                        <div class="adressDetail_transcationList" >
                            <div class="adressDetail_transcationLeftWrap adressDetail_transcationLeftWrap1"> 
                                <!-- <div class="adressDetail_transcationLeftIcon">left</div> -->
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
                                                :key="i">{{list}}</div>
                                        </span>
                                    </div>
                                    <div class="adressDetail_transcationLeftDetailList">
                                        <span>到账时间:</span>
                                        <span>{{blockInfo.block_time}}</span>
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
        this.chainid = this.$route.query.chainid;
        this.getBlockDetail()
    },
    components: {  
		myHeader
	},
    data(){
        return {
            chainid:'',
            blockInfo:{},
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
        getBlockDetail(){
            let url = `/chain_browser/getBlockInfo`;

            let params = this.getRouteParams(['chainid','searchText'],['chain_name','block_height'])
            params.block_height = params.block_height - 0;
            this.$http.post(url, params)
                .then(({data})=>{

                    this.blockInfo = data.data;

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
            let url = `/chain_browser/getBlockTxsInfo`;

            let params = this.getRouteParams(['chainid','searchText'],['chain_name','block_height'])
            params.block_height = params.block_height - 0;
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
        padding:30px 0 40px 0;
        color:#333;
    }
    .adressDetail_addressListsWrap{
        display:flex;
        padding:10px 50px;
        >div{
            flex:1;
            &.adressDetail_addressListWrap:nth-of-type(2){
                position:relative;
                padding-left:30px;
                &:after{
                    content:'';
                    position:absolute;
                    left:0;
                    top:0;
                    bottom:0;
                    border-left:1px solid #666;
                }
            }
        }
    }
    .adressDetail_addressList{
        display:flex;
        line-height:20px;
        padding-bottom:6px;
        span{
            font-size:13px;
            color:#333;
            &:nth-of-type(1){
                width:100px;
            }
        }
    }
}
.adressDetail_assetsWrap{
    padding-top:20px;
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
        padding:40px 0;
    }
    .adressDetail_transcationListWrap{
        border:1px solid #bbb;
        padding:10px 40px;
    }
    .adressDetail_transcationList{
        display:flex;
        position:relative;
        justify-content:space-between;
        align-items: center;
       
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

