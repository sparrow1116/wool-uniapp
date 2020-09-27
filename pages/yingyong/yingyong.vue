<template>
	<view>
		<view v-for='(data,index) in dataList' :key='data.myId' class="item" @click="choseItem(index)">
		        
		  <view class="title">
		      <h2>{{data.title}}</h2>
		      <span>置顶</span>
		  </view>
		  <view class='body'> 
		    <view class='left'>
		      <img :src=data.headImg />
		    </view>
		    <view class="right">
		        <view class='content'>
		            {{data.desciption}}
		        </view>
		    </view>
		  </view> 
		   <view class='foot'>
		      <span class='time'>{{data.time}}</span>
		      <span>浏览：</span>
		      <span>{{data.browseCount}}</span>
		      <span class='tag' v-for="(tag,index) in data.tags" :key='index'>{{tag}}</span>
		    </view> 
		</view>
	</view>
</template>

<script>
	import{http} from "@/util/http.js";
	import config from '@/util/config.js'
	import api from '@/util/api.js'
	import{deepClone} from "@/util/tool.js";
	export default {
		data() {
			return {
				dataList:[]
			}
		},
		onLoad(){
			this.getData(0)
		},
		methods: {
			choseItem(index){
				console.log(index)
			},
			async getData(index){
				let item = await http({url:api.getWebList,data:{index:index}})
				this.count = item.count
				
				this.dataList = [...this.dataList,...item.rows]
				console.log(this.dataList)
			}
		}
	}
</script>

<style lang="scss">
	.item{
		padding: 30rpx 20rpx;
		border-bottom: 1px dashed $wool-bg-color;
		.title{
			display: flex;
			justify-content: space-between;
			h2{
				font-size:$wool-title-size;
				width: 600rpx;
			}
			span{
				font-size: $wool-text-size;
				border-radius: 5px;
				width:60rpx;
				height:36rpx;
				padding:6rpx 15rpx;
				border: 1px solid $wool-bg-color;
			}
		}
		.body{
			display: flex;
			.left{
				width:200rpx;
				height:500rpx;
				img{
					width: 200rpx;
					max-height:500rpx;
				}
			}
		}
	}
</style>
