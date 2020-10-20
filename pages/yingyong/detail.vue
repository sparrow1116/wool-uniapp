<template>
	<view class='detail'>
		<view class='title'>
		  <view>{{detailData.title}}</view>
		</view>
		<view class='content'>
			<view class='block' v-for='(block,index) in detailData.contentArr' :key='index'>
			  <view class="content">
				<view style='text-align: left' v-if='block.type == "text"'>{{block.data}}
				</view>
				<image class='img' v-if='block.type =="img"' :title='detailData.title'
					mode='widthFix'
					@click=previewPic(index)
					:src='block.data'/>
			  </view>
			</view>
		</view>
		<view class='erweima'>
			<image mode="widthFix" src='/static/erweima_logo.png'></image>
			<image mode="widthFix" src='https://wollpic.oss-cn-shanghai.aliyuncs.com/zhuanyoutupian/erweima.png'></image>
		</view>
	</view>
</template>

<script>
	import{http} from "@/util/http.js";
	import api from '@/util/api.js';
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
			},
			previewPic(index){
				let imgArr = []
				let currentIndex = 0
				for(let i = 0; i<this.detailData.contentArr.length; i++){
					if(this.detailData.contentArr[i].type === 'img'){
						imgArr.push(this.detailData.contentArr[i].data)
					}
					if(index == i){
						currentIndex = imgArr.length -1
					}
				}
				
				uni.previewImage({
					urls:imgArr,
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
			}
		}
	}
</script>

<style lang="scss">
	.detail{
		padding:20rpx;
		.erweima{
			background: #fff;
			align-items: center;
			display: flex;
			padding:20rpx 20rpx;
			height: 340rpx;
		}
		.title{
			font-size: 20px;
			font-weight: bold;
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
				.img{
					width: 700rpx;
				}
			}
		}
	}
	
</style>
