
<template>
	<div class="loginWrap">
		<div class="loginContainer">

		
			<div class="loginTitle">M0区块链运维平台</div>
			<div class="loginDescription">登录/Login</div>

			<div class="loginInpWrap">
				<span>用户名</span>
				<input 
					placeholder="请输入用户名"
					v-model="loginParams.user_name"
					type="text"/>
			</div>

			<div class="loginInpWrap">
				<span>密码</span>
				<input 
					placeholder="请输入密码"
					v-model="loginParams.password"
					type="password"/>
			</div>

			<div class="loginInpWrap">
				<span></span>
				<label>
					<input 
						v-model="autoLogin"
						type="checkbox"/>
					<span>3天内自动登录</span>
				</label>
			</div>
			<div class="loginInpWrap">
				<span>校验码</span>
				<div>
					<input 
						placeholder="请输入右侧的验证码"
						v-model="verifycode"
						type="text">
						<div @click="refreshCode">
							<s-identify :identifyCode="identifyCode" ></s-identify>
						</div>
					 
				</div>
			</div>

			<div 
				@click="login"
				class="loginBtn">登录</div>

		</div>
	</div>
</template>

<script>
import SIdentify from '@/components/identify'
import {setCookie, getCookie } from '@/util/cookie'

export default {
  components:{
	  SIdentify
  },
  data() {
    return {
      identifyCodes: "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ",
			identifyCode: "",
			verifycode:"",

			autoLogin:false,
			loginFlag:true,

			loginParams:{
				user_name:'',
				password:''
			}
    };
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
		login(){
			let url = `/deploy_user/login`
			let params = this.loginParams;

			if(!this.loginParams.user_name ||
				!this.loginParams.password ||
				!this.verifycode){
					this.$message ({
							message: '请完善信息',
							type: 'warning'
					});
					return false;
			}

			if(this.verifycode.toLocaleLowerCase() !== this.identifyCode.toLocaleLowerCase()){
					this.$message ({
							message: '验证码不正确',
							type: 'warning'
					});
					return false;
			}
		
			


			if(!this.loginFlag){
					return false;
			}
			this.loginFlag = false;

			this.$http.post(url,params)
					.then(({data})=>{
						this.addUserFlag = false;
						let type = 'warning',
								message = '登录成功',
								hour = 1,
								autoLogin = 'false';
						if(data.code === '0'){
								type = 'success';
								if(this.autoLogin){
									hour = 24 * 3;
									autoLogin = 'true';
								}
								setCookie('USERTOKEN',data.data.token,hour)
								setCookie('autoLogin',autoLogin,hour)
								setTimeout(()=>{
									location.href  = '/main';
								},1500)
								
						}else{
							message = data.msg
						}
						this.$message ({
								message: message,
								type: type
						});
						
						setTimeout(()=>{
							this.loginFlag = true;
						},1500)


					})
					.catch(({data})=>{
						console.log(data)
						this.$message ({
								message: data && data.data,
								type: 'warning'
						});
						this.loginFlag = true;
					})
			// USERTOKEN
		},
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
	  	}
    }
  }
};

</script>

<style lang="scss" scoped>
.code {
  width: 114px;
  height: 30px;
  border: 1px solid red;
}
.loginWrap{
	width:100%;
	height:100%;
	display:flex;
	justify-content: center;
	align-items: center;

	.loginContainer{
		border:1px solid #ddd;
		display:flex;
		flex-direction: column;
		align-items: center;
		width:500px;

		.loginTitle{
			font-size:20px;
			padding:20px 0 10px;
		}

		.loginDescription{
			color:#333;
			padding-bottom:20px;
		}

		.loginInpWrap{
			width:400px;
			display:flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom:10px;
			>span{
				width:80px;
			}
			input{
				flex:1;
				border:1px solid #ddd;
				height:30px;
				padding-left:8px;
			}
			label{
				flex:1;
				display:flex;
				align-items: center;
				>input{
					flex:unset;
					margin-right:8px;
				}
			}
			>div{
				display:flex;
				flex:1;
				align-items: center;
				>input{
					margin-right:10px;
				}
				>div div{
					width:114px;
					@include pointer;
				}
			}
		}

	}
	.loginBtn{
		width:140px;
		height:40px;
		background:rgba(22, 155, 213, 1);
		text-align:center;
		line-height:40px;
		color:#fff;
		margin-bottom:20px;
		font-size:16px;
		margin-top:20px;
		border-radius:5px;
		@include pointer;

	}
}
</style>
