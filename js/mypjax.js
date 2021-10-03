/*
* @Author: smile
* @Date:   2021-02-05 22:35:48
* @Last Modified by:   smile
* @Last Modified time: 2021-02-06 23:43:12
*/
let layer;
let index;
layui.use(['layer'], function(){
    layer = layui.layer
});
function closeLoading() {
    layer.close(index);
}
function showLoading() {
    index = layer.open({
        type:3
    });
}
function generatePjax(){
    let pwdFlag = true;
    var pjax = new Pjax({
        elements: 'a[href]:not([href="javascript:;"]):not([href^="#"]):not([href="javascript:void(0)"])',   // 拦截正常带链接的 a 标签
        selectors: [".body-wrap",".content-header","title",".header-title"]                                  // 根据实际需要确认重载区域
    });
    document.addEventListener('pjax:send', function (e) {
        showLoading();
        $("#site_search").removeClass("in");

    });
    document.addEventListener('pjax:complete', function (e) {
        if(window.location.pathname.indexOf("timeline")!==-1){
            var pwd = prompt('请输入文章密码');
            if(pwd && sha256(pwd)=='d79727595944c0b09592b8abab755aadf75182afc41a8c8e694c8494d2af3904'){
            }else{
                alert('密码错误');
                history.back();
                return
            }
        }

        let str = e.target.URL;
        $('script[data-pjax], .pjax-reload script').each(function () {
            $(this).parent().append($(this).remove());
        });
        getCount();
        str = str.substring(str.indexOf('//')+2)
        str = str.substring(str.indexOf('/')+1)
        str = str.substring(0,str.indexOf('/'))
        if(str){
            let lis = $(".nav").children("li")
            let num = -1;
            for (let i = lis.length - 1; i >= 0; i--) {
                let t = lis[i].children[0].href;
                if (t.indexOf(str)!=-1) {
                    num = i;
                    break;
                }
            }
            if (num!==-1) {
                $(".nav").children("li").removeClass("active");
                $(".nav").children("li").eq(num).addClass("active");
            }
        }else{
            $(".nav").children("li").removeClass("active");
            $(".nav").children("li").eq(0).addClass("active");
        }

        $("#menu").removeClass("show");
        $("#menu").addClass("hide");
        $("#mask").removeClass("mask in");
        $("#mask").addClass("mask");
        $(".fade").addClass("in");
        $(".fade-scale").addClass("in");
        closeLoading();
    });
    document.addEventListener('pjax:error', function () {
        closeLoading();
    });
}
$(function(){
    generatePjax();
})
