<template>
	<view>
		<view class='title'>{{result.title}}</view>
		<view class='tt_descipt' v-if="result.despArr && result.despArr.length>0">
			<view class='descipt_item' v-for="desp in result.despArr">{{desp}}</view>
		</view>
	</view>
</template>

<script>
	import{http} from "@/util/http.js"
	export default {
		data() {
			return {
				result:{}
			}
		},
		onLoad(dd){
			console.log(dd)
			this.getData(dd);
		},
		methods: {
			async getData(dd){
				let item = await http({url:"/api/getDetail",data:dd})
					item.despArr = JSON.parse(item.despArr);
					item.picArr = JSON.parse(item.picArr)
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
</style>
