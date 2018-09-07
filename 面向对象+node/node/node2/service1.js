const http = require('http');
const queryString = require('querystring');
http.createServer((req,res) => {
    var url = {};
    if(req.url.indexOf("?") != -1){
        var arr = req.url.split("?");
        //console.log(arr[1]);
        //
        url = queryString.parse(arr[1]);
    }else{
        var a = req.url;
    }
    console.log(req.url);
}).listen(8080)