<template>
    <div class="transactionDetainWrap">
        <my-header/>
        <div class="detailOuterWrap transactionDetainWrap_assetsWrap">
            <div class="transactionDetainWrap_assetsTitle">
                <span>交易:</span>
                <span>{{transactionInfo.tx_id}}</span>
            </div>

            <div class="transactionDetainWrap_assetsDetailWrap">
                <div class="transactionDetainWrap_assetDetailListWrap">
                    <div>
                        <span>资产类型</span>
                        <span>{{assetType}}</span>
                    </div>
                    <div>
                        <span>交易状态</span>
                        <span>成功</span>
                    </div>
                    <div>
                        <span>到账时间</span>
                        <span>{{transactionInfo.block_time}}</span>
                    </div>
                 
                </div>
                <div class="transactionDetainWrap_assetDetailListWrap">
                    <div>
                        <span>所在区块</span>
                        <span>{{transactionInfo.block_height}}</span>
                    </div>
                    <div>
                        <span>确认次数</span>
                        <span>{{transactionInfo.confirm_num}}</span>
                    </div>
                    <div>
                        <span>手续费</span>
                        <span>{{transactionInfo.fee}}</span>
                    </div>
           
                </div>
            </div>

            <div class="transactionDetainWrap_assetListsWrap">

                <div 
                    v-for="(item, index) in transactionInfo.assetinfo_list"
                    :key="index"
                    class="transactionDetainWrap_assetListWrap">
                    <div class="transactionDetainWrap_assetListLeftWrap">
                        <div class="transactionDetainWrap_assetListLeftTop">
                            <span>{{item.asset_name||'--'}}</span>
                            <span>交易ID:</span>
                            <span>{{item.tx_id}}</span>
                        </div>
                        <div class="transactionDetainWrap_assetListLeftFromWrap">
                            <div class="transactionDetainWrap_assetListLeftFrom">
                                <span>从:</span>
                                <span>{{item.fromaddress_utxo.from}}</span>
                            </div>
                            <div class="transactionDetainWrap_assetListCenterWrap">
                                <span class="el-icon-back"></span>
                            </div>
                            <div  class="transactionDetainWrap_assetListLeftFrom">
                                <span>到:</span>
                                <span>
                                    <div 
                                        v-for="(list,i) in item.to_address"
                                        :key="i">{{list}}</div>
                                </span>
                            </div>
                        </div>

                        <div class="transactionDetainWrap_assetListLeftListsWrap">
                            <div class="transactionDetainWrap_assetListLeftListsLeft">UTXO:</div>
                            <div class="transactionDetainWrap_assetListLeftListsRight">
                              
                                <div 
                                    v-for="(list,i) in item.fromaddress_utxo.lists"
                                    :key="i">
                                    <span></span>
                                    <span>jlksdflkjljlkjlk</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="transactionDetainWrap_assetListRightWrap">
                        <div>
                            <span>入账金额:</span>
                            <span>{{item.from_amount}}</span>
                        </div>
                        <div>
                            <span>找零金额:</span>
                            <span>{{item.change}}</span>
                        </div>
                        <div>
                            <span>实际到账:</span>
                            <span>{{item.to_amount}}</span>
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
    created(){
        this.getTransactionInfo()
    },
    components: {  
		myHeader
    },
    data(){
        return {
            transactionInfo:{},
            assetType:'',

            transactionLists:[],

        }
    },
    methods:{
        getTransactionInfo(){
            let url = `/chain_browser/getTxInfo`;

            let params = this.getRouteParams(['chainid','searchText'],['chain_name','tx_id'])

            this.$http.post(url, params)
                .then(({data})=>{
                    this.transactionInfo = data.data;
                    
                    let assetType = '';
                    data.data.assetinfo_list.map((item,index)=>{
                        let asset_name = item.asset_name;
                        let str = index ===0 ? '' :',';
                        if(asset_name){
                            assetType += (str + asset_name);
                        }
                        
                    })
                    this.assetType = assetType ? assetType :'--'
                    
                    let lists = data.data.assetinfo_list.map((item,index)=>{
                        var obj = item;
                        var key = Object.keys(item.fromaddress_utxo)[0];
                        var lists = item.fromaddress_utxo[key];
                        obj.fromaddress_utxo = {
                            from:key,
                            lists:lists
                        }
                        return obj;
                    })
                    this.transactionInfo.assetinfo_list = lists;
                    console.log(this.transactionInfo,222)
                    
                })
                .catch(({data})=>{
                    console.log(data)
                })
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
    margin-bottom:20px;
    .transactionDetainWrap_assetListLeftWrap{
        flex:1;
    }

    .transactionDetainWrap_assetListLeftTop{
        padding:15px 0;
        display:flex;
        align-items: center;
        >span:nth-of-type(1){
            background:$blue;
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
            display:flex;
            >span:nth-of-type(2){
                flex:1;
            }
        }
    }
    .transactionDetainWrap_assetListCenterWrap{
        span{
            transform: rotate(180deg);
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

