const mysql = require("mysql");
//1.连接(哪台服务器，端口号，用户名，密码，库)
var db = mysql.createConnection({host:'localhost',user:'root',password:'root',database:'stu_table'});
//2.查询
db.query("SELECT * FROM stu_info WHERE id=1;",function(err,data){
  if(err){
    console.log("出错"+err);
  }else{
    console.log("成功了");
    console.log(JSON.stringify(data));
  }
})
