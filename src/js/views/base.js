var Ractive = require('Ractive'),
	util = require('util'),
	EventEmitter = require('events').EventEmitter;

function BaseView(ractiveOptions) {
	ractiveOptions = ractiveOptions || {};

	if (!ractiveOptions.el) {
		throw new Error('Missing or invalid options');
	}
	var self = this,
		element, displayMode;

	this._ractive = null;

	this.isHidden = false;

	this.create = function() {
		if (!self._ractive) {
			element = ractiveOptions.el;
			self.isHidden = (element.style.display && element.style.display === 'none');
			displayMode = (element.style.display && element.style.display !== 'none') ? element.style.display : 'block';

			self._ractive = new Ractive(ractiveOptions);
			self.emit('create');
		}
	};

	this.destroy = function() {
		if (self._ractive) {
			self._ractive.teardown();
			self.emit('destroy');
		}
	};

	this.hide = function() {
		if (self._ractive && !self.isHidden) {
			element.style.display = 'none';
			self.isHidden = true;
			self.emit('hide');
		}
	};

	this.show = function() {
		if (self._ractive && self.isHidden) {
			element.style.display = displayMode;
			self.isHidden = false;
			self.emit('show');
		}
	};

	this.toggle = function() {
		var func;
		if (self._ractive) {
			func = (self.isHidden) ? self.show : self.hide;
			func();
		}
	};


}

util.inherits(BaseView, EventEmitter);

module.exports = BaseView;
