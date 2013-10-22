/* jshint unused: false */
/* global Ractive */
/* global compiledTemplates */

var ractive = new Ractive({
	el: document.getElementById('mainBody'),
	template: compiledTemplates['main'],
	data: {
		title: 'My App!'
	}
});

setTimeout(function() {
	ractive.set({title2: 'win'});
}, 4000);