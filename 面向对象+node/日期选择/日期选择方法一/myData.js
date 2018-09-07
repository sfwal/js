function myData(id){
    this.nowData = new Date();
    this.mydata = document.getElementById(id);
    this.year=this.nowData.getFullYear();
    this.month=this.nowData.getMonth()+1;
}
myData.prototype = {
    showMain:function(){
        var that=this;
        that.box = document.createElement("table");
        document.documentElement.appendChild(that.box);
        that.box.style.width="400px";
        that.box.style.height="300px";
        that.box.style.background="#eee";
        that.box.style.padding="20px";
        that.box.style.border="1px solid #eee";
        that.box.style.position="absolute";
        that.box.style.left="0";
        that.box.style.top="22px";
        that.box.style.display="none";
    },

    showHeader:function(){
        var that = this;
        //年份左
        var firstSpan = document.createElement('span');
        that.box.appendChild(firstSpan);
        firstSpan.innerHTML = "&lt;&lt;"
        //月份左
        var prevSpan = document.createElement('span');
        that.box.appendChild(prevSpan);
        prevSpan.innerHTML = "&lt;";
        //日期
        var dateSpan = document.createElement('span');
        that.box.appendChild(dateSpan);
        //月份右
        var nextSpan = document.createElement('span');
        that.box.appendChild(nextSpan);
        nextSpan.innerHTML="&gt;";
        //年份右
        var lastSpan = document.createElement('span');
        that.box.appendChild(lastSpan);
        lastSpan.innerHTML = "&gt;&gt;";
        var allspan = that.box.getElementsByTagName("span");
        var month = that.nowData.getMonth()+1;
        var year = that.nowData.getFullYear();
        dateSpan.innerHTML = year+'-'+month;
        for(var i=0;i<allspan.length;i++){
            var span = allspan[i];
            span.style.display="inline-block";
            span.style.width='20%';
            span.style.height='30px';
            span.style.color='#333';
            span.style.textAlign='center';
            span.style.lineHeight='30px';
            span.id='index'+i;
            // 为四个左右键添加事件
            if(i!=2){
                span.onclick=function(){
                    month=that.nowData.getMonth();
                    year = that.nowData.getFullYear();
                    if(this.id=='index0'){
                        year--;
                    }else if(this.id=='index1'){
                        month--;
                    }else if(this.id=='index3'){
                        month++;
                    }else if(this.id=='index4'){
                        year++;
                    }
                    that.nowData.setMonth(month);
                    that.nowData.setFullYear(year);
                    that.box.innerHTML='';
                    that.showHeader();

                    that.showWeek();
                    that.showData();
                    that.showDataList();
                }
            }
        }
    },

    showWeek:function(){
        var that = this;
        var table = document.createElement('table');
        that.box.appendChild(table);
        table.style.width='100%';
        var tr = table.insertRow();
        var weeks = ['日','一','二','三','四','五','六'];
        for(var i in weeks){
            var td = tr.insertCell();
            td.style.height='24px';
            td.style.background='#fff';
            td.style.textAlign='center';
            td.innerHTML=weeks[i];
        }
    },

    showData:function(){
        var that = this;
        var table = document.createElement('table');
        that.box.appendChild(table);
        table.style.width='100%';
        table.id='day'
        for(var i=0;i<6;i++){
            var tr = table.insertRow();
            for(var j=0;j<7;j++){
                var td = tr.insertCell();
                td.style.height='24px';
                td.style.background='#fff';
                td.style.textAlign='center';
                td.style.fontSize='20px';
                var dayIndex = i*7+j;
                var eachDate = getEveryDate(dayIndex);
                td.innerHTML = eachDate.getDate();
                var now = new Date();
                var nowDay = now.getDate();
                if(eachDate.getFullYear()==now.getFullYear()&&eachDate.getMonth()==now.getMonth()&&eachDate.getDate()===nowDay){
                    td.style.background = 'gold';
                }
                if(eachDate.getMonth()!=that.nowData.getMonth()){
                    td.style.background='#999';
                    td.style.color = "#222";
                }
            }
        }
        this.day = document.getElementById('day');
        this.selectdaty = this.day.getElementsByTagName('td');

        this.mydata.onclick=function(){
            that.showDataList();
        }
    },
    showDataList:function(){
        this.box.style.display = 'block';
        var that = this;
        for(var i=0;i<this.selectdaty.length;i++){
            this.selectdaty[i].addEventListener("click",function(){
                that.selectData(this);
            })
        }
    },
    selectData:function(a){
        this.mydata.value = this.year+'-'+this.month+'-'+a.innerHTML;
        this.box.style.display='none';
    },
    showInit:function(){
        var that = this;
        that.showMain();
        that.showHeader();
        that.showWeek();
        that.showData();
    }
}
var datelist = new myData("data");
function getEveryDate(index){
        var firstDate = new Date(datelist.nowData.setDate(1))
        var week = firstDate.getDay();
        var trueWeekTimes = firstDate.setDate(-(week-1))
        //计算每一天的毫秒数
        var milliTimes = trueWeekTimes + index * 24 * 60 * 60 * 1000
        //把每一天的毫秒数转化为每一天的日期
        var eachDate = new Date(milliTimes)
        return eachDate
}
datelist.showInit();