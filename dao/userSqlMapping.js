var user={
	insert:'INSERT INTO T_user(nickname,headimg,sex,age,location,account,password,fans,concern) values(?,?,?,?,?,?,?,?,?)',
	update:'update T_user set nickname=?,headimg=?,sex=?,age=?,location=?,account=?,password=?,fans=?,concern=? where id=?',
	delete:'delete from T_uesr where id=?',
	queryById:'select * from T_user where id=?',
	queryByName:'select * from T_user where nickname=? and password=?',
	queryByAccount:'select * from T_user where account=? and password=?',
	queryAll:'select * from T_uesr'
};
module.exports=user;