<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="source"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				source:'',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		onLoad(e){
			console.log(e)
			this.source = e.url;
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
