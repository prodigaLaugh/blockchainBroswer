<template>
    <div class="netOverviewWrap">
        <div class="netOverviewTitle">概况</div>
        <div class="netOverviewListsWrap">
            <div>
                <div>区块总数:</div>
                <div>{{netoverviewInfo.blocktotal}}</div>
            </div>
            <div>
                <div>共识节点数:</div>
                <div>{{netoverviewInfo.consensusnums}}</div>
            </div>
            <div>
                <div>数据节点数:</div>
                <div>{{netoverviewInfo.datanums}}</div>
            </div>
            <div>
                <div>过去一小时TPS:</div>
                <div>{{netoverviewInfo.tps}}</div>
            </div>
            <div>
                <div>交易总量:</div>
                <div>{{netoverviewInfo.txtotal}}</div>
            </div>
        </div>

        <div class="netOverviewTitle netOverviewTitle1">最近区块(Latest 10)</div>

        <div class="latestBlockWrap">
            <el-table
                :data="netoverviewInfo.block_list"
                border
                style="width: 100%">
                <el-table-column
                label="区块高度">
                    <template slot-scope="scope">
                        <div class="cell blue" @click="goLinkto('/blockchainBrowser_blockchainDetail',scope.row.block_height)">{{scope.row.block_height}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="create_time"
                label="生成时间">
                </el-table-column>
                <el-table-column
                prop="tx_nums"
                label="交易量">
                </el-table-column>
                <el-table-column
                prop="block_size"
                label="区块大小(KB)">
                </el-table-column>
            </el-table>

        </div>


    </div>
</template>

<script>


export default {
    props: ['chain_name'],
    created(){
        if(this.chain_name){
            this.getNetoverview();
        }
    },
    data(){
        return {
            
            netoverviewInfo:{},

            tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    methods:{
        goLinkto(path, val){
            this.$router.push({path: path, query:{chainid: this.chain_name,searchText:val}})
        },
        
        getNetoverview(){
            let url = `/chain_monitor/queryNetInfo/${this.chain_name}`
            this.$http.get(url)
                .then(({data})=>{
                    if(data.code === '0'){
                        this.netoverviewInfo = data.data;
                    }
                    
                })
                .catch(({data})=>{

                })
        },

    },
    watch:{
        chain_name:function(val, oldVa){
            if(val){
                this.getNetoverview();
            }
            
        }
    }
}
</script>
<style lang="scss">
    .netOverviewTitle,
    .netOverviewListsWrap{
        background:#fff;
    }

    .netOverviewTitle{
        padding:17px 0 24px 60px;
        font-size:20px;
        &.netOverviewTitle1{
            margin-top:11px;
            padding-top:33px;
            padding-bottom:30px;
        }
    }
    .netOverviewListsWrap{
        display:flex;
        justify-content: space-between;
        padding:0 100px 35px 60px;
        >div{
            flex:1;
            margin-right:20px;
            height:120px;
            border-radius:5px;
            display:flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            background:linear-gradient(to right,#4d2fdd, #8686f8);
            box-shadow: 0 9px 10px rgba(0, 0, 0, 0.14);
            color:#fff;
            overflow:hidden;
            position:relative;
            &:after{
                content:'';
                position:absolute;
                width:103px;
                height:103px;
                right:-20px;
                background:url(../../assets/overviewIcon1.png) no-repeat right center;
            }
            &:nth-of-type(2){
                background:linear-gradient(to right,#db9229, #fae98b);
                &:after{
                    background-image:url(../../assets/overviewIcon2.png);
                }
            }
            &:nth-of-type(3){
                background:linear-gradient(to right,#18b6a2, #87f0f0);
                &:after{
                    background-image:url(../../assets/overviewIcon3.png);
                }
            }
            &:nth-of-type(4){
                background:linear-gradient(to right,#da5324, #f6a580);
                &:after{
                    background-image:url(../../assets/overviewIcon4.png);
                }
            }
            &:nth-of-type(5){
                background:linear-gradient(to right,#2486da, #8bc9fa);
                &:after{
                    background-image:url(../../assets/overviewIcon5.png);
                }
            }
            >div{
                text-align:center;
                &:nth-of-type(1){
                    padding-bottom:24px;
                    padding-left:19px;
                    font-size:16px;
                }
                &:nth-of-type(2){
                    padding-left:17px;
                    font-size:30px;
                }
            }
            &:last-of-type{
                margin-right:0;
            }

        }
    }
    .latestBlockWrap{
        padding:0 44px 37px 60px;
        background:#fff;
    }
    .netOverviewWrap .el-table th:nth-of-type(4){
        padding-left:0;
    }

</style>