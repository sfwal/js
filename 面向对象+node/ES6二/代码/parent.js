const name="张泽";
const age = "23";

//定义一个父类
class Parent{
    text(){
        console.log("你好！");
    }
    static obj(){  //  定义一个静态方法，不被实例继承。
        console.log('obj');
    }
}
// var parent = new Parent();
// parent.obj();
export{name,age,Parent}
