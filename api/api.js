import http from './http.js'
import store from '../store/index.js'

export default {
	loginToken(data){
	    return http.post("/Authenticate/login",data, store.getters.token)
	},
	loginGet(data){		
	    return http.get("/Login/login",data, store.getters.token)
	},
	loginPost(data){		
	    return http.post("/Login/login",data, store.getters.token)
	},
	UserInfo(data){
		return http.post("/User/GetUserInfo", data, store.getters.token)
	},
	GetMessageList(data){
		return http.post("/Message/GetMessageList", data, store.getters.token)
	},
	GetUserAddressList(data){
		return http.post("/Address/GetUserAddressList", data, store.getters.token)
	},
	GetProductList(data){
		return http.post("/api/Product/GetProductList", data, store.getters.token)
	},
}