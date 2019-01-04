export default{
  install(Vue,options){
    
    
		
		Vue.prototype.linkTo = function (path,obj) {
      this.$router.push({path:path,query:obj});
		}
    
    
  }
}