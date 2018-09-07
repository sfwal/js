const http = require('http');
const urlLib = require('url');
http.createServer((req,res) => {
    var url = urlLib.parse(req.url,true)
    console.log(url.query);
}).listen(8080)