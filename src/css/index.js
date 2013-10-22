module.exports = function(api) {
	require('fs').readdirSync(__dirname + '/').forEach(function(file) {
		if (file.match(/.+\.js$/g) !== null && file !== 'index.js') {
			api.import(__dirname + '/' + file);
		}
	});
};