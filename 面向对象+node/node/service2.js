const http = require('http');
const fs = require('fs');
http.createServer((req,res) => {
    //  ./www/index.html
    var fileName = './www' + req.url;
    fs.readFile(fileName,(err,data) => {
        if(err){
            res.write('404');
        }else{
            res.write(data);
        }
        res.end();
    })
}).listen(8080);