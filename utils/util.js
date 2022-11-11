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

module.exports = {
  formatTime,serveTime,formatDate
}
