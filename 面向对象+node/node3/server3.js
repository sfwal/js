const express = require("express");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

var server = express();
server.listen(8080);

server.use(cookieParser());
server.use(cookieSession({
    name:"adsss",
    keys:["aaa","bbb","ccc"],
    maxAge:24*3600*1000*365*99
}));

server.use("",function(req,res){
    //console.log(req.session);
    if(req.session.count == null){
        req.session.count = 1;
    }else{
        req.session.count ++;
    }
    console.log(req.session.count);
    res.send("ok");
})
//模板引擎
//jade   ejs
    //破坏式   jade(html)   ==>  <html></html>
    //html
    //  head
    //      nav
    //  body
    //      div
    //      div
    //   foot
    //
// ejs 温和