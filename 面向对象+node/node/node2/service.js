const http = require('http');
const fs = require('fs');
var service = http.createServer((req,res) => {
    var user = {};
    //console.log(req.url);
    //req.url = /aaa?userName=sfwal&password=123456
    if(req.url.indexOf("?") != -1){
        var arr = req.url.split('?');
        //arr[0] ==>  "/aaa"
        var arr2 = arr[1].split("&");
        for(var i=0;i<arr2.length;i++){
            var arr3 = arr2[i].split("=");
            //arr3[0] userName
            //arr[1]  sfwal
            user[arr3[0]] = arr3[1]
    }else{
        var url = req.url;
    }

    }
    console.log(user);
}).listen(8080)