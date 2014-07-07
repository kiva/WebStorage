
module.exports = function(grunt) {
	'use strict';


	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
		, src: 'src'
		, dist: 'dist'


		, meta: {
			version: '<%= pkg.version %>'
			, banner: '/**\n * <%= pkg.name %> - v<%= meta.version %> \n' +
				' * Copyright (c) <%= grunt.template.today("yyyy") %> Kiva Microfunds\n' +
				' * \n' +
				' * Licensed under the MIT license.\n' +
				' * <%= pkg.licenses[0].url %>\n' +
				' */\n'

		}


		, buster: {
			dev: {
				test: {
					reporter: 'specification'
				}
			}
		}


		, jshint: {
			options: {
				jshintrc: '.jshintrc'
			}
			, all: ['src/*.js', 'test/spec/**/*.js']
		}


		, rig: {
			compile: {
				options: {
					banner: '<%= meta.banner %>'
				}
				, files: {
					'<%= dist %>/iife/WebStorage.js': ['build/_iife.js']
					, '<%= dist %>/amd/WebStorage.js': ['build/_amd.js']
				}
			}
		}


		, uglify: {
			target: {
				options: {
					banner: '<%= meta.banner %>'
				}
				, files: {
					'<%= dist %>/iife/WebStorage.min.js': ['<%= dist %>/iife/WebStorage.js']
					, '<%= dist %>/amd/WebStorage.min.js': ['<%= dist %>/amd/WebStorage.js']
				}
			}
		}
	});


	grunt.loadNpmTasks('grunt-buster');
	grunt.loadNpmTasks('grunt-rigger');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('test', ['jshint', 'buster']);
	grunt.registerTask('build', ['rig', 'uglify']);
};
