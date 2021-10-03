/*页面载入完成后，创建复制按钮*/
!function (e, t, a) { 
	/* code */
	var initCopyCode = function(){

		var copyHtml = '';
		copyHtml += '<button id="copyBtn" class="btn-copy" data-clipboard-snippet="">';
		copyHtml += '  <i class="fa fa-globe"></i><span>copy</span>';
		copyHtml += '</button>';
		// copyHtml += '<script type="text/javascript" src="/js/alert.js"></script>';
		$(".highlight .code pre").before(copyHtml);
		var clipboard = new ClipboardJS('.btn-copy', {
			target: function(trigger) {
				return trigger.nextElementSibling;
			}
		});
		// //复制成功事件绑定
    	clipboard.on('success',
    		function(e) {
                //清除内容被选择状态
                e.clearSelection();
                // changeToSuccess(e);
                jqueryAlert({
                	'icon'    : '/img/right.png',
                	'content' : '复制成功',
                	'closeTime' : 2000,
                })
            });
        //复制失败绑定事件
        clipboard.on('error',
        	function(e) {
        		console.error('Action:', e.action);
        		console.error('Trigger:', e.trigger);
        	});
	}
	initCopyCode();
    	
    }(window, document);