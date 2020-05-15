<template>
	<div class="chainBroswerWrap">
		<div class="topTitle">区块链浏览器</div>
		
		<div class="commonItemWrap">
			
			<div class="commonTitle_one">
				<span>最近区块（Latest 10）</span>
			</div>
			
			<div class="listsWrap" >
				<el-table
					:data="indexInfo.block_list"
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
					:data="indexInfo.asset_toplist"
					border
					style="width: 100%">
					<el-table-column
						label="资产ID">
						<template slot-scope="scope">
							<span 
								class="blue"
								@click="goNewLinkto('/blockchainBrowser_assetsDetail',{chainid:blockchain_select,searchText:scope.row.assetid})">{{scope.row.assetid}}</span>
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
    created(){
        this.getBlockchains();
		
    },
    components: {  
        
	},
    data(){
        return {
        
            blockchain_select:'',
            lists:[],
			
			newPageLink:'',

            indexInfo:{}
        }
    },
    methods:{
		goNewLinkto(path, query){
			let routeUrl = this.$router.resolve({
			  path: path,
			  query: query
			});
			window.open(routeUrl.href, '_blank');
		},
        search(){
            if(!this.searchText){
                this.$message({
                    message: '搜索内容不能为空！',
					type: 'warning'
                })
                return false;
            }
            let params = {
                chain_name:this.blockchain_select,
                search:this.searchText.trim()
            }
			var newTab=window.open('about:blank');
			
            this.getSearchType(params,(data)=>{
                let params = {
                    chainid:this.blockchain_select,
                    searchText:this.searchText
                }
				
				var json = {
					0:'/blockchainBrowser_adressDetail',
					1:'/blockchainBrowser_assetsDetail',
					2:'/blockchainBrowser_blockchainDetail',
					3:'/blockchainBrowser_transactionDetail',
					4:'/blockchainBrowser_UTXODetail'
				}
				let path = json[data.data];
				this.newPageLink = path + '?chainid=' + this.blockchain_select + '&searchText='+ this.searchText;
				
				newTab.location.href = this.newPageLink;
				
				
            },(data)=>{
				newTab.location.href = '/blockchainBrowser_noresult'
                this.$message({
                    message: data && data.msg || '服务器错误',
					type: 'warning'
                })
            })
        },
        getBlockchains(){
            this.getBlockchainLists((data)=>{
                this.lists = data.data;
                this.blockchain_select = this.lists[0].Chainid;
                this.getIndexInfo(this.blockchain_select)
            },()=>{

            })
        },
        getIndexInfo(){
            let url = `/chain_browser/initChainBrowser/${this.blockchain_select}`;
            this.$http.get(url)
                .then(({data})=>{
                    console.log(data)
                    this.indexInfo = data.data
                })
                .catch(()=>{

                })
        }
    },
	
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
