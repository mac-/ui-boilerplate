var Ractive = require('Ractive');
var templates = require('../../templates');
var TestModel = require('../models/test');
var testModel = new TestModel();

var ractive = new Ractive({
	el: document.getElementById('application'),
	template: templates['main'],
	data: testModel,
	magic: true
});

module.exports = ractive;