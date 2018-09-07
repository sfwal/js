// 为了模块不污染外部环境，我们需要把模块包含在一个匿名函数中
(function(){
	// 唯一暴露给外部的变量
	var sfwalDate = {};

	//获取用户选择日期或者系统当前日期的相关数据
	sfwalDate.getDate = function(year,month){
		//console.log(year+'....'+month)
		var rusalt = [];
		// 如果用户没有选择年月，那么我们使用当前日期
		if(!year || !month){
			var today = new Date();
			year = today.getFullYear();
			// 获取的月份是真实月份-1
			month = today.getMonth() + 1;
		}
			// 获取这个月的第一天
			var firstDay = new Date(year,month-1,1);
			// 获取这个月的第一天为星期几
			var firstDayWeekDay = firstDay.getDay();
			// 周日的值为0，所以我们要换成7
			if(firstDayWeekDay == 0){firstDayWeekDay=7}
			// 获取上一个月的最后一天(当月的第一天)
			var lastDayOfLastMonth = new Date(year,month-1,0);
			// 获取上个月最后一天是多少号
			var lastDateOfLastMonth = lastDayOfLastMonth.getDate();
			//判断日历第一行需要显示多少个上月的日期
			var preMonthDayCount = firstDayWeekDay - 1;
			// 获取当月的最后一天
			var lastDay = new Date(year,month,0).getDate();

			// 日历一般是6*7行，找对每一天在表格中所对应的位置
			for(var i=0;i<7*6;i++){
				// 日历上显示上个月preMonthDayCount天，
				// 也就是i从0到preMonthDayCount显示的都是上个月的日期，
				// 那么当月1号对应的i就是preMonthDayCount-1+1，
				// 当月2号对应的是preMonthDayCount-1+2，
				// 当月date号对应的i就是i=preMonthDayCount-1+date，
				// 也就是 var date = i +1 -preMonthDayCount
				
				var date = i +1 -preMonthDayCount;
				//应该显示的正确日期
				var showDate = date;
				//显示的月份
				var thisMonth = month;
				// 如果date小于等于0，表示为上个月
				if(date <= 0 ){
					thisMonth = month-1;
					showDate = lastDateOfLastMonth + date;
				}else if(date > lastDay){
					thisMonth = month +1;
					showDate = showDate - lastDay;
				}
				rusalt.push({
					date:date,
					month:thisMonth,
					showDate:showDate
				})
			}
		return {
			year:year,
			month:month,
			rusalt:rusalt
		};
	}

	//通过返回的日期数组来构建HTML
	//定义一个变量，用来获取之前getDate这个函数返回的值。
	var dateRus,wrap;
	sfwalDate.html = function(year,month){
		dateRus = sfwalDate.getDate(year,month);
		var html = '<div class="ui-datepicker-header">'+'<a href="javascript:;" class="ui-datepicker-header-btn ui-datepicker-header-btn-prev">&lt;</a>'+'<a href="javascript:;" class="ui-datepicker-header-btn ui-datepicker-header-btn-next">&gt;</a>'+'<span class="ui-datepicker-header-crr-month">'+dateRus.year + '-' + dateRus.month + '</span>'+
				'</div><div class="ui-datepicker-body"><table><thead><tr><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></tr></thead>'+'<tbody>'
			for(var i=0;i<dateRus.rusalt.length;i++){
				if(i%7==0){
					html += "<tr>";
				}
				html+="<td date-r='"+dateRus.rusalt[i].date+"'>"+dateRus.rusalt[i].showDate+"</td>"
				if(i%7==6){
					html += "</tr>";
				}
			}
			html+="</today></table></div>";
			return html;
	}

	//把获得的HTML放到页面里面去，并进行渲染
	//render  js在初始化的时候按照浏览器的规范对HTML代码进行渲染
	//init   js初始化
	sfwalDate.setHTML = function(btn){
		var year,month;
		if(dateRus){
			year = dateRus.year;
			month = dateRus.month;
		}
		if(btn == "prev"){
			month = month-1;
		}else if(btn == "next"){
			month = month+1;
		}
		if(month == 0){
			month =12;
			year = year -1;
		}
		if(month == 13){
			month =1;
			year = year +1;
		}
		var html = sfwalDate.html(year,month);
		if(!wrap){
			wrap = document.createElement('div');
			wrap.className = "ui-datepicker-wrap";
			document.body.appendChild(wrap);
		}
		wrap.innerHTML = html;
	}

	//js初始化
	// 参数为用户想要添加选择器的input的ID
	sfwalDate.date = function(obj){
		sfwalDate.setHTML();
		var flag = true;
		var input = document.getElementById(obj);
		//给input添加点击事件
		input.addEventListener('click',function(){
			if(flag){
				wrap.style.display = "block";
				var left = input.offsetLeft;
				var top = input.offsetTop;
				var height = input.offsetHeight;
				wrap.style.left = left + "px";
				wrap.style.top = top + height +2+ "px";
				flag = false;
			}else{
				wrap.style.display = "none";
				flag = true;
			}
			
		})

		// 给按钮绑定点击事件
		wrap.addEventListener('click',function(even){
			var e = even || window.event;
			// target函数接受事件的目标DOM元素 srcElement
			// classList  一个元素对象，包含元素的类型列表。
			// classList.contains 判断指定的类名是否存在，返回的是布尔值 
			// if(e.target.classList.contains("ui-datepicker-header-btn")){

			// }
			// 
			if(e.target.classList.contains("ui-datepicker-header-btn-prev")){
				sfwalDate.setHTML('prev');
			}else if(e.target.classList.contains("ui-datepicker-header-btn-next")){
				sfwalDate.setHTML('next');
			}

		})

		// 给td绑定点击事件
		// 
		// e.target.tagName  获取的标签名是大写的。。。
		wrap.addEventListener('click',function(even){
			var e = even || window.event;
			if(e.target.tagName=="TD"){
				var inputDate = new Date(dateRus.year,dateRus.month-1,e.target.getAttribute('date-r'));
				input.value = inputDate.getFullYear()+"-"+zero((inputDate.getMonth()+1))+"-"+zero(inputDate.getDate());
				wrap.style.display = "none";
				flag = true;
			}
		})

		//给单个日期加0
		function zero(a){
			if(a<=9){
				return "0"+a;
			}else{
				return a;
			}
		}

	}



	
	window.sfwalDate = sfwalDate;
})()