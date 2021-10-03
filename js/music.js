/*
* @Author: smile
* @Date:   2020-05-15 10:28:50
* @Last Modified by:   smile
* @Last Modified time: 2021-02-06 12:40:14
*/
$(function(){
	if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
        $("#music").css("border-radius","50%");
		$('#music').append('<meting-js\n'+
        'server="tencent"\n'+
        'type="playlist"\n'+
        'id="3543342280"\n'+
        'autoplay="true"\n'+
        'order="random"\n'+
        'mini="true">')
	}
	else{
		$('#music').append('<meting-js\n'+
        'server="tencent"\n'+
        'type="playlist"\n'+
        'id="3543342280"\n'+
        'autoplay="true"\n'+
        'order="random"\n'+
        'list-folded="true">')
	}
	$('#music').append('</meting-js>');
})
