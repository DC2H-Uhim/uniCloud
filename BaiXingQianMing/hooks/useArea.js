import * as region from '@/static/data/regions.json'
import {
	ref,computed
} from 'vue'

const useArea = (cb) =>{
	const areaPicker = ref()
	// const loading = ref(true)
	const provinces = ref([])//省
	const citys = ref([]) //市
	const areas = ref([]) //区
	const pickerValue = ref([0,0,0])
	const defaultValue = ref([3442, 1, 2])
	
	const addressList = computed(()=>{
		return [provinces.value, citys.value, areas.value];
	})
	
	provinces.value = region.default.sort((left, right) => (Number(left.code) > Number(right.code) ? 1 : -1));
	console.log(provinces.value)
	handlePickValueDefault()
	
	function handlePickValueDefault() {
		// 设置省
		pickerValue.value[0] = provinces.value.findIndex(item => Number(item.id) === defaultValue.value[0]);
		// 设置市
		citys.value = provinces.value[pickerValue.value[0]]?.children || [];
		pickerValue.value[1] = citys.value.findIndex(item => Number(item.id) === defaultValue.value[1]);
		// 设置区
		areas.value = citys.value[pickerValue.value[1]]?.children || [];
		pickerValue.value[2] = areas.value.findIndex(item => Number(item.id) === defaultValue.value[2]);
		// 重置下位置
		areaPicker.value?.setIndexs([pickerValue.value[0], pickerValue.value[1], pickerValue.value[2]],true);
	}
	
	function areaChange(e) {
		// if (this.loading) return;
		const { columnIndex, index, indexs } = e
		// 改变了省
		if (columnIndex === 0) {
			citys.value = provinces.value[index]?.children || []
			areas.value = citys.value[0]?.children || []
			areaPicker.value?.setIndexs([index, 0, 0],true)
		} else if (columnIndex === 1) {
			areas.value = citys.value[index]?.children || []
			areaPicker.value?.setIndexs(indexs,true)
		}
	}
	
	function open() {
		console.log('open area')
		areaPicker.value?.open();
		handlePickValueDefault()
	}
	
	function areaConfirm(e) {
		console.log('确认选择的地区：', e);
		// uni.showToast({
		// 	icon: 'none',
		// 	title: `${e.value[0].name}/${e.value[1].name}/${e.value[2].name}`
		// })
		let str = []
		e.value.forEach(item=>{
			str.push(item.name)
		})
		
		cb(str.join('-'))
	}
	
	return [areaPicker,addressList,areaChange,areaConfirm,open]
}
export default useArea

// export default {
// 		data() {
// 			return {
// 				// loading: true,
// 				// provinces: [], //省
// 				// citys: [], //市
// 				// areas: [], //区
// 				// pickerValue: [0, 0, 0],
// 				// defaultValue: [3442, 1, 2]
// 			}
// 		},
// 		created() {
// 			this.getData();
// 		},
// 		computed: {
// 			// addressList() {
// 			// 	return [this.provinces, this.citys, this.areas];
// 			// }
// 		},
// 		methods: {
// 			// getData() {
// 			// 	uni.request({
// 			// 		method: 'GET',
// 			// 		url: '/static/uvui/example/regions.json',
// 			// 		success: res => {
// 			// 			const { statusCode, data } = res
// 			// 			if (statusCode === 200) {
// 			// 				console.log('获取的数据：', res);
// 			// 				this.provinces = data.sort((left, right) => (Number(left.code) > Number(right.code) ? 1 : -1));
// 			// 				console.log(this.provinces)
// 			// 				this.handlePickValueDefault()
// 			// 				setTimeout(() => {
// 			// 					this.loading = false
// 			// 				}, 200)
// 			// 			}
// 			// 		}
// 			// 	})
// 			// },
// 			// handlePickValueDefault() {
// 			// 	// 设置省
// 			// 	this.pickerValue[0] = this.provinces.findIndex(item => Number(item.id) === this.defaultValue[0]);
// 			// 	// 设置市
// 			// 	this.citys = this.provinces[this.pickerValue[0]]?.children || [];
// 			// 	this.pickerValue[1] = this.citys.findIndex(item => Number(item.id) === this.defaultValue[1]);
// 			// 	// 设置区
// 			// 	this.areas = this.citys[this.pickerValue[1]]?.children || [];
// 			// 	this.pickerValue[2] = this.areas.findIndex(item => Number(item.id) === this.defaultValue[2]);
// 			// 	// 重置下位置
// 			// 	this.$refs.picker.setIndexs([this.pickerValue[0], this.pickerValue[1], this.pickerValue[2]],true);
// 			// },
// 			// change(e) {
// 			// 	if (this.loading) return;
// 			// 	const { columnIndex, index, indexs } = e
// 			// 	// 改变了省
// 			// 	if (columnIndex === 0) {
// 			// 		this.citys = this.provinces[index]?.children || []
// 			// 		this.areas = this.citys[0]?.children || []
// 			// 		this.$refs.picker.setIndexs([index, 0, 0],true)
// 			// 	} else if (columnIndex === 1) {
// 			// 		this.areas = this.citys[index]?.children || []
// 			// 		this.$refs.picker.setIndexs(indexs,true)
// 			// 	}
// 			// },
// 			// open() {
// 			// 	this.$refs.picker.open();
// 			// 	this.handlePickValueDefault()
// 			// },
// 			// confirm(e) {
// 			// 	console.log('确认选择的地区：', e);
// 			// 	uni.showToast({
// 			// 		icon: 'none',
// 			// 		title: `${e.value[0].name}/${e.value[1].name}/${e.value[2].name}`
// 			// 	})
// 			// }
// 		}
// 	}