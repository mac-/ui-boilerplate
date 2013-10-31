var page = require('./libs/page.js');
var ractive = require('./views/test.js');

page('*', function() {
	ractive.set({title2: 'win'});
});

page();