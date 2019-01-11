<template>
    <div class="outer_wrap">
        <div class="containerTopTitle">区块链监控</div>

        <div class="blockchainSelectWrap">
            <span>请指定区块链</span>
            <select v-model="chain_name">
                <option 
                    v-for="(item,index) in blockchainLists"
                    :key="index"
                    :value="item.Chainid">{{item.Chainid}}</option>
            </select>
        </div>

        <div class="blockchainNavWrap">
            <span 
                @click="navIndex = 0"
                :class="{active:navIndex === 0}">网络概览</span>
            <span 
                @click="navIndex = 1"
                :class="{active:navIndex === 1}">资产监控</span>
            <span 
                @click="navIndex = 2"
                :class="{active:navIndex === 2}">节点监控</span>

        </div>

        <div v-if="navIndex === 0">
            <net-overview :chain_name="chain_name"/>
        </div>

        <div v-if="navIndex === 1">
            <assetMonitor :chain_name="chain_name"/>
        </div>

        <div v-if="navIndex === 2">
            <nodeMonitor/>
        </div>

    </div>
</template>

<script>
import Vue from 'vue';
import { Table, TableColumn } from 'element-ui';
Vue.use(Table);
Vue.use(TableColumn);

import netOverview from '@/components/blockchainMonitor/netOverview';
import assetMonitor from '@/components/blockchainMonitor/assetMonitor'
import nodeMonitor from '@/components/blockchainMonitor/nodeMonitor'

export default {
    components:{
        netOverview,
        assetMonitor,
        nodeMonitor
    },
    created(){
        this.getBlockchains()
    },
    data(){
        return {
            navIndex:0,

            chain_name:'',
            blockchainLists:[],
        }
    },
    methods:{
        getBlockchains(){
            this.getBlockchainLists((data)=>{
                this.blockchainLists = data.data;
                this.chain_name = this.blockchainLists[0].Chainid;
            },()=>{

            })
        },
    }
}
</script>

<style lang="scss" scoped>
    .blockchainTitle{
        padding:30px 0 20px;
        font-size:20px;
    } 
    .blockchainSelectWrap{
        display:flex;
        flex-direction: column;
        justify-content: center;
        background:#fff;
        padding:37px 0 20px 60px;
        font-size:14px;
        color:$color-333;
        >span{
            padding-bottom:15px;
        }
        >select{
            width:460px;
            height:50px;
            border: 0px;
            outline: 1px solid #dddddd;
        }
    }
   
</style>

