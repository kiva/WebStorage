
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
					// @todo %manually-configure% for now, <filename> will need to be set manually
					'<%= dist %>/iife/<filename>': ['build/_iife.js']
					, '<%= dist %>/amd/<filename>': ['build/_amd.js']
				}
			}
		}


		, uglify: {
			target: {
				options: {
					banner: '<%= meta.banner %>'
				}
				// @todo %manually-configure% for now, <filename> will need to be set manually
				, files: {
					'<%= dist %>/iife/<filename>.min.js': ['<%= dist %>/iife<filename>.js']
					, '<%= dist %>/amd/<filename>.min.js': ['<%= dist %>/amd/<filename>.js']
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
