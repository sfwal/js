const express = require("express");
const expressStatic = require("express-static")

var server = express();
server.listen(8080);

var users = {
    "zhansan" :"123456",
    "lisi" : "654321",
    "wangwu" : "123"
}

server.get("/login",function(req,res){
    var user = req.query.username
    var pwd = req.query.pwd
    if(users[user] == null){
        res.send({ok:false,msg:"此用户不存在"})
    }else if(users[user] != pwd){
        res.send({ok:false,msg:"密码错了"})
    }else{
        res.send({ok:true,msg:"登录成功"})
    }
})

// server.get("/",function(){
//     console.log("GET了");
// })

// server.post("/",function(){
//     console.log("POST");
// })

// server.use("/",function(){
//     console.log("aaaa");
// })
//访问静态页面
server.use(expressStatic("./www"));
