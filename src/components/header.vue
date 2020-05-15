<template>
	<div class="commonHeaderWrap">
		<div class="commonHeader" style="z-index:11">
			<div class="header">
				<div class="left">
					<div class="log">
						<img src="../assets/logo.png" alt="">
						<span>TK EXPLORER</span>
					</div>
				</div>

				<div class="right">
					<router-link v-for="(item, index) in navLists" :key="index" :to="item.path">{{item.text}}</router-link>
				</div>

			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				navLists: [{
						path: '/main/home',
						text: '首页'
					},
					{
						path: '/networkOverview',
						text: '网络概览'
					},
					{
						path: '/assetMonitoring',
						text: '资产监控'
					},
					{
						path: '/chainBroswer',
						text: '区块链浏览器'
					},
				]
			}
		}
	}
</script>


	
