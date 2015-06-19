var paths = {
	js: ['*.js', 'client/**/*.js'],
};
module.exports = function(grunt){

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		jshint: {
			all: paths.js
		}
	});
	grunt.registerTask('default', ['jshint']);
};