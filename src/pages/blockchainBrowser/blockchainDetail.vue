<template>
    <div class="adressDetail_wrap">
        <my-header/>
        <div class="detailOuterWrap adressDetail_containerWrap">
            <div class="adressDetail_addressWrap">
							<div class="commonDetailTitle">区块{{blockInfo.block_height}}</div>
                <div class="adressDetail_addressListsWrap">
									
									<div class="adressDetail_addressListWrap">
										<div class="adressDetail_addressList">
												<span>区块链:</span>
												<span>{{chainid}} </span>
										</div>
										<div class="adressDetail_addressList">
												<span>出块节点:</span>
												<span>{{blockInfo.propose_nodename}}</span>
										</div>
									</div>
									
									<div class="adressDetail_addressListWrap">
										<div class="adressDetail_addressList">
												<span>包含交易数:</span>
												<span>{{blockInfo.tx_total}} </span>
										</div>
										<div class="adressDetail_addressList">
												<span>出块耗时:</span>
												<span>{{blockInfo.createblock_time}}</span>
										</div>
									</div>
									
									<div class="adressDetail_addressListWrap">
										<div class="adressDetail_addressList">
												<span>区块高度:</span>
												<span>{{blockInfo.block_height}} </span>
										</div>
										<div class="adressDetail_addressList">
												<span>上个块:</span>
												<span>{{blockInfo.preblock_height}}</span>
										</div>
									</div>
									
									<div class="adressDetail_addressListWrap">
										<div class="adressDetail_addressList">
												<span>出块时间:</span>
												<span>{{blockInfo.block_time | timestampToTime}} </span>
										</div>
										<div class="adressDetail_addressList">
												<span>下个块:</span>
												<span>{{blockInfo.nextblock_height}}</span>
										</div>
									</div>
									
									<div class="adressDetail_addressListWrap">
										<div class="adressDetail_addressList">
												<span>块哈希:</span>
												<span>{{blockInfo.block_hash | interceptStr1}} </span>
										</div>
										<div class="adressDetail_addressList">
												<span>块大小(kB):</span>
												<span>{{blockInfo.block_size}}</span>
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
																<span>金额:</span>
																<span>{{item.asset_amount}}</span>
															</div>
															<div>
																<span>到账时间:</span>
																<span>{{blockInfo.block_time | timestampToTime}}</span>
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



