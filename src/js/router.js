var page = require('./libs/page'),
	async = require('./libs/async');

function Route() {

	this.children = [];
	this.parent = null;
	this.fullPath = null;
	this.lastPathSegment = null;
	this.View = null;
	this.viewInstance = null;

}
/*
routesByPathSegment ={
	route: null,
	children: {
		'main': {
			route: null,
			children: {
				'search': {
					children: {},
					route: null
				},
				'batch': {
					children: {},
					route: null
				}
			}
		}
	}
}
*/
function Router(options) {
	options = options || {};
	options.basePath = options.basePath || '/';

	var self = this,
		routesByPathSegment = {},
		currentPath = null,
		currentRoute = null,
		basePath = options.basePath.replace(/^([^\/])/, '/$1').replace(/\/$/, ''); // ensure beginning slash, remove trailing slash

	window.onpopstate = function(event) {
		console.log('location: ' + document.location + ', state: ', event);
		if (event.state && event.state.path && '/' +  event.state.path !== currentPath) {
			//TODO: fix this logic... creating too many entries in the back history
			self.go('/' +  event.state.path);
		}
	};

	this.addRoute = function(path, View) {
		path = path.replace(/^\//, '').replace(/\/$/, '');
		var pathParts = (path.length) ? path.split('/') : [],
			lastPathSegment = pathParts[pathParts.length-1];
		if (pathParts.length < 1) {
			// root view
			if (routesByPathSegment.route) {
				throw new Error('Cannot have more than one view associated to path: ' + path);
			}
			
			var baseRoute = new Route();
			baseRoute.View = View;
			baseRoute.fullPath = basePath || '/';
			baseRoute.lastPathSegment = '';
			// only instantiate the root view since the DOM for sub-views may not have been created yet
			baseRoute.viewInstance = new View(self);
			baseRoute.viewInstance.create();

			routesByPathSegment.route = baseRoute;
			routesByPathSegment.children = {};
		}
		else {
			if (!routesByPathSegment.route) {
				throw new Error('There is no base route to attach this route to!');
			}
			var parent = routesByPathSegment;
			for (var i = 0; i < pathParts.length - 1; i++) {
				if (parent.children.hasOwnProperty(pathParts[i])) {
					parent = parent.children[pathParts[i]];
				}
				else if (i > 0) {
					throw new Error('There is no parent route to attach this route to!');
				}
			}

			var route = new Route();
			route.parent = parent.route;
			route.fullPath = basePath + '/' + path;
			route.lastPathSegment = lastPathSegment;
			route.View = View;

			parent.route.children.push(route);

			parent.children[lastPathSegment] = {
				route: route,
				children: {}
			};
		}
		page(path, function(){});
	};

	this.go = function(path, context) {
		context = context || {};
		path = path.replace(/^\//, '').replace(/\/$/, '');
		var pathParts = (path.length) ? path.split('/') : [];

		var parent = routesByPathSegment,
			viewInitFunctions = [],
			initFunc = function(route) {
				return function(callback) {
					route.viewInstance = new route.View(self, context);
					route.viewInstance.on('create', function() {
						callback();
					});
					route.viewInstance.create();
				};
			};
		for (var i = 0; i < pathParts.length; i++) {
			if (parent.children.hasOwnProperty(pathParts[i])) {
				parent = parent.children[pathParts[i]];
				if (!parent.route.viewInstance) {
					viewInitFunctions.push(initFunc(parent.route));
				}
			}
			else {
				throw new Error('Invalid route: ' + path);
			}
		}
		async.series(viewInitFunctions, function() {
			if (currentRoute && parent.route.fullPath.indexOf(currentRoute.fullPath) !== 0) {
				currentRoute.viewInstance.hide();
			}
			currentRoute = parent.route;
			currentRoute.viewInstance.show(context);
			currentPath = path;
			page(path);
		});
	};


}

module.exports = Router;
