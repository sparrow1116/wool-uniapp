<template>
	<view>
		<view class='title'>{{result.title}}</view>
		<view class='tt_descipt' v-if="result.despArr && result.despArr.length>0">
			<view class='descipt_item' v-for="desp in result.despArr">{{desp}}</view>
		</view>
		<view class='img_block' v-if='result.picArr && result.picArr.length>0'>
			<view v-for='(pic,index) in result.picArr' :key='index'>
				<image class='img' mode="widthFix" :src='pic'
				@click='previewPic(index)'
				                        @error="imageError"></image>
			</view>
		</view>
		<view v-if='result.orignalUrl'>
			<!-- #ifdef H5 -->
			<a :href='result.orignalUrl' >阅读原文</a>
			<!-- #endif -->
			<!-- #ifndef H5 -->
			<u-parse :content="content" @navigate="navigate"></u-parse>
			<!-- #endif -->
		</view>
		<view class='erweima'>
			<image mode="widthFix" src='/static/erweima_logo.png'></image>
			<image mode="widthFix" @click='previewPic("last")' :src='erweima' ></image>
		</view>
		
	</view>
</template>

<script>
	import{http} from "@/util/http.js";
	import config from '@/util/config.js'
	import api from '@/util/api.js'
	import uParse from "@/components/feng-parse/parse.vue"
	
	export default {
		components:{
			uParse
		},
		data() {
			return {
				content:'',
				result:{},
				erweima:'https://wollpic.oss-cn-shanghai.aliyuncs.com/zhuanyoutupian/erweima.png?v=1'
			}
			
		},
		onLoad(dd){
			console.log(dd)
			this.getData(dd);
		},
		methods: {
			previewPic(index){
				let allArr = [...this.result.picArr,this.erweima]
				let currentIndex = index
				if(index === 'last'){
					currentIndex = allArr.length -1
				}
				
				uni.previewImage({
					urls:allArr,
					indicator:'default',
					loop: true,
					current:currentIndex,
					success:(a)=>{
						console.log('success')
						console.log(a)
					},
					fail: (a)=> {
						console.log('fail')
						console.log(a)
					}
				})
			},
			navigate(){
				console.log('aaa')
				uni.navigateTo({
					url:'/pages/bank/webview?url=' + this.result.orignalUrl,
					success:()=>{
						console.log('gotoDetail')
					},
					error:()=>{
						console.log('finish')
					}
				})
			},
			imageError(){
				console.log('fuck')
			},
			async getData(dd){
				let item = await http({url:api.getBankDetail,data:dd})
					item.despArr = JSON.parse(item.despArr);
					item.picArr = JSON.parse(item.picArr)
					for(let i =0; i<item.picArr.length; i++){
						item.picArr[i] = config.picDomain + '/' + item.picArr[i]
					}
					// console.log(item.picArr)
					this.result = item;
					console.log('result')
					console.log(this.result)
					this.content= '<a href='+this.result.orignalUrl +'>阅读原文</a>'
			}
		}
	}
</script>

<style lang="scss">
	.erweima{
		background: #fff;
		align-items: center;
		display: flex;
		padding:20rpx 20rpx;
		height: 340rpx;
	}
	.title{
		text-align: center;
		font-size:50rpx;
		padding:50rpx 30rpx;
	}
	.tt_descipt{
		position: relative;
		padding:75rpx 30rpx 30rpx 30rpx;
		margin: 5rpx 50rpx;
		line-height: 55rpx;
		border: 1px solid $wool-bg-color;
		.descipt_item {
			margin: 10rpx 0;
		}
		view:nth-child(1){
			position: relative;
			float: right;
			width: 300rpx;
			height: 90rpx;
			margin-right:140rpx;
			line-height: 90rpx;
			background: $wool-bg-color;
			color:$wool-text-color;
			font-size: 18px;
			text-align: center;
			margin-top: -54px;
		}
		
	}
	.img_block{
		margin:10rpx 50rpx;
		.img{
			max-width: 680rpx;
		}
	}
</style>
