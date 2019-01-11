<template>
    <div class="assetsMonitorWrap">
        <div class="assetsMonitor_overviewOuterWrap">
            <div class="assetsMonitor_overview">
                <div class="assetsMonitor_overviewTitle">概况</div>
                <div class="assetsMonitor_overviewListsWrap">
                    <div>
                        <span>{{assetInfo.assettotal}}</span>
                        <span>链上资产总数:</span>
                    </div>
                    <div>
                        <span>{{assetInfo.holdertotal}}</span>
                        <span>资产持有总数:</span>
                    </div>
                    <div>
                        <span>{{assetInfo.txtotal}}</span>
                        <span>交易总数:</span>
                    </div>
                </div>
            </div>

            <div class="assetsMonitor_transactionEchartsWrap">
                <div class="assetsMonitor_overviewTitle">交易量</div>
                <div class="assetsMonitor_transactionEchartsTitleWrap">
                    <span 
                        :class="{active: dimension==='hour'}"
                        @click="selectTime('hour')">1小时</span>
                    <span 
                        :class="{active: dimension==='day'}"
                        @click="selectTime('day')">1天</span>
                </div>

                <div class="assetsMonitor_transactionEcharts">
                    <div id="myChart" ></div>
                </div>
            </div>

        </div>

        <div class="assetsMonitor_transactionListsWrap">
            <div class="assetsMonitor_transactionListsTitle">最新交易列表(Latest 10)</div>
            <div class="assetsMonitor_transactionLists assetsMonitor_transactionLists1">
                <el-table
                    :data="assetInfo.TxList"
                    border
                    style="width: 100%">
                    <el-table-column
                        label="TXID">
                        <template slot-scope="scope">
                            <div class="cell blue"  @click="goLinkto('/blockchainBrowser_transactionDetail',scope.row.tx_id)">{{scope.row.tx_id}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="所在区块高度">
                            <template slot-scope="scope">
                                <div class="cell blue" @click="goLinkto('/blockchainBrowser_blockchainDetail',scope.row.block_height)">{{scope.row.block_height}}</div>
                            </template>
                    </el-table-column>
                    <el-table-column
                        prop="tx_time"
                        label="交易时间">
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <div class="assetsMonitor_transactionListsWrap">
            <div class="assetsMonitor_transactionListsTitle">最活跃数字资产（Top 10）</div>
            <div class="assetsMonitor_transactionLists assetsMonitor_transactionLists2">
                <el-table
                    :data="assetInfo.AssetTopList"
                    border
                    style="width: 100%">
                    <el-table-column
                        label="资产ID">
                        <template slot-scope="scope">
                            <div class="cell blue" @click="goLinkto('/blockchainBrowser_assetsDetail',scope.row.assetid)">{{scope.row.assetid}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="assetname"
                        label="资产名称">
                    </el-table-column>
                    <el-table-column
                        prop="issueamount"
                        label="发行总量">
                    </el-table-column>
                    <el-table-column
                        prop="holdernums"
                        label="持有人数">
                    </el-table-column>
                    <el-table-column
                        prop="txnumsmonth"
                        label="近一个月交易次数">
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <div class="assetsMonitor_transactionListsWrap">
            <div class="assetsMonitor_transactionListsTitle">集中度（Top 10）</div>
            <div class="assetsMonitor_transactionLists assetsMonitor_transactionLists3">
                <el-table
                    :data="assetInfo.AssetConcentrationRatio"
                    border
                    style="width: 100%">
                    <el-table-column
                        label="资产ID">
                        <template slot-scope="scope">
                            <div class="cell blue" @click="goLinkto('/blockchainBrowser_assetsDetail',scope.row.assetid)">{{scope.row.assetid}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="holdertotal"
                        label="总持有人数">
                    </el-table-column>
                    <el-table-column
                        prop="totalamount"
                        label="总额">
                    </el-table-column>
                    <el-table-column
                        prop="holderpercent"
                        label="前3持有人占比">
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
        this.getAssetsInfo()
        setTimeout(()=>{
             this.getCharData();
        },1000)
       
    },
    props: ['chain_name'],
    data(){
        return {
            assetInfo:{},
            dimension:'hour',

        }
    },
    methods:{
        goLinkto(path, val){
            this.$router.push({path: path, query:{chainid: this.chain_name,searchText:val}})
        },
        selectTime(val){
            this.dimension = val;
            this.getCharData();
        },
        getCharData(){
            let url = `/chain_monitor/queryChainTotalTxs/${this.chain_name}/${this.dimension}`;
            
            this.$http.get(url)
                .then(({data})=>{
                    let xData = data.data.time;
                    let lists = data.data.total;

                    let myChart = echarts.init(document.getElementById('myChart'))
                    var symbolSize = 20;
                    let rotateDeg = this.dimension === 'day' ? 45 : 0;
                    // 绘制图表
                    myChart.setOption({
                        
                        xAxis: {
                            type: 'category',
                            data: xData,
                            axisLine:{
                                lineStyle:{
                                    color:'#ddd'
                                }
                            },
                            axisTick:{
                                show:false,
                            },
                            axisLabel: {
                                formatter: function(val){
                                        return val;
                                },
                                color:'#546a79',
                                show:true,
                                rotate:rotateDeg
                            },
                        },
                        yAxis: {
                            type: 'value',
                            axisLine:{
                                show:false,
                            },
                            axisTick:{
                                show:false
                            },
                           
                            splitLine: {
                                lineStyle:{
                                    color:'#ddd'
                                }
                            }
                        },
                        series: [{
                            data: lists,
                            type: 'bar',
                            itemStyle:{
                                color:'#2487da'
                            }
                        }]
                    });

                })
                .catch(()=>{

                })
						
            
						
        },
        getAssetsInfo(){
            let url = `/chain_monitor/queryAssetInfo/${this.chain_name}`;
            this.$http.get(url)
                .then(({data})=>{
                    this.assetInfo = data.data;
                })
                .catch(()=>{

                })
        }
    },
    watch:{
        chain_name:function(val, oldVa){
            if(val){
                console.log(val, oldVa,1111);
                this.getAssetsInfo();
            }
            
        }
    }
}
</script>

<style lang="scss" >
.assetsMonitorWrap{
    .assetsMonitor_overviewOuterWrap{
        display:flex;
        .assetsMonitor_overview{
            background:#fff;
            width:402px;
        }
        .assetsMonitor_overviewTitle{
            border-bottom:1px solid #f4f4f4;
            color:$color-333;
            font-size:16px;
            padding:27px 0 16px 40px;
        }
        .assetsMonitor_overviewListsWrap{
            padding-top:20px;
            >div{
                display:flex;
                flex-direction: column;
                justify-content: center;
                padding-left:40px;
                padding-right:102px;
                
                border-bottom:1px solid #f4f4f4;
                height:168px;
                position:relative;
                &:after{
                    content:'';
                    position:absolute;
                    right:102px;
                    top:0;
                    bottom:0;
                    width:168px;
                    background:url(../../assets/assetMonitorIcon1.png) no-repeat right center;

                }
                >span{
                    &:nth-of-type(1){
                        font-size:30px;
                        color:#da5324;
                        padding-bottom:18px;
                    }
                    &:nth-of-type(2){
                        color:$color-666;
                        font-size:16px;
                    }
                }
                &:nth-of-type(2){
                    &:after{
                        background-image:url(../../assets/assetMonitorIcon2.png);
                    }
                    >span{
                        &:nth-of-type(1){
                            color:#14b49f;
                        }
                    }
                }
                &:nth-of-type(3){
                    &:after{
                        background-image:url(../../assets/assetMonitorIcon3.png);
                    }
                    >span{
                        &:nth-of-type(1){
                            color:#2487da;
                        }
                    }
                }
                
            }
        }

        .assetsMonitor_transactionEchartsWrap{
            flex:1;
            margin-left:40px;
            background:#fff;
            .assetsMonitor_transactionEchartsTitleWrap{
                display:flex;
                justify-content: flex-end;
                padding-right:32px;
                padding-top:17px;
                >span{
                    border-radius:4px;
                    @include pointer;
                    width:80px;
                    line-height:40px;
                    color:$blue;
                    margin-left:20px;
                    border:1px solid $blue;
                    text-align:center;
                    font-size:16px;
                    &.active{
                        color:#fff;
                        background-color:$blue;
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
.assetsMonitorWrap{
    .assetsMonitor_transactionListsWrap{
        margin-top:30px;
        .assetsMonitor_transactionListsTitle{
            font-size:16px;
            padding-bottom:20px;
            padding:29px 0 27px 40px;
            background:#fff;
        }
        .assetsMonitor_transactionLists{
            background:#fff;
            padding:0 32px 42px 40px;
        }
        .assetsMonitor_transactionLists1 .el-table th:nth-of-type(3),
        .assetsMonitor_transactionLists2 .el-table th:nth-of-type(5),
        .assetsMonitor_transactionLists3 .el-table th:nth-of-type(4){
            padding-left:0;
        }
    } 
}
      
</style>