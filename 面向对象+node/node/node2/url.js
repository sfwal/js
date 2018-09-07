var urlLib = require('url');
var url = "http://127.0.0.1/aaa?userName=aaa&pwd=123456";
var json = urlLib.parse(url,true)
console.log(json.query);