export default{
  install(Vue,options){
    
    

    Vue.prototype.getSearchType= function (params, sucessFn, errFn) { //获取搜索类型
      
      let url = `/chain_browser/searchtype`
      this.$http.post(url,params)
        .then(({data})=>{
          if(data.code === '0'){
            sucessFn(data)
          }else{
            errFn(data);
          }
          
        })
        .catch(({data})=>{
          errFn(data)
        })
    }  

    Vue.prototype.getBlockchainLists= function (sucessFn, errFn) { //获取链列表
      
      let url = `/chain_manager/list`
      this.$http.get(url)
        .then(({data})=>{
          sucessFn(data)
        })
        .catch(({data})=>{
          errFn(data)
        })
    } 

    Vue.prototype.getLinkAdressByType = function(val){ //根据搜索类型跳转页面
      var json = {
        0:'/blockchainBrowser_adressDetail',
        1:'/blockchainBrowser_assetsDetail',
        2:'/blockchainBrowser_blockchainDetail',
        3:'/blockchainBrowser_transactionDetail',
        4:'/blockchainBrowser_UTXODetail'
      }
      return json[val];
    }

    Vue.prototype.goUrlByType = function(val,query){ //路由跳转方法
      let path = this.getLinkAdressByType(val)
      this.$router.push({path: path, query: query})
    }

    Vue.prototype.getRouteParams = function(queryKey, paramsKey){ //获取参数
      let query = this.$route.query;
      var obj = {}
	
      queryKey.map((item,i)=>{
        obj[paramsKey[i]] = query[item];
      })
      return obj;
    }
    
    
  }
}