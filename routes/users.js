var express = require('express');
var router = express.Router();
var userDto = require('../dto/userdto');
var $util=require('../util/util');
var userService = require('../services/userServices');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/*login*/
router.post('/login',function(req,res,next){
	var param=req.query ||req.params;
	console.log(param);
	if(param.account==undefined ||param.account==null){
		$util.jsonWrite(res,10005);
		return ;
	}
	if(param.password==undefined ||param.password==null){
		$util.jsonWrite(res,10003);
		return ;
	}
	//调用service
	userService.login([param.account,param.password],function(data){
		
		if(data!=undefined &&data!=null && data.length==0){
			$util.jsonWrite(res,10010);
		}else{
			var value=data[0];
			delete value.id;
			delete value.password;
			$util.jsonWrite(res,200,{code:200,msg:"登录成功",value:value});
		}
	});
});
/*register*/
router.post('/register',function(req,res,next){
	//获取 前台页面传过来的参数
	var param=req.query || req.params;
	var arr=[];
	var _obj=userDto.userobj;
	for(var i in _obj){
		if(param[i]!=undefined && param[i]!=null && param[i]!=''){
			_obj[i]=param[i];
		}
		arr.push(_obj[i]);
	}
	console.log(arr);
	//检验提交数据 
	if(_obj.nickname.length==0){
		$util.jsonWrite(res,10004);
		return ;
	}
	if(_obj.password.length==0){
		$util.jsonWrite(res,10003);
		return ;
	}
	if(_obj.account.length==0){
		$util.jsonWrite(res,10005);
		return ;
	}
	if(_obj.location.length==0){
		$util.jsonWrite(res,10007);
		return ;
	}
	
	if(_obj.age<=0 || !$util.checkData.isInteger(_obj.age)){
		$util.jsonWrite(res,10008);
		return ;
	}
	if(!/^[0|1]*$/.test(_obj.sex)){
		$util.jsonWrite(res,10009);
		return ;
	}
	userService.register(arr,function(err,data){
		console.log(err);
		console.log(data);
		if(err==null){
			$util.jsonWrite(res,200,{code:200,msg:"注册成功"});
		}else{
			$util.jsonWrite(res,500);
		}
	});
});

module.exports = router;
