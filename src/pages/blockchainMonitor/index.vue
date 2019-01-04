<template>
    <div class="outer_wrap">
        <div class="blockchainTitle">区块链监控</div>

        <div class="blockchainSelectWrap">
            <span>请指定区块链</span>
            <select>
                <option value="111">11111</option>
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
            <net-overview/>
        </div>

        <div v-if="navIndex === 1">
            <assetMonitor/>
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

    },
    data(){
        return {
            navIndex:0
        }
    },
    methods:{
        
    }
}
</script>

<style lang="scss" scoped>
   .blockchainTitle{
       padding:30px 0 20px;
       font-size:22px;
   } 
   .blockchainSelectWrap{
       display:flex;
       align-items: center;
       >span{
           margin-right:10px;
       }
       >select{
           width:300px;
           height:30px;
       }
   }
   .blockchainNavWrap{
       display:flex;
       border-bottom:1px solid #ddd;
       padding-top:30px;
       >span{
           margin-right:40px;
           font-size:16px;
           padding-bottom:4px;
           @include pointer;
           transition:color .5s;
           &.active{
               color:#169BD5;
               position:relative;
               
               &:after{
                   position:absolute;
                   content:'';
                   left:0;
                   right:0;
                   bottom:0;
                   border-bottom:2px solid #169BD5;
               }
           }
       }
   }
</style>

