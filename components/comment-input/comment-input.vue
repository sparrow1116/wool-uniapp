<template>
	
	<view class='searchBlock'>
		<!-- <image v-if='!isFocus' mode="aspectFill" :src='isLogin?"/static/pinglun-active.png":"/static/pinglun.png"'></image> -->
		<input id="editor" :style='{"border-color": isLogin ? "#ff3300":"#515151"}' 
		:class="{blurEdit:!isFocus,focusEdit:isFocus}" 
		v-model="value"
		@focus="onfocus" 
		@blur="onblur" placeholder="写评论..."  />
		<view class='publish' v-if='isFocus'  @click="publish">
			<image  mode="aspectFill" src='/static/fabu-active.png'></image>
			<text >发布</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		props:{
			
			isLogin:{
				type:Boolean,
				default: false
			}
		},
		data() {
			return {
				value:'',
				isFocus: false
			}
		},
		methods: {
			onEditorReady(){
				
			},
			onfocus(){
				if(!this.isLogin){
					uni.showToast({
						title:'登录后才能评论'
					})
					return
				}
				this.isFocus = true;
				console.log('onfocus')
			},
			onblur(a,b,c){
				console.log('onblur')
				console.log(a)
				setTimeout(()=>{
					this.isFocus = false;
				},200)
				
			},
			publish(){
				console.log('publish')
				if(this.value){
					this.$emit('publish',this.value)
					this.value = ''
				}
				
			}
		}
	}
	
</script>

<style lang="scss">
	.searchBlock{
		position: fixed;
		width:100%;
		bottom:0;
		display: flex;
		background: #fff;
		text-align: center;
		margin-top: 20rpx;
		padding-bottom:10rpx;
		justify-content: space-between;
		image{
			float: left;
			width:34rpx;
			height:34rpx;
			top:10rpx;
			left:22rpx;
		}
		.focusEdit{
			border:1px solid;
			width:550rpx;
			min-height:200rpx;
			text-align: left;
			height:200rpx;
			margin: 10rpx 0 0 10rpx;
			
		}
		.blurEdit{
			width: 630rpx;
			height: 60rpx;
			border:1px solid;
			border-radius: 30rpx;
			padding-left:70rpx;
			text-align: left;
			min-height: 60rpx;
			margin: 0 auto;
		}
		.publish{
			display: flex;
			justify-content: space-around;
			flex-direction: column;
			width:150rpx;
			text-align: center;
			color: $wool-bg-color;
			image{
				margin:30rpx 0 0 16rpx;
				width: 70rpx;
				height: 70rpx;
			}
			text{
				margin-bottom: 30rpx;
			}
		}
	}
	
	
</style>
