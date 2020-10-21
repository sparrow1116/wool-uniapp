<template>
	<view>
		<view class="logout" v-if="isLogin" @click="logout">退出登录</view>
		
		<button v-if="!isLogin" class="mp_login" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx">登  录</button>
		
			
			
		<!-- #ifdef APP-PLUS -->
		<button @click="appLogin">app</button>
		<!-- #endif -->
		
		<view v-if="isLogin" class='user_header'>
			<image mode='widthFix' :src='userInfo.avatarUrl'></image>
			<view>{{userInfo.nickName}}</view>
		</view>
		
		
	</view>
</template>

<script>
	import{http} from "@/util/http.js";
	export default {
		data() {
			return {
				isLogin:true,
				userInfo:{
					nickName: "Terry",
				    gender: 1,
				    language: "zh_CN",
				    city: "Nanjing",
				    province: "Jiangsu",
				    country: "China",
				    avatarUrl:"https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKib2kxAvJhuRuibeS9J1Iwj7dPQ60JMNMWKZ3Ilia1e8MTbeXK2JoGM3ibvktkOuG76VN8Wc3JhkbzibA/132"
				}
			}
		},
		onLoad(){
			let userInfoStr = uni.getStorageSync('userInfo')
			if(userInfoStr){
				this.isLogin = true
				this.userInfo = JSON.parse(userInfoStr)
			}
		},
		methods: {
			logout(){
				console.log("logout")
				uni.removeStorageSync('userInfo')
				this.isLogin = false;
				this.userInfo = {}
			},
			appLoginWx(){
				console.log('>>>> come in')
				uni.showLoading({
					title:'微信登录中'
				})
				uni.getProvider({
				  service: 'oauth',
				  success:  (res)=> {
					if (~res.provider.indexOf('weixin')) {
						uni.login({
							provider: 'weixin',
							success: (res2) => {
								
								uni.getUserInfo({
									provider: 'weixin',
									success: (info) => {//这里请求接口
										uni.hideLoading();
										console.log(res2);
										console.log(info);
										this.userInfo = info.userInfo;
										this.isLogin = true;
										if(info.userInfo){
											uni.setStorageSync('userInfo',JSON.stringify(this.userInfo))
										}
									},
									fail: () => {
										uni.showToast({title:"微信登录授权失败",icon:"none"});
									}
								})
						
							},
							fail: () => {
								uni.showToast({title:"微信登录授权失败",icon:"none"});
							}
						})
						
					}else{
						uni.showToast({
							title: '请先安装微信或升级版本',
							icon:"none"
						});
					}
				  }
				});
			}
		}
	}
</script>

<style lang="scss">
	
	.logout{
		text-align: right;
		color: $wool-bg-color;
	}
	.mp_login{
		width: 230rpx;
		height:230rpx;
		border-radius: 115rpx;
		margin: 0 auto;
		font-size: 24px;
		color: $wool-bg-color;
		line-height: 230rpx;
		border: 1px solid $wool-bg-color;
		margin-top: 100rpx;
	}
	.user_header{
		text-align: center;
		image{
			width: 230rpx;
			height:230rpx;
			border-radius: 115rpx;
			margin: 70rpx auto 0rpx auto;
		}
		view{
			margin: 10rpx auto;
			font-size:20px;
			color: $wool-bg-color;
		}
	}
	
	
</style>
