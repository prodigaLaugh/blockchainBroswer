
import axios from 'axios'
//axios.defaults.withCredentials=true;

import {setCookie, getCookie, delCookie } from '@/util/cookie'
let token = getCookie('USERTOKEN')||'';


let baseurl = '' ;
if(process.env.NODE_ENV === 'development'){
  baseurl = DEVURL;
}else{
  baseurl = PRODUCTURL;
}


const myAxios = axios.create({
    baseURL: baseurl ,
		// baseURL:'/api',
    timeout:60*1000000000,
    headers: {'token':token},
    validateStatus: function (status) {
        return status < 500; 
    }
});





export default{
    install(Vue,option){
        Vue.prototype.$http = myAxios ;
    }
}