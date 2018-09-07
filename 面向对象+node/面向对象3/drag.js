/*
* @Author: name
* @Date:   2018-02-28 15:04:49
* @Last Modified by:   name
* @Last Modified time: 2018-02-28 15:05:53
*/

function creatDiv(id)
{
    this.oDiv=document.getElementById(id);
    this.disX = 0;
    this.disY = 0;
    var that = this;
    this.oDiv.onmousedown=function(){
        that.down();
    }
};
creatDiv.prototype.down = function(ev){
    var oEvent=ev||event;
    var that = this;
    disX=oEvent.clientX-this.oDiv.offsetLeft;
    disY=oEvent.clientY-this.oDiv.offsetTop;
    document.onmousemove=function(){
        that.move();
    };
    document.onmouseup=function(){
        that.up();
    };
};
creatDiv.prototype.move = function(ev){
    var oEvent=ev||event;

    this.oDiv.style.left=oEvent.clientX-disX+'px';
    this.oDiv.style.top=oEvent.clientY-disY+'px';
};
creatDiv.prototype.up = function(ev){
    document.onmousemove=null;
    document.onmouseup=null;
};