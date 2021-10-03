/*
* @Author: smile
* @Date:   2020-05-14 13:57:34
* @Last Modified by:   smile
* @Last Modified time: 2021-02-06 13:03:22
*/
//阅读百分比
$(window).scroll(function () {

	//已经滚动到上面的页面高度
    var scrollTop = $(this).scrollTop();
      //页面高度
    var scrollHeight = $(document).height();
       //浏览器窗口高度
    var windowHeight = $(this).height();
	var res = ((scrollTop + windowHeight)/scrollHeight) * 100;
	$('#read_percent').text(res.toFixed(0)+"%");
})