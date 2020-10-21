<template>
	<view>
		<uni-collapse accordion="true">
		    <uni-collapse-item title="购物平台" showAnimation=true>
		        <view style="padding: 10rpx;">
		            由于淘宝联盟、京东联盟、拼多多联盟、苏宁联盟等平台为商家提供的推广平台。
					导致很多返利、优惠券、领券的平台出现
		        </view>
				<view style="padding: 10rpx;">
				    以淘宝联盟为例：商户在淘宝联盟上发布推广补贴或优惠券，各返利优惠平台通过淘宝联盟的api,获得信息
					推广给用户，用户通过推广链接购买。推广平台拿返利，这些一级分销拿的返利是最多的
				</view>
				<view style="padding: 10rpx;">
					所以我们可以自己下载淘宝联盟等app。平时自己购物或者推广都有返利，
				</view>
				<view style="padding: 10rpx;">
					有时我们会发现这些二级的返利平台，比一级的返利还高。因为这些返利平台在一级平台那边的登记比我们普通
					用户要高的多，拿的返利比我们个人就要多，再加上这些平台还需要做活动来吸引用户，价格就更具有竞争力
				</view>
				<view style="padding: 10rpx;">
					本站会推广一些购物平台，一些小的平台参加一些0撸，和优惠活动就行，
					有时官方推荐的返利平台，建议大家收藏，时不时用一下还是很优惠的。
				</view>
		    </uni-collapse-item>
		    <uni-collapse-item title="币类">
		        <view style="padding: 10rpx;">
		            随着比特币的大风吹过，国内各种币层出不穷，本站会精选一些作为推广。
					币类一般最后都是挂的，大家切忌0撸。本站抱团一个平台一月可撸200~400.
		        </view>
				<view style="padding: 10rpx;">
				    币类的玩法基本都是每天登录做简单任务30~45天后，产出的币就可以出售
				</view>
				<view style="padding: 10rpx;">
				    币类的坑：首先这些基本都是要挂的，都是杀猪盘，经常任务做着就倒闭了
					其次，这些平台还都要实名认证，有的还需要支付0.5~1.5元，有的需要手拿身份证。
					最后，辛苦挂完1月并不能卖，需要推广3~5人或者复投一次
				</view>
		    </uni-collapse-item>
		    <uni-collapse-item title="银行证券">
		        <view style="padding: 10rpx;">
		            各大银行，以及银行的分点，证券平台，一般会有丰厚的开户奖励。
					大家可以放心撸，也就多收几个短信，嫌烦退订就可以。撸个开户奖以后
					说不定还能用到
		        </view>
		    </uni-collapse-item>
			<uni-collapse-item title="挂机软件">
			    <view style="padding: 10rpx;">
			        流量就互联网的命门，微信公众号关注，抖音点赞都是来获取流量的，
					一般手动看30s的广告是2分钱，最好的点赞一次能有2毛钱
			    </view>
				<view style="padding: 10rpx;">
				    挂机软件就是程序员写的一个小程序，自定的关注公众号。点赞，刷视频。
				</view>
				<view style="padding: 10rpx;">
				    多个账号挂机收费还是非常可观的。
				</view>
				<view style="padding: 10rpx;">
				    挂机的坑，有的挂机软件刷的太狠会被微信官方识别，微信会封号
					吧姐会甄选的挂机软件以及一些风险提示
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="扫码打码">
			    <view style="padding: 10rpx;">
			        商家为返利客户做一物一码的返利。
			    </view>
				<view style="padding: 10rpx;">
				    但很多码会被中间商收集到打码平台，打码平台再发布给撸友
				</view>
				<view style="padding: 10rpx;">
				    打码扫码每天撸个10单，撸个3~5元爽歪歪
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="转发签到">
			    <view style="padding: 10rpx;">
			        签到:每天开启应用点击一下，一般在0.5元左右
			    </view>
				<view style="padding: 10rpx;">
				    转发类的app列出一些文章，转发微信朋友圈等，用户有效阅读后，
					就会产生收益
				</view>
				<view style="padding: 10rpx;">
				    转发类的坑：一般有用户有效阅读，一天最高收益限制。所以转发的app，一个
					一天收益一般在2~5元
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="应用推广">
				    <view style="padding: 10rpx;">
				        除了购物类、银行证券。其他各式各样的app新上线都会有比较丰厚的奖励。
						这些公司后浪退前浪，不知道能活多久。我们只管0撸，不薅白不薅。
				    </view>
			</uni-collapse-item>
			
			<uni-collapse-item title="银行汇总">
				    <view style="padding: 10rpx;">
				        各大银行为了促进消费，以及推广自家信用卡的使用，推出各种优惠活动。
						此类活动大家可以放心大胆的撸。平时都是有些小毛，年底等时刻会有比较大的毛。
						本站每天更新各大银行的活动，并保存过去3个月的活动供撸友们查阅
				    </view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components: {
		        uniCollapse,uniCollapseItem
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
