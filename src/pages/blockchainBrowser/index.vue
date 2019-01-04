<template>
    <div class="outer_wrap">
     
        <div class="blockchainBrowser_Top_wrap">
            <div class="blockchainBrowser_Top_title">
                区块链浏览器
            </div>
            <div class="blockchainBrowser_top_selectWrap">
                <span class="blockchainBrowser_top_selectLeftBox">指定区块链</span>
                <select class="blockchainBrowser_top_select">
                    <option value="11">111111</option>
                </select>
            </div>
            <div class="blockchainBrowser_top_inpWrap">
                <input 
                    placeholder="搜索地址/交易ID/区块高度/资产名/资产ID/UTXO"
                    type="text">
                <span>搜索</span>
            </div>
        </div>

        <div class="blockchainBrowser_container_title">最近区块</div>
        <div class="blockchainBrowser_container_listsWrap">
            <el-row :gutter="10">
                <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                    <div class="grid-content bg-purple">区块高度</div>
                </el-col>
                <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
                    <div class="grid-content bg-purple-light">生成时间</div>
                </el-col>
                <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
                    <div class="grid-content bg-purple">交易量</div>
                </el-col>
                <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                    <div class="grid-content bg-purple-light">区块大小(KB)</div>
                </el-col>
            </el-row>

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
.outer_wrap{
    padding-left:20px;
}
.blockchainBrowser_Top_title{
    padding:30px 0 20px 0;
    font-size:20px;
}
.blockchainBrowser_top_selectWrap{
    display:flex;
    align-items:center;
    margin-bottom:20px;
    font-size:14px;
    .blockchainBrowser_top_selectLeftBox{
        padding-right:20px;
    }
    .blockchainBrowser_top_select{
        width:300px;
        height:20px;
    }
}

.blockchainBrowser_top_inpWrap{
    display:flex;
    align-items: center;
    font-size:14px;
    >input{
        border:1px solid #ddd;
        width:400px;
    }
    >span{
        margin-left:20px;
        padding:2px 10px;
        background:#fff;
        color:#333;
        border:1px solid #ddd;
        border-radius:2px;
        @include pointer;
    }
}
.blockchainBrowser_container_title{
    padding:20px 0 10px 0;
    font-size:18px;
}

.blockchainBrowser_container_listsWrap{
    margin-right:5px;
    .el-row{
        line-height:40px;
        text-align:center;
    }
    .el-col{
        border:1px solid #ddd;
        margin-top:-1px;
        margin-left:-1px;
    }
}


</style>




