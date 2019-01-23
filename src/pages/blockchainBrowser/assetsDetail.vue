<template>
    <div class="adressDetail_wrap">
        <my-header/>
        <div class="detailOuterWrap adressDetail_containerWrap">
            <div class="adressDetail_addressWrap">
								<div class="commonDetailTitle">资产概况</div>
                <div class="adressDetail_addressListsWrap">
									
									<div class="adressDetail_addressListWrap">
										<div class="adressDetail_addressList">
												<span>资产名称:</span>
												<span>{{assetInfo.asset_name | operStrNull}} </span>
										</div>
										<div class="adressDetail_addressList">
												<span>发行总量:</span>
												<span>{{assetInfo.issue_amount}}</span>
										</div>
									</div>
									
									<div class="adressDetail_addressListWrap">
										<div class="adressDetail_addressList">
												<span>总持有者:</span>
												<span>{{assetInfo.holder_total}} </span>
										</div>
										<div class="adressDetail_addressList">
												<span>资产交易量:</span>
												<span>{{assetInfo.asset_txtotal}}</span>
										</div>
									</div>
									
									<div class="adressDetail_addressListWrap">
										<div class="adressDetail_addressList">
												<span>创建时间:</span>
												<span>{{assetInfo.create_time}} </span>
										</div>
										<div class="adressDetail_addressList">
												<span></span>
												<span></span>
										</div>
									</div>
									
									
                   

                    
                </div>
            </div>
						
						
						<div class="adressDetail_transcationWrap" style="margin-top:17px;" v-if="transactionLists.length">
								<div class="commonDetailTitle">交易列表</div>
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
        this.getAssetsDetail()
        
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
										let id = data.data.asset_id;
										this.getTransactionLists(id)
                    
                })
                .catch(({data})=>{
                    console.log(data)
                })
        },
        getTransactionLists(id){
            let url = `/chain_browser/getAssetTxInfo`;
           
						let params = {
							asset_id: id,
							chain_name: this.$route.query.chainid,
						}
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


