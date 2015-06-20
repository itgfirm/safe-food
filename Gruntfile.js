var paths = {
	js: ['*.js', 'client/js/*.js']
};
module.exports = function(grunt){

	require('load-grunt-tasks')(grunt);

  // Add the grunt-mocha-test tasks.
  grunt.loadNpmTasks('grunt-mocha-test');


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
    jshint: {
			all: paths.js
		},
    // Configure a mochaTest task
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
          timeout: 10000
        },
        src: ['server/test/**/*.js']
      }
    },
		karma: {
			unit: {
				configFile: 'client/test/spec/karma.config.js'
			}
		}
	});

	grunt.registerTask('default', ['jshint', 'karma']);
  grunt.registerTask('test', ['jshint', 'karma', 'mochaTest']);

};