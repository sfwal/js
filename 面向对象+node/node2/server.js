const http = require("http");
const fs = require("fs")
const querystring = require("querystring")
const urlLib = require("url");
var users = {};  //{"zhangsan":"123456","lisi":"654321"}
http.createServer((req,res) => {
    var str = "";
    req.on("data",function(data){
        str += data;
    })
    req.on("end",function(){
        //console.log(urlLib.parse(req.url,true));
        //url是获取页面路径，是否要提交数据
        var url = urlLib.parse(req.url,true).pathname;
        //前台是通过get方法传值得。get就是前台传过来的json对象
        var get = urlLib.parse(req.url,true).query;
        //前台是通过post方法传值得。post就是前台传过来的json对象
        var post = querystring.parse(str);
        if(url == "/user"){
            switch(post.act){
                case "reg":
                    if(users[post.userName]){
                        res.write('{"ok":false,"msg":"此用户已存在"}')
                    }else{
                        users[post.userName] = post.pwd;
                        res.write('{"ok":true,"msg":"注册成功"}')
                    }
                break;
                case "login":
                    if(users[post.userName] == null){
                        res.write('{"ok":false,"msg":"此用户不存在"}')
                    }else if(users[post.userName] != post.pwd){
                        res.write('{"ok":false,"msg":"密码错误"}')
                    }else{
                        res.write('{"ok":true,"msg":"登陆成功"}')
                    }
                break;
            }
            res.end();
        }else{
            var fileName = "./www" + url;
            fs.readFile(fileName,(err,data) => {
                if(err){
                    res.write("404")
                }else{
                    res.write(data)
                }
                res.end();
            })

        }
    })
}).listen(8080);