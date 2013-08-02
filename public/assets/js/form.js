(function ($) {

	$.fn.disable = function (on) {
		var t = $(this);
		if (!!on) {
			t.attr('disabled','disabled');
		} else {
			t.removeAttr('disabled');
		}
	};

	var btn = $('#btn-generate');
	var txtKey = $('#txt-key');
	var txtSec = $('#txt-secret');
	
	var res = $('#result');
	
	var getData = function () {
		return {
			key: txtKey.val(),
			secret: txtSec.val()
		};
	};
	
	var requestAuth = function (e) {
		btn.disable(true);
		
		$.get('/create', getData())
			.done(function (data) {
				res.text(data.data.access_token || JSON.stringify(data.data || data.err, null, 4));
			})
			.always(function () {
				btn.disable(false);
			});
	};
	
	var init = function () {
		btn.click(requestAuth);
	};
	
	$(init);

})(jQuery);