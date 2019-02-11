<template>
    <div class="noresultWrap">
        <my-header/>
        <div class="noresult_content">
            <div>无搜索结果</div>
            <div>请输入有效的地址/交易ID/区块高度/资产名/资产ID/UTXO</div>
            <div 
                @click="$router.push('/main/blockchainBrowser')"
                class="btn">返回</div>
        </div>
        
    </div>
</template>
<script>

import myHeader from '@/components/headerSearch'


export default {
    components: {  
		myHeader
	},
    data(){
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.noresultWrap{
    height:100%;
}
.noresult_content{
    height:100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    >div{
        font-size:14px;
        &:nth-of-type(2){
            padding-top:4px;
        }
        &.btn{
            width:100px;
            line-height:30px;
            background:#4778c7;
            color:#fff;
            text-align:center;
            margin-top:30px;
            @include pointer;
        }
    }
}
</style>

