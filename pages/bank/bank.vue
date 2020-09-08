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
		<view class="grop">
			<view>平台</view>
			<view>撸券</view>
			<view>周/月</view>
			<view>门店</view>
			<view>出行</view>
			<view>生活</view>
			<view>视频</view>
			<view>抽奖</view>
		</view>
		<view class="list">
			<view class="item">
				<view class="left">
					<view class="commercial">携程</view>
					<view>+</view>
					<view class="bank">农行</view>
				</view>
				
				<view class="content">
					<view class="title">
						<view class="text">农行VISA双标卡（机票券）</view>
						<view class="icon">详情</view>
					</view>
					<view class="sDetail">
						<view>
							每日，抢：满201减200元、满101减100元、满51减50元机票券，活动期每卡限1次，名额有限
						</view>
					</view>
					<view class="router" >活动入口：活动细则阅读原文/携程旅行APP-首页-机票-券（右上角)</view>
				</view>
			</view>
			
			<view class="item">
				<view class="left">
					<view class="commercial">携程</view>
					<view>+</view>
					<view class="bank">农行</view>
				</view>
				
				<view class="content">
					<view  class="title">农行VISA双标卡（机票券）</view>
					<view class="sDetail">
						<view>
							每日，抢：满201减200元、满101减100元、满51减50元机票券，活动期每卡限1次，名额有限
						</view>
					</view>
					<view class="router" >活动入口：活动细则阅读原文/携程旅行APP-首页-机票-券（右上角)</view>
				</view>
			</view>
			
			<view class="item">
				<view class="left">
					<view class="commercial">携程</view>
					<view>+</view>
					<view class="bank">农行</view>
				</view>
				
				<view class="content">
					<view  class="title">农行VISA双标卡（机票券）</view>
					<view class="sDetail">
						<view>
							每日，抢：满201减200元、满101减100元、满51减50元机票券，活动期每卡限1次，名额有限
						</view>
					</view>
					<view class="router" >活动入口：活动细则阅读原文/携程旅行APP-首页-机票-券（右上角)</view>
				</view>
			</view>
			
			<view class="item">
				<view class="left">
					<view class="commercial">携程</view>
					<view>+</view>
					<view class="bank">农行</view>
				</view>
				
				<view class="content">
					<view  class="title">农行VISA双标卡（机票券）</view>
					<view class="sDetail">
						<view>
							每日，抢：满201减200元、满101减100元、满51减50元机票券，活动期每卡限1次，名额有限
						</view>
					</view>
					<view class="router" >活动入口：活动细则阅读原文/携程旅行APP-首页-机票-券（右上角)</view>
				</view>
			</view>
			
			<view class="item">
				<view class="left">
					<view class="commercial">携程</view>
					<view>+</view>
					<view class="bank">农行</view>
				</view>
				
				<view class="content">
					<view  class="title">农行VISA双标卡（机票券）</view>
					<view class="sDetail">
						<view>
							每日，抢：满201减200元、满101减100元、满51减50元机票券，活动期每卡限1次，名额有限
						</view>
					</view>
					<view class="router" >活动入口：活动细则阅读原文/携程旅行APP-首页-机票-券（右上角)</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import{dateFormat,get3MonthBefor} from "@/util/tool.js"
	export default {
		components: {
		        uniCalendar
		},
		onLoad(){
			let date = new Date();
			this.today = dateFormat("YYYY-mm-dd",date);
			this.endDate = this.today;
			
			let threeMonthAgo = get3MonthBefor();
			let threeDate = new Date(threeMonthAgo);
			
			this.startDate = dateFormat("YYYY-mm-dd", threeDate);
		},
		data() {
			return {
				today:"",
				startDate:"",
				endDate:""
			}
		},
		methods: {
			change(){
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
			display: flex;
			padding: 2rpx 10rpx;
			margin-bottom:3px;
			background:#fff;
			.left{
				display: flex;
				flex-direction: column;
				justify-content: center;
				text-align: center;
				font-weight: bold;
				width:140rpx;
			}
			
			.content{
				width:590rpx;
				padding:10rpx 5rpx;
				.title{
					display:flex;
					justify-content:space-between;
					.text{
						text-decoration:underline;
					}
					.icon{
						font-size: 12px;
						width:50px;
						height:20px;
						line-height: 20px;
						text-align: center;
						color:$wool-text-color;
						background: $wool-bg-color;
					}
				}
				.sDetail{
					font-size: 16px;
					padding-top: 6px;
				}
				.router{
					font-size: 12px;
					padding-top: 4px;
				}
			}
		}
	}
	
</style>
