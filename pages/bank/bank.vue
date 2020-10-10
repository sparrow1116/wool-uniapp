<template>
	<view style="background-color: #fff;">
		<view style='text-align: center; padding-top:20rpx'>
			<image sytle='height:200rpx' src='../../static/wool-logo.png' mode='widthFix'></image>
		</view>
		
		<view class="head">
			<view @click="popupDatePan">每日银行精选</view>
			<view @click="popupDatePan">{{today}}</view>
			 <uni-calendar 
			     :insert="false"
				 ref="calendar"
				 :startDate="startDate"
				 :endDate="endDate"
				 @confirm="confirm"
			     @change="change"
			      />
		</view>
		
		<view class="list">
			
			<uni_list>
				<uni-list-item 
				clickable
				v-for='(data,index) in listDate' :key='data.myId' @click="choseItem(data)" class='item'
				direction='column' title="活动简介" note="列表描述信息">
				        <template slot="header">
							<view></view>
						</template>
						<template slot="body">
							<view >
								<view class="title">
									<image :src='data.BankIcon' mode='aspectFit'></image>
									<view class="text">{{data.title}}</view>
									<view class="icon" v-if="data.detailUrl">详情</view>
									<view style='width:70rpx' v-if="!data.detailUrl"></view>
								</view>
								
								<view class="content">
									<view class="sDetail">
										<view v-for="descrip in data.description">
											{{descrip}}
										</view>
									</view>
									<view class="router" v-if='data.router'>{{data.router}}</view>
								</view>
							</view>
						</template>
						<template slot="footer">
							<view></view>
						</template>
				    </uni-list-item>
			</uni_list>
			<view class='dixian' v-if='count === listDate.length'>今天就这么多活动了</view>
		</view>
		<uni-fab ref="fab" :pattern="pattern"
			:content="content" 
			horizontal="right" 
			vertical="bottom" 
			direction="vertical" @trigger="trigger" />
	</view>
	
</template>

<script>
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import uniFab from '@/components/uni-fab/uni-fab.vue'
	import uni_list from '@/components/uni-list/uni-list.vue'
	import uni_list_item from '@/components/uni-list-item/uni-list-item.vue'
	import uniCard from '@/components/uni-card/uni-card.vue'
	
	import{get3MonthBefor} from "@/util/tool.js";
	import{http} from "@/util/http.js"
	import api from '@/util/api.js'
	import config from '@/util/config.js'
	
	export default {
		components: {
		        uniCalendar,
				uni_list,
				uni_list_item,
				uniFab,
				uniCard
		},
		onLoad(){
			let date = new Date();
			this.today = date.Format("yyyy-MM-dd",date);
			// this.endDate = this.today;
			
			let threeMonthAgo = get3MonthBefor();
			let threeDate = new Date(threeMonthAgo);
			this.currentIndex = 0;
			// this.today = '2020-09-09'
			this.getData();
			
		},
		async onPullDownRefresh() {
			this.listDate = [];
			this.currentIndex = 0;
			await this.getData()
			console.log('refresh');
			uni.stopPullDownRefresh();
		},
		async onReachBottom() {
			
			if(this.count <= this.listDate.length){
				return;
			}
			this.currentIndex++;
			await this.getData()
		},
		data() {
			return {
				today:"",
				startDate:"",
				endDate:"",
				count:0,
				listDate:[],
				pattern: {
					color: '#515151',
					backgroundColor: '#fff',
					selectedColor: '#FF3300',
					buttonColor: '#FF3300'
				},
				filter:'',
				content: [{
					
						text: '平台',
						iconPath:'/static/bilei.png',
						selectedIconPath:'/static/bilei-active.png',
						active: false
					},
					{
						text: '撸券',
						iconPath:'/static/zhanghao.png',
						selectedIconPath:'/static/zhanghao-active.png',
						active: false
					},
					{
						text: '周/月刷',
						iconPath:'/static/tuiguang.png',
						selectedIconPath:'/static/tuiguang-active.png',
						active: false
					},
					{
						text: '门店',
						iconPath:'/static/pingtai.png',
						selectedIconPath:'/static/pingtai-active.png',
						active: false
					},
					{
						text: '出行',
						iconPath:'/static/jingyan.png',
						selectedIconPath:'/static/jingyan-active.png',
						active: false
					},
					{
						text: '生活',
						iconPath:'/static/renwu.png',
						selectedIconPath:'/static/renwu-active.png',
						active: false
					},
					{
						iconPath:'/static/other.png',
						selectedIconPath:'/static/other-active.png',
						text: '视频',
						active: false
					},
					{
						iconPath:'/static/other.png',
						selectedIconPath:'/static/other-active.png',
						text: '抽奖',
						active: false
					}
				]
			}
		},
		methods: {
			trigger(e){
				console.log('trigger:: e  ' + e)
				if(this.content[e.index].active){
					this.filter = ''
					this.content[e.index].active = false;
				}else{
					this.filter = this.content[e.index].text;
					this.content.map((content,index)=>{
						if(index == e.index){
							content.active = true;
						}else{
							content.active = false
						}
					})
				}
				this.currentIndex = 0
				this.getData()
			},
			async getData(){
				let dd = await http({url:api.getBankList,
									data:{date:this.today,
											index:this.currentIndex,
											filter:this.filter}});
					this.count = dd.count	
					dd.rows = dd.rows.map((item)=>{
						item.description = JSON.parse(item.description)
						item.groupArr = JSON.parse(item.groupArr)
						if(item.bank){
							item.BankIcon = config.bankIconDomain + encodeURIComponent(item.bank) + '.png'
						}
						return item
					})
					if(this.currentIndex == 0){
						this.listDate = dd.rows
					}else{
						this.listDate = [...this.listDate,...dd.rows]
					}
					console.log(this.listDate.length)
					// this.listDate = dd;
				 //   console.log("getDate::"+ JSON.stringify(dd))
			},
			choseItem(item){
				console.log('click  id   ' + item.myId);
				if(!item.detailUrl){
					uni.showToast({
					    title: '此条无详情',
					    duration: 2000
					});
					return
				}
				uni.navigateTo({
					url:'/pages/bank/detail?myId=' + item.myId,
					success:()=>{
						console.log('gotoDetail')
					},
					error:()=>{
						console.log('finish')
					}
				})
				console.log('finish')
			},
			popupDatePan(){
				this.$refs.calendar.open();
			},
			async confirm(e){
				console.log(e);
				this.today = e.fulldate;
				
				this.listDate = [];
				this.currentIndex = 0;
				let selectTime = new Date(e.fulldate + ' 00:00:00').valueOf();
				let startTime = new Date('2020-10-01 00:00:00').valueOf()
				if(selectTime<startTime){
					uni.showToast({
					    title: '本站2020-10-01上线',
					    duration: 2000
					});
				}else{
					await this.getData()
				}
			}
		}
	}
</script>

<style lang="scss">
	.head{
		padding-top: 30rpx;
		width:730rpx;
		height: 160rpx;
		// background:$wool-bg-color;
		text-align: center;
		line-height: 70rpx;
		color: $wool-bg-color;
		margin:5rpx 10rpx;
		
	}
	.dixian{
		text-align: center;
		font-size: $wool-tag-size;
		padding: 20rpx 0;
	}
	.list{
		.item{
			border-bottom: 1px dashed $wool-bg-color;
			.title{
				display: flex;
				justify-content: space-between;
				image{
					width:50rpx;
					height:50rpx;
				}
				.text{
					width:540rpx;
				}
				.icon{
					padding:5rpx 10rpx;
					height:36rpx;
					border-radius: 10rpx;
					font-size: $wool-tag-size;
					color: $wool-bg-color;
					border: 1px solid $wool-bg-color
				}
			}
		
			.content{
				padding:10rpx 20rpx;
				.sDetail{
					font-size: $wool-text-size;
					line-height:50rpx;
					
				}
				.router{
					font-size: $wool-tag-size;
					padding-top: 20rpx;
				}
			}
		}
	}
	
</style>
