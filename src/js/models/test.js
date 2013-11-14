


var Test = function() {

	var self = this;

	this.title = 'Loading...';

	jQuery.ajax({
		type: 'GET',
		url: 'http://echo.jsontest.com/title/My%20App',
		success: function(data) {
			self.title = decodeURIComponent(data.title);
		},
		dataType: 'jsonp',
		crossDomain: true
	});
};




module.exports = Test;
