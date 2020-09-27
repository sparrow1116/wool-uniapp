<template>
	<view>
		<view class='title'>{{result.title}}</view>
		<view class='tt_descipt' v-if="result.despArr && result.despArr.length>0">
			<view class='descipt_item' v-for="desp in result.despArr">{{desp}}</view>
		</view>
		<view class='img_block' v-if='result.picArr && result.picArr.length>0'>
			<view v-for='pic in result.picArr'>
				<image mode="widthFix" :src="pic"
				                        @error="imageError"></image>
			</view>
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
					console.log(item.picArr)
					this.result = item;
			}
		}
	}
</script>

<style lang="scss">
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
