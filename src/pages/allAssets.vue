<template>
	<div class="allAssetsWrap">
		<div class="topTitle">全部资产</div>
		
		<div class="commonItemWrap">
			
			<div class="listsWrap" >
				<el-table
					:data="assetsLists"
					@sort-change="sortLists"
					border
					style="width: 100%">
					<el-table-column
						label="资产ID"
						width="180">
						<template slot-scope="scope">
							<div 
								class="cell blue"
								style="width:130px;overflow:hidden;"
								@click="goLinkto('/blockchainBrowser_assetsDetail',scope.row.asset_id)"
								:title="scope.row.asset_id"
							>{{scope.row.asset_id}}</div>
						</template>
					</el-table-column>
					<el-table-column
						prop="asset_name"
						label="资产名称"
						width="80">
					</el-table-column>
					<el-table-column
						prop="late_txtime"
						sortable="custom"
						label="最后交易"
						width="190">
						<template slot-scope="scope">
							<div >{{scope.row.late_txtime.replace(/(\s\+.*)/,'')}}</div>
						</template>
					</el-table-column>
					<el-table-column
						prop="issue_amount"
						sortable="custom"
						label="发行总量"
						width="200">
					</el-table-column>
					<el-table-column
					    prop="available_amount"
						sortable="custom"
					    label="现有总量"
						width="200">
					</el-table-column>
					<el-table-column
						prop="available_amount"
						sortable="custom"
						label="总市值"
						width="200">
					</el-table-column>
					<el-table-column
						prop="holders"
						sortable="custom"
						label="持有人数"
						width="100">
					</el-table-column>
					<el-table-column
						prop="txs_num"
						sortable="custom"
						label="近一个月交易数">
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
        this.getAssetLists()
		this.getBlockchains()
    },
    mounted(){
        this.scroll();
    },
   
    data(){
        return {
            orderParams:{
                condition:'',
                order_by:'',
                chain_name: 'm0',
                page: 1,
                page_size:10,
            },
			chain_name:'',
            isLoading:true,

            assetsLists:[],

            
        }
    },
    methods: {
		getBlockchains(fn){
		    this.getBlockchainLists((data)=>{
		        this.blockchainLists = data.data;
		        this.chain_name = this.blockchainLists[0].Chainid;
				fn && fn()
		    },()=>{
		
		    })
		},
		goLinkto(path, val){//点击跳转方法
			this.$router.push({path: path, query:{chainid: this.chain_name,searchText:val}})
		},
        sortLists(val){//排序方法
            if(val.prop){
				
                this.orderParams.condition = val.prop =='market_value'
												?'issue_amount'
												:val.prop;
                this.orderParams.order_by = val.order === 'ascending' ? "ASC" : "DESC";
                
            }else{
                this.orderParams.condition = '';
                this.orderParams.order_by = '';
            }
            this.assetsLists = [];
			this.orderParams.page = 1;
            this.getAssetLists();
        },
        
        getAssetLists(){ //获取全部资产
            let url = `/chain_browser/getChainAssetInfoList`
            if(!this.isLoading){
                return false;
            }
			
			this.isLoading = false;
            this.$http.post(url, this.orderParams)
                .then(({data})=>{
                    let lists = data.data.asset_list;
					let page = this.orderParams.page;
					
                    if(lists&&lists.length){
						if(page === 1 ){
							this.assetsLists.splice(0,this.orderParams.page_size,...lists)
						}else{
							this.assetsLists.push(...lists);
						}
                        this.orderParams.page = (page+1);
                        this.isLoading = true;
                    }else{
                        this.isLoading = false;
                    }
					
					this.$nextTick(()=>{
						var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
						// windowHeight 可视区的高度
						var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
						// scrollHeight 滚动条的总高度
						var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
						// 滚动条到底部的条件
						let distance = 50;
						if(windowHeight>=scrollHeight){
							this.getAssetLists()
						}
						
					})
					
					
					console.log(this.orderParams.page,222)
                    
                })
                .catch((data)=>{

                })
        },
        scroll(person) {//页面滚动方法
			var _this = this;
            window.onscroll = () => {

				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				// windowHeight 可视区的高度
				var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
				// scrollHeight 滚动条的总高度
				var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
				// 滚动条到底部的条件
				let distance = 50;
				
				
				if(scrollTop + windowHeight >= (scrollHeight-distance) && this.isLoading){
				  // 加载数据
				  _this.getAssetLists()
				}
				
                
            }
        }
    },
	
}
</script>

<style lang="scss" scoped>
	.allAssetsWrap{
		@include defaultWidth;
		.commonItemWrap{
			margin-left:0;
			padding:30px 28px;
		}
	}
</style>
