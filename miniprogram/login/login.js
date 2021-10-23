module.exports={
 data:{
   login:{
     isLogin:false
   }
 },
 onLoad:async function(option){
  if(await this.canUseXXX()){
    console.log("confirm")
  }else{
    console.log("confirmno")
  }
 }
}