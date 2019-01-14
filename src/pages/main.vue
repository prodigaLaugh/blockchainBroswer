<template>
	<div class="content_outer_wrap">
		<my-header/>
		<div :class="['commonContainerWrap',{active:leftNavFolder}]">
            <span 
                @click="leftNavFolder=!leftNavFolder"
                :class="['commLeftArrow',{active:leftNavFolder}]"> </span>
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
    data(){
        return {
            leftNavFolder:false,
        }
    },
    methods:{

    }
}

</script>
<style lang="scss" >
    .content_outer_wrap{
        height:100%;
        .commLeftArrow{
            width:30px;
            height:100px;
            background:#779de5 url(../assets/commonLeftArrow.png) no-repeat center;
            position:fixed;
            left:140px;
            top:70px;
            z-index:10;
            border-radius:0 10px 10px 0;
            @include pointer;
            transition:all .5s;
            &.active{
                background-image:url(../assets/commonLeftArrow1.png);
                left:0;
            }
        }
    }
    .commonContainerWrap{
        padding-left:180px;
        transition:padding-left .5s;
        &.active{
            padding-left:40px;
        }
    }
    .outer_wrap{
        margin-right:32px;
    }
    //区块链管理 服务器管理 节点管理 公共样式

    .containerTopTitle{
        padding:30px 0 20px 32px;
        font-size:20px;
    }
    

.blockchainManagement{
    .blockManagement_TopTile{
        display:flex;
        justify-content: flex-end;
        padding:26px 38px 24px 0;
        align-items: center;
        background:#fff;
        >span{
            width:140px;
            height:46px;
            line-height:46px;
            color:#fff;
            background:$blue;
            border-radius:5px;
            font-size:16px;
            text-align:center;
            @include pointer;
        }

    }
   
    .blockchainOperBtn{
        color:$blue;
        font-size:16px;
        @include pointer;
        &:last-of-type{
            color:$red;
            margin-right:0;
        }
    }

    .deployContainerWrap{
        .deployContainerListWrap{
            display:flex;
            align-items:center;
            margin-top:40px;
            &.deployContainerListWrap1{
                flex-direction: column;
                align-items: flex-start;
                
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
                padding-bottom:11px;
                font-size:14px;
            }
            input,select{
                border:1px solid #ddd;
                width:100%;
                height:50px;
                padding-left:8px;
                border-radius:0;
                font-size:14px;
            }
            
        }
        .deployContainerAddlistBtn{
            color:$blue;
            padding-top:40px;
            @include pointer;
            font-size:16px;
        }
    }
    .deployBtnWrap{
        display:flex;
        justify-content: center;
        align-items:center;
        >div{
            width:200px;
            height:46px;
            background:$blue;
            border-radius:5px;
            text-align:center;
            line-height:46px;
            color:#fff;
            font-size:18px;
            @include pointer;
        }
    }

    .delblockchainContainer{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background:url(../assets/warn.png) no-repeat left top;
        margin-left:-35px;
        margin-right:-35px;
        padding-top:53px;
        margin-top:22px;
        >span{
            line-height:44px;
            font-size:14px;
            color:$color-333;

        }
        >input{
            border:1px solid #ddd;
            width:100%;
            height:50px;
            margin-top:35px;
            padding-left:10px;
        }
    }

    .delblockchainBtnWrap{
        display:flex;
        justify-content: flex-end;
        padding:10px 0 8px;
        margin-left:-35px;
        margin-right:-35px;
        >.delblockchainBtn{
            width:120px;
            line-height:46px;
            border-radius:5px;
            font-size:18px;
            text-align:center;
            margin-left:30px;
            @include pointer;
            &:nth-of-type(1){
                color:#fff;
                background:$red;
                
            }
            &:nth-of-type(2){
                color:$color-999;
                border:1px solid $color-999;
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

