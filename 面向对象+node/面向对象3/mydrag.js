/*
* @Author: name
* @Date:   2018-02-28 15:07:12
* @Last Modified by:   name
* @Last Modified time: 2018-02-28 15:20:43
*/
function myDrag(id){
    creatDiv.call(this,id);
}
for(var i in creatDiv.prototype){
    myDrag.prototype[i] = creatDiv.prototype[i]
}
myDrag.prototype.move = function(ev){
    var oEvent=ev||event;
    var l = oEvent.clientX-disX;
    var t = oEvent.clientY-disY;
    if(l<0){
        l=0;
    }else if(l>document.documentElement.clientWidth - this.oDiv.offsetWidth){
        l = document.documentElement.clientWidth - this.oDiv.offsetWidth
    }
    if(t<0){
        t=0
    }else if(t>document.documentElement.clientHeight - this.oDiv.offsetHeight){
        t = document.documentElement.clientHeight - this.oDiv.offsetHeight;
    }
    this.oDiv.style.left=l+'px';
    this.oDiv.style.top=t+'px';
}