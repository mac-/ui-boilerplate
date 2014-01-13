var templates = require('../../templates'),
	util = require('util'),
	BaseView = require('./base');

function WorldView() {

	var options = {
			el: document.getElementById('world'),
			template: templates['world'],
			data: {}
		};

	BaseView.call(this, options);

}

util.inherits(WorldView, BaseView);

module.exports = WorldView;


