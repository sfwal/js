// 引入  require
// 输出  exports
// 模块  module
//
// module.exports = {
//     a:12,
//     b:13,
//     c:function(){

//     }
// }
const querystring = require("querystring");
module.exports =
    {
        aaa:function(){
                console.log("aaa");
        },
        ccc:function(){
            return function(){
                       console.log("ccc");
                    }
        }
    }
