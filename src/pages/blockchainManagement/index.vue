<template>
    <div class="outer_wrap">
   
        <div class="blockManagement_TopTile">
            <span>区块链浏览器</span>
            <span>+部署区块链</span>
        </div>
        <div class="blockMangement_listsWrap">
            <el-row :gutter="10">
                <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                    <div class="grid-content bg-purple">111</div>
                </el-col>
                <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
                    <div class="grid-content bg-purple-light">222</div>
                </el-col>
                <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
                    <div class="grid-content bg-purple">333</div>
                </el-col>
                <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                    <div class="grid-content bg-purple-light">444</div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>


import Vue from 'vue'
import { Row, Col } from 'element-ui';
Vue.use(Row);
Vue.use(Col);

export default {
    created(){

    },
    components: {  
      
	},
    data(){
        return {
            
        }
    },
    methods:{
        
    }
}
</script>
<style lang="scss" scoped>

</style>




