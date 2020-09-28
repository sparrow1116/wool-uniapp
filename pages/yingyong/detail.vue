<template>
	<view class='detail'>
		<view class='title'>
		  <h2>{{detailData.title}}</h2>
		</view>
		<view class='content'>
			<view class='block' v-for='(block,index) in detailData.contentArr' :key='index'>
			  <view class="content">
				<p style='text-align: left' v-if='block.type == "text"'>{{block.data}}
				</p>
				<img v-if='block.type =="img"' :title='detailData.title'
					:src='block.data'/>
			  </view>
			</view>
		</view>
	</view>
</template>

<script>
	import{http} from "@/util/http.js";
	import api from '@/util/api.js'
	export default {
		onLoad(dd){
			console.log(dd)
			this.getData(dd);
		},
		data() {
			return {
				detailData:{}
			}
		},
		methods: {
			async getData(dd){
				let item = await http({url:api.getWebDetail,data:dd})
				item.contentArr = JSON.parse(item.contentArr)
				this.detailData = item;
			}
		}
	}
</script>

<style lang="scss">
	.detail{
		padding:20rpx;
		.title{
			font-size: $wool-title-size;
		}
		.content{
			padding-top: 20rpx;
			text-align: center;
			.block{
				font-size: $wool-text-size;
				line-height: 26px;
				p{
					text-align: left;
				}
				img{
					max-width: 680rpx;
				}
			}
		}
	}
	
</style>
