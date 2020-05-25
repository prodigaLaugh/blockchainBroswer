<template>
	<div class="networkOverviewWrap">
		<div class="topTitle">网络概览</div>
		
			
		<div class="commonItemWrap netOverview">
			<div class="commonTitle_one">
				<span>概况</span>
			</div>
			
			<div class="netOverviewLists">
			    <div>
			        <div>区块总数</div>
			        <div>{{netoverviewInfo.blocktotal}}</div>
			    </div>
			    <!-- <div>
			        <div>共识节点数:</div>
			        <div>{{netoverviewInfo.consensusnums}}</div>
			    </div> -->
			   <!-- <div>
			        <div>数据节点数:</div>
			        <div>{{netoverviewInfo.datanums}}</div>
			    </div> -->
			    <div>
			        <div>过去一小时TPS</div>
			        <div>{{netoverviewInfo.tps}}</div>
			    </div>
			    <div>
			        <div>交易总量</div>
			        <div>{{netoverviewInfo.txtotal}}</div>
			    </div>
			</div>
			
		</div>
		
		<div class="bottom">
			<div class="commonItemWrap">
				<div class="commonTitle_one">
					<span>最近区块(Latest 10)</span>
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
			
		</div>
	</div>
</template>

<script>
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
			})
			
		},
		methods:{
			goLinkto(path, val){
			    this.$router.push({path: path, query:{chainid: this.chain_name,searchText:val}})
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
		}
	}
	
</script>

<style lang="scss" scoped>
	.networkOverviewWrap{
		@include defaultWidth;
		.whiteBg{
			background:#fff;
			margin-bottom:25px;
		}
		.commonItemWrap{
			margin-left:0;
		}
		
		.netOverview{
			margin-bottom:25px;
			padding-bottom:42px;
		}
		
		.netOverviewLists{
			display:flex;
			justify-content: space-between;
			align-items: center;
			>div{
				width:350px;
				border-radius:10px;
				height:154px;
				background:url(../assets/netOverview/bg1.png) no-repeat center;
				background-size:cover;
				display:flex;
				justify-content: center;
				flex-direction: column;
				padding-left:36px;
				color:#fff;
				
				&:nth-of-type(2){
					background-image:url(../assets/netOverview/bg2.png);
				}
				&:nth-of-type(3){
					background-image:url(../assets/netOverview/bg3.png);
				}
				
					
				>div:nth-of-type(1){
					font-size:12px;
					line-height:12px;
					padding-bottom:12px;
				}
				>div:nth-of-type(2){
					font-size:22px;
					line-height:22px;
				}
			}
		}
		.bottom{
			padding-bottom:60px;
			background:#fff;
		}
	}
</style>
