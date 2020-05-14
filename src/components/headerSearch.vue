<template>
  <div  class="commonHeaderWrap">
    <div class="commonHeader">
      <div 
				class="commonHeaderLeftWrap"
				@click="$router.push('/main/blockchainBrowser')"
				style="cursor:pointer;">
        区块链浏览器
      </div>
      <div class="commonHeaderCenterWrap">
      
				<!-- <el-select  
					v-model="blockchain_select"
					placeholder="请选择">
					
					<el-option
						v-for="item in lists"
						:key="item.Chainid"
						:label="item.Chainid"
						:value="item.Chainid">
					</el-option>
				</el-select> -->
			
        <input 
          placeholder="搜索地址/交易ID/区块高度/资产名/资产ID/UTXO"
          v-model="searchText"
          @keyup.enter="search"
          type="text">
          <span 
            @click="search"
            class="el-icon-search"></span>  
      </div>
      <div class="commonHeaderRightWrap">
      <!--  <span>admin</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {  Select, Option  } from 'element-ui';

Vue.use(Select);
Vue.use(Option);
	
export default {
  created(){
    this.getBlockchains();
  },
  data(){
    return {
      searchText:'',
      blockchain_select:'',
      lists:[],
    }
  },
  methods:{
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
        this.getSearchType(params,(data)=>{
            let params = {
                chainid:this.blockchain_select,
                searchText:this.searchText
            }
            this.goUrlByType(data.data, params)
        },(data)=>{
            this.$message({
                message: data.msg,
                type: 'warning'
            })
        })
    },
    getBlockchains(){
        this.getBlockchainLists((data)=>{
            this.lists = data.data;
            this.blockchain_select = this.lists[0].Chainid;
        },()=>{

        })
    }
  }
}
</script>

<style lang="scss" scoped>
.commonHeaderWrap{
    height:60px;
    .commonHeader{
		position:fixed;
		left:0;
		top:0;
		right:0;
		height:60px;
		padding:0 40px;
		display:flex;
		justify-content: space-between;
		align-items:center;
		background:$blue;
		z-index:10;
		.commonHeaderLeftWrap{
			padding-right:60px;
			line-height:36px;
			border-right:1px solid rgba(255,255,255,.4);
			color:#fff;
			font-size:20px;
		}
        .commonHeaderCenterWrap{
			flex:1;
			margin-left:30px;
			margin-right:50px;
			display:flex;
			align-items: center;
			>select{
			  width:200px;
			}
			>input{
				margin-left:7px;
				border:1px solid rgba(255,255,255,.4);
				padding-left:10px;
				height:36px;
				border-radius:5px;
				width:450px;
				padding-right:40px;
				color:#fff;
				background:transparent;
			}
			input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {   
				color: #fff;   
			}   
			input:-moz-placeholder, textarea:-moz-placeholder {   
				color: #fff;   
			}   
			input::-moz-placeholder, textarea::-moz-placeholder {   
				color: #fff;   
			}   
			input:-ms-input-placeholder, textarea:-ms-input-placeholder {   
				color: #fff;   
			}
					
			.el-icon-search{
				position:relative;
				padding:9px 10px;
				right:36px;
				color:#fff;
				font-size:16px;
				@include pointer;
			}
		}
			
		.commonHeaderRightWrap{
			span{
				padding-left:28px;
				background:url(../assets/defaultAvatar.png) no-repeat left center;
				color:#fff;
				line-height:32px;
			}
		}
			
    }
    
  }
</style>

