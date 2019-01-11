<template>
    <div class="UTXODetailWrap">
        <my-header/>
        
        <div class="detailOuterWrap">

        
            <div class="UTXODetail_detailOutersWrap">
                <div class="UTXODetail_detailTitle">UTXO</div>
                <div class="UTXODetail_detailWrap">
                    <div class="UTXODetailWrap_detailLeftWrap">
                        <div class="UTXODetailWrap_detailLeftListWrap">
                            <span>ID:</span>
                            <span>{{UTXODetail.account_id | operStrNull}}</span>
                        </div>
                        <div class="UTXODetailWrap_detailLeftListWrap">
                            <span>所属地址/账户:</span>
                            <span>{{UTXODetail.account_id | operStrNull}}(所属账户:{{UTXODetail.account_name | operStrNull}})</span>
                        </div>
                        <div class="UTXODetailWrap_detailLeftListWrap">
                            <span>资产类型:</span>
                            <span>{{UTXODetail.asset_name | operStrNull}} (资产ID：{{UTXODetail.asset_id | operStrNull}})</span>
                        </div>
                    </div>
                    <div class="UTXODetailWrap_detailRightWrap">
                        <div>额度:</div>
                        <div>{{UTXODetail.amount}}</div>
                    </div>
                </div>
            </div>

            <div class="UTXODetailWrap_transactionWrap">
                <div class="UTXODetailWrap_transactionTitle">涉及交易</div>

                <div class="UTXODetailWrap_transactionContainer">
                    <div class="UTXODetailWrap_transactionList">
                        <div>{{UTXODetail.from_txid | operStrNull}}</div>
                        <div>产生</div>
                    </div>
                    <div class="UTXODetailWrap_transactionCenterArrow"><span class="el-icon-back"></span></div>

                    <div class="UTXODetailWrap_transactionList">
                        <div>{{UTXODetail.to_txid | operStrNull}}</div>
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
                            <!-- 可能没有 -->
                            <div 
                                v-for="(item, index) in UTXODetail.to_utxoid"
                                :key="index">{{item}}</div>
                        </div>
                    </div>

                    <div class="UTXODetailWrap_syDetailListWrap">
                        <div class="UTXODetailWrap_syDetailListTitle">当前UTXO:</div>
                        <div class="UTXODetailWrap_syDetailList">
                            <div>{{UTXODetail.utxo_id}}</div>
                        </div>
                    </div>

                    <div class="UTXODetailWrap_syDetailListWrap">
                        <div class="UTXODetailWrap_syDetailListTitle">来源UTXO:</div>
                        <div class="UTXODetailWrap_syDetailList">
                            <div 
                                v-for="(item, index) in UTXODetail.from_utxoid"
                                :key="index">{{item}}</div>
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
    created(){
        this.getInfo()
    },
    data(){
        return {
            UTXODetail:{}
        }
    },
    methods:{
        getInfo(){
            let url =`/chain_browser/getUtxoInfo`;

            let params = this.getRouteParams(['chainid','searchText'],['chain_name','utxo_id'])
            this.$http.post(url,params)
                .then(({data})=>{
                    this.UTXODetail = data.data;
                })
                .catch(({data})=>{

                })
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
    padding:20px 0;
    .UTXODetailWrap_detailLeftListWrap{
        padding-bottom:20px;
        >span{
            display:block;
            &:nth-of-type(1){
                padding-bottom:8px;
            }
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
        >div{
            font-size:16px;
            &:nth-of-type(1){
                padding-bottom:10px;
            }
        }
    }
}

.UTXODetailWrap_transactionWrap{
    .UTXODetailWrap_transactionTitle{
        padding:20px 0;
        font-size:20px;
    }
    .UTXODetailWrap_transactionContainer{
        display:flex;
        padding-bottom:20px;
        .UTXODetailWrap_transactionList{
            flex:1;
            display:flex;
            flex-direction:column;
            align-items:center;
            >div{
                &:nth-of-type(1){
                    color:$blue;
                }
                &:nth-of-type(2){
                    font-size:16px;
                    padding-top:8px;
                }
            }
        }
        .UTXODetailWrap_transactionCenterArrow{
            font-size:24px;
            >span{
                transform:rotate(180deg);
            }
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

