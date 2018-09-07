const http = require('http');
const querystring = require('querystring');
var postHTML =
  '<html><head><meta charset="utf-8"><title></title></head>' +
  '<body>' +
  '<form method="post">' +
  '用户名： <input name="name"><br>' +
  '密码： <input name="pwd"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';
http.createServer((req,res) => {
    //console.log(req);
    var str = '';
    var i = 0;
    //把数据来进行分段
    req.on("data",function(data){
        console.log(`第${i++}次收到数据`);
        str += data;
    })
    req.on("end",function(){
        var post = querystring.parse(str);
        if(post.name && post.pwd){
            res.write(`用户名为${post.name},密码为${post.pwd}`)
        }else{
            res.write(postHTML)
        }
        res.end();
    })
}).listen(8081);