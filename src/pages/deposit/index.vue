<template>
	<div class="detailOuterWrap depositWrap">
		<div class="detail_commonTitle">存证详情</div>
		
		<div class="title_two" v-if="detail.uuid">
			<span>存证信息</span>
			<div>
				<span 
					@click="loadData(detail.evidence_data)"
					class="blue">下载存证数据</span>
				<span 
					class="blue" 
					@click="download(detail.uuid, detail.file_name)">下载存证文件</span>
			</div>
		</div>
		
		<div class="detailWrap">
			<div class="listWrap">
				<div>
					<span>存证名称</span>
					<span>{{detail.evidence_name ||'--'}}</span>
				</div>
				<div>
					<span>存证数据大小</span>
					<span>{{detail.file_size ||'--'}}</span>
				</div>
			</div>
			<div class="listWrap">
				<div>
					<span>存证人</span>
					<span>{{detail.evidence_user ||'--'}}</span>
				</div>
				<div>
					<span>存证文件名</span>
					<span>{{detail.file_name ||'--'}}</span>
				</div>
			</div>
			<div class="listWrap">
				<div>
					<span>存证hash</span>
					<span>{{detail.tx_id | interceptStr1}}</span>
				</div>
				<div>
					<span>存证文件大小</span>
					<span>{{detail.file_size}}</span>
				</div>
			</div>
			<div class="listWrap">
				<div>
					<span>所在区块高度</span>
					<span>{{detail.height}}</span>
				</div>
				<div>
					<span>存证文件hash</span>
					<span>{{detail.file_hash | interceptStr1}}</span>
				</div>
			</div>
			<div class="listWrap">
				<div>
					<span>关联存证名称</span>
					<span>{{detail.ass_evidence_name}}</span>
				</div>
				<div>
					<span>备注信息</span>
					<span>{{detail.evidence_data}}</span>
				</div>
			</div>
			<div class="listWrap">
				<div>
					<span>关联存证hash</span>
					<span>{{detail.ass_evidence_tx_id | interceptStr1}}</span>
				</div>
				<div>
					<span></span>
					<span></span>
				</div>
			</div>
		</div>
		
		<div class="syWrap" v-if="detail.uuid">
			<div class="title_two">
				<span>存证溯源</span>
			</div>
			
			<div class="syDetailWrap">
				<div class="left">
					<div class="icon"><span>历史存证</span></div>
					<div class="listsWrap">
						<span 
							v-for="(item,index) in detail.pre_ass_evidence_names"
							:key="index">{{item}}</span>
					</div>
				</div>
				
				<div class="center">
					<div class="icon"><span>当前存证</span></div>
					<div class="listsWrap">
						{{detail.nxt_ass_evidence_tree.value}}
					</div>
				</div>
				
				<div class="right">
					<div class="icon"><span>后续存证</span></div>
					<div class="listsWrap">
						<!-- <span class="parent">
							<div class="children">
								111
								<span class="parent">
									<div class="children">11111</div>
									<div class="children">2222</div>
								</span>
							</div>
							<div class="children">222</div>
						</span> -->
						<span 
							v-for="(item, index) in detail.nxt_ass_evidence_tree.children" 
							:key="index"
							class="parent">
							<div 
								class="children">
								{{item.value}}
							</div>
						</span>
					</div>
				</div>
				
			</div>
		</div>
		
		
	</div>
</template>

<script>
	import axios from 'axios'
	
	export default{
		created(){
			this.getData()
		},
		data(){
			return {
				detail:{}
			}
		},
		methods:{
			loadData(data){
				var blob = new Blob([data])
				var a = document.createElement('a');
				a.download = 'data.hex';
				a.href=window.URL.createObjectURL(blob)
				a.click()
			},
			getData(){
				let url = `/sy/v1/evidence/evidence_detail`
				var formdara = new FormData();
				formdara.append('evidence_name','zcj9')
				axios.post(url, formdara)
					.then(({data})=>{
						console.log(data,111)
						if(data.status == 'success'){
							this.detail = data.data
						}
						
					})
			},
			download(uuid, file_name){
				console.log(uuid,file_name,888)
				let url = `/sy/v1/evidence/downlod_evidence`;
				var formdata = new FormData();
				formdata.append('uuid',uuid);
				formdata.append('file_name',file_name)
				
				axios.post(url,formdata)
					.then(({data})=>{
						console.log(data,4444)
						var blob = new Blob([data])
						var a = document.createElement('a');
						a.download = file_name;
						a.href=window.URL.createObjectURL(blob)
						a.click()
					})
					
				
			},
			
		},
		
	}
</script>

<style lang="scss" scoped>
	.depositWrap{
		.title_two{
			display:flex;
			font-size:18px;
			padding-bottom:20px;
			align-items: center;
			justify-content: space-between;
			>div{
				font-size:14px;
				>span{
					margin-left:20px;
				}
			}
		}
		.detailWrap{
			.listWrap{
				display:flex;
				>div{
					flex:1;
					display:flex;
					align-items:center;
					line-height:30px;
					>span:nth-of-type(1){
						width:110px;
					}
					>span:nth-of-type(2){
						flex:1;
					}
				}
			}
		}
		
		.syWrap{
			padding-top:30px;
			.syDetailWrap{
				padding:20px 30px;
				border:1px solid #bbb;
			}
		}
		
		.syDetailWrap{
			display:flex;
			>div{
				border:1px dashed #aaa;
				height:200px;
				position:relative;
				padding-top:30px;
				
				
				>.icon{
					position:absolute;
					left:50%;
					transform: translate(-50%,0);
					top:-5px;
					font-weight:bold;
					>span{
						padding-left:18px;
						background:#f4f4f4 url(../../assets/deposit/icon1.png) no-repeat left center;
						background-size:12px;;
					}
				}
				.listsWrap{
					color:$blue;
					font-size:14px;
					line-height:30px;
				}
			}
			.left,.right{
				flex:1;
				
			}
			.left{
				justify-content: flex-end;
				padding-right:20px;
				.listsWrap{
					display:flex;
					justify-content: flex-end;
					>span{
						position:relative;
						padding-left:35px;
						
						&:before{
							content:'';
							position:absolute;
							left:2px;
							top:50%;
							transform: translate(0,-50%);
							width:30px;
							border-bottom:1px solid #999;
						}
					}
				}
			}
			.right{
				padding-left:20px;
				.listsWrap{
					display:flex;
					margin-left:-40px;
					
					span.parent{
						div.children{
							position:relative;
							padding-left:35px;
							padding-right:2px;
							&:nth-of-type(1){
								&:after{
									border-left:0 none;
								}
								&:before{
									width:30px;
									left:0;
									border-bottom:1px solid #999;
								}
							}
							
							&:before,
							&:after{
								content:'';
								position:absolute;
								left:15px;
							}
							&:before{
								width:20px;
								top:15px;
								border-bottom:1px solid #999;
							}
							&:after{
								height:30px;
								border-left:1px solid #999;
								top:-15px;
							}
						}
					}
				}
			}
			.center{
				width:100px;
				margin:0 10px;
				justify-content: center;
				>.icon{
					width:100%;
					text-align:center;
				}
				
				.listsWrap{
					display:flex;
					justify-content: center;
					text-align:center;
					position:relative;
					&:before{
						content:'';
						position:absolute;
						width:30px;
						border-bottom:1px solid #999;
						top:50%;
						transform: translate(0,-50%);
					}
						
						
					&:before{
						left:-24px;
					}
// 					&:after{
// 						right:-24px;
// 					}
				}
			}
		}
		
	}
</style>
