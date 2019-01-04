<template>
    <div class="adressDetail_wrap">
        <my-header/>
        <div class="adressDetail_containerWrap">
            <div class="adressDetail_addressWrap">
                <div class="adressDetail_addressTitle">区块3203</div>
                <div class="adressDetail_addressListsWrap">
                    <div class="adressDetail_addressListWrap">
                        <div 
                            v-for="(item,index) in addressDetailLists1"
                            :key="index"
                            class="adressDetail_addressList">
                            <span>{{item.text1}}</span>
                            <span>{{item.text2}} </span>
                        </div>
                    </div>
                    <div class="adressDetail_addressListWrap">
                        <div 
                            v-for="(item,index) in addressDetailLists2"
                            :key="index"
                            class="adressDetail_addressList">
                            <span>{{item.text1}}</span>
                            <span>{{item.text2}} </span>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="adressDetail_assetsWrap">
                <div class="adressDetail_assetsNavWrap">
                    <span 
                        v-for="(item,index) in navLists"
                        :key="index">{{item}}</span>
                </div>
                
            </div>

            <div class="adressDetail_transcationWrap">
                <div class="adressDetail_transcationTitle">交易列表</div>
                <div class="adressDetail_transcationListsWrap">

                    <div class="adressDetail_transcationListWrap">
                        <div class="adressDetail_transcationList" v-for="item in 2" :key="item">
                            <div class="adressDetail_transcationLeftWrap adressDetail_transcationLeftWrap1"> 
                                <!-- <div class="adressDetail_transcationLeftIcon">left</div> -->
                                <div class="adressDetail_transcationLeftDetailWrap">
                                    <div class="adressDetail_transcationLeftDetailList">
                                        <span>交易ID:</span>
                                        <span>jldfjlknkljl kjlkj</span>
                                    </div>
                                    <div class="adressDetail_transcationLeftDetailList">
                                        <span>从:</span>
                                        <span>jldfjlknkljl kjlkj</span>
                                    </div>
                                    <div class="adressDetail_transcationLeftDetailList">
                                        <span>到账时间:</span>
                                        <span>2018-9-8</span>
                                    </div>
                                </div>
                            </div>

                            <div class="adressDetail_transcationCenterWrap">
                                中
                            </div>

                            <div class="adressDetail_transcationLeftWrap adressDetail_transcationRightWrap">
                                <div class="adressDetail_transcationLeftDetailList">
                                    <span>余额:</span>
                                    <span>34</span>
                                </div>
                                <div class="adressDetail_transcationLeftDetailList">
                                    <span>到:</span>
                                    <span>fgvbghffdgfdgf</span>
                                </div>
                                <div class="adressDetail_transcationLeftDetailList">
                                    <span> </span>
                                    <span> </span>
                                </div>
                            </div>

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
            addressDetailLists1:[
                {
                    text1:'区块链',
                    text2:'区块链12'
                },
                {
                    text1:'包含交易数',
                    text2:'23'
                },
                {
                    text1:'区块高度',
                    text2:'1'
                },
                {
                    text1:'出块时间',
                    text2:'23'
                },
                {
                    text1:'块哈希',
                    text2:'2'
                }
            ],
            addressDetailLists2:[
                {
                    text1:'出块节点',
                    text2:'区块链12'
                },
                {
                    text1:'出块耗时',
                    text2:'23'
                },
                {
                    text1:'上个块',
                    text2:'1'
                },
                {
                    text1:'下个块',
                    text2:'23'
                },
                {
                    text1:'块大小',
                    text2:'2'
                }
            ],
            navLists:[1,2,3,4,5],
            assetsDetailLists:[
                ['当前余额',31],
                ['交易次数',31],
                ['转账交易',31],
                ['接收交易',31]
            ],
        }
    }
}
</script>

<style lang="scss" scoped>
.adressDetail_addressWrap{
    .adressDetail_addressTitle{
        font-size:20px;
        padding:30px 0 20px 0;
        color:#333;
    }
    .adressDetail_addressListsWrap{
        display:flex;
        >div{
            flex:1;
        }
    }
    .adressDetail_addressList{
        display:flex;
        line-height:20px;
        span{
            font-size:12px;
            color:#333;
            &:nth-of-type(1){
                width:100px;
            }
        }
    }
}
.adressDetail_assetsWrap{
    padding-top:20px;
    .adressDetail_assetsNavWrap{
        border-bottom:2px solid #ddd;
        display:flex;
        >span{
            padding-right:50px;
            padding-bottom:6px;
            &.active{
                color:blue;
            }
        }
    }
    .adressDetail_assetsDetailWrap{
        padding-top:10px;
        .adressDetail_assetsDetailTitle{
            padding:20px 0 10px 0;
            font-size:20px;
            margin-bottom:10px;
        }
        .adressDetail_assetsDetailList{
            display:flex;
            >span{
                text-align:center;
                line-height:30px;
                border:1px solid #ddd;
                margin-left:-1px;
                margin-top:-1px;
                &:nth-of-type(1){
                    width:100px;
                }
                &:nth-of-type(2){
                    width:300px;
                }
            }
        }
    }
}

.adressDetail_transcationWrap{
    .adressDetail_transcationTitle{
        font-size:20px;
        padding:20px 0;
    }
    .adressDetail_transcationListWrap{
        border:1px solid #bbb;

    }
    .adressDetail_transcationList{
        display:flex;
        position:relative;
        justify-content:space-between;
        align-items: center;
        height:100px;
        border-bottom:1px solid #eee;
       
        .adressDetail_transcationLeftWrap{
            height:100px;
            .adressDetail_transcationLeftDetailList{
                display:flex;
                line-height:30px;
                >span{
                    font-size:12px;
                    &:nth-of-type(1){
                        width:80px;
                    }
                    &:nth-of-type(2){
                        color:blue;
                    }
                }
            }
        }
        .adressDetail_transcationRightWrap{
            display:flex;
            flex-direction: column;
            justify-content: center;
        }
        .adressDetail_transcationLeftWrap1{
            display:flex;
            align-items: center;
            .adressDetail_transcationLeftIcon{
                margin-left:20px;
                margin-right:20px;
            }
        }
        
      
    }
}
</style>

