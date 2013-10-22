var Ractive = require('ractive');

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			task: {
				src: 'dist/**/*'
			}
		},
		concat: {
			options: {
				// define a string to put between each file in the concatenated output
				separator: ';'
			},
			task: {
				// the files to concatenate
				src: ['src/js/**/*.js'],
				// the location of the resulting JS file
				dest: 'dist/js/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				// the banner is inserted at the top of the output
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> */\n'
			},
			task: {
				files: {
					'dist/js/<%= pkg.name %>.min.js': ['<%= concat.task.dest %>']
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
					'dist/css/<%= pkg.name %>.min.css': ['<%= absurd.task.dest %>']
				}
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'src/js/**/*.js', 'test/unit/**/*.js'],
			options: {
				ignores: ['src/js/libs/*.js', 'src/js/compiledTemplates.js'],
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
			task: {
				files: ['src/**/*', 'Gruntfile.js'],
				tasks: ['default']
			}
		},
		copy: {
			task: {
				expand: true,
				src: 'src/index.html',
				dest: 'dist/',
				flatten: true
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

	grunt.registerTask('compile-templates', function() {
		var templateFileContent = '/* This file was auto-generated at ' + grunt.template.today('dddd, mmmm dS, yyyy, h:MM:ss TT') + '*/\nvar compiledTemplates = {};';
		grunt.file.recurse('src/templates', function(absPath, rootDir, subDir, fileName) {
			var name = fileName.substring(0, fileName.lastIndexOf('.'));
			var template = grunt.file.read(absPath, { encoding: 'utf8' });
			template = Ractive.parse(template);
			templateFileContent += 'compiledTemplates[\'' + name + '\'] = ' + JSON.stringify(template) + ';';
		});
		grunt.file.write('src/js/compiledTemplates.js', templateFileContent, { encoding: 'utf8' });
	});

	grunt.registerTask('default', ['compile-templates', 'clean', 'jshint', 'absurd', 'cssmin', 'concat', 'uglify', 'ejs', 'watch']);

};