<template>
    <div class="outer_wrap usermanagementWrap">
        <div class="usermanagementTitle">
            <div>用户管理</div>
            <span @click="addUserFlag=true">+用户</span>
        </div>

        <div>
            <el-table
                :data="userLists"
                border
                style="width: 100%">
                <el-table-column
                fixed
                    prop="user_id"
                    label="用户ID">
                </el-table-column>
                <el-table-column
                    prop="user_name"
                    label="用户名">
                </el-table-column>
                <el-table-column
                    label="用户类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.role | userType}}</span>
                    </template>

                </el-table-column>
                <el-table-column
                    prop="user_id"
                    label="创建时间">
                    <template slot-scope="item">
                        <span>{{item.row.create_time}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作">
                    <template slot-scope="scope">
                        <span class="usermanagementListOperBtn" @click.prevent="clickSetUser(scope.row,'editPassFlag','editPassParams')">修改密码</span>
                        <span class="usermanagementListOperBtn" @click.prevent="clickSetUser(scope.row,'setUserFlag','setUserParams')">设置</span>
                        <span class="usermanagementListOperBtn" @click.prevent="clickDelBtn(scope.row.user_id,scope.$index)">删除</span>
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
                            v-model="addUserParams.user_name"
                            type="text">
                    </div>
                    <div class="userOperateListWrap">
                        <div>设定密码</div>
                        <input 
                            v-model="addUserParams.password"
                            type="password">
                    </div>
                </div>

                <div>
                    <div class="userOperateListWrap">
                        <div>用户类型</div>
                        <select v-model="addUserParams.role">
                            <option value=0>超级用户</option>
                            <option value=1>常规用户</option>
                        </select>
                    </div>
                    <div class="userOperateListWrap">
                        <div>再次输入密码</div>
                        <input 
                            v-model="addUserParams.againpassword"
                            type="password">
                    </div>
                </div>
                
            </div>
            <div slot="footer" class="dialog-footer">
                <div 
                    class="userOperateBtn"
                    @click="addUser">确定</div>
            </div>
        </el-dialog>


         <el-dialog title="修改密码" :visible.sync="editPassFlag">
            <div class="userDelListsWrap">
                <input 
                    placeholder="请设定新密码"
                    v-model="editPassParams.password"
                    type="password">
                <input 
                    placeholder="请再次输入新密码"
                    v-model="editPassParams.againpassword"
                    type="password">
                
            </div>
            <div slot="footer" class="dialog-footer">
                <div class="userDelBtnWrap">
                    <div 
                        class="userDelBtn userEditBtn"
                        @click="setUser">确认</div>
                    <div 
                        class="userDelBtn"
                        @click="editPassFlag = false">取消</div>
                </div>
            </div>
        </el-dialog>

        <el-dialog title="用户设置" :visible.sync="setUserFlag">
            <div class="userOperateListsWrap">
                <div>
                    <div class="userOperateListWrap">
                        <div>用户名</div>
                        <input 
                            placeholder="请输入用户名"
                            v-model="setUserParams.user_name"
                            type="text">
                    </div>
                    <div class="userOperateListWrap">
                        <div>设定密码</div>
                        <input 
                            v-model="setUserParams.password"
                            type="password">
                    </div>
                </div>

                <div>
                    <div class="userOperateListWrap">
                        <div>用户类型</div>
                        <select v-model="setUserParams.role">
                            <option value=0>超级用户</option>
                            <option value=1>常规用户</option>
                        </select>
                    </div>
                    <div class="userOperateListWrap">
                        <div>再次输入密码</div>
                        <input 
                            v-model="setUserParams.againpassword"
                            type="password">
                    </div>
                </div>
                
            </div>
            <div slot="footer" class="dialog-footer">
                <div 
                    class="userOperateBtn"
                    @click="setUser">确定</div>
            </div>
        </el-dialog>

        <el-dialog title="删除用户" :visible.sync="delUserFlag">
            <div class="userDelListsWrap">
                <span>⚠️请在此确认是否要删除用户username？</span>
                <input 
                    placeholder="请输入管理员密码"
                    v-model="delPassword"
                    type="password">
                
            </div>
            <div slot="footer" class="dialog-footer">
                <div class="userDelBtnWrap">
                    <div 
                        class="userDelBtn"
                        @click="deleteUser">确认删除</div>
                    <div 
                        class="userDelBtn"
                        @click="delUserFlag = false">取消</div>
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
    created(){
        // this.addUser();
        this.getUserlists();
    },
    data(){
        return {
            addUserFlag:false,
            

            editPassFlag:false,
            editPassParams:{},

            setUserFlag:false,
            setUserParams:{},

            delUserId:'',
            delUserIndex:999,
            delUserFlag:false,
            delPassword:'',

            addUserParams:{
                user_name:'',
                password:'',
                againpassword:'',
                role:1
            },
            operFlag:true,
            userLists: []
        }
    },
    methods: {
       
        getUserlists(){
            let url = `/deploy_user/list`
            this.$http.get(url,{params:{}})
					.then(({data})=>{
                        this.userLists = data.data;
					})
					.catch(({data})=>{
                        
					})
        },
        clickSetUser(data,flag,setKey){
            this[flag] =true;
            this[setKey] = data;
        },
        setUser(){
            let url = `/deploy_user/Update`
            let params = {}

            if(this.editPassParams.user_id){
                params = this.editPassParams;

                if(!this.editPassParams.password||
                    !this.editPassParams.againpassword){
                    this.$message ({
                        message: '请完善信息',
                        type: 'warning'
                    });
                    return false;
                }
            }else{
                params = this.setUserParams;
                if(!this.setUserParams.user_name ||
                    !this.setUserParams.password||
                    !this.setUserParams.againpassword){
                    this.$message ({
                        message: '请完善信息',
                        type: 'warning'
                    });
                    return false
                }
            }

            if(params.password !== params.againpassword){
                this.$message ({
                    message: '两次密码不一致',
                    type: 'warning'
                });
                return false;
            }

            if(!this.operFlag){
                return false;
            }

            this.operFlag = false;
            this.$http.post(url,params)
                .then(({data})=>{
                   
                    let type = 'warning'
                    if(data.code === '0'){
                        type = 'success'
                        this.editPassParams = {} 
                        this.setUserParams = {}
                        this.getUserlists();
                    }

                    this.$message ({
                        message: data.data,
                        type: type,
                        duration:1500
                    });
                    
                    setTimeout(()=>{
                        this.editPassFlag = false
                        this.setUserFlag = false
                    },1600)

                })
                .catch(({data})=>{
                    console.log(data,2222)
                    this.operFlag = true;
                })
        },
        
        clickDelBtn(id, index){
            this.delUserId = id;
            this.delUserIndex = index;
            this.delUserFlag = true;
        },
        
        deleteUser(){
            let url = `/deploy_user/detele`
            let params = {
                user_id: this.delUserId,
                delPassword:''
            }
            if(!this.operFlag){
                return false;
            }
            this.operFlag = false;
            this.$http.post(url,params)
					.then(({data})=>{
                        let type = 'warning'
                        if(data.code === '0'){
                            let lists = this.userLists
                            lists.splice(this.delUserIndex,1)
                            this.userLists = lists;
                            type = 'success'
                        }

                        this.$message ({
                            message: data.data,
                            type: type,
                            duration:1500
                        });
                        
                        this.delPassword = ''
                        setTimeout(()=>{
                            this.delUserFlag = false;
                        },1600)
                        this.operFlag = true;

					})
					.catch(({data})=>{
                        this.$message ({
                            message: data.data,
                            type: 'warning'
                        });
                        this.delPassword = ''
                        this.operFlag = true;
                        this.operFlag = true;
					})
        },
        addUser(){
            
            let url = `/deploy_user/Add`
            if(!this.addUserParams.password ||
                !this.addUserParams.againpassword || 
                !this.addUserParams.user_name){
                this.$message ({
                    message: '请完善信息',
                    type: 'success'
                });
                return false;
            }

            if(this.addUserParams.password !== this.addUserParams.againpassword){
                this.$message ({
                    message: '两次密码不一致',
                    type: 'success'
                });
                return false;
            }
           
            
            let params = Object.assign({},this.addUserParams);
            params.role -= 0;
            delete params.againpassword;

            if(!this.operFlag){
                return false;
            }
            this.operFlag = false;

            this.$http.post(url,params)
					.then(({data})=>{
                        this.addUserFlag = false;
                        let type = 'warning'
						if(data.code === '0'){
                            type = 'success'
                            this.getUserlists();
                        }
                        this.$message ({
                            message: data.data,
                            type: type
                        });
                        this.operFlag = true;

					})
					.catch(({data})=>{
                         this.$message ({
                            message: data.data,
                            type: 'warning'
                        });
                        this.operFlag = true;
					})
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
            font-size:20px;
        }
        >span{
            background:rgba(22, 155, 213, 1);
            color:#fff;
            padding:0 20px;
            line-height:30px;
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
    .usermanagementListOperBtn{
        color:rgba(22, 155, 213, 1);;
        @include pointer;
    }
}
</style>

