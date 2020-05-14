<template>
    <div class="task_left_wrap">
        <!-- <router-link to="/main/blockchainManagement">区块链管理</router-link> -->
        <router-link to="/main/blockchainMonitor">区块链监控</router-link>
        <router-link to="/main/blockchainBrowser">区块链浏览器</router-link>
        <!-- <router-link to="/main/serverManagement" >服务器管理</router-link>
        <router-link to="/main/nodeManagement" >节点管理</router-link>
        <router-link to="/main/userManagement" >用户管理</router-link> -->
    </div>

</template>

<style lang="scss" scoped>
.commonContainerWrap.active{
    .task_left_wrap{
        left:-140px;
    }
}
.task_left_wrap{
    width:140px;
    background:$blue;
    padding-left:5px;
    position:fixed;
    left:0;
    top:70px;
    bottom:0;
    z-index:10;
    transition:all .5s;
    >a{
        display: block;
        text-align: center;
        font-size:12px;
        color:#fff;
        background:url(../assets/leftNavIcon1.png) no-repeat 4px center;
        padding-left:22px;
        line-height:40px;
        position:relative;
        &:nth-of-type(2){
            background-image:url(../assets/leftNavIcon2.png);
        }
        &:nth-of-type(3){
            background-image:url(../assets/leftNavIcon3.png);
        }
        &:nth-of-type(4){
            background-image:url(../assets/leftNavIcon4.png);
        }
        &:nth-of-type(5){
            background-image:url(../assets/leftNavIcon5.png);
        }
        &:nth-of-type(6){
            background-image:url(../assets/leftNavIcon6.png);
        }
        &:after{
            content:'';
            position:absolute;
            left:-5px;
            right:0;
            bottom:0;
            border-bottom:1px solid #749be3;
        }
    }
    >a.Aactive{
        background-color: #0e53c2;
        background-position:6px center;
    }
}
</style>



