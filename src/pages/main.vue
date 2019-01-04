<template>
	<div>
		<my-header/>
		<div class="commonContainerWrap">
			<leftnav/>
			<router-view/>
		</div>
		
		<my-footer/>
	</div>
</template>	

<script>
import Vue from 'vue'
import http from '@/util/http.js'
Vue.use(http);

import myHeader from '@/components/header'
import myFooter from '@/components/footer'
import leftnav from '@/components/leftnav';

export default{
	components: {  
		myHeader,
		myFooter,
		leftnav
	},
}

</script>
<style lang="scss" scoped>
	.commonContainerWrap{
		display:flex;
		justify-content: space-between;
	}
</style>

