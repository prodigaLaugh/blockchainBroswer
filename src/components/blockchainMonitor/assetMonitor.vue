<template>
    <div class="assetsMonitorWrap">
        <div class="assetsMonitor_overviewOuterWrap">
            <div class="assetsMonitor_overview">
                <div class="assetsMonitor_overviewTitle">概况</div>
                <div class="assetsMonitor_overviewListsWrap">
                    <div>链上资产总数:31</div>
                    <div>资产持有总数:61</div>
                    <div>交易总数:2334</div>
                </div>
            </div>

            <div class="assetsMonitor_transactionEchartsWrap">
                <div class="assetsMonitor_transactionEchartsTitleWrap">
                    <div>
                        <div>交易量</div>
                        <span>1小时</span>
                        <span>1天</span>
                    </div>

                    <div>
                        <span>交易量</span>
                        <span></span>
                    </div>
                </div>

                <div class="assetsMonitor_transactionEcharts">
                    <div id="myChart" ></div>
                </div>
            </div>

        </div>

        <div class="assetsMonitor_transactionListsWrap">
            <div class="assetsMonitor_transactionListsTitle">最新交易列表(Latest 10)</div>
            <div class="assetsMonitor_transactionLists">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="date"
                    label="TXID">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="交易时间">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="交易额">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="区块哈希">
                    </el-table-column>
                </el-table>
            </div>
        </div>

    </div>
</template>


<script>
import echarts from 'echarts'


export default {
    created(){
        setTimeout(()=>{
             this.getCharData();
        },1000)
       
    },
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
    },
    methods:{
        getCharData(){
						
            let myChart = echarts.init(document.getElementById('myChart'))
            var symbolSize = 20;
            // 绘制图表
            myChart.setOption({
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar'
                }]
            });
						
        },
    }
}
</script>

<style lang="scss" >
.assetsMonitorWrap{
    .assetsMonitor_overviewOuterWrap{
        display:flex;
        padding-top:30px;
        .assetsMonitor_overviewTitle{
            font-size:16px;
        }
        .assetsMonitor_overviewListsWrap{
            padding-top:20px;
            >div{
                width:200px;
                line-height:40px;
                background:#ddd;
                text-align:center;
                margin-bottom:30px;
                border-radius:5px;
                &:last-of-type{
                    margin-bottom:0;
                }
            }
        }

        .assetsMonitor_transactionEchartsWrap{
            flex:1;
            margin-left:40px;
            .assetsMonitor_transactionEchartsTitleWrap{
                display:flex;
                justify-content: space-between;
                >div{
                    display:flex;
                    align-items: center;
                }
                >div:nth-of-type(1){
                    
                    >div{
                        font-size:16px;
                        margin-right:20px;
                    }
                    >span{
                        border:1px solid #ddd;
                        padding:4px 10px;
                        border-radius:4px;
                        @include pointer;
                        margin-right:8px;
                    }
                }
                >div:nth-of-type(2){
                    >span:last-of-type{
                        width:24px;
                        height:16px;
                        background:#ddd;
                        margin-left:10px;
                    }
                }
            }
            .assetsMonitor_transactionEcharts{
                >div{
                    height:400px;
                }
            }
        }
    }
}

.assetsMonitor_transactionListsWrap{
    .assetsMonitor_transactionListsTitle{
        font-size:16px;
        padding-bottom:20px;
    }
    .cell{
        text-align:center;
    }
}   
</style>