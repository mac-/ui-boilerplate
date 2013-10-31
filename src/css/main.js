var _ = require('underscore');

module.exports = function(api) {
	var pushed = {
		'.pushed': {
			'margin-top': '40px !important'
		}
	};
	api.add(pushed);
};
