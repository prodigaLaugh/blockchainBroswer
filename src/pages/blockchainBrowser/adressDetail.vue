<template>
    <div class="adressDetail_wrap">
        <my-header/>
        <div class="detailOuterWrap adressDetail_containerWrap">
            <div class="adressDetail_addressWrap">
                <div class="commonDetailTitle">地址概况</div>
                <div class="adressDetail_addressListsWrap">
									<div class="adressDetail_addressListWrap">
										<div class="adressDetail_addressList">
												<span>地址:</span>
												<span>{{adressInfo.address_id}} </span>
										</div>
										<div class="adressDetail_addressList">
												<span>交易总数:</span>
												<span>{{adressInfo.tx_total}} </span>
										</div>
									</div>
									
									<div class="adressDetail_addressListWrap">
										<div class="adressDetail_addressList">
												<span>转账交易:</span>
												<span>{{adressInfo.to_txtotal}} </span>
										</div>
										<div class="adressDetail_addressList">
												<span>接收交易:</span>
												<span>{{adressInfo.from_txtotal}} </span>
										</div>
									</div>
									
									<div class="adressDetail_addressListWrap">
										<div class="adressDetail_addressList">
												<span>持有资产类型:</span>
												<span>{{assetsLists.length}} </span>
										</div>
										<div>
											<span>&nbsp;</span>
											<span>&nbsp;</span>
										</div>
										
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
                    <div class="commonDetailTitle">资产概况</div>
                    <div class="adressDetail_assetsDetailList">
											<div>
												<span>当前余额</span>
												<span>交易次数</span>
												<span>转账交易</span>
												<span>接收交易</span>
											</div>
											<div>
												<span>{{assetsLists[assetIndex].balance}}</span>
												<span>{{assetsLists[assetIndex].tx_sums}}</span>
												<span>{{assetsLists[assetIndex].from_txsums}}</span>
												<span>{{assetsLists[assetIndex].to_txsums}}</span>
											</div>
										</div>

                </div>
            </div>

            <div class="adressDetail_transcationWrap" v-if="assetsLists.length">
                <div class="commonDetailTitle">最新交易</div>
                <div class="adressDetail_transcationListsWrap">

                    <div 
                        v-for="(item,index) in transactionLists"
                        :key="index"
                        class="adressDetail_transcationListWrap">
												<div class="adressDetail_transcationList">
													<div class="list1">
														<div class="left">
															<span>交易ID:</span>
															<span
																class="blue"
																@click="$router.push({path:'/blockchainBrowser_transactionDetail',query:{chainid:$route.query.chainid,searchText:item.tx_id}})">{{item.tx_id | interceptStr1}}</span>
														</div>
														<div class="right">
															<div>
																<span>余额:</span>
																<span>{{item.asset_amount}}</span>
															</div>
															<div>
																<span>到账时间</span>
																<span>{{item.block_time}}</span>
															</div>
														</div>
													</div>
													
													<div class="list2">
														<div class="left">
															<span :class="{in:item.type==='IN',out:item.type==='OUT'}">{{item.type}}</span>
															<div>
																<span>从:</span>
																<span>
																	<div
																			v-for="(list,i) in item.from_address"
																			:key="i"
																			class="blue"
																			@click="$router.push({path:'/blockchainBrowser_adressDetail',query:{chainid:$route.query.chainid,searchText:list}})">
																			{{list | interceptStr1}}
																	</div>
																	<div v-if="!item.from_address.length">--</div>
																	
																</span>
															</div>
														</div>
														<div class="right">
															<span>到</span>
															<span>
																<div
																		v-for="(list,i) in item.to_address"
																		:key="i"
																		class="blue"
																		@click="$router.push({path:'/blockchainBrowser_adressDetail',query:{chainid:$route.query.chainid,searchText:list}})">{{list | interceptStr1}}</div>
																<div v-if="!item.to_address.length">--</div>
																		
															</span>
														</div>
													</div>
													
												</div>

                    </div>

                </div>

               <!-- <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="params_assetPagination.page"
                    
                    :page-size="params_assetPagination.page_size"
                  
                    layout="prev, pager, next "
                    :total="totalNum"
                    class="center"
                >
                </el-pagination> -->


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
                page_size:10,
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

</style>

