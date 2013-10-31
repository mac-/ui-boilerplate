var Ractive = require('Ractive');
var templates = require('../../templates');

var ractive = new Ractive({
	el: document.getElementById('application'),
	template: templates['main'],
	data: {
		title: 'My App!'
	}
});

module.exports = ractive;