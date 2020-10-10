<template>
	<view>
		<view class='searchBlock'>
			<image style="height:70rpx; padding:20rpx; width:240rpx;" mode="aspectFill" src='/static/logo-search.png'></image>
			<view style="width: 380rpx;">
				<input class="uni-input self-search"
					v-model="searchValue"
					@confirm='search'
				 @focus='inputFocus' 
				 confirm-type="search" placeholder="请输入搜索内容" />
			</view>
			<text v-if='isFocus'  @click="cancelS">取消</text>
		</view>
		<view class='classContainer'>
			<uni_list>
				<uni-list-item 
				clickable
				v-for='(data,index) in dataList' :key='data.myId' class="item" @click="choseItem(index)"
				direction='column' title="活动简介" note="列表描述信息">
				        <template slot="header">
				            <view class="title">
				                <view>{{data.title}}</view>
				            </view>
				        </template>
						
						<template slot="body">
						    <view class='body'>
						      <view class='left'>
						        <image class='img' mode='aspectFit' :src=data.headImg />
						      </view>
						      <view class="right">
						          <view class='content'>
						              {{data.desciption}}
						          </view>
						      </view>
						    </view> 
						</template>
						
						<template slot="footer">
						    <view class='foot'>
						       <text class='time'>{{data.time}}</text>
						    				  <text>
						    					  <text>浏览：</text>
						    					  <text>{{data.browseCount}}</text>
						    				  </text>
						    				  <text>
						    					  <text class='tag' v-for="(tag,index) in data.tags" :key='index'>{{tag}}</text>
						    				  </text>
						     </view> 
						</template>
				    </uni-list-item>
			</uni_list>
		</view>
		
		<view class='dixian' v-if='count === dataList.length'>您已浏览所有羊毛</view>
		<uni-fab ref="fab" :pattern="pattern" 
			:content="content" 
			horizontal="right" 
			vertical="bottom" 
			direction="vertical" @trigger="trigger" @fabClick="fabClick" />
	</view>
	
</template>

<script>
	import{http} from "@/util/http.js";
	import config from '@/util/config.js'
	import api from '@/util/api.js'
	import{deepClone} from "@/util/tool.js";
	
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniFab from '@/components/uni-fab/uni-fab.vue'
	import uni_list from '@/components/uni-list/uni-list.vue'
	import uni_list_item from '@/components/uni-list-item/uni-list-item.vue'
	
	export default {
		components: {
			uniFab,
			uni_list,
			uni_list_item
		},
		data() {
			return {
				searchValue:'',
				isFocus:false,
				pattern: {
					color: '#515151',
					backgroundColor: '#fff',
					selectedColor: '#FF3300',
					buttonColor: '#FF3300'
				},
				currentText:'',
				content: [{
					
						text: '币类',
						iconPath:'/static/bilei.png',
						selectedIconPath:'/static/bilei-active.png',
						active: false
					},
					{
						text: '注册账号',
						iconPath:'/static/zhanghao.png',
						selectedIconPath:'/static/zhanghao-active.png',
						active: false
					},
					{
						text: '应用推广',
						iconPath:'/static/tuiguang.png',
						selectedIconPath:'/static/tuiguang-active.png',
						active: false
					},
					{
						text: '巨头应用',
						iconPath:'/static/pingtai.png',
						selectedIconPath:'/static/pingtai-active.png',
						active: false
					},
					{
						text: '羊毛经验',
						iconPath:'/static/jingyan.png',
						selectedIconPath:'/static/jingyan-active.png',
						active: false
					},
					{
						text: '手机任务',
						iconPath:'/static/renwu.png',
						selectedIconPath:'/static/renwu-active.png',
						active: false
					},
					{
						iconPath:'/static/other.png',
						selectedIconPath:'/static/other-active.png',
						text: '其他',
						active: false
					}
				],
				dataList:[],
				count:0
			}
		},
		onLoad(){
			this.currentIndex = 0;
			this.getData(this.currentIndex)
			 // window.addEventListener('scroll', this.handleScroll, true);
		},
		onUnload(){
			// window.removeEventListener('scroll', this.handleScroll);
		},
		async onPullDownRefresh() {
			this.dataList = [];
			this.currentIndex = 0;
			await this.getData()
			console.log('refresh');
			uni.stopPullDownRefresh();
		},
		async onReachBottom() {
			
			if(this.count <= this.dataList.length){
				return;
			}
			this.currentIndex++;
			await this.getData()
		},
		methods: {
			inputFocus(){
				this.isFocus = true
				console.log('onfocus')
			},
			// inputBlur(){
			// 	this.isFocus = false;
			// },
			cancelS(){
				console.log('click cancel')
				this.isFocus = false;
				this.searchValue = ''
				this.currentText = ''
				this.currentIndex = 0
				this.getData()
			},
			search(){
				// this.searchValue = this.inputText
				this.currentText = ''
				this.currentIndex = 0
				this.getData();
			},
			
			trigger(e){
				console.log('trigger:: e  ' + e)
				if(this.content[e.index].active){
					this.currentText = ''
					this.content[e.index].active = false;
				}else{
					this.currentText = this.content[e.index].text;
					this.content.map((content,index)=>{
						if(index == e.index){
							content.active = true;
						}else{
							content.active = false
						}
					})
				}
				this.currentIndex = 0;
				this.getData()
			},
			fabClick(e){
				console.log('fabClick  ' + e)
			},
			choseItem(index){
				console.log(index)
				
				uni.navigateTo({
					url:'/pages/yingyong/detail?myId=' + this.dataList[index].myId,
					success:()=>{
						console.log('gotoDetail')
					},
					error:()=>{
						console.log('finish')
					}
				})
				
			},
			async getData(){
				console.log('getData')
				console.log(this.searchValue)
				let item = await http({url:api.getWebList,data:{
					index:this.currentIndex,
					search:this.searchValue,
					tag:this.currentText}})
				this.count = item.count
				
				for(let i = 0; i<item.rows.length; i++){
					item.rows[i].time = new Date(item.rows[i].time).Format('MM-dd')
					
					if(item.rows[i].tags){
						item.rows[i].tags = JSON.parse(item.rows[i].tags)
					}
				}
				if(this.currentIndex == 0){
					this.dataList = item.rows
				}else{
					this.dataList = [...this.dataList,...item.rows]
				}
				
				
				// console.log(this.dataList)
			}
		}
	}
</script>

<style lang="scss">
	/* #ifdef H5 */
	.searchBlock{
		display: flex;
		position: fixed;
		width:100%;
		z-index:1000;
		top: 90rpx;
		height:110rpx;
		background: #fff;
		align-items:center;
		justify-content: space-between;
		
		text{
			font-size: 14px;
			padding-right: 20rpx;
		}
	}
	.classContainer{
		margin-top:110rpx;
	}
	/* #endif */
	
	/* #ifdef MP-WEIXIN */
	.searchBlock{
		display: flex;
		position: fixed;
		width:100%;
		z-index:1000;
		top: 0;
		height:110rpx;
		background: #fff;
		justify-content: space-between;
		align-items:center;
		text{
			font-size: 14px;
			// padding-top: 18px;
			padding-right: 5px;
		}
	}
	.classContainer{
		margin-top:90rpx;
	}
	/* #endif */
	
	.self-search{
		height:70rpx;
		border: 1px solid #ccc;
		border-radius: 35rpx;
		// margin-top:20rpx;
		padding-left:40rpx;
		margin-right:20rpx;
	}
	
	.dixian{
		text-align: center;
		font-size: $wool-tag-size;
		padding: 20rpx 0;
	}
	.scroll-Y{
		height:1500rpx;
	}
	.item{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-bottom: 1px dashed $wool-bg-color;
		.title{
			display: flex;
			justify-content: space-between;
			
			font-size:$wool-title-size;
			
			
		}
		.body{
			display: flex;
			margin: 20rpx 0;
			.left{
				width:200rpx;
				max-height:500rpx;
				.img{
					width: 200rpx;
					max-height:150rpx;
				}
			}
			.right{
				font-size: $wool-text-size;
				padding: 0 0 0 10rpx;
				.content{
					line-height: 22px;
				  text-align: left;
				  text-overflow: -o-ellipsis-lastline;
				  overflow: hidden;
				  text-overflow: ellipsis;
				  display: -webkit-box;
				  -webkit-line-clamp: 3;
				  -webkit-box-orient: vertical;
				}
			}
		}
		.foot{
			display: flex;
			justify-content: space-between;
			font-size:$wool-tag-size;
			.tag{
				margin-right:10rpx;
			}
		}
	}
</style>
