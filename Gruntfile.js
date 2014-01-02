var Ractive = require('ractive');

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			all: {
				src: 'dist/**/*'
			},
			css: {
				src: ['dist/css/**/*', 'dist/fonts/**/*', 'dist/images/**/*']
			},
			js: {
				src: 'dist/js/**/*'
			},
			html: {
				src: 'dist/index*.html'
			},
			browserify: {
				src: '<%= browserify.task.dest %>'
			}
		},
		browserify: {
			task: {
				src: ['src/js/**/*.js', '!src/js/libs/**/*.js'],
				dest: 'dist/js/<%= pkg.name %>-browserify.js',
				options: {
					shim: {
						Ractive: {
							path: 'src/js/libs/ractive.min.js',
							exports: 'Ractive'
						}
					}
				}
			}
		},
		uglify: {
			options: {
				// the banner is inserted at the top of the output
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> */\n'
			},
			task: {
				files: {
					'dist/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
				}
			}
		},
		cssmin: {
			options: {
				// the banner is inserted at the top of the output
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
				report: 'min'
			},
			task: {
				files: {
					'dist/css/<%= pkg.name %>.min.css': ['<%= absurd.task.dest %>', 'src/css/libs/*.css']
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'src/js/**/*.js', 'test/unit/**/*.js'],
			options: {
				ignores: ['src/js/libs/**/*.js', 'src/js/compiledTemplates.js'],
				jshintrc: 'test/jshint/config.json',
				reporter: 'test/jshint/reporter.js'
			}
		},
		absurd: {
			task: {
				src: __dirname + '/src/css/index.js',
				dest: 'dist/css/<%= pkg.name %>.css'
			}
		},
		watch: {
			js: {
				files: ['src/js/**/*', 'src/templates/**/*'],
				tasks: ['build-js']
			},
			css: {
				files: ['src/css/**/*'],
				tasks: ['build-css']
			},
			html: {
				files: ['src/index.html'],
				tasks: ['build-html']
			}
		},
		copy: {
			fonts: {
				expand: true,
				src: 'src/css/fonts/*',
				dest: 'dist/fonts/',
				flatten: true
			},
			images: {
				expand: true,
				src: 'src/css/images/*',
				dest: 'dist/images/',
				flatten: true
			}
		},
		concat: {
			css: {
				src: ['<%= absurd.task.dest %>', 'src/css/libs/*.css'],
				dest: 'dist/css/<%= pkg.name %>.css'
			},
			js: {
				src: ['src/js/libs/global/*.js', '<%= browserify.task.dest %>'],
				dest: 'dist/js/<%= pkg.name %>.js'
			}
		},
		ejs: {
			index: {
				options: {
					title: '<%= pkg.name %>',
					min: true
				},
				src: 'src/index.html',
				dest: 'dist/index.html',
				exapnd: true,
				flatten: true
			},
			'index-min': {
				options: {
					title: '<%= pkg.name %>',
					min: false
				},
				src: 'src/index.html',
				dest: 'dist/index.debug.html',
				exapnd: true,
				flatten: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-ejs');
	grunt.loadNpmTasks('grunt-absurd');
	grunt.loadNpmTasks('grunt-browserify');

	grunt.registerTask('compile-templates', function() {
		var compiledTemplates = {};
		var templateFileContent = '/* This file was auto-generated at ' + grunt.template.today('dddd, mmmm dS, yyyy, h:MM:ss TT') + '*/\n';
		grunt.file.recurse('src/templates', function(absPath, rootDir, subDir, fileName) {
			var name = fileName.substring(0, fileName.lastIndexOf('.'));
			var ext = fileName.substring(fileName.lastIndexOf('.')+1);
			if (ext === 'html') {
				var template = grunt.file.read(absPath, { encoding: 'utf8' });
				compiledTemplates[name] = Ractive.parse(template);
			}
		});

		templateFileContent += 'module.exports=' + JSON.stringify(compiledTemplates) + ';';
		grunt.file.write('src/templates/index.js', templateFileContent, { encoding: 'utf8' });
	});

	grunt.registerTask('build-css', ['clean:css', 'absurd', 'cssmin', 'concat:css', 'copy:fonts', 'copy:images']);
	grunt.registerTask('build-js', ['clean:js', 'compile-templates', 'jshint', 'browserify', 'concat:js', 'uglify', 'clean:browserify']);
	grunt.registerTask('build-html', ['clean:html', 'ejs']);
	grunt.registerTask('default', ['build-css', 'build-js', 'build-html', 'watch']);
	
};