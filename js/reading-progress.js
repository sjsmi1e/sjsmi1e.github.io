/*
* @Author: smile
* @Date:   2020-05-14 13:57:34
* @Last Modified by:   smile
* @Last Modified time: 2020-05-14 16:20:39
*/
//阅读百分比
var h = $(document).height();
$(window).scroll(function () {
	var now = $(window).scrollTop();
	// console.log(now);
	var res = (now/h) * 100;
	// console.log(res.toFixed(2)+"%");
	$('#read_percent').text(res.toFixed(2)+"%");
})