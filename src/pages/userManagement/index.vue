<template>
    <div class="usermanagementWrap">
        <div class="usermanagementTitle">
            <div>用户管理</div>
            <span @click="addUserFlag=true">+用户</span>
        </div>

        <div>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                fixed
                prop="date"
                label="用户ID">
                </el-table-column>
                <el-table-column
                prop="name"
                label="用户名">
                </el-table-column>
                <el-table-column
                prop="province"
                label="用户类型">
                </el-table-column>
                <el-table-column
                prop="city"
                label="创建时间">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作">
                    <template slot-scope="scope">
                        <span @click="editPassFlag=true">修改密码</span>
                        <span @click="setUserFlag=true">设置</span>
                        <span @click="delUserFlag=true">删除</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog title="添加用户" :visible.sync="addUserFlag">
            <div class="userOperateListsWrap">
                <div>
                    <div class="userOperateListWrap">
                        <div>用户名</div>
                        <input 
                            placeholder="请输入用户名"
                            type="text">
                    </div>
                    <div class="userOperateListWrap">
                        <div>设定密码</div>
                        <input 
                            type="text">
                    </div>
                </div>

                <div>
                    <div class="userOperateListWrap">
                        <div>用户类型</div>
                        <select>
                            <option value="111">11111</option>
                        </select>
                    </div>
                    <div class="userOperateListWrap">
                        <div>再次输入密码</div>
                        <input 
                            type="text">
                    </div>
                </div>
                
            </div>
            <div slot="footer" class="dialog-footer">
                <div 
                    class="userOperateBtn"
                    @click="addUserFlag = false">确定</div>
            </div>
        </el-dialog>

        <el-dialog title="用户设置" :visible.sync="setUserFlag">
            <div class="userOperateListsWrap">
                <div>
                    <div class="userOperateListWrap">
                        <div>用户名</div>
                        <input 
                            placeholder="请输入用户名"
                            type="text">
                    </div>
                    <div class="userOperateListWrap">
                        <div>设定密码</div>
                        <input 
                            type="text">
                    </div>
                </div>

                <div>
                    <div class="userOperateListWrap">
                        <div>用户类型</div>
                        <select>
                            <option value="111">11111</option>
                        </select>
                    </div>
                    <div class="userOperateListWrap">
                        <div>再次输入密码</div>
                        <input 
                            type="text">
                    </div>
                </div>
                
            </div>
            <div slot="footer" class="dialog-footer">
                <div 
                    class="userOperateBtn"
                    @click="addUserFlag = false">确定</div>
            </div>
        </el-dialog>

        <el-dialog title="删除用户" :visible.sync="delUserFlag">
            <div class="userDelListsWrap">
                <span>⚠️请在此确认是否要删除用户username？</span>
                <input 
                    placeholder="请输入管理员密码"
                    type="text">
                
            </div>
            <div slot="footer" class="dialog-footer">
                <div class="userDelBtnWrap">
                    <div 
                        class="userDelBtn"
                        @click="delUserFlag = false">确认删除</div>
                    <div 
                        class="userDelBtn"
                        @click="delUserFlag = false">取消</div>
                </div>
            </div>
        </el-dialog>

        <el-dialog title="修改密码" :visible.sync="editPassFlag">
            <div class="userDelListsWrap">
                <input 
                    placeholder="请设定新密码"
                    type="text">
                <input 
                    placeholder="请再次输入新密码"
                    type="text">
                
            </div>
            <div slot="footer" class="dialog-footer">
                <div class="userDelBtnWrap">
                    <div 
                        class="userDelBtn userEditBtn"
                        @click="editPassFlag = false">确认</div>
                    <div 
                        class="userDelBtn"
                        @click="editPassFlag = false">取消</div>
                </div>
            </div>
        </el-dialog>


    </div>
</template>

<script>
import Vue from 'vue';
import { Table, TableColumn, Dialog  } from 'element-ui';
Vue.use(Table);
Vue.use(Dialog);
Vue.use(TableColumn);

export default {
    data(){
        return {
            addUserFlag:false,
            setUserFlag:false,
            delUserFlag:false,
            editPassFlag:false,
            tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
            }]
        }
    },
    methods: {
        handleClick(row) {
            console.log(row);
        }
    },

}
</script>

<style lang="scss">
.usermanagementWrap{
    flex:1;
    .usermanagementTitle{
        display:flex;
        align-items: center;
        justify-content: space-between;
        padding:30px 0 20px;
        >div{
            font-size:16px;
        }
        >span{
            background:rgba(22, 155, 213, 1);
            color:#fff;
            padding:4px 20px;
            border-radius:5px;
            @include pointer;
        }
    }
    .cell{
        text-align:center;
    }

    .userOperateListsWrap{
        display:flex;
        align-items: center;
        >div{
            flex:1;
            &:nth-of-type(1){
                margin-right:40px;
            }

            .userOperateListWrap{
                display:flex;
                flex-direction: column;
                margin-bottom:20px;
                &:last-of-type{
                    margin-bottom:0;
                }
                >input,>div{
                    flex:1;
                }
                >div{
                    padding-bottom:8px;
                }
                >input,>select{
                    border:1px solid #ddd;
                    height:30px;
                    padding-left:8px;
                }
            }
        }
    }
    .el-dialog__footer{
        text-align:center;
    }
    .userOperateBtn{
        width:180px;
        line-height:40px;
        background:rgba(22, 155, 213, 1);
        color:#fff;
        margin:0 auto;
        border-radius:5px;
        @include pointer;
    }

    .userDelListsWrap{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        >input{
            border:1px solid #ddd;
            width:300px;
            height:30px;
            margin-top:30px;
            padding-left:10px;
        }
    }
    .userDelBtnWrap{
        display:flex;
        justify-content: center;
        >.userDelBtn{
            width:100px;
            line-height:30px;
            border-radius:5px;
            font-size:14px;
            @include pointer;
            &:nth-of-type(1){
                color:#fff;
                background:rgba(255, 0, 0, 1);
                margin-right:40px;
            }
            &:nth-of-type(2){
                color:#333;
                border:1px solid #666;
                margin-right:40px;
            }
            &.userEditBtn{
                background:rgba(22, 155, 213, 1);
            }
        }
    }
}
</style>

