const express = require("express");
const cookieParser = require("cookie-parser");
var server = express();
server.listen(8080);

server.use(cookieParser("wafafawfdsff"));
server.use("/",function(req,res){
    req.secret = "wafafawfdsff";
    res.cookie("user","zhangze",{signed:true})

    res.clearCookie("user"); //删除cookie
    console.log(req.signedCookies);  //返回签名的cookies
    console.log(req.cookies)  //无签名的cookies
    res.send("ok");
})
