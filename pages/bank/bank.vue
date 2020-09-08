<template>
	<view>
		<view class="title">
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
			<view>撸券</view>true
			<view>周/月刷fdsafdsafdsafdsafdsa</view>
			<view>门店</view>
			<view>出行</view>
			<view>生活</view>true
			<view>视频卡</view>
			<view>抽奖</view>
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
	.title{
		padding-top: 30rpx;
		width:730rpx;
		height: 160rpx;
		background:red;
		text-align: center;
		line-height: 70rpx;
		color: $wool-text-color;
		margin:5rpx 10rpx;
		
	}
	
</style>
