<template>
    <div class="netOverviewWrap">
        <div class="netOverviewTitle">概况</div>
        <div class="netOverviewListsWrap">
            <div>
                <div>区块总数:</div>
                <div>798</div>
            </div>
            <div>
                <div>共识节点数:</div>
                <div>798</div>
            </div>
            <div>
                <div>数据节点数:</div>
                <div>798</div>
            </div>
            <div>
                <div>过去一小时TPS:</div>
                <div>798</div>
            </div>
            <div>
                <div>交易总量:</div>
                <div>798</div>
            </div>
        </div>

        <div class="netOverviewTitle">最近区块(Latest 10)</div>

        <div class="latestBlockWrap">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="date"
                label="区块高度">
                </el-table-column>
                <el-table-column
                prop="name"
                label="生成时间">
                </el-table-column>
                <el-table-column
                prop="address"
                label="交易量">
                </el-table-column>
                <el-table-column
                prop="address"
                label="区块大小(KB)">
                </el-table-column>
            </el-table>

        </div>


    </div>
</template>

<script>


export default {
    data(){
        return {
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
    }
}
</script>
<style lang="scss">
    .netOverviewTitle{
        padding:30px 0 20px;
        font-size:20px;
    }
    .netOverviewListsWrap{
        display:flex;
        justify-content: space-between;
        >div{
            border:1px solid #ddd;
            flex:1;
            margin-right:20px;
            height:140px;
            background:#eee;
            border-radius:5px;
            align-items: center;
            display:flex;
            flex-direction: column;
            justify-content: center;
            >div{
                text-align:center;
                &:nth-of-type(1){
                    padding-bottom:10px;
                }
            }

            &:last-of-type{
                margin-right:0;
            }

        }
    }
    .latestBlockWrap table .cell{
        text-align:center;
    }
    
</style>