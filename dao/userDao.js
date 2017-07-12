//实现 与mysql 交互
var mysql=require('mysql');
var $conf=require('../conf/db');
var $util=require('../util/util');
var $sql=require('../sqlmapper/userSqlMapping');

//使用连接池，提升性能 
var pool =mysql.createPool($util.extend({},$conf.mysql));


module.exports={
	/**
	*登录 服务 
	*params array
	*callback 回调
	*/
	login:function(params,callback){
		pool.getConnection(function(err,connection){
			//获取 前台页面传过来的参数
			var param=params;
			//建立连接，向表中插入值 
			connection.query($sql.queryByAccount,param,function(err,result){
				callback(result);
				connection.release();
			});
		});
	},
	register:function(arr,callback){
		pool.getConnection(function(err,connection){
			
			//建立连接，向表中插入值 
			connection.query($sql.insert,arr,function(err,result){
				/*if(result){
					result={
						code:200,
						msg:'注册成功'
					}
				}
				jsonWrite(res,result);*/
				callback(err,result);
				//释放连接
				connection.release();
			});
		});
	}
}