<template>
    <div class="UTXODetailWrap">
        <my-header/>
        
        <div class="detailOuterWrap">

			<div class="detail_commonTitle">UTXO详情</div>
            <div class="UTXODetail_detailOutersWrap">
                <div class="commonDetailTitle">UTXO</div>
                <div class="UTXODetail_detailWrap">
                    <div class="UTXODetailWrap_detailLeftWrap">
                        <div 
							style="padding-top:20px;"
							class="UTXODetailWrap_detailLeftListWrap">
                            <span>ID</span>
                            <span>{{UTXODetail.utxo_id | operStrNull}}</span>
                        </div>
						<div class="UTXODetailWrap_detailLeftListWrap">
							<span>所属账户</span>
							<span>{{UTXODetail.account_name | operStrNull}}</span>
						</div>
						<div class="UTXODetailWrap_detailLeftListWrap">
							<span>所属地址</span>
							<span 
								v-if="UTXODetail.address_id"
								@click="$router.push({path:'/blockchainBrowser_adressDetail',query:{chainid:$route.query.chainid,searchText:UTXODetail.address_id}})"
								style="color:#4778c7"
								class="blue">{{UTXODetail.address_id | interceptStr1}}</span>
							<span v-else>--</span>
						</div>
						
						<div class="UTXODetailWrap_detailLeftListWrap">
							<span>资产类型</span>
							<span 
								@click="$router.push({path:'/blockchainBrowser_assetsDetail',query:{chainid:$route.query.chainid,searchText:UTXODetail.asset_id}})"
								class="blue">{{UTXODetail.asset_name | operStrNull}}</span>
						</div>
						
						<div class="UTXODetailWrap_detailLeftListWrap">
							<span>产生时间</span>
							<span>Dec-27-2018 07:08:24 AM +UTC</span>
						</div>
						
                        
                    </div>
                    <div class="UTXODetailWrap_detailRightWrap">
                        <div>额度:</div>
                        <div>{{UTXODetail.amount}}</div>
                    </div>
                </div>
            </div>

            <div class="UTXODetailWrap_transactionWrap">
                <div class="commonDetailTitle">涉及交易</div>

                <div class="UTXODetailWrap_transactionContainer">
                    <div class="UTXODetailWrap_transactionList">
						<div>
							<span>产生</span>
						</div>
                        <div 
							v-if="UTXODetail.from_txid"
							class="blue"
							@click="$router.push({path:'/blockchainBrowser_transactionDetail',query:{chainid:$route.query.chainid,searchText:UTXODetail.from_txid}})">{{UTXODetail.from_txid | operStrNull}}</div>
						<div v-else>--</div>
                        
                    </div>
                    <div class="UTXODetailWrap_transactionCenterArrow">
						<span></span>
					</div>

                    <div class="UTXODetailWrap_transactionList">
						<div>
							<span>花费</span>
						</div>
						<div 
							v-if="UTXODetail.to_txid"
							class="blue"
							@click="$router.push({path:'/blockchainBrowser_transactionDetail',query:{chainid:$route.query.chainid,searchText:UTXODetail.to_txid}})">{{UTXODetail.to_txid | operStrNull}}</div>
						<div v-else>--</div>
                        
                    </div>
                </div>
            </div>

            <div class="UTXODetailWrap_syWrap">
                <div class="commonDetailTitle">溯源</div>
                <div class="UTXODetailWrap_syDetailWrap">
					<div class="listWrap">
						<div></div>
						<div>
							<div class="listTitle">产生UTXO：</div>
							<div class="listsWrap right">
								<div 
									v-for="(item, index) in UTXODetail.to_utxoid"
									:key="index"
									class="blue"
									@click="goUTXODetail('/blockchainBrowser_UTXODetail',{chainid:$route.query.chainid,searchText:item})">{{item.slice(0,50)}}</div>
								
								<span 
									style="text-align:center;display:block;"
									v-if="!UTXODetail.to_utxoid||UTXODetail.to_utxoid&&!UTXODetail.to_utxoid.length">--</span>
							</div>
						</div>
					</div>
					<div class="listWrap">
						<div>
							<div 
								class="listTitle" 
								style="padding:26px 0 4px;">当前UTXO：</div>
							<div class="listsWrap center">
								<div
									class="blue"
									style="font-weight: bold;"
									@click="goUTXODetail('/blockchainBrowser_UTXODetail',{chainid:$route.query.chainid,searchText:UTXODetail.utxo_id})">{{UTXODetail.utxo_id}}</div>
							</div>
						</div>
					</div>
					<div class="listWrap">
						<div>
							<div 
								class="listTitle"
								style="padding-top:28px;">来源UTXO：</div>
							<div class="listsWrap left">
								<div 
									v-if="UTXODetail.from_utxoid&&UTXODetail.from_utxoid.length"
									v-for="(item, index) in UTXODetail.from_utxoid"
									:key="index"
									class="blue"
									@click="goUTXODetail('/blockchainBrowser_UTXODetail',{chainid:$route.query.chainid,searchText:item})">{{item.slice(0,50)}}</div>
								<span 
									v-if="!UTXODetail.from_utxoid||!UTXODetail.from_utxoid.length"
									style="display:block;text-align:center;">--</span>
							</div>
						</div>
						<div></div>
					</div>

                    <!-- <div class="UTXODetailWrap_syDetailListWrap">
						<div class="UTXODetailWrap_syDetailList right">
							--><!-- 可能没有 --><!--
							<div 
								v-for="(item, index) in UTXODetail.to_utxoid"
								:key="index"
								class="blue"
								@click="goUTXODetail('/blockchainBrowser_UTXODetail',{chainid:$route.query.chainid,searchText:item})">{{item}}</div>
							
							<div v-if="!UTXODetail.to_utxoid||UTXODetail.to_utxoid&&!UTXODetail.to_utxoid.length">&nbsp;</div>
						</div>
						
                        <div class="UTXODetailWrap_syDetailListTitle">
							<span class="left">产生UTXO</span>
						</div>
                    </div>

                    <div class="UTXODetailWrap_syDetailListWrap">
                        <div class="UTXODetailWrap_syDetailListTitle">
							<span class="right">当前UTXO</span>
						</div>
                        <div class="UTXODetailWrap_syDetailList left">
                            <div
								class="blue"
								@click="goUTXODetail('/blockchainBrowser_UTXODetail',{chainid:$route.query.chainid,searchText:UTXODetail.utxo_id})">{{UTXODetail.utxo_id}}</div>
                        </div>
                    </div>

                    <div class="UTXODetailWrap_syDetailListWrap">
						<div class="UTXODetailWrap_syDetailList right">
							<div 
								v-for="(item, index) in UTXODetail.from_utxoid"
								:key="index"
								class="blue"
								@click="goUTXODetail('/blockchainBrowser_UTXODetail',{chainid:$route.query.chainid,searchText:item})">{{item}}</div>
							<div v-if="!UTXODetail.from_utxoid">&nbsp;</div>
						</div>
						
                        <div class="UTXODetailWrap_syDetailListTitle">
							<span class="left">来源UTXO</span>
						</div>
                        
                    </div> -->

                </div>
            </div>

        </div>


    </div>

</template>


<script>
import myHeader from '@/components/headerSearch'

export default {
    components: {  
		myHeader
    },
    created(){
        this.getInfo()
    },
	watch:{
		$route: function (val, oldVal) {
			this.getInfo()
		},
	},
    data(){
        return {
            UTXODetail:{}
        }
    },
    methods:{
        getInfo(){
            let url =`/chain_browser/getUtxoInfo`;

            let params = this.getRouteParams(['chainid','searchText'],['chain_name','utxo_id'])
            this.$http.post(url,params)
                .then(({data})=>{
                    this.UTXODetail = data.data;
                })
                .catch(({data})=>{

                })
        },
		goUTXODetail(path, query){
			this.$router.push({path:path,query:query})
		}

    },
	watch:{
		$route(to,from){
			this.getInfo();
		}
	}
}
</script>

<style lang="scss" scoped>


.UTXODetail_detailWrap{
    display:flex;
    justify-content: space-between;
    align-items: center;
	padding-left:18px;
	background:#fff;
	.UTXODetailWrap_detailLeftWrap{
		flex:1;
		padding-bottom:16px;
	}
    .UTXODetailWrap_detailLeftListWrap{
		border-bottom:1px dashed #e5e2e2;
		display:flex;
		flex-direction: row;
		line-height:46px;
		margin-right:40px;
		&:last-of-type{
			border-bottom:0;
		}
        >span{
			font-size:14px;
			
            &:nth-of-type(1){
				width:122px;
				color:#666;
				padding-left:20px;
            }
			&:nth-of-type(2){
				flex:1;
				padding-left:18px;
				color:#333;
				div{
					color:#333;
					span:nth-of-type(1){
						color:#666;
					}
				}
			}
        }
    }
    
    .UTXODetailWrap_detailRightWrap{
        flex:.5;
        height:228px;
        display:flex;
        flex-direction: column;
        justify-content: center;
		padding-left:182px;
        background:url(../../assets/blockchainBrowser/utxoAssetIcon.png) no-repeat 30px center;
		background-size:100px;
		border-left:1px dashed $blue;
        >div{
            &:nth-of-type(1){
                padding-bottom:20px;
				font-size:18px;
				color:#666;
            }
			&:nth-of-type(2){
				font-size:28px;
				color:#ffc00c;
			}
        }
    }
}

.UTXODetailWrap_transactionWrap{
	margin-top:17px;
	margin-bottom:17px;
    .UTXODetailWrap_transactionContainer{
        display:flex;
		background:#fff;
        .UTXODetailWrap_transactionList{
            flex:1;
            display:flex;
            flex-direction:column;
            align-items:center;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
            >div{
                &:nth-of-type(1){
                    color:#333;;
					line-height:100px;
					padding-left:41px;
					font-size:20px;
					background:url(../../assets/blockchainBrowser/utxoSY1.png) no-repeat left center;
                }
                &:nth-of-type(2){
                    font-size:14px;
					color:$blue;
					padding-bottom:46px;
					overflow:hidden;
					white-space: nowrap;
					text-overflow: ellipsis;

                }
            }
			&:nth-of-type(3){
				>div{
					&:nth-of-type(1){
						background-image:url(../../assets/blockchainBrowser/utxoSY2.png);
					}
				}
			}
        }
        .UTXODetailWrap_transactionCenterArrow{
			width:164px;
            >span{
				display:inline-block;
				width:164px;
				height:158px;
				
				background:url(../../assets/blockchainBrowser/utxoArrow.png) no-repeat center 88px;
			}
            
        }
    }
}

.UTXODetailWrap_syWrap{
    
    .UTXODetailWrap_syDetailWrap{
        padding:32px 42px 40px 42px;
        background:#ddd;
		background:#fff;
		
		// new style
		.listWrap{
			display:flex;
			>div{
				flex:1;
				.listTitle{
					font-size:20px;
					color:#333;
					text-align:center;
					padding:10px 0;
				}
				.listsWrap{
					line-height:26px;
					font-size:14px;
					&.right{
						>div{
							padding-left:60px;
							position:relative;
							&:before,
							&:after{
								position:absolute;
								content:'';
								background:#4778c7;
								left:0;
							}
							&:before{
								width:1px;
								height:calc(100% + 10px);
								top:50%;
								
							}
							&:after{
								width:40px;
								height:1px;
								top:50%;
								transform: translate(0,-50%);
							}
							&:last-of-type{
								margin-bottom:15px;
							}
						}
					}
					&.center{
						text-align:center;
					}
					
					&.left{
						>div{
							padding-right:60px;
							position:relative;
							text-align:right;
							&:before,
							&:after{
								position:absolute;
								content:'';
								background:#4778c7;
								right:0;
							}
							&:before{
								width:1px;
								height:calc(100% + 32px);
								bottom:50%;
								
							}
							&:after{
								width:40px;
								height:1px;
								top:50%;
								transform: translate(0,-50%);
							}
							&:last-of-type{
								margin-bottom:15px;
							}
						}
					}
				}
			}
		}
		
		
		
		
		
		// old style
        .UTXODetailWrap_syDetailListWrap{
			display:flex;
			position:relative;
			padding-bottom:58px;
			&:last-of-type{
				padding-bottom:0;
			}
			&:after{
				content:'';
				position:absolute;
				left:50%;
				transform: translate(-50%,0);
				top:-10px;
				bottom:10px;
				border-right:1px solid $blue;
			}
			>div{
				flex:1;
				>div{
					display:flex;
					align-items: center;
				}
				&:nth-of-type(1){
					margin-right:10px;
					justify-content: flex-end;
					display:flex;
					text-align:right;
					>div{
						text-align:right;
					}
				}
				&:nth-of-type(2){
					margin-left:10px;
				}
			}

            .UTXODetailWrap_syDetailListTitle{
				position:relative;
				>span{
					background:$blue;
					color:#fff;
					display:inline-block;
					width:150px;
					line-height:46px;
					text-align:center;
					position:absolute;
					top:50%;
					transform: translate(0,-50%);
					&:after{
						content:'';
						position:absolute;
						border-left:10px solid $blue;
						border-top:10px solid transparent;
						border-bottom:10px solid transparent;
						
					}
					&.left{
						
						&:after{
							left:-10px;
							top:13px;
							transform:  rotate(180deg);
						}
					}
					&.right{
						&:after{
							right:-10px;
							top:13px;
						}
					}
					
				}
            }
//             &:nth-of-type(2){
//                 align-self:center;
//             }
//             &:nth-of-type(3){
//                 align-self: flex-end;
//             }

            .UTXODetailWrap_syDetailList{
				background:#dde6f9;
				display:flex;
				justify-content: center;
				flex-direction: column;
				&.right{
					align-items: flex-end;
				}
                >div{
                    padding-left:20px;
                    padding-right:20px;
					color:$blue;
					line-height:32px;
                }
            }
        }
    }
}

</style>

