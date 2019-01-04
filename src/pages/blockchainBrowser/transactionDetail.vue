<template>
    <div class="transactionDetainWrap">
        <my-header/>
        <div class="transactionDetainWrap_assetsWrap">
            <div class="transactionDetainWrap_assetsTitle">
                <span>交易:</span>
                <span>gfgdsdfmjlkjdfndfeermnmnd</span>
            </div>

            <div class="transactionDetainWrap_assetsDetailWrap">
                <div class="transactionDetainWrap_assetDetailListWrap">
                    <div v-for="(item,index) in assetList1" :key="index">
                        <span>{{item[0]}}</span>
                        <span>{{item[1]}}</span>
                    </div>
                </div>
                <div class="transactionDetainWrap_assetDetailListWrap">
                    <div v-for="(item,index) in assetList2" :key="index">
                        <span>{{item[0]}}</span>
                        <span>{{item[1]}}</span>
                    </div>
                </div>
            </div>

            <div class="transactionDetainWrap_assetListsWrap">

                <div class="transactionDetainWrap_assetListWrap">
                    <div class="transactionDetainWrap_assetListLeftWrap">
                        <div class="transactionDetainWrap_assetListLeftTop">
                            <span>资产001</span>
                            <span>交易ID:</span>
                            <span>jlksdjlkdhldkhfkdfldkfhdl</span>
                        </div>
                        <div class="transactionDetainWrap_assetListLeftFromWrap">
                            <div class="transactionDetainWrap_assetListLeftFrom">
                                <span>从:</span>
                                <span>jlkhkhkljdfdjkjkfdjk</span>
                            </div>
                            <div>center</div>
                            <div  class="transactionDetainWrap_assetListLeftFrom">
                                <span>到:</span>
                                <span>jlhklhkyldfndkfdlhkdfh</span>
                            </div>
                        </div>

                        <div class="transactionDetainWrap_assetListLeftListsWrap">
                            <div class="transactionDetainWrap_assetListLeftListsLeft">UTXO:</div>
                            <div class="transactionDetainWrap_assetListLeftListsRight">
                                <div v-for="item in 4" :key="item">
                                    <span></span>
                                    <span>jlksdflkjljlkjlk</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="transactionDetainWrap_assetListRightWrap">
                        <div>
                            <span>入账金额:</span>
                            <span>0.43</span>
                        </div>
                        <div>
                            <span>找零金额:</span>
                            <span>0.43</span>
                        </div>
                        <div>
                            <span>实际到账:</span>
                            <span>0.43</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
import myHeader from '@/components/headerSearch'
    
    
export default {
    components: {  
		myHeader
    },
    data(){
        return {
            assetList1:[
                ['资产类型','资产A'],
                ['交易状态','成功'],
                ['到账时间','2018-11-02']
            ],
            assetList2:[
                ['所在区块','2323'],
                ['确认次数','成功'],
                ['手续费','2018-11-02']
            ]
        }
    }

}
</script>

<style lang="scss" scoped>
.transactionDetainWrap_assetsTitle{
    font-size:20px;
    padding:20px 0 30px;
}
.transactionDetainWrap_assetsDetailWrap{
    display:flex;
    align-items: center;
    margin-bottom:20px;

    .transactionDetainWrap_assetDetailListWrap{
        flex:1;
        >div{
            line-height:30px;
            display:flex;
            >span{
                &:nth-of-type(1){
                    width:100px;
                }
            }
        }
    }
}

.transactionDetainWrap_assetListWrap{
    background:#eee;
    display:flex;
    justify-content: space-between;
    align-items: center;
    .transactionDetainWrap_assetListLeftWrap{
        flex:1;
    }

    .transactionDetainWrap_assetListLeftTop{
        padding:15px 0;
        display:flex;
        align-items: center;
        >span:nth-of-type(1){
            background:lightblue;
            padding:2px 20px;
            color:#fff;
        }
        >span:nth-of-type(2){
            padding:0 10px;
        }
    }

    .transactionDetainWrap_assetListLeftFromWrap{
        display:flex;
        justify-content: space-between;
        .transactionDetainWrap_assetListLeftFrom{
            flex:1;
        }
    }

    .transactionDetainWrap_assetListLeftListsWrap{
        display:flex;
        align-items: center;
        padding-top:20px;
        .transactionDetainWrap_assetListLeftListsLeft{
            width:100px;
        }
        .transactionDetainWrap_assetListLeftListsRight{
            >div{
                display:flex;
                align-items: center;
                line-height:30px;
                color:blue;
                >span:nth-of-type(1){
                    width:40px;
                    height:1px;
                    background:#333;
                    margin-right:10px;
                    position:relative;
                    &:after{
                        content:'';
                        width:1px;
                        height:30px;
                        background:#333;
                        position:absolute;
                        bottom:0;
                    }
                }
            }
        }
    }

    .transactionDetainWrap_assetListRightWrap{
        >div{
            line-height:30px;
        }
    }


}
</style>

