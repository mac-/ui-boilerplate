var templates = require('../../templates'),
	util = require('util'),
	BaseView = require('./base');

function MainView(router) {

	var self = this,
		options = {
			el: document.getElementById('application'),
			template: templates['main'],
			partials: {
				headerBar: templates['headerBar'],
				mainContent: templates['mainContent']
			}
		};

	BaseView.call(this, options);

	this.on('create', function() {

		self._ractive.on('changeView', function(event) {
			switch (event.node.innerHTML) {
				case 'Hello':
					router.go('/hello');
					break;

				case 'World':
					router.go('/world');
					break;
			}
		});
	});

}

util.inherits(MainView, BaseView);

module.exports = MainView;