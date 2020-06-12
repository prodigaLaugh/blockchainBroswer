<template>
	<div class="assetMonitoringWrap">
		<div class="topTitle">资产监控</div>
		
		<div class="top">
			<div class="commonItemWrap">
				<div class="commonTitle_one">
					<span>概况</span>
				</div>
				
				<div class="overviewWrap">
					<div>
						<span>链上资产总数</span>
					    <span>{{assetInfo.assettotal}}</span>
					</div>
					<div>
						<span>资产持有者总数</span>
					    <span>{{assetInfo.holdertotal}}</span>
					</div>
					<div>
						<span>交易总数</span>
					    <span>{{assetInfo.txtotal}}</span>
					</div>
				</div>
				
			</div>
			
			<div class="echartsWrap">
				<div class="commonTitle_one">
					<span>交易量</span>
					<div>
						<span :class="dimension==='hour' ? 'active' : '' "  @click="selectTime('hour')">1小时</span>
						<span :class="dimension==='day' ? 'active' : '' " @click="selectTime('day')">1天</span>
					</div>
				</div>
				<div id="myChart"></div>
			</div>
			
		</div>
		
		
			
		
		<div class="commonItemWrap netOverview">
			<div class="commonTitle_one">
				<span>最新交易列表(Latest 10)</span>
			</div>
			
			<div class="listsWrap">
				<el-table
					:data="assetInfo.TxList"
					border
					style="width: 100%">
					<el-table-column
						label="TXID"
						width="700">
						<template slot-scope="scope">
							<div 
								class="cell blue"  
								@click="goLinkto('/blockchainBrowser_transactionDetail',scope.row.tx_id)"
								:title="scope.row.tx_id">{{scope.row.tx_id}}</div>
						</template>
					</el-table-column>
					<el-table-column
						label="所在区块高度">
							<template slot-scope="scope">
								<div class="cell blue" @click="goLinkto('/blockchainBrowser_blockchainDetail',scope.row.block_height)">{{scope.row.block_height}}</div>
							</template>
					</el-table-column>
					<el-table-column
						prop="tx_time"
						label="交易时间">
					</el-table-column>
				</el-table>
				
			</div>
			
		</div>
		
		
		
		
		
		
		<div class="commonItemWrap netOverview">
			<div class="commonTitle_one">
				<span>最活跃数字资产（Top 10）</span>
			</div>
			
			<div class="listsWrap">
				<el-table
					:data="assetInfo.AssetTopList"
					border
					style="width: 100%">
					<el-table-column
						label="资产ID"
						width="500">
						<template slot-scope="scope">
							<div 
								class="cell blue" 
								style="width:400px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;"
								@click="goLinkto('/blockchainBrowser_assetsDetail',scope.row.assetid)"
								:title="scope.row.assetid">{{scope.row.assetid}}</div>
						</template>
					</el-table-column>
					<el-table-column
						prop="assetname"
						label="资产名称"
						width="140">
					</el-table-column>
					<el-table-column
						prop="issueamount"
						label="发行总量"
						width="240">
					</el-table-column>
					<el-table-column
						prop="holdernums"
						label="持有人数"
						width="100">
					</el-table-column>
					<el-table-column
						prop="txnumsmonth"
						label="近一个月交易次数">
					</el-table-column>
				</el-table>
				
			</div>
			
		</div>
		
		
		
		
		
		
		
		<div class="commonItemWrap netOverview">
			<div class="commonTitle_one">
				<span>集中度（Top 10）</span>
			</div>
			
			<div class="listsWrap">
				<el-table
					:data="assetInfo.AssetConcentrationRatio"
					border
					style="width: 100%">
					<el-table-column
						label="资产ID"
						width="540">
						<template slot-scope="scope">
							<div 
								class="cell blue" 
								style="width:400px;overflow:hidden"
								@click="goLinkto('/blockchainBrowser_assetsDetail',scope.row.assetid)"
								:title="scope.row.assetid">{{scope.row.assetid}}</div>
						</template>
					</el-table-column>
					<el-table-column
						prop="holdertotal"
						label="总持有人数">
					</el-table-column>
					<el-table-column
						prop="totalamount"
						label="总额">
					</el-table-column>
					<el-table-column
						prop="holderpercent"
						label="前3持有人占比">
					</el-table-column>
				</el-table>
				
			</div>
			
		</div>
		
		
		
		
		
		
				
				
				
				
		
		
	</div>
</template>

<script>
	import echarts from 'echarts'
	import Vue from 'vue';
	import { Table, TableColumn } from 'element-ui';
	Vue.use(Table);
	Vue.use(TableColumn);
	
	export default{
		data(){
			return { 
				searchText:'',
				blockchain_select:'',
				chain_name:'',
				dimension:'hour',
				netoverviewInfo:{},
				assetInfo:{},
			}
		},
		created(){
			this.getBlockchains(()=>{
				this.getNetoverview();
				this.getAssetsInfo()
				this.getCharData();
			})
			
		},
		methods:{
			goLinkto(path, val){
			    this.$router.push({path: path, query:{chainid: this.chain_name,searchText:val}})
			},
			selectTime(val){
			    this.dimension = val;
			    this.getCharData();
			},
			getCharData(){
			    let url = `/chain_monitor/queryChainTotalTxs/${this.chain_name}/${this.dimension}`;
			    
			    this.$http.get(url)
			        .then(({data})=>{
			            let xData = data.data.time;
			            let lists = data.data.total;
			
			            let myChart = echarts.init(document.getElementById('myChart'))
			            var symbolSize = 20;
			            let rotateDeg = this.dimension === 'day' ? 45 : 0;
			            // 绘制图表
			            myChart.setOption({
			                
			                xAxis: {
			                    type: 'category',
			                    data: xData,
			                    axisLine:{
			                        lineStyle:{
			                            color:'#ddd'
			                        }
			                    },
			                    axisTick:{
			                        show:false,
			                    },
			                    axisLabel: {
			                        formatter: function(val){
			                                return val;
			                        },
			                        color:'#546a79',
			                        show:true,
			                        rotate:rotateDeg
			                    },
			                },
			                yAxis: {
			                    type: 'value',
			                    axisLine:{
			                        show:false,
			                    },
			                    axisTick:{
			                        show:false
			                    },
			                   
			                    splitLine: {
			                        lineStyle:{
			                            color:'#ddd'
			                        }
			                    }
			                },
			                series: [{
			                    data: lists,
			                    type: 'bar',
			                    itemStyle:{
			                        color:'#2487da'
			                    }
			                }]
			            });
			
			        })
			        .catch(()=>{
			
			        })
							
			    
							
			},
			
			getBlockchains(fn){
			    this.getBlockchainLists((data)=>{
			        this.blockchainLists = data.data;
			        this.chain_name = this.blockchainLists[0].Chainid;
					fn && fn()
			    },()=>{
			
			    })
			},
			getNetoverview(){
			    let url = `/chain_monitor/queryNetInfo/${this.chain_name}`
			    this.$http.get(url)
			        .then(({data})=>{
			            if(data.code === '0'){
			                this.netoverviewInfo = data.data;
			            }
			            
			        })
			        .catch(({data})=>{
			
			        })
			},
			getAssetsInfo(){
			    let url = `/chain_monitor/queryAssetInfo/${this.chain_name}`;
			    this.$http.get(url)
			        .then(({data})=>{
			            this.assetInfo = data.data;
			        })
			        .catch(()=>{
			
			        })
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	.assetMonitoringWrap{
		@include defaultWidth;
		.whiteBg{
			background:#fff;
			margin-bottom:25px;
		}
		.commonItemWrap{
			margin-left:0;
		}
		.top{
			display:flex;
			.echartsWrap{
				flex:1;
			}
			margin-bottom:25px;
		}
		.overviewWrap{
			display:flex;
			justify-content: space-between;
			padding-bottom:60px;
			padding-top:8px;
			>div{
				padding-top:78px;
				background:url(../assets/assetMoniriting/icon1.png) no-repeat center top;
				background-size:50px;
				&:nth-of-type(2){
					background-image:url(../assets/assetMoniriting/icon2.png);
				}
				&:nth-of-type(3){
					background-image:url(../assets/assetMoniriting/icon3.png);
				}
				>span{
					display:block;
					text-align:center;
					&:nth-of-type(1){
						font-size:12px;
						line-height:12px;
					}
					&:nth-of-type(2){
						padding-top:20px;
						font-size:24px;
						line-height:24px;
					}
				}
			}
		}
		
		
		.echartsWrap{
			margin-top:0;
			margin-left:25px;
			#myChart{
				height:220px;
				margin-top:-30px;
			}
		}
		
		
		.netOverview{
			margin-bottom:25px;
			padding-bottom:42px;
		}
		
		
	}
</style>
