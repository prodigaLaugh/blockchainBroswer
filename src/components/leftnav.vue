<template>
    <div class="task_left_wrap">
        <router-link to="/main/blockchainManagement">区块链管理</router-link>
        <router-link to="/main/blockchainMonitor">区块链监控</router-link>
        <router-link to="/main/blockchainBrowser">区块链浏览器</router-link>
        <router-link to="/main/searchGZH" >服务器管理</router-link>
        <router-link to="/main/searchGZH" >节点管理</router-link>
        <router-link to="/main/userManagement" >用户管理</router-link>
    </div>

</template>
<style lang="scss" scoped>
.task_left_wrap{
    width:200px;
    border: 1px solid #f4f4f4;
    height: 500px;
    margin-bottom:40px;
    margin-right:10px;
    >span,>a{
        display: block;
        text-align: center;
        padding: 15px 0;
        border-bottom: 1px solid #f4f4f4;
        font-size:16px;
    }
    >span{
        color: #2579db;
        font-weight:500;
        font-size:18px;
    }
    a.Aactive{
        background: #2579db !important;
        color: #ffffff;
    }
}
</style>



