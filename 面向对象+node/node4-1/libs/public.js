function totwo(n){
  return n<10?'0'+n:n;
}

module.exports = {
  time2date:function(timetmp){
    var oDate = new Date();
    oDate.setTime(timetmp*1000);
    var newDate = oDate.getFullYear() + '-' + totwo(oDate.getMonth()+1) + '-' + totwo(oDate.getDate()) + " " + totwo(oDate.getHours()) + ":" + totwo(oDate.getMinutes()) + ":" + totwo(oDate.getSeconds());
    return newDate
  },
  aaa:function(){
    alert("aaa")
  },
  bbb:function(){
    alert("bbb")
  }
}
