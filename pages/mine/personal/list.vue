<template>
	<view class="content">
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate uni-navigate-right" @tap="chooseImage">
					头像
					<image :src="userInfo.userHeadimg" mode="aspectFill" class="buddha"></image>
				</view>
			</view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="go('change-name')">
				<view class="uni-list-cell-navigate uni-navigate-right">
					用户名
					<view class="edit-text">{{userInfo.userName}}</view>
				</view>
			</view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="show">
				<view class="uni-list-cell-navigate uni-navigate-right">
					性别
					<view class="edit-text">{{userInfo.gender}}</view>
				</view>
			</view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate">
					绑定手机
					<view class="edit-text">{{userInfo.phone}}</view>
				</view>
			</view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="go('../address/list')">
				<view class="uni-list-cell-navigate uni-navigate-right">
					收货地址
				</view>
			</view>
		</view>
		<button class="login-out" hover-class="btn-hover" @tap="logout1">退出登录</button>
		<view class="mask" v-show="popupShow" :style="{top:offsetTop + 'px'}" @click="hide"></view>
		<view class="popup" v-show="popupShow">
			<view class="popup-item" @tap="chooseGender('男')">男</view>
			<view class="popup-item bor-none" @tap="chooseGender('女')">女</view>
			<view class="popup-item popup-cancel" @tap="hide">取消</view>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		computed: {
			...mapState(['userInfo'])
		},
		
		data() {
			let offsetTop = 0;
			//#ifdef H5
			offsetTop = 44;
			//#endif
			return {
				offsetTop: offsetTop,
				popupShow: false
			}
		},
		onLoad() {
			// console.log(this.userHeadimg)
			let mine = this.$api.UserInfo().then((res) => {
					console.log(res)
					this.changeUserInfo(res.data);
				}).catch((err) => {
					console.log(err);
				})
		},
		methods: {
			...mapMutations(['changeUserInfo','changeHeadimg','changeGender','logout']),
			...mapGetters(['token']),
			chooseImage() {
				console.log('开始切换图像')
				uni.chooseImage({
					sourceType: ['camera','album'],//album 从相册选图，camera 使用相机
					sizeType: ['compressed'],//original 原图，compressed 压缩图
					count: 1, //最多可以选择的图片张数
					success: (res) => {
						console.log(res);
						// 缓存文件路径
						var file = res.tempFilePaths[0];
						console.log("开始上传文件")
						uni.uploadFile({
							url:"http://localhost:54644/UploadFile/changeHeadimg",
							methods:'POST',
							filePath: file,
							name: 'headingFile',
							formData: {  
								headingFile_Name_flag: 1  
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes)
								//换前端头像
								let data = JSON.parse(uploadFileRes.data);
								if(data.code == 1){
									console.log(data.data.url)
									this.changeHeadimg(data.data.url);
								} else{
									alert(data.message)
								}								
							},
							complete() {
								uni.hideLoading()
							}
						});						
					},
					fail(err){
						console.log(err)
						reject(err)
					}
				})
			},
			go(url) {
				uni.navigateTo({
					url: url
				})
			},
			show(){
				this.popupShow = true;
			},
			hide() {
				this.popupShow = false;
			},
			chooseGender(g) {
				this.changeGender(g);
				this.popupShow = false;
			},
			logout1() {
				this.logout();
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	.content{padding-top: 10upx;}
	.uni-list:before,.uni-list:after{display: none;}
	.uni-list-cell:after{background-color: #f0f0f0;}
	.edit-text{float: right;margin-right: 30upx;color: #8d8d8d;}
	.blue{color: #0A98D5;}
	.buddha{width: 60upx;height: 60upx;border-radius: 50%;margin-right: 30upx;background-size: cover;}
	.login-out{width: 690upx;height: 80upx;line-height: 80upx;margin-top: 28upx;color: #fff;background-color: #89afd6;font-size: 28upx;}
	.btn-hover{background-color: #5c8abf;}
	.login-out:after{border: none;}
	
	.mask{position: fixed;z-index: 998;top: 0;right: 0;left: 0;bottom: 0;background-color: rgba(0, 0, 0, .3);}
	.popup{position: fixed;z-index: 998;right: 0;left: 0;bottom: 0;box-shadow: 0 0 30upx rgba(0, 0, 0, .1);text-align: center;background-color: #f4f5f6;}
	.popup-item{line-height: 90upx;background-color: #fff;border-bottom: 1px solid #ececec;font-size: 32upx;}
	.popup-cancel{margin-top: 20upx;}
</style>
