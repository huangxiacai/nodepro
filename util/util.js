var codeobj=require("../conf/code");
module.exports = {
    extend: function(target, source, flag) {
        for(var key in source) {
            if(source.hasOwnProperty(key))
                flag ?
                    (target[key] = source[key]) :
                    (target[key] === void 0 && (target[key] = source[key]));
        }
        return target;
    },
    jsonWrite:function(res,code,ret){
    	console.log(code);
    	if(code==undefined){
    		code=200
    	}
		if(typeof ret==='undefined'){
			res.json({
				code:code,
				msg:codeobj.codeError[code]
			});
		}else{
			res.json(ret);
		}
	},
	checkData:{
		isInteger:function(data){
			return /^\d+$/.test(data);
		}
	}
}