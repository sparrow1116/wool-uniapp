<template>
	<view>
		<view class='title'>{{result.title}}</view>
		<view class='tt_descipt' v-if="result.despArr && result.despArr.length>0">
			<view class='descipt_item' v-for="desp in result.despArr">{{desp}}</view>
		</view>
		<view class='img_block' v-if='result.picArr && result.picArr.length>0'>
			<view v-for='pic in result.picArr'>
				<image mode="widthFix" src='http://192.168.137.234:7777/aa738423-37b5-4cd6-b891-f8f004ce3bfe.png'
				                        @error="imageError"></image>
			</view>
		</view>
		<view v-if='result.orignalUrl'>
			<web-view :src="result.orignalUrl"></web-view>
			 <!-- <navigator :url="result.orignalUrl">
			                    阅读原文
			                </navigator> -->
		</view>
		<view class='erweima'>
			<image mode="widthFix" src='/static/erweima_logo.png'></image>
			<image mode="widthFix" src='http://192.168.10.7:7777/erweima.png'></image>
		</view>
		
	</view>
</template>

<script>
	import{http} from "@/util/http.js";
	import config from '@/util/config.js'
	import api from '@/util/api.js'
	export default {
		data() {
			return {
				result:{},
				src:'http://172.171.2.211:7777/1f9a3531-a591-41e5-8f7b-c9e3e37605bf.png'
			}
			
		},
		onLoad(dd){
			console.log(dd)
			this.getData(dd);
		},
		methods: {
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
		margin:10rpx 50rpx
	}
</style>
