//我们要使用nodejs的某项服务，必须先引入模块
const http = require('http');
const fs = require('fs');
var service = http.createServer(function(request,response){
    // //console.log("122");
    // //获取服务器响应之后，往客户端传递什么？
    // response.write("123");
    // //响应完成后，把响应关掉
    // response.end();
    switch(request.url){
        case "./index.html":
            response.write("你访问的是首页");
            break;
        case "./about.html":
            response.write("你访问的是关于我们页面");
            break;
        default:
            response.write("404");
    }
    response.end();
    //
    // fs.readFile("./www/index.html",function(err,data){
    //     if(err){
    //         response.write("404");
    //     }else{
    //         response.write(data);
    //     }
    //     response.end();
    // })
    // fs.writeFile("./www/bbb.txt","dawffew",(err) => {
    //     console.log(err);
    // })

});
service.listen(123);