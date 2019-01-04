<template>
    <div class="UTXODetailWrap">
        <my-header/>

        <div class="UTXODetail_detailOutersWrap">
            <div class="UTXODetail_detailTitle">UTXO</div>
            <div class="UTXODetail_detailWrap">
                <div class="UTXODetailWrap_detailLeftWrap">
                    <div class="UTXODetailWrap_detailLeftListWrap">
                        <span>ID:</span>
                        <span>jlkjlkdfjldfdfdf</span>
                    </div>
                    <div class="UTXODetailWrap_detailLeftListWrap">
                        <span>所属地址/账户:</span>
                        <span>jlkjlkdfjldfdfdf(所属账户:dfdklfkd)</span>
                    </div>
                    <div class="UTXODetailWrap_detailLeftListWrap">
                        <span>资产类型:</span>
                        <span>jlkjlkdfjldfdfdf</span>
                    </div>
                </div>
                <div class="UTXODetailWrap_detailRightWrap">
                    <div>资产类型</div>
                    <div>34343</div>
                </div>
            </div>
        </div>

        <div class="UTXODetailWrap_transactionWrap">
            <div class="UTXODetailWrap_transactionTitle">涉及交易</div>

            <div class="UTXODetailWrap_transactionContainer">
                <div class="UTXODetailWrap_transactionList">
                    <div>kljdsflkdjsfkldfdf</div>
                    <div>产生</div>
                </div>
                <div>center</div>

                <div class="UTXODetailWrap_transactionList">
                    <div>kljdsflkdjsfkldfdf</div>
                    <div>花费</div>
                </div>
            </div>
        </div>

        <div class="UTXODetailWrap_syWrap">
            <div class="UTXODetailWrap_syTitle">溯源</div>
            <div class="UTXODetailWrap_syDetailWrap">

                <div class="UTXODetailWrap_syDetailListWrap">
                    <div class="UTXODetailWrap_syDetailListTitle">产生UTXO:</div>
                    <div class="UTXODetailWrap_syDetailList">
                        <div>jljljlkjlkjlmkfdsdfsdkk</div>
                        <div>jljljlkjlkjlmkfdsdfsdkk</div>
                    </div>
                </div>

                <div class="UTXODetailWrap_syDetailListWrap">
                    <div class="UTXODetailWrap_syDetailListTitle">当前UTXO:</div>
                    <div class="UTXODetailWrap_syDetailList">
                        <div>jljljlkjlkjlmkfdsdfsdkk</div>
                    </div>
                </div>

                <div class="UTXODetailWrap_syDetailListWrap">
                    <div class="UTXODetailWrap_syDetailListTitle">来源UTXO:</div>
                    <div class="UTXODetailWrap_syDetailList">
                        <div>jljljlkjlkjlmkfdsdfsdkk</div>
                        <div>jljljlkjlkjlmkfdsdfsdkk</div>
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

        }
    }
}
</script>

<style lang="scss" scoped>
.UTXODetail_detailTitle{
    font-size:20px;
    padding:30px 0 15px;
}
.UTXODetail_detailWrap{
    display:flex;
    justify-content: space-between;
    align-items: center;
    .UTXODetailWrap_detailLeftListWrap{
        padding-bottom:10px;
        >span{
            display:block;
        }
    }
    .UTXODetailWrap_detailLeftWrap{
        flex:1;
    }
    .UTXODetailWrap_detailRightWrap{
        width:200px;
        height:100px;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
        background:#ddd;
    }
}

.UTXODetailWrap_transactionWrap{
    .UTXODetailWrap_transactionTitle{
        padding:20px 0;
        font-size:20px;
    }
    .UTXODetailWrap_transactionContainer{
        display:flex;
        .UTXODetailWrap_transactionList{
            flex:1;
            display:flex;
            flex-direction:column;
            align-items:center;
        }
    }
}

.UTXODetailWrap_syWrap{
    .UTXODetailWrap_syTitle{
        font-size:20px;
        padding:20px 0;
    }
    .UTXODetailWrap_syDetailWrap{
        height:400px;
        background:#ddd;
        display:flex;
        flex-direction:row-reverse;
        align-items: space-between;
        justify-content: space-between;

        .UTXODetailWrap_syDetailListWrap{
            flex:1;

            .UTXODetailWrap_syDetailListTitle{
                padding:30px 0 10px;
                font-size:14px;
            }
            &:nth-of-type(2){
                align-self:center;
            }
            &:nth-of-type(3){
                align-self: flex-end;
            }

            .UTXODetailWrap_syDetailList{
                >div{
                    line-height:20px;
                }
            }
        }
    }
}

</style>

