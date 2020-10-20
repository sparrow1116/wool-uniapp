<template>
	<view>
		<view>{{nickName}}</view>
		<!-- #ifdef MP-WEIXIN -->
		<button class="sys_btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx">小程序登录授权</button>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<button @click="appLogin">app微信授权</button>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickName:''
			}
		},
		onLoad(){
			// let code = this.getUrlCode('code')
			// console.log('>>>code>>>  ')
			// console.log(code)
			// if(code !== null || code !== "") {
			// 	this.getOpenidAndUserinfo(code)
			// }
		        
		
		},
		methods: {
			appLogin(){
				uni.getProvider({
				    service: 'oauth',
				    success: function (res) {
						console.log('>>> getprovider>>> ');
						console.log(res.provider)
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: (loginRes) => {
									console.log('>>>> loginRes>>>')
									console.log(JSON.stringify(loginRes))
									uni.getUserInfo({
										provider:'weixin',
										success: (infoRes)=>{
											this.nickName = infoRes.userInfo.nickName
											console.log('>>>>>>infoRes>>>')
											console.log(JSON.stringify(infoRes.userInfo))
										}
									})
								}
							})
						}
					}
				})
			},
			appLoginWx(){
				console.log('>>>> come in')
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
										console.log(res2);
										console.log(info);
										this.nickName = info.userInfo.nickName
										// alert("成功");
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

<style>

</style>
