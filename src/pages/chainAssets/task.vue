<template>
    <div class="outer_wrap">
        <div class="bread_wrap">
            <router-link to="/main/index">首页</router-link>
            <span>&gt;</span>
            <span>资产</span>
        </div>
        <div class="task_right_outer_wrap">
            <leftnav/>
            <div class="task_right_wrap">
                <div class="task_right_search_inp_wrap">
                    <i>链上任务</i>
                    <input 
                        type="text" 
                        v-model="taskCode"
                    > 
                    <span @click="search"></span>
                </div>
                <div class="task_right_lists_wrap">
                    <div class="task_right_list_wrap first">
                        <div class="flex3">任务号</div>
                        <div>类型</div>
                        <div class="flex2">任务金额</div>
                        <div>任务类型</div>
                        <div class="flex3">交易哈希</div>
                        <div class="flex3">任务哈希</div>
                    </div>
                    <div 
                        class="task_right_list_wrap"
                        v-for="(item,index,key) in taskLists"
                        :key="key"
                    >
                        <div    
                            class="blue flex3" 
                            @click="$router.push({path:'/main/taskDetail',query:{id:item.taskCode}})"
                        >{{item.taskCode}}</div>
                        <div>跨行调款</div>
                        <div class="flex2" >{{item.taskAmount | moneySeparate}}</div>
                        <div>已完成</div>
                        <div
                            class="blue flex3"
                            @click="$router.push({path:'/main/transactionDetail',query:{id:item.txHash}})"
							:title="item.txHash"
                        >{{item.txHash }}</div>
                        <div class="flex3" :title="item.taskHash">{{item.taskHash }}</div>
                    </div>
                
                </div>
                <div class="task_right_pagination_wrap">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="1"
                        :page-size="10"
                        layout=" prev, pager, next"
                        :total="totalNum"
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
            
    </div>
</template>

<script>
import leftnav from '@/components/chainAssets/leftnav';
import Vue from 'vue';
import {Pagination} from 'element-ui';

Vue.use(Pagination);

export default {
    created(){
        this.handleCurrentChange();
    },
    components: {  
		leftnav
	},
    data(){
        return {
            taskLists:[],
            params:{
                page: 1,
                limit: 10,
                taskCode:''
            },
            taskCode:'',
            totalNum:0,
        }
    },
    methods:{
        search(){
            this.params.page = 1;
            this.getTaskLists();
        },
        handleCurrentChange(val){
            this.params.page = val;
            this.getTaskLists();
        },
        getTaskLists(){
           
               
        }
    }
}
</script>
<style lang="scss" scoped>
.task_right_list_wrap>div{
    flex:auto!important;
    &.flex2,&.flex3{
        flex:auto!important;
    }
    &:first-of-type{
        width:200px;
    }
    &:nth-of-type(2){
        width:70px;
    }
    &:nth-of-type(3){
        width:72px;
    }
    &:nth-of-type(4){
        width:46px;
    }
    &:nth-of-type(5){
        width:212px;
    }
    &:nth-of-type(6){
        width:162px;
    }
}
</style>




