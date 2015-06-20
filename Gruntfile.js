var paths = {
	js: ['*.js', 'client/js/*.js']
};
module.exports = function(grunt){

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		jshint: {
			all: paths.js
		},
		karma: {
			unit: {
				configFile: 'client/test/spec/karma.config.js'
			}
		}
	});
	grunt.registerTask('default', ['jshint', 'karma']);
};