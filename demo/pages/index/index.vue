<template>
	<view class="home">
		<view class="out">
			<view class="row" v-for="item in listArr" :key="item.id">
				<image :src="item.picurl" mode=""></image>
				<view>{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				listArr:[]
			}
		},
		onLoad() {
			uniCloud.callFunction({
				name:"myCloudFun",
				data:{
					num:3
				}
			}).then(res=>{
				this.listArr = res.result
				console.log(this.listArr)
			})
		},
		methods: {

		}
	}
</script>

<style>
.out{
		padding:30rpx;
		.row{
			border-bottom:1px solid #ccc;
			padding:20rpx 0;
		}
	}
</style>
