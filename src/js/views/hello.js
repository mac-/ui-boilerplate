var templates = require('../../templates'),
	util = require('util'),
	BaseView = require('./base');

function HelloView() {

	var options = {
			el: document.getElementById('hello'),
			template: templates['hello'],
			data: {}
		};

	BaseView.call(this, options);

}

util.inherits(HelloView, BaseView);

module.exports = HelloView;


