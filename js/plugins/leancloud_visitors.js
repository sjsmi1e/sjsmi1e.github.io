function showTime(Counter,AV) {
	var query = new AV.Query(Counter);
	var entries = [];
	var $visitors = $(".leancloud_visitors");

	$visitors.each(function () {
		entries.push($(this).attr("id").trim());
	});

	query.containedIn('url', entries);
	query.find().done(function (results) {
		var COUNT_CONTAINER_REF = '.leancloud-visitors-count';
		if (results.length === 0) {
			$visitors.find(COUNT_CONTAINER_REF).text(0);
			return;
		}

		for (var i = 0; i < results.length; i++) {
			var item = results[i];
			var url = item.get('url');
			var time = item.get('time');
			var element = document.getElementById(url);
			$(element).find(COUNT_CONTAINER_REF).text(time);
		}

		for (var i = 0; i < entries.length; i++) {
			var url = entries[i];
			var element = document.getElementById(url);
			var countSpan = $(element).find(COUNT_CONTAINER_REF);
			if (countSpan.text() == '') {
				countSpan.text(0);
			}
		}
	}).fail(function (object, error) {
		console.log("Error: " + error.code + " " + error.message);
	});
}

function addCount(Counter,AV) {

	var $visitors = $(".leancloud_visitors");
	var url = $visitors.attr('id').trim();
	var title = $visitors.attr('data-flag-title').trim();
	var query = new AV.Query(Counter);

	query.equalTo("url", url);
	query.find({
		success: function (results) {
			if (results.length > 0) {
				var counter = results[0];
				counter.fetchWhenSave(true);
				counter.increment("time");
				counter.save(null, {
					success: function (counter) {
						var $element = $(document.getElementById(url));
						$element.find('.leancloud-visitors-count').text(counter.get('time'));
					},
					error: function (counter, error) {
						console.log('Failed to save Visitor num, with error message: ' + error.message);
					}
				});
			} else {
				var newcounter = new Counter();
				/* Set ACL */
				var acl = new AV.ACL();
				acl.setPublicReadAccess(true);
				acl.setPublicWriteAccess(true);
				newcounter.setACL(acl);
				/* End Set ACL */
				newcounter.set("title", title);
				newcounter.set("url", url);
				newcounter.set("time", 1);
				newcounter.save(null, {
					success: function (newcounter) {
						var $element = $(document.getElementById(url));
						$element.find('.leancloud-visitors-count').text(newcounter.get('time'));
					},
					error: function (newcounter, error) {
						console.log('Failed to create');
					}
				});
			}
		},
		error: function (error) {
			console.log('Error:' + error.code + " " + error.message);
		}
	});
}

AV.initialize(DC.lv.app_id, DC.lv.app_key);
const myav = AV;
const Counter = AV.Object.extend("Counter");

function getCount(){
    if ($('.leancloud_visitors').length == 1) {
        addCount(Counter,myav);
    } else if ($('.post-title-link').length > 1) {
        showTime(Counter,myav);
    }
}

