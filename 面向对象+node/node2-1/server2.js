const express = require("express");
const expressStatic = require("express-static");
const bodyParser = require("body-parser");
const querystring = require("querystring");
const myBodyParser = require("./lib/myBodyParser");


var server = express();
server.listen(8080);

// server.use(bodyParser.urlencoded({
//     extended:false,
//     limit:1024*1024*2
// }));
myBodyParser.aaa
ccc()
server.use(function(){
            return function(){
                       console.log("ccc");
                    }
        });

// server.use("/login",function(req,res){
//     //中间件
//     console.log(req.body);
// })

// server.use(expressStatic("./www"));

//链式操作