ui-boilerplate
==============

A UI for whatever your heart desires with a preference towards micro frameworks over giant frameworks (emberjs, angularjs, dojo, etc.)

## Things this project uses

* JS/CSS Librarys
	* jQuery
		* Used everywhere, will most likely be cached by browsers
		* Lots of community support
		* Great for manipulating the DOM
	* RactiveJS
		* Great at binding data to an HTML template
		* Lightweight (22.5KB gzipped)
	* Page.js
		* Great lightweight clientside router
	* Semantic UI
		* Clean, semantic markup
		* Many great-looking web components
	* AbsurdJS
		* Makes writing well-organized CSS much easier
		* Integrates easily with Grunt
	* FontAwesome
		* Awesome font library that contains tons of icons
* Build
	* Grunt
		* Separate build tasks for building CSS, JS, and HTML
		* Creates a single JS and CSS to be loaded directly on the page
		* Compiles HTML templates into JS for quicker rendering by the RactiveJS Library
	* JSHint
		* Validates JS when the build JS Grunt task is run
	* Browserify
		* Allows JS to be written in the style of NodeJS modules, so that code isn't directly tied to the global scope
		* Makes it easy to write well-organized code, while compiling it all down to one file
	* Uglify and CSSMin
		* Minify those JS and CSS files for faster overall page load!

## TODO

* Pick a unit testing library


