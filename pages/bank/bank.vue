<template>
	<view>
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
		<!-- <view class="grop">
			<view>平台</view>
			<view>撸券</view>
			<view>周/月</view>
			<view>门店</view>
			<view>出行</view>
			<view>生活</view>
			<view>视频</view>
			<view>抽奖</view>
		</view> -->
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
									<image src='/static/0d8e5464-223e-4f25-83a8-7b9efd926767.png' mode='aspectFit'></image>
									<view class="text">{{data.title}}</view>
									<view class="icon" v-if="data.detailUrl">详情</view>
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
			
			
			<!-- <view class="item" v-for="item in listDate" @click="choseOne(item)"> -->
				<!-- <view class="left">
					<view class="commercial">{{item.commercial}}</view>
					<view>+</view>
					<view class="bank">{{item.bank}}</view>
				</view> -->
				
				<!-- <view class="content">
					<view class="title">
						<view class="text">{{item.title}}</view>
						<view class="icon" v-if="item.detailUrl">详情</view>
					</view>
					<view class="sDetail">
						<view v-for="descrip in item.description">
							{{descrip}}
						</view>
					</view>
					<view class="router" >{{item.router}}</view>
				</view> -->
			<!-- </view> -->
		</view>
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
			this.endDate = this.today;
			
			let threeMonthAgo = get3MonthBefor();
			let threeDate = new Date(threeMonthAgo);
			
			this.today = '2020-09-09'
			this.getDate(this.today);
			
		},
		data() {
			return {
				today:"",
				startDate:"",
				endDate:"",
				listDate:[]
			}
		},
		methods: {
			async getDate(day){
				let dd = await http({url:api.getBankList,
									data:{date:day}});
						
					this.listDate  = dd.map((item)=>{
						item.description = JSON.parse(item.description)
						item.groupArr = JSON.parse(item.groupArr)
						return item
					})
					console.log(this.listDate.length)
					// this.listDate = dd;
				 //   console.log("getDate::"+ JSON.stringify(dd))
			},
			choseItem(item){
				console.log('click  id   ' + item.myId);
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
			confirm(e){
				console.log(e);
				this.today = e.fulldate;
			}
		}
	}
</script>

<style lang="scss">
	.head{
		padding-top: 30rpx;
		width:730rpx;
		height: 160rpx;
		background:$wool-bg-color;
		text-align: center;
		line-height: 70rpx;
		color: $wool-text-color;
		margin:5rpx 10rpx;
		
	}
	.grop{
		display: flex;
		flex-wrap: wrap;
		margin: 10rpx 11rpx;
		view{
			width:94rpx;
			height:94rpx;
			margin: 20rpx 40rpx;
			border-radius: 50rpx;
			line-height: 102rpx;
			color: $wool-bg-color;
			text-align: center;
			border: 2px solid $wool-bg-color;
			font-size: 16px;
			
		}
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
