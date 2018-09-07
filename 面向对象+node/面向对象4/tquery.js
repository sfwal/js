function tquery(vAgr){
    //用来保存选中的元素
    this.elements = [];
    //用来判断传进来的参数类型：函数、字符串、对象
    switch(typeof vAgr){
        case "function":
            //window.onload = vAgr;
            addEvent(window,"load",vAgr);
            break;
        case "string":
            //字符串分为三种情况：id  class tagName
            switch(vAgr.charAt(0)){
                case "#":
                    var objId = document.getElementById(vAgr.substring(1));
                    this.elements.push(objId);
                    break;
                case ".":
                    this.elements = document.getElementsByClassName(vAgr.substring(1));
                    break;
                default:
                    this.elements = document.getElementsByTagName(vAgr);
            }
            break;
        case "object":
            this.elements.push(vAgr);
            break;
    }
}

//事件绑定 需要参数：事件名、触发的函数、捕获true或者冒泡false 默认是冒泡
function addEvent(obj,eve,fn){
    if(obj.attachEvent){ //如果是IE8及以下的IE浏览器
        obj.attachEvent("on"+eve,fn);
    }else{               //非IE浏览器
        obj.addEventListener(eve,fn,false);
    }
}
//点击事件
tquery.prototype.click = function(fn){
    for(var i=0;i<this.elements.length;i++){
        addEvent(this.elements[i],"click",fn);
    }
}
//显示
tquery.prototype.show = function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display = "block";
    }
}
tquery.prototype.hide = function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display = "none";
    }
}
//toggle
tquery.prototype.toggle = function(){
    var _arguments = arguments;
    for(var i=0;i<this.elements.length;i++){
        addToggle(this.elements[i]);
    }
    function addToggle(obj){
        var count = 0;
        addEvent(obj,"click",function(){
            _arguments[count++ % _arguments.length].call(obj);
        })
    }
}

//获取样式方法
tquery.prototype.css = function(attr,val){
    //设置样式
    if(arguments.length == 2){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].style[attr] = val
        }
    }else{
       //return this.elements[0].style.attr;  这个只能获取行内样式
       return getStyle(this.elements[0],attr);
    }
}
//获取样式
function getStyle(obj,attr){
    if(obj.currentStyle){// IE浏览器  IE8及以下
        return obj.currentStyle[attr];
    }else{    //非IE浏览器
        return window.getComputedStyle(obj,null)[attr];
    }
}
//设置和获取属性值
tquery.prototype.attr = function(attr,val){
    if(arguments.length == 2){   //设置属性
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].setAttribute(attr,val);
        }
    }else{
        return this.elements[0].getAttribute(attr);
    }
}
tquery.prototype.eq = function(n){
    return new tquery(this.elements[n]);  //  DOM对象，，是不是我们用构造函数创建出来的对象？
}

tquery.prototype.find = function(str){
    var result = [];
    switch(str.charAt(0)){
        case ".":
            for(var i=0;i<this.elements.length;i++){
                var aEle=this.elements[i].getElementsByClassName(str.substring(1));
                appendArr(result, aEle);
            }
            break;
        default:
            for(var i=0;i<this.elements.length;i++){
                var aEle=this.elements[i].getElementsByTagName(str);
                appendArr(result, aEle);
            }
    }
    var newTquery = new tquery();
    newTquery.elements = result;
    return newTquery;
}

function appendArr(arr1, arr2)
{
    for(var i=0;i<arr2.length;i++)
    {
        arr1.push(arr2[i]);
    }
}

tquery.prototype.index = function(){
    return getIndex(this.elements[0])
}
function getIndex(obj){
    var aBrother = obj.parentNode.children;
    for(var i=0;i<aBrother.length;i++){
        if(aBrother[i] == obj){
            return i;
        }
    }
}
tquery.prototype.extend = function(name,fn){
    tquery.prototype[name] = fn;
}
function $(vAgr){
    return new tquery(vAgr);
}