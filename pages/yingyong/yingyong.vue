<template>
	<view>
		<uni_list>
			<uni-list-item 
			clickable
			v-for='(data,index) in dataList' :key='data.myId' class="item" @click="choseItem(index)"
			direction='column' title="活动简介" note="列表描述信息">
			        <template slot="header">
			            <view class="title">
			                <h2>{{data.title}}</h2>
			                <span>置顶</span>
			            </view>
			        </template>
					
					<template slot="body">
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
					</template>
					
					<template slot="footer">
					    <view class='foot'>
					       <span class='time'>{{data.time}}</span>
					    				  <span>
					    					  <span>浏览：</span>
					    					  <span>{{data.browseCount}}</span>
					    				  </span>
					    				  <span>
					    					  <span class='tag' v-for="(tag,index) in data.tags" :key='index'>{{tag}}</span>
					    				  </span>
					     </view> 
					</template>
			    </uni-list-item>
		</uni_list>
		<view class='dixian' v-if='count === dataList.length'>您已浏览所有羊毛</view>
		<uni-fab ref="fab" :pattern="pattern" 
			:content="content" 
			:horizontal="horizontal" 
			:vertical="vertical" 
			:direction="direction" @trigger="trigger" @fabClick="fabClick" />
	</view>
	
</template>

<script>
	import{http} from "@/util/http.js";
	import config from '@/util/config.js'
	import api from '@/util/api.js'
	import{deepClone} from "@/util/tool.js";
	
	import uniFab from '@/components/uni-fab/uni-fab.vue'
	import uni_list from '@/components/uni-list/uni-list.vue'
	import uni_list_item from '@/components/uni-list-item/uni-list-item.vue'
	
	export default {
		components: {
			uni_list,
			uniFab,
			uni_list_item
		},
		data() {
			return {
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'vertical',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF'
				},
				content: [{
						text: '集结组件',
						active: false
					},
					{
						text: '注册账号',
						active: false
					},
					{
						text: '模版毛线',
						active: false
					},
					{
						text: '模版毛线',
						active: false
					},
					{
						text: '模版毛线',
						active: false
					},
					{
						text: '模版毛线',
						active: false
					},
					{
						text: '模版毛线',
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
			await this.getData(this.currentIndex)
			console.log('refresh');
			uni.stopPullDownRefresh();
		},
		async onReachBottom() {
			
			if(this.count <= this.dataList.length){
				return;
			}
			this.currentIndex++;
			await this.getData(this.currentIndex)
		},
		methods: {
			trigger(e){
				console.log('trigger:: e  ' + e)
			},
			fabClick(e){
				console.log('fabClick  ' + e)
			},
			// handleScroll(){
			// 	// let clientHeight = document.documentElement.clientHeight
			// 	console.log('>>>>>')
			// 	// console.log(clientHeight)
			// 	let dd = this.$refs.container.$el.scrollTop
			// 	let bb = this.$refs.container.$el.scrollHeight
				
			// 	console.log(document.getElementById('xx').scrollTop)
			// 	console.log('dd')
			// 	console.log(dd)
			// 	console.log(bb)
			// },
			// scrollToTop(e){
			// 	console.log('>>>>>>>>>>>e')
			// 	console.log(e)
			// },
			// scroll(e){
			// 	console.log(e)
			// },
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
			async getData(index){
				let item = await http({url:api.getWebList,data:{index:index}})
				this.count = item.count
				
				for(let i = 0; i<item.rows.length; i++){
					item.rows[i].time = new Date(item.rows[i].time).Format('MM-dd')
					
					if(item.rows[i].tags){
						item.rows[i].tags = JSON.parse(item.rows[i].tags)
					}
				}
				
				
				this.dataList = [...this.dataList,...item.rows]
				// console.log(this.dataList)
			}
		}
	}
</script>

<style lang="scss">
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
			margin: 10rpx 0;
			.left{
				width:200rpx;
				max-height:500rpx;
				img{
					width: 200rpx;
					max-height:500rpx;
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
		}
	}
</style>
