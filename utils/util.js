const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${[year, month, day].map(formatNumber).join('-')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const serveTime = startTime => {
  var start = new Date(startTime.replace(/-/g, "/")).getTime();
  var end, hour = 1000 * 60 * 60, minute = 1000 * 60, second = 1000, h, m, s;

  end = new Date().getTime();

  h = parseInt((end - start) / (hour));
  m = parseInt((end - start - h * hour) / minute);
  s = parseInt((end - start - h * hour - m * minute) / second);
  return formatNumber(h) + ":" + formatNumber(m) + ":" + formatNumber(s);
}

const groupBy = (list, key) => {
  let map = {};
  list.forEach((item, index, arr) => {
    console.log(item[key])
    if (!map[item[key]]) {
      map[item[key]] = arr.filter(a => a[key] == item[key]);
    }
  });
  return map;
}
var format = function (date, fmt) {
  console.log(date);
	var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    }
    return fmt;

};

function timeList() {
  let now = new Date();
  let timeList = [];
  let showTime = ['今天', '明天', '', '', '',''];
  for (let i = 0; i < 6; i++) { 
    timeList.push({
      showTime: showTime[i] ? showTime[i] : format(now, 'M月d日'),
      time: format(now, 'yyyy-MM-dd')
    })
    now.setDate(now.getDate() + 1);
  }
  return timeList;
}


module.exports = {
  formatTime, serveTime, formatDate, groupBy, timeList
}
