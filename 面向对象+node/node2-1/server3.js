const express = require("express");

var server = express();
server.listen(8080);

server.use("/",function(req,res,next){
    req.body = 12;
    next();
})
server.use("/",function(req,res){
    console.log(req.body);
})