<template>
	<div class="homeWrap">
		
		<div class="topWrap">
			<div class="top">
				
				<div class="inpWrap">
					<div class="title">TK区块链浏览器</div>
					
					<div class="inp">
						<input 
							type="text" 
							placeholder="搜索地址、交易ID、区块高度、资产名、资产ID、UTXO"  
							@keyup.enter="search"
							 v-model="searchText"
						>
						<span @click="search"></span>
					</div>
				</div>
				
				<div class="infoWrap">
					<div class="listWrap">
						<img src="../assets/home/icon6.png" alt="">
						<div>
							<span>{{netoverviewInfo.blocktotal}}</span>
							<span>总运行时间</span>
						</div>
					</div>
					<div class="listWrap">
						<img src="../assets/home/icon1.png" alt="">
						<div>
							<span>{{netoverviewInfo.blocktotal}}</span>
							<span>区块总数</span>
						</div>
					</div>
					<div class="listWrap">
						<img src="../assets/home/icon2.png" alt="">
						<div>
							<span>{{netoverviewInfo.tps}}</span>
							<span>过去一小时TPS</span>
						</div>
					</div>
					<div class="listWrap">
						<img src="../assets/home/icon3.png" alt="">
						<div>
							<span>{{netoverviewInfo.txtotal}}</span>
							<span>交易总量</span>
						</div>
					</div>
					<div class="listWrap">
						<img src="../assets/home/icon4.png" alt="">
						<div>
							<span>{{assetInfo.assettotal}}</span>
							<span>链上资产总数</span>
						</div>
					</div>
					<div class="listWrap">
						<img src="../assets/home/icon5.png" alt="">
						<div>
							<span>{{assetInfo.holdertotal}}</span>
							<span>资产持有总数</span>
						</div>
					</div>
				</div>
				
			</div>
			
		</div>
		
		
		<div class="content">
			
		
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
			
			<div class="bottomWrap">
				
				<div class="commonItemWrap">
					<div class="commonTitle_one">
						<span style="margin-bottom:20px;">最近区块(Latest 10)</span>
					</div>
					
					<div class="listsWrap" v-if="netoverviewInfo.block_list">
						<el-table
						    :data="netoverviewInfo.block_list"
						    border
						    style="width: 100%">
						    <el-table-column
						    label="区块高度"
							width="90">
						        <template slot-scope="scope">
						            <div class="cell blue" style="width:80px;" @click="goLinkto('/blockchainBrowser_blockchainDetail',scope.row.block_height)">{{scope.row.block_height}}</div>
						        </template>
						    </el-table-column>
						    <el-table-column
						    prop="create_time"
						    label="生成时间"
							width="200">
						    </el-table-column>
						    <el-table-column
						    prop="tx_nums"
						    label="交易量">
						    </el-table-column>
						    <el-table-column
						    prop="block_size"
						    label="区块大小(KB)">
						    </el-table-column>
						</el-table>
						
					</div>
				</div>
				
				<div class="commonItemWrap">
					<div class="commonTitle_one">
						<span>最活跃数字资产（Top 10）</span>
						<div>
							<span class="active" @click="$router.push('/allAssets')">全部资产</span>
						</div>
					</div>
					
					<div class="listsWrap"  v-if="assetInfo.AssetTopList">
						<el-table
						        :data="assetInfo.AssetTopList"
						        border
						        style="width: 100%">
						        <el-table-column
						            label="资产ID"
									width="150">
						            <template slot-scope="scope">
						                <div 
											class="cell blue" 
											style="overflow:hidden;width:100px"
											@click="goLinkto('/blockchainBrowser_assetsDetail',scope.row.assetid)"
											:title="scope.row.assetid">{{scope.row.assetid}}</div>
						            </template>
						        </el-table-column>
						        <el-table-column
						            prop="assetname"
						            label="资产名称">
						        </el-table-column>
						        <el-table-column
						            prop="issueamount"
						            label="发行总量">
						        </el-table-column>
						        <el-table-column
						            prop="holdernums"
						            label="持有人数">
						        </el-table-column>
						        <el-table-column
						            prop="txnumsmonth"
						            label="近一个月交易次数">
						        </el-table-column>
						    </el-table>
						
					</div>
				</div>
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
				this.getCharData();
				this.getNetoverview();
				this.getAssetsInfo()
			})
			
		},
		methods:{
			search(){
			    if(!this.searchText){
			        this.$message({
			            message: '搜索内容不能为空！',
			            type: 'error'
			        })
			        return false;
			    }
			    let params = {
			        chain_name:this.chain_name,
			        search:this.searchText.trim()
			    }
			    this.getSearchType(params,(data)=>{
			        let params = {
			            chainid:this.chain_name,
			            searchText:this.searchText
			        }
			        this.goUrlByType(data.data, params)
			    },(data)=>{
			        this.$message({
			            message: data.msg,
			            type: 'error'
			        })
			    })
			},
			getBlockchains(fn){
			    this.getBlockchainLists((data)=>{
					console.log(data,9991)
			        this.blockchainLists = data.data;
			        this.chain_name = this.blockchainLists[0].Chainid;
					fn && fn()
			    },()=>{
			
			    })
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
			
			goLinkto(path, val){
			    this.$router.push({path: path, query:{chainid: this.chain_name,searchText:val}})
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
	.homeWrap{
		.echartsWrap{
			#myChart{
				height:300px;
			}
		}
		
		
		.bottomWrap{
			align-items: flex-start;
			.commonItemWrap{
				padding-bottom:60px;
			}
		}
		.topWrap{
			height:336px;
			background:url(../assets/home/bg.png) no-repeat center;
			background-size:cover;
			.top{
				@include defaultWidth;
				
				.inpWrap{
					width:566px;
					margin:0 auto;
					padding-top:74px;
					.title{
						font-size:26px;
						color:#fff;
						text-align:center;
					}
					.inp{
						display:flex;
						align-items: center;
						padding-top:28px;
						input{
							flex:1;
							line-height:40px;
							border:0 none;
							background:#fff;
							border-radius:5px 0 0 5px;
							padding:0 10px;
						}
						>span{
							height:40px;
							width:88px;
							background:#36cea0 url(../assets/home/search.png) no-repeat center;
							background-size:20px;
							@include pointer;
							border-radius:0 5px 5px 0;
						}
					}
				}
				
				.infoWrap{
					display:flex;
					justify-content: space-between;
					align-items: center;
					padding-top:88px;
					.listWrap{
						display:flex;
						align-items: center;
						>div{
							padding-left:12px;
							>span{
								display:block;
							}
							>span:nth-of-type(1){
								font-size:18px;
								color:#f2f2f2;
								padding-bottom:13px;
							}
							>span:nth-of-type(2){
								font-size:12px;
								color:#bcbcbc;
							}
						}
						img{
							height:52px;
						}
					}
				}
				
				
			}
		}
		
		.content{
			background: #f5f7fa;
			
			
			
			.bottomWrap{
				@include defaultWidth;
				margin-top:25px;
				margin-bottom:60px;;
				
				display:flex;
				
				
			}
			
		}
	}
</style>
