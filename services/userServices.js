var userDao=require("../dao/userDao");
module.exports={
	login:function(params,callback){
		userDao.login(params,function(data){
			callback(data);
		});
	},
	register:function(params,callback){
		userDao.register(params,function(err,data){
			callback(err,data);
		});
	}
}