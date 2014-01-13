var Router = require('./router'),
	router = new Router(),
	MainView = require('./views/main'),
	HelloView = require('./views/hello'),
	WorldView = require('./views/world');


router.addRoute('/', MainView);
router.addRoute('/hello', HelloView);
router.addRoute('/world', WorldView);


router.go('/');

