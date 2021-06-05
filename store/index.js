/********
* 全局变量
* https://www.jianshu.com/p/eb23c72ab02a
* *******/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		//这里放全局参数
		hasLogin: false,
		userInfo:{
			userHeadimg: "/static/logo.png",
			userName: "",
			gender: "男",
			phone: "18510247960",
		},
		addressList: [],
		cartList: [],
		total: 0,
		token:""
	},
	mutations: {
		//这里是set方法
		login(state) {
			state.hasLogin = true;
		},
		logout(state) {
			state.hasLogin = false;
		},
		//设置用户信息
		changeUserInfo(state,userInfo){			
			state.userInfo.userHeadimg = userInfo.userHeadimg;
			state.userInfo.userName = userInfo.userName;
			state.userInfo.gender = userInfo.gender;
			state.userInfo.phone = userInfo.phone;
		},
		changeHeadimg(state,newUrl){
			state.userInfo.userHeadimg = newUrl;
		},
		changeUserName(state,newName){
			state.userInfo.userName = newName;
		},
		changeGender(state,gender){
			state.userInfo.gender = gender;
		},
		changeAddressList(state, addressList){
			state.addressList = addressList;
		},
		changeAddress(state,newAddress){
			state.addressList.push(newAddress)
		},
		editAddress(state,obj){
			state.addressList[obj.num] = obj.d;
		},
		removeAddress(state,i){
			state.addressList.splice(i,1)
		},
		addCart(state,newCart){
			for(var i = 0; i<state.cartList.length; i++){
				console.log(state.cartList[i].id,newCart.id)
				if(state.cartList[i].id == newCart.id){
					state.cartList[i].num = state.cartList[i].num + newCart.num;
				}else{
					state.cartList.push(newCart)
				}
			}
		},
		removeCart(state,i){
			state.cartList.splice(i,1)
		},
		calcTotal(state,cartList){
			state.total = cartList[0].price;
			var t = 0;
			for(var i = 0; i< cartList.length; i++){
				t += cartList[i].num * cartList[i].price;
			}
			state.total = t;
		},
		saveToken(state, newToken){
			state.token = newToken;
		}
	},
	getters:{
		//这里是get方法
		token:state => state.token,
		UserInfo(state){
			return state.userInfo; 
		},
	}
})

export default store
