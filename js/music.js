/*
* @Author: smile
* @Date:   2020-05-15 10:28:50
* @Last Modified by:   smile
* @Last Modified time: 2020-05-15 17:59:01
*/
$(function(){
	if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
		console.log('手机');
		$('#main').append('<meting-js\n'+
        'style="position:fixed;left:20px;bottom:20px;z-index=1"\n'+
        'server="netease"\n'+
        'type="playlist"\n'+
        'id="2297228045"\n'+
        'autoplay="true"\n'+
        'order="random"\n'+
        'mini="true">')
	}
	else{
		console.log('电脑');
		$('#main').append('<meting-js\n'+
        'style="position:fixed;left:20px;bottom:20px;"\n'+
        'server="netease"\n'+
        'type="playlist"\n'+
        'id="2297228045"\n'+
        'autoplay="true"\n'+
        'order="random"\n'+
        'list-folded="true">')
	}
	$('#main').append('</meting-js>');
	$("meting-js").draggable({ 
	    	containment: "#main"
	});
})