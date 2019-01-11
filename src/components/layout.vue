<template>
	<div class="app-content" v-cloak>
		<router-view />
	</div>
</template>



<style lang="scss">
	@import url("./../css/reset.css");
	@import url("./../css/common.css");
	.blockchainNavWrap{
        display:flex;
        height:80px;
        align-items: center;
        align-content: center;
        padding-left:60px;
        >span{
            margin-right:38px;
            font-size:16px;
            padding:0 8px;
            @include pointer;
            transition:color .5s;
            color:#808080;
            &:after{
                position:absolute;
                content:'';
                left:50%;
                width:0;
                top:35px;
                border-bottom:3px solid $blue;
                transform: translate(-50%,0);
                transition:width .5s;
            }
            &.active{
                color:$blue;
                position:relative;
                &:after{
                    width:100%;
                }
                
            }
        }
   }


    // 表格样式修改
    .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
        border-color:#ddd;
    }
    

    .el-table th{
        padding:14px 0;
        background-color:#f7f7f7;
        color:$color-333;
        
    }
    .el-table__row{
        &:nth-of-type(2n+1){
            background:#fff;
        }
        &:nth-of-type(2n+2){
            background:#f4f5f9;
        }
    }
    .el-table td{
        padding:18px 0
    }
    .el-table th,
    .el-table td{
        padding-left:80px;
        font-size:14px;
        border-right:0;
        &:last-of-type{
            padding-left:0;
            border-right:1px solid #dddddd;
        }
    }
    
    

    /* 弹窗样式修改 */
    .el-dialog{
        border-radius:5px;
        .el-dialog__header{
            background:$blue;
            padding:17px 20px 15px;
            border-radius:5px 5px 0 0;
            .el-dialog__title{
                color:#fff;
            }
            .el-dialog__headerbtn{
                font-size:24px;
                top:14px;
                right:20px;
                .el-dialog__close{
                    color:#aaa;
                }
            }
        }
        .el-dialog__body{
            padding:20px 65px 28px;
        }
        .el-dialog__footer{
            padding:28px 65px 22px;
        }

    }
    

</style>



