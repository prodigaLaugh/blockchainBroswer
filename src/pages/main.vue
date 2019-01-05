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
<style lang="scss" >
	.commonContainerWrap{
		display:flex;
		justify-content: space-between;
	}
	//区块链管理 服务器管理 节点管理 公共样式
	.blockchainManagement{
    .blockManagement_TopTile{
        display:flex;
        justify-content: space-between;
        padding:30px 0 20px;
        align-items: center;
        >span:nth-of-type(1){
            font-size:20px;
        }
        >span:nth-of-type(2){
            padding:6px 20px;
            color:#fff;
            background:rgba(22, 155, 213, 1);
            border-radius:5px;
            @include pointer;
        }

    }
    .cell{
        text-align:center;
    }
    .blockchainOperBtn{
        color:#169BD5;
        margin-right:10px;
        @include pointer;
        &:last-of-type{
            color:#FF0000;
            margin-right:0;
        }
    }

    .deployContainerWrap{
        .deployContainerListWrap{
            display:flex;
            align-items:center;
            margin-top:30px;
            &.deployContainerListWrap1{
                flex-direction: column;
                align-items: flex-start;
                margin-top:0;
                
                input{
                    width:100%;
                }
            }
            >div{
                flex:1;
                &:nth-of-type(1){
                    margin-right:40px;
                }
            }
            span{
                display:block;
                padding-bottom:10px;
            }
            input,select{
                border:1px solid #ddd;
                width:100%;
                height:30px;
                padding-left:8px;
            }
            
        }
        .deployContainerAddlistBtn{
            color:#169BD5;
            padding-top:10px;
            @include pointer;
        }
    }
    .deployBtnWrap{
        display:flex;
        justify-content: center;
        align-items:center;
        >div{
            width:200px;
            height:40px;
            background:#169BD5;
            border-radius:5px;
            text-align:center;
            line-height:40px;
            color:#fff;
            font-size:14px;
            @include pointer;
        }
    }

    .delblockchainContainer{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        >input{
            border:1px solid #ddd;
            width:300px;
            height:30px;
            margin-top:30px;
            padding-left:10px;
        }
    }

    .delblockchainBtnWrap{
        display:flex;
        justify-content: center;
        >.delblockchainBtn{
            width:100px;
            line-height:30px;
            border-radius:5px;
            font-size:14px;
            text-align:center;
            @include pointer;
            &:nth-of-type(1){
                color:#fff;
                background:rgba(255, 0, 0, 1);
                margin-right:40px;
            }
            &:nth-of-type(2){
                color:#333;
                border:1px solid #666;
                margin-right:40px;
            }
        }
    }

    .blockchainStatusWrap{
        position:fixed;
        left:0;
        right:0;
        top:0;
        bottom:0;
        z-index:10;
        background:rgba(0,0,0,.3);
        display:flex;
        justify-content: center;
        align-items: center;
        .blockChainStatusContainer{
            width:300px;
            height:200px;
            background:#fff;
            border:1px solid #ddd;
            display:flex;
            flex-direction:column;
            justify-content: center;
            align-items: center;
            >div:nth-of-type(1){
                font-size:20px;
                padding-bottom:30px;
            }
            >div:nth-of-type(2){
                font-size:58px;
            }
        }
    }

}
</style>

