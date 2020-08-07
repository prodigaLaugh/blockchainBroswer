<template>
	<div class="chainBroswerWrap">
		<div class="topTitle">区块链浏览器</div>
		
		<div class="commonItemWrap">
			
			<div class="commonTitle_one">
				<span>最近区块（Latest 10）</span>
			</div>
			
			<div class="listsWrap" >
				<el-table
					:data="blocks"
					border
					style="width: 100%">
					<el-table-column
					label="区块高度">
						<template slot-scope="scope">
							<div class="cell blue"
							@click="goNewLinkto('/blockchainBrowser_blockchainDetail',{chainid:blockchain_select,searchText:scope.row.block_height})">{{scope.row.block_height}}</div>
						</template>
					</el-table-column>
					<el-table-column
					prop="create_time"
					label="生成时间">
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
			</div>
			
			
			<div class="listsWrap" >
				<el-table
					:data="assetTopLists"
					border
					style="width: 100%">
					<el-table-column
						label="资产ID"
						width="400">
						<template slot-scope="scope">
							<span 
								class="blue"
								style="display:block;overflow:hidden;width:300px;"
								@click="goNewLinkto('/blockchainBrowser_assetsDetail',{chainid:blockchain_select,searchText:scope.row.assetid})">{{scope.row.assetid}}</span>
						</template>
						
					</el-table-column>
					<el-table-column
						prop="assetname"
						label="资产名称">
						<template slot-scope="scope">
							<div class="cell">{{scope.row.assetname || '-'}}</div>
						</template>
					</el-table-column>
					<el-table-column
						prop="issueamount"
						label="发行总量">
					</el-table-column>
					<el-table-column
						prop="holdernums"
						label="持有人数(KB)">
					</el-table-column>
					<el-table-column
						prop="txnumsmonth"
						label="近一个月交易次数">
					</el-table-column>
				</el-table>
			
			</div>
		</div>
		
		
	</div>
</template>

<script>


import Vue from 'vue';
import { Table, TableColumn } from 'element-ui';
Vue.use(Table);
Vue.use(TableColumn);

export default {
    
    data(){
        return {
        
            blockchain_select:'',
			
			newPageLink:'',
			chain_name: '',

          
			blocks:[],
			assetTopLists:[],
			
			timer:null
        }
    },
	created(){
	    this.getLists()
	    this.timer = setInterval(()=>{
	    	this.getLists()
	    }, 5000)
		
	},
    methods:{
		getLists(){
			this.getBlockchains(()=>{
				this.getNetoverview()//获取最近区块
				this.getTopAssetInfoList()
			});
		},
		goNewLinkto(path, query){ //打开新的页面
			let routeUrl = this.$router.resolve({
			  path: path,
			  query: query
			});
			window.open(routeUrl.href, '_blank');
		},
        getBlockchains(fn){ //获取链列表
			this.getBlockchainLists((data)=>{
			    const lists = data.data;
			    this.chain_name = lists[0].Chainid;
				this.blockchain_select = this.chain_name
				fn && fn()
			},()=>{
						
			})
        },
       
		getNetoverview(){//获取最近区块
		    let url = `/chain_monitor/queryNetInfo/${this.chain_name}`
		    this.$http.get(url)
		        .then(({data})=>{
		            if(data.code === '0'){
		                this.blocks = data.data.block_list;
		            }
		            
		        })
		        .catch(({data})=>{
		
		        })
		},
		getTopAssetInfoList(){ //获取最活跃数字资产
			let url = `/chain_monitor/getTopAssetInfoList/${this.chain_name}`
			this.$http.get(url)
			    .then(({data})=>{
					if(data.code === '0'){
						this.assetTopLists = data.data.AssetTopList
					}
			        
			    })
			    .catch(({data})=>{
					console.log(data)
			    })
		},
    },
	beforeDestroy(){
		clearInterval(this.timer)
	}
	
}
</script>

<style lang="scss" scoped>
	.chainBroswerWrap{
		@include defaultWidth;
		.commonItemWrap{
			margin-left:0;
			padding:30px 28px;
			margin-bottom:25px;
		}
	}
</style>
