const queryString = require('querystring');
var url = "userName=sfwal&password=123456";
var json = queryString.parse(url);
console.log(json);