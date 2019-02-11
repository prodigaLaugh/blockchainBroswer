<template>
    <div class="transactionDetainWrap">
        <my-header/>
        <div class="detailOuterWrap transactionDetainWrap_assetsWrap">
            <div class="transactionDetainWrap_assetsTitle">
                <span>交易:</span>
                <span>{{transactionInfo.tx_id}}</span>
            </div>

            <div class="transactionDetainWrap_assetsDetailWrap">
                <div class="transactionDetainWrap_assetDetailListWrap">
                    <div>
                        <span>资产类型</span>
                        <span>{{assetType}}</span>
                    </div>
                    <div>
                        <span>交易状态</span>
                        <span>成功</span>
                    </div>
                    <div>
                        <span>到账时间</span>
                        <span>{{transactionInfo.block_time}}</span>
                    </div>
                 
                </div>
                <div class="transactionDetainWrap_assetDetailListWrap">
                    <div>
                        <span>所在区块</span>
                        <span>{{transactionInfo.block_height}}</span>
                    </div>
                    <div>
                        <span>确认次数</span>
                        <span>{{transactionInfo.confirm_num}}</span>
                    </div>
                    <div>
                        <span>手续费</span>
                        <span>{{transactionInfo.fee}}</span>
                    </div>
           
                </div>
            </div>

            <div class="transactionDetainWrap_assetListsWrap">

                <div 
                    v-for="(item, index) in transactionInfo.assetinfo_list"
                    :key="index"
                    class="transactionDetainWrap_assetListWrap">
										<div class="transactionDetainWrap_assetListRightWrap">
												<span>{{item.asset_name||'--'}}</span>
												<div class="listWrap">
														<div>
																<span>入账金额:</span>
																<i>{{item.from_amount}}</i>
														</div>
														<div>
																<span>找零金额:</span>
																<i>{{item.change}}</i>
														</div>
														<div>
																<span>实际到账:</span>
																<i>{{item.to_amount}}</i>
														</div>
												</div>
												
										</div>
										
                    <div class="transactionDetainWrap_assetListLeftWrap">
                        <div class="transactionDetainWrap_assetListLeftTop">
                            <span>交易ID:</span>
                            <span>{{item.tx_id}}</span>
                        </div>
                        <div class="transactionDetainWrap_assetListLeftFromWrap">
                            <div class="transactionDetainWrap_assetListLeftFrom">
                                <span>从:</span>
                                <span
																	class="blue"
																	v-if="item.fromaddress_utxo.from"
																	@click="$router.push({path:'/blockchainBrowser_adressDetail',query:{chainid:$route.query.chainid,searchText:item.fromaddress_utxo.from}})">{{item.fromaddress_utxo.from | interceptStr1}}</span>
																	<span v-if="!item.fromaddress_utxo.from">--</span>
                            </div>
                            <div class="transactionDetainWrap_assetListCenterWrap">
                                <span></span>
                            </div>
                            <div  class="transactionDetainWrap_assetListLeftFrom">
                                <span>到:</span>
                                <span>
                                    <div 
                                        v-for="(list,i) in item.to_address"
                                        :key="i"
																				@click="$router.push({path:'/blockchainBrowser_adressDetail',query:{chainid:$route.query.chainid,searchText:list}})"
																				class="blue">{{list | interceptStr1}}</div>
                                </span>
                            </div>
                        </div>

                        <div class="transactionDetainWrap_assetListLeftListsWrap">
                            <div class="transactionDetainWrap_assetListLeftListsLeft">UTXO:</div>
                            <div class="transactionDetainWrap_assetListLeftListsRight">
                              
                                <div 
                                    v-for="(list,i) in item.fromaddress_utxo.lists"
                                    :key="i">
                                    <span></span>
                                    <span
																			class="blue"
																			@click="$router.push({path:'/blockchainBrowser_UTXODetail',query:{chainid:$route.query.chainid,searchText:list}})">{{list | interceptStr1}}</span>
                                </div>
																<div v-if="!item.fromaddress_utxo.lists">--</div>
															
                            </div>
                        </div>
                    </div>
                    
                </div>

            </div>

        </div>

    </div>
</template>

<script>
import myHeader from '@/components/headerSearch'
    
    
export default {
    created(){
        this.getTransactionInfo()
    },
    components: {  
			myHeader
    },
		watch:{
			$route: function (val, oldVal) {
				this.getTransactionInfo()
			},
		},
    data(){
        return {
            transactionInfo:{},
            assetType:'',

            transactionLists:[],

        }
    },
    methods:{
        getTransactionInfo(){
            let url = `/chain_browser/getTxInfo`;

            let params = this.getRouteParams(['chainid','searchText'],['chain_name','tx_id'])

            this.$http.post(url, params)
                .then(({data})=>{
                    this.transactionInfo = data.data;
                    
                    let assetType = '';
                    data.data.assetinfo_list.map((item,index)=>{
                        let asset_name = item.asset_name;
                        let str = index ===0 ? '' :',';
                        if(asset_name){
                            assetType += (str + asset_name);
                        }
                        
                    })
                    this.assetType = assetType ? assetType :'--'
                    
                    let lists = data.data.assetinfo_list.map((item,index)=>{
                        var obj = item;
                        var key = Object.keys(item.fromaddress_utxo)[0];
                        var lists = item.fromaddress_utxo[key];
                        obj.fromaddress_utxo = {
                            from:key,
                            lists:lists
                        }
                        return obj;
                    })
                    this.transactionInfo.assetinfo_list = lists;
                    console.log(this.transactionInfo,222)
                    
                })
                .catch(({data})=>{
                    console.log(data)
                })
        }
    }

}
</script>

<style lang="scss" scoped>
.transactionDetainWrap_assetsTitle{
    font-size:20px;
    padding:38px 0 10px 114px;
		color:#333;
		background:#fff;
}
.transactionDetainWrap_assetsDetailWrap{
    display:flex;
    align-items: center;
		padding:0 56px;
		background:#fff;

    .transactionDetainWrap_assetDetailListWrap{
        flex:1;
				line-height:80px;
        >div{
            display:flex;
						border-bottom:1px dashed #ddd;
						font-size:14px;
						&:last-of-type{
							border-bottom:0 none;
						}
            >span{
                &:nth-of-type(1){
                    width:144px;
										color:#666;
										text-align:right;
                }
								&:nth-of-type(2){
										flex:1;
										padding-left:46px;
										color:#333;
								}
            }
						
        }
    }
}

.transactionDetainWrap_assetListsWrap{
	margin-top:17px;
	background:#fff;
	padding:30px 40px 162px;
}
.transactionDetainWrap_assetListWrap{
    display:flex;
    justify-content: space-between;
    margin-bottom:20px;
    .transactionDetainWrap_assetListLeftWrap{
        flex:1;
				border:1px solid #ddd;
				border-left:0 none;
				border-top:0 none;
    }

    .transactionDetainWrap_assetListLeftTop{
        display:flex;
				height:44px;
				line-height:44px;
        align-items: center;
				border:1px solid #ddd;
				border-left:0 none;
				border-right:0 none;
				background:#f7f7f7;
        >span:nth-of-type(1){
            color:#fff;
						padding-left:20px;
						color:#333;
        }
        >span:nth-of-type(2){
						padding-left:7px;
        }
    }

    .transactionDetainWrap_assetListLeftFromWrap{
        display:flex;
        justify-content: space-between;
				align-items:center;
				padding-top:42px;
				font-size:14px;
        .transactionDetainWrap_assetListLeftFrom{
            flex:1;
            display:flex;
						align-items:center;
						>span:nth-of-type(1){
								width:50px;
								text-align:right;
								color:#666;
						}
            >span:nth-of-type(2){
                flex:1;
								padding-left:50px;
								div{
									line-height:20px;
									word-break: break-all;
								}
            }
        }
    }
    .transactionDetainWrap_assetListCenterWrap{
			width:100px;
			height:30px;
        span{
					display:block;
					height:100%;
            background:url(../../assets/blockchainBrowser/arrow.png) no-repeat center;
						
        }
    }

    .transactionDetainWrap_assetListLeftListsWrap{
        display:flex;
        align-items: center;
        padding-top:20px;
        .transactionDetainWrap_assetListLeftListsLeft{
            width:200px;
						padding-left:120px;
						font-size:14px;
						color:#666;
        }
        .transactionDetainWrap_assetListLeftListsRight{
            >div{
                display:flex;
                align-items: center;
                line-height:30px;
								font-size:14px;
                >span:nth-of-type(1){
                    width:40px;
                    height:1px;
                    background:#999;
                    margin-right:10px;
                    position:relative;
                    &:after{
                        content:'';
                        width:1px;
                        height:30px;
                        background:#999;
                        position:absolute;
                        bottom:0;
                    }
                }
            }
        }
    }

    .transactionDetainWrap_assetListRightWrap{
			width:244px;
			>span{
				line-height:44px;
				color:#fff;
				font-size:20px;
				background:$blue;
				display:block;
				text-align:center;
			}
			.listWrap{
				border:1px solid #ddd;
				border-top:0 none;
				padding:30px 0;
				>div{
					height:70px;
					display:flex;
					flex-direction: column;
					justify-content: center;
					padding-left:70px;
					font-size:14px;
					background:url(../../assets/blockchainBrowser/transaDetailIcon1.png) no-repeat 20px center;
					span{
						color:#666;
					}
					i{
						color:#333;
						padding-top:10px;
					}
					
					&:nth-of-type(2){
							background-image:url(../../assets/blockchainBrowser/transaDetailIcon2.png);
					}
					&:nth-of-type(3){
							background-image:url(../../assets/blockchainBrowser/transaDetailIcon3.png);
					}
			}
			
				
			}
    }


}
</style>

