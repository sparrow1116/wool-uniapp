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
			<view class="item" v-for="item in listDate" @click="choseOne(item)">
				<view class="left">
					<view class="commercial">{{item.commercial}}</view>
					<view>+</view>
					<view class="bank">{{item.bank}}</view>
				</view>
				
				<view class="content">
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
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import{dateFormat,get3MonthBefor} from "@/util/tool.js";
	import{http} from "@/util/http.js"
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
			
			// this.startDate = dateFormat("YYYY-mm-dd", threeDate);
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
				let dd = await http({url:"/api/getDataList",
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
			choseOne(item){
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
				background:$wool-bg-color;
				color:$wool-text-color;
				width:170rpx;
			}
			
			.content{
				width:590rpx;
				padding:10rpx 20rpx;
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
					font-size: 14px;
					line-height:20px;
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
