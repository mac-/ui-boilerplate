/* jshint unused: false */

var Application = (function () {

	var instance;

	function PrivateConstructor() {
		
		var models = {},
			views = {},
			states = {},

			createState = function(name, options) {
				var nameParts = name.split('.'),
					parent = states,
					i;

				for (i = 0; i < nameParts.length; i++) {
					if (nameParts[i] === '__state__') {
						throw new Error('Cannot add state that contains "__state__" in the name');
					}
					if (typeof parent[nameParts[i]] === 'undefined' && i < nameParts.length - 1) {
						parent[nameParts[i]] = {};
					}
					else if (typeof parent[nameParts[i]] === 'undefined') {
						parent[nameParts[i]] = { '__state__': options };
					}
					else if (i === nameParts.length - 1) {
						parent[nameParts[i]]['__state__'] = options;
					}
					parent = parent[nameParts[i]];
				}
			};

		this.registerModel = function(name, model) {
			models[name] = model;
		};

		this.registerView = function(name, view) {
			views[name] = view;
		};

		this.registerState = function(name, options) {
			createState(name, options);
		};

		this.goToState = function(name) {

		};

	}

	return {
		getInstance: function () {
			if (!instance) {
				instance = new PrivateConstructor();
			}
			return instance;
		}
	};
}());