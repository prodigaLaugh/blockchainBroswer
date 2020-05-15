<template>
	<div class="app-content" v-cloak style="padding-top:54px;">
		<myHeader/>
		<router-view />
	</div>
</template>

<script>
	import myHeader from '@/components/headerSearch.vue'
	export default{
		components: {  
			myHeader,
	    },
	}
</script>

<style lang="scss">
	body{
		min-width:1200px;
		overflow-x:auto;
		background: #f5f7fa;
	}
	.detailOuterWrap{
		@include defaultWidth;
	}
	@import url("./../css/reset.css");
	@import url("./../css/common.css");
	.commonHeaderWrap {
	
		.commonHeader {
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
			height: 54px;
			align-items: center;
			background: $bgColor;
			z-index:10;
	
			.header {
				width: $content-width;
				margin: 0 auto;
				height:54px;
				display:flex;
				justify-content: space-between;
				
				.left{
					display:flex;
					align-items: center;
					.log{
						display:flex;
						align-items: center;
						img{
							width:17px;
						}
						>span{
							font-size:12px;
							color:#fff;
							margin-left:10px;
						}
					}
					.inp{
						margin-left:76px;
						display: flex;
						align-items: center;
						position:relative;
						input{
							background:none;
							width:324px;
							border:1px solid #848e9b;
							line-height:36px;
							padding:0 30px 0 15px;
							border-radius:5px;
							color:#fff;
						}
						span{
							background:url(../assets/home/search.png) no-repeat center;
							background-size:16px;
							position:absolute;
							width:32px;
							height:38px;
							right:0;
							top:0;
							@include pointer;
						}
					}
				}
				
				.right{
					display:flex;
					align-items: center;
					>a{
						font-size:12px;
						color:#fff;
						line-height:54px;
						margin-left:50px;
					}
				}
			}
	
	
		}
	
	}
	
	
	.commonItemWrap{
		background:#fff;
		flex:1;
		padding:0 28px; 
		&:last-of-type{
			margin-left:24px;
		}
	}
	
	
	
	// 标题样式
	.topTitle{
		padding:36px 0 30px;
		font-size:18px;
		color:#425263;
		font-weight:500;
	}
	.commonTitle_one{
		display:flex;
		justify-content: space-between;
		padding:30px 0;
		>span{
			font-size:16px;
			color:#425263;
		}
		>div{
			display:flex;
			align-items: center;
			>span{
				border:1px solid $btnBg;
				border-radius:5px;
				width:100px;
				line-height:34px;
				text-align:center;
				color:$btnBg;
				font-size:12px;
				@include pointer;
				margin-left:12px;
				transition:all .5s;
				&.active{
					color:#fff;
					background:$btnBg;
				}
			}
		}
	}
	
	.commonTitle_one{
		font-size:16px;
		padding:28px 0 30px;
		color:#425263;
		font-weight:500;
	}
	
	.echartsWrap{
		@include defaultWidth;
		background:#fff;
		padding:0 28px; 
		margin-top:20px;
		#myChart{
			height:400px;
		}
	}
	
	//header样式处理
	.commonHeaderCenterWrap{
		.el-select{
			position:relative;
			padding-right:7px;
			input{
				width:110px;
			}
			&:after{
				content:'';
				position:absolute;
				right:0;
				top:50%;
				transform: translate(0,-50%);
				height:36px;
				border-right:1px solid rgba(255,255,255,.4);
			}
		}
	}
	//详情标题样式
	.commonDetailTitle{
	    font-size:14px;
		color:#455565;
		padding-left:28px;
		background:#e4ebf1;
		line-height:50px;
	}
	.detail_commonTitle{
		font-size:24px;
		padding:20px 0 30px;
	}
	
	.blockchainNavWrap{
        display:flex;
        height:80px;
        align-items: center;
        align-content: center;
        padding-left:60px;
        >span{
            margin-right:38px;
            font-size:16px;
            padding:0 8px;
            @include pointer;
            transition:color .5s;
            color:#808080;
            &:after{
                position:absolute;
                content:'';
                left:50%;
                width:0;
                top:35px;
                border-bottom:3px solid $blue;
                transform: translate(-50%,0);
                transition:width .5s;
            }
            &.active{
                color:$blue;
                position:relative;
                &:after{
                    width:100%;
                }
                
            }
        }
   }


    // 表格样式修改
    .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
        border-color:#ddd;
    }
    

    .el-table th{
        padding:14px 0;
        background-color:#f7f7f7;
        color:$color-333;
        
    }
    .el-table__row{
        &:nth-of-type(2n+1){
            background:#fff;
        }
        &:nth-of-type(2n+2){
            background:#f4f5f9;
        }
    }
    .el-table td{
        padding:18px 0
    }
    .el-table th,
    .el-table td{
        // padding-left:80px;
        font-size:14px;
        border-right:0;
        // &:last-of-type{
        //     padding-left:0;
        //     border-right:1px solid #dddddd;
        // }
    }
		.el-table .cell, .el-table th div{
			// padding-left:0!important;
			display:flex;
			justify-content: space-between;
		}
		.blockchainBrowser_container_listsWrap1 .el-table th:nth-of-type(4),
		.blockchainBrowser_container_listsWrap2 .el-table th:nth-of-type(5){
				padding-left:0;
		}
    
    

    /* 弹窗样式修改 */
    .el-dialog{
        border-radius:5px;
        .el-dialog__header{
            background:$blue;
            padding:17px 20px 15px;
            border-radius:5px 5px 0 0;
            .el-dialog__title{
                color:#fff;
            }
            .el-dialog__headerbtn{
                font-size:24px;
                top:14px;
                right:20px;
                .el-dialog__close{
                    color:#aaa;
                }
            }
        }
        .el-dialog__body{
            padding:20px 65px 28px;
        }
        .el-dialog__footer{
            padding:28px 65px 22px;
        }

    }
		//区块详情 地址详情样式
		.adressDetail_addressWrap{
		   .adressDetail_addressListsWrap{
				 padding:20px 28px 20px;
				 background:#fff;
				 .adressDetail_addressListWrap{
					 display:flex;
					 &:last-of-type{
						 border-bottom:0 none;
					 }
				 }
			 }
		    .adressDetail_addressList{
		        
				width:50%;
				line-height:54px;
				display:flex;
				
		        span{
		            font-size:12px;
		            color:#333;
					font-size:14px;
		            &:nth-of-type(1){
		                width:124px;
						color:#727e8a;
		            }
					&:nth-of-type(2){
						flex:1;
						color:#727e8a;
						padding-left:50px;
						overflow:hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
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
		        
		        .adressDetail_assetsDetailList{
		            background:#fff;
								padding:36px 36px 42px;
								>div{
									display:flex;
									border:1px solid #dddddd;
									font-size:14px;
									color:#333;
									&:nth-of-type(1){
										background:#f7f7f7;
										line-height:42px;
									}
									&:nth-of-type(2){
										line-height:54px;
										margin-top:-1px;
									}
									>span{
										flex:1;
										text-align:center;
									}
								}
		        }
		    }
		}
		
		.adressDetail_transcationWrap{
		   
		    .adressDetail_transcationListWrap{
		        padding:15px 34px 16px;
						background:#fff;
						.adressDetail_transcationList{
							border:1px solid #ddd;
							margin-top:-1px;
							>div{
								display:flex;
								font-size:14px;
								&:nth-of-type(1){
									padding:0 20px;
									line-height:42px;
									border-bottom:1px solid #ddd;
									.left{
										display:flex;
										>span:nth-of-type(1){
											width:60px;
											color:#64676d;
										}
										>span:nth-of-type(2){
											flex:1;
											overflow:hidden;
											text-overflow: ellipsis;
											white-space: nowrap;
											>div{
												overflow:hidden;
												text-overflow: ellipsis;
												white-space: nowrap;
											}
										}
									}
									.right{
										justify-content: space-between;
										color:#64676d;
									}
								}
								
								&.list2{
									padding:19px 14px;
									align-items: center;
									.left{
										display:flex;
										align-items: center;
										background:url(../assets/blockchainBrowser/arrow.png) no-repeat right center;
										>span:nth-of-type(1){
											width:66px;
											height:66px;
											border-radius:5px;
											font-size:18px;
											color:#fff;
											line-height:66px;
											text-align:center;
											&.in{
												background:#29bf37;
											}
											&.out{
												background:#e60012;
											}
										}
										
										>div{
											display:flex;
											align-items: center;
											>span:nth-of-type(1){
												width:88px;
												text-align:right;
												margin-right:50px;
												color:#64676d;
											}
											>span:nth-of-type(2){
												line-height:20px;
												overflow:hidden;
												padding-right:40px;
												width:340px;
												>div{
													text-overflow: ellipsis;
													white-space: nowrap;
													overflow:hidden;
												}
											}
										}
									}
									
									.right{
										display:flex;
										align-items: center;
										>span:nth-of-type(1){
											width:68px;
											color:#64676d;
										}
										>span:nth-of-type(2){
											flex:1;
											line-height:20px;
											overflow:hidden;
											text-overflow: ellipsis;
											white-space: nowrap;
											>div{
												overflow:hidden;
												text-overflow: ellipsis;
												white-space: nowrap;
											}
										}
									}
								}
								.right{
									display:flex;
									padding-left:90px;
								}
								
								>div{
									width:50%;
								}
							}
						}
		    }
		   
		}
    

</style>



