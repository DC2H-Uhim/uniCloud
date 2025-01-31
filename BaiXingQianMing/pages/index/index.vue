<template>
	<view class="content">
		<view class="center-box">
			<view class="center-panel">
				{{formData}}
				<!-- 选择性别 -->
				<view class="form-item">
					<view class="gender-select">
						<view class="gender-item" @click="genderChange('男')">
							<image src="/static/boy.png" mode="" :class="{'gender-selected':formData.gender == '男'}"></image>
							<view :class="{'gender-selected-t':formData.gender == '男'}">
								男
							</view>
						</view>
						<view class="gender-item" @click="genderChange('女')">
							<image src="/static/girl.png" mode="" :class="{'gender-selected':formData.gender == '女'}"></image>
							<view :class="{'gender-selected-t':formData.gender == '女'}">
								女
							</view>
						</view>
						<view class="gender-item" @click="genderChange('未知')">
							<image src="/static/unknown.png" mode="" :class="{'gender-selected':formData.gender == '未知'}" style="box-sizing: border-box;padding: 4rpx;"></image>
							<view :class="{'gender-selected-t':formData.gender == '未知'}">
								未知
							</view>
						</view>
					</view>
					
				</view>
			
				<!-- 选择是否已经出生 -->
				<view class="form-item">
					<view class="form-item-label">
						是否出生
					</view>
					<view class="form-item-content">
						<radio-group name="" @change="radioChange">
							<label>
								<radio value="已出生" color="red" style="transform: scale(0.8);"/><text>已出生</text>
							</label>
							<label>
								<radio value="未出生" color="red" style="transform: scale(0.8);"/><text>未出生</text>
							</label>
						</radio-group>
					</view>
				</view>
				
				<!-- 输入姓氏 -->
				<view class="form-item">
					<view class="form-item-label">
						姓氏：
					</view>
					<view class="form-item-content">
						<input type="text" class="input" v-model.trim="formData.firstName"/>
					</view>
				</view>
				
				<!-- 出生时间 -->
				<view class="form-item">
					<view class="form-item-label">
						出生时间：
					</view>
					<view class="form-item-content">
						<view class="input" @click="datetimePicker.open()">
							{{formData.date}}
						</view>
					</view>
				</view>
				
				<!-- 出生地点 -->
				<view class="form-item">
					<view class="form-item-label">
						出生地点：
					</view>
					<view class="form-item-content">
						<view class="input" @click="open">
							{{formData.area}}
						</view>
					</view>
				</view>
				
				<!-- 期望品质 -->
				<view class="form-item">
					<view class="form-item-label">
						期望品质：
					</view>
					<view class="form-item-content">
						<view class="input" @click="openCharacter">
							{{formData.character}}
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<uv-datetime-picker ref="datetimePicker" v-model="datetime" mode="datetime" @confirm="dateTimeConfirm">
		</uv-datetime-picker>
		
		<uv-picker ref="areaPicker" :columns="addressList" keyName="name" @change="areaChange" @confirm="areaConfirm">
				</uv-picker>
		
		<uv-popup ref="popup">
			<view class="popup-panel">
				<view class="popup-top">
					<view class="popup-close" @click="selectCharacterCancel">
						取消
					</view>
					<view class="popup-title">
						品质标签<text>（可选 {{3-selectCharacterList.length}}/3）</text>
					</view>
					<view class="popup-ok" @click="selectCharacterOk">
						确定
					</view>
				</view>
				<view class="character-tags">
					<view class="character-tag" v-for="(c,i) in characters" @click="selectCharacter(c,i)">
						<view class="tag-inner" :class="{'tag-active': selectCharacterList.includes(c)}">
							{{c}}
						</view>
					</view>
				</view>
			</view>
		</uv-popup>
		
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {timeFormat, toast } from '@/uni_modules/uv-ui-tools/libs/function/index.js'
	
	/*--------------表单数据--------------*/
	const formData = ref({
		gender: "未知",
		firstName: "",
		date: "",
		area: "",
		isBorn: "已出生",
		character: ""
	})
	
	/*--------------选择性别--------------*/
	const gender = ref('男')
	const genderChange = (val) =>{
		formData.value.gender = val
	}
	
	/*--------------是否出生--------------*/
	const radioChange = (evt) =>{
		console.log(evt)
		formData.value.isBorn = evt.detail.value
	}
	
	/*--------------出生日期--------------*/
	const datetimePicker = ref()
	const datetime = ref(Number(new Date()))
	function dateTimeConfirm(e){
		formData.value.date = timeFormat(e.value,"yyyy-mm-dd hh:MM")
	}
	const openTimePicker = () =>{
		datetimePicker.value?.open()
	}
	
	/*--------------出生地点--------------*/
	import useArea from '@/hooks/useArea.js'
	const [areaPicker,addressList,areaChange,areaConfirm ,open] = useArea((area) => {
		formData.value.area = area
	})
	
	/*--------------期望品质--------------*/
	import charactersArr from './characters.js'
	const popup = ref()
	const characters = ref(charactersArr)
	const selectCharacterList = ref([])
	const openCharacter = () =>{
		popup.value?.open('bottom')
	}
	const selectCharacterCancel = () =>{
		selectCharacterList.value = []
		
		popup.value?.close()
	}
	const selectCharacterOk = () =>{
		formData.value.character = selectCharacterList.value.join(",")
		popup.value?.close()
	}
	const selectCharacter = (char,i) =>{
		if(selectCharacterList.value.includes(char)){
			selectCharacterList.value = selectCharacterList.value.filter((c => c != char))
		}else{
			if(selectCharacterList.value.length >= 3){
				return
			}else{
				selectCharacterList.value.push(char)
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	.content{
		width: 100%;
		height: 100%;
		background-color: #fff;
	}
	.center-box{
		width:90vw;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		
		.center-panel{
			box-sizing: border-box;
			padding: 20rpx;
			border-radius: 12rpx;
			font-size: 32rpx;
			color: #333;
			font-weight: bold;
			
			.form-item{
				display: flex;
				padding: 12rpx;
				
				.form-item-label{
					width: 160rpx;
					font-size: 32rpx;
					height: 40rpx;
					line-height: 40rpx;
					align-self: center;
				}
				
				.form-item-content{
					flex: 1;
					font-size: 40rpx;
				}
				
				.gender-select{
					display: flex;
					width: 100%;
					font-size: 40rpx;
					text-align: center;
					
					.gender-item{
						flex: 1;
						image{
							width: 120rpx;
							height: 120rpx;
							object-fit: contain;
							box-sizing: border-box;
							border-radius: 120rpx;
						}
						
						.gender-selected{
							border: solid 4rpx red;
						}
						.gender-selected-t{
							color: red;
							font-weight: bold;
						}
					}
				}
			}
		}
	}
	radio-group{
		label{
			margin-left: 30rpx;
			
			radio{
				// border: solid 1px #f00;
				// border-radius: 40px;
			}
		}
	}
	
	.input{
		min-height: 80rpx;
		line-height: 80rpx;
		background-color: #eee;
		padding: 3rpx 12rpx;
		border-radius: 4rpx;
		font-size: 40rpx;
	}
	
	
	
	.popup-panel{
		min-height: 200rpx;
		width: 100%;
		background-color: #fff;
		.popup-top{
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			display: flex;
			color: #333;
			border-bottom: solid 2rpx #ddd;
			margin-bottom: 10rpx;
			
			.popup-close{
				width: 80rpx;
				color: #666;
			}
			
			.popup-ok{
				width: 80rpx;
				color: red;
			}
			
			.popup-title{
				flex: 1;
			}
		}
		.character-tags{
			display: flex;
			flex-wrap: wrap;
			
			.character-tag{
				width: 25vw;
				box-sizing: border-box;
				padding: 16rpx;
				
				.tag-inner{
					background-color: #eee;
					border-radius: 4rpx;
					font-size: 28rpx;
					text-align: center;
					box-sizing: border-box;
					padding: 16rpx 0;
					color: #333;
				}
				
				.tag-active{
					background-color: red;
					color: #fff;
				}
			}
		}
	}
</style>
