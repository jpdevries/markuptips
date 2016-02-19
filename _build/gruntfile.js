module.exports = function(grunt) {
    grunt.option.init({
        'cssVer':(!grunt.option('cssVer')) ? grunt.file.readJSON('./config.json').cssVer : grunt.option('cssVer'),
        'jsVer':(!grunt.option('jsVer')) ? grunt.file.readJSON('./config.json').jsVer : grunt.option('jsVer'),
        'icons':(!grunt.option('icons')) ? grunt.file.readJSON('./config.json').icons : grunt.option('icons'),
        'theme':(!grunt.option('theme')) ? grunt.file.readJSON('./config.json').theme : grunt.option('theme')
    });

    var doS3 = grunt.file.isFile('aws-secret.json');
	// Project configuration.
	var initConfig = {
		pkg: grunt.file.readJSON('package.json'),
		dirs: { /* just defining some properties */
			lib: './lib/',
			scss: './scss/',
			theme: grunt.option('theme'),
			assets: 'assets/',
			icons: 'icons/',
			css: 'css/',
			js:  'js/',
			img: 'img/',
			font: 'font/'
		},
    options:{
      cssVer:grunt.option('cssVer'),
      jsVer:grunt.option('jsVer')
    },
		bower: {
			install: {
				options: {
					targetDir: './lib',
					layout: 'byComponent'
				}
			}
		},
		copy: {
		},
		cssmin: {
			compress: {
				options: {
					report: 'min',
					keepSpecialComments: 0,
					banner: '/*!\n*  <%= pkg.title %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n*/'
				},
				files: {
					'<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.min.css': '<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.css',
                    '<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>opendyslexic.min.css': '<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>opendyslexic.css'
				}
			}
		},
    webfont: {
        icons: {
            src: './icons/*.svg',
            dest: '<%= dirs.theme %><%= dirs.assets %><%= dirs.font %>',
            destCss:'<%= dirs.scss %>base/',
            options: {
                font:'modmoreicons',
                hashes:true,
                engine:'node',
                destHtml:'<%= dirs.theme %><%= dirs.assets %><%= dirs.font %>',
                relativeFontPath: '../<%= dirs.font %>',
                //template:'<%= dirs.icons %>bem.css',
                htmlDemo:true,
                htmlDemoTemplate:'<%= dirs.icons %>demo.html',
                templateOptions:{
                    baseClass: "mm",
                    classPrefix: "mm-",
                    mixinPrefix: "mm_",
                    stylesheet:'scss'
                }
            }
        }
    },
		sass: {
			dist: {
				options: {
					style: 'compressed',
					compass: false
				},
				files: {
					'<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.css': '<%= dirs.scss %>main.scss',
                    '<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>opendyslexic.css': '<%= dirs.scss %>base/opendyslexic.scss'
				}
			},
			dev: {
				options: {
					style: 'expanded',
					compass: false
				},
				files: {
					'<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.css': '<%= dirs.scss %>main.scss',
                    '<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>opendyslexic.css': '<%= dirs.scss %>base/opendyslexic.scss'
				}
			}
		},
		csslint: {
			strict: {
				options: {
					import: 2
				},
				src: ['<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>**/*.css']
			}
		},
		concat: {
			options: {
				separator: '',
			},
			js: {
				src: [
                    '<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>vendor/mustache.js',
                    '<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>vendor/typeahead.js/typeahead.bundle.js',
					'<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>plugins.js',
                    '<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>vendor/jquery.speakable.js',
					'<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>main.js',
                    '<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>drivers/react/react.js'
				],
				dest: '<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>main-dev.js',
			}

		},
		uglify: {
			main: {
				options: {
					report: 'min'
				},
				files: {
					'<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>main-min.<%= options.jsVer %>.js': ['<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>main-dev.js'],
                    '<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>drivers/react/react.min.js': ['<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>drivers/react/react.js']
				}

			}
		},
    babel: {
      options: {
        plugins: ['transform-react-jsx'],
        presets: ['es2015', 'react']
      },
      jsx: {
        files: [{
          expand: true,
          cwd: 'js/drivers/react/', // Custom folder
          src: ['*.jsx'],
          dest: '<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>drivers/react/', // Custom folder
          ext: '.js'
        }]
      }
    },


        compress: {
          css: {
            options: {
              mode: 'gzip'
            },
            src: ['<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.min.css'],
            dest: '<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.min.' + (grunt.option('cssVer')) + '.cssgz'
          },
          js: {
            options: {
              mode: 'gzip'
            },
            src: ['<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>main-min.js'],
            dest: '<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>main-min.' + (grunt.option('jsVer')) + '.jsgz'
          }
        },
    svgstore: {
      icons: {
        files: {
          '<%= dirs.theme %><%= dirs.assets %><%= dirs.img %>icons.svg': ['<%= dirs.theme %><%= dirs.assets %><%= dirs.img %>src/svg/*.svg']
        },
        options: {
          formatting : {
            indent_size : 2
          },
          prefix: 'icon-',
          cleanup: true,
          convertNameToId: function(name) {
            return name.replace(/^\w+\_/, '');
          }
        }
      }
    },
		watch: { /* trigger tasks on save */
			options: {
				livereload: true
			},

			scss: {
				files: '<%= dirs.scss %>**/*.scss',
				tasks: ['sass:dev', 'growl:sass']
			},

			js: {
				files: ['<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>*','!<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>**/*-dev.js*','!<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>**/*-min.js*'],
				tasks: ['concat', 'growl:concat', 'uglify', 'growl:uglify']
			}
		},
		clean: { /* take out the trash */
			options: {
				force: true
			},
			prebuild: ['<%= dirs.scss %>bourbon', '<%= dirs.scss %>font-awesome'],
			postbuild: ['<%= dirs.lib %>']
		},
		growl: { /* optional growl notifications requires terminal-notifer: gem install terminal-notifier */
			sass: {
				message: "Sass files created.",
				title: "grunt"
			},

			build: {
				title: "grunt",
				message: "Build complete."
			},
			watch: {
				title: "grunt",
				message: "Watching. Grunt has its eye on you."
			},
			expand: {
				title: "grunt",
				message: "CSS Expanded. Don't check it in."
			},
			concat: {
				title: "grunt",
				message: "JavaScript concatenated."
			},
			uglify: {
				title: "grunt",
				message: "JavaScript minified."
			}
		}
	};


	initConfig.copy["bourbon"] = {
		files: [{
			src: 'bourbon/**/*',
			cwd: '<%= dirs.lib %>',
			dest: '<%= dirs.scss %>',
			expand: true
		}]
	};

	initConfig.copy["neat"] = {
		files: [{
			src: 'neat/**/*',
			cwd: '<%= dirs.lib %>',
			dest: '<%= dirs.scss %>',
			expand: true
		}]
	};

	initConfig.copy["typeahead"] = {
		files: [{
			src: 'typeahead.js/**/*',
			cwd: '<%= dirs.lib %>',
			dest: '<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>vendor/',
			expand: true
		}]
	};

	initConfig.copy["mustache"] = {
		files: [{
			src: './**/*',
			cwd: '<%= dirs.lib %>mustache.js/',
			dest: '<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>vendor/',
			expand: true
		}]
	};

  initConfig.copy["font-awesome-svg-png-svg"] = {
    src: ['<%= dirs.lib %>/font-awesome-svg-png/svg/*.svg','<%= dirs.icons %>*.svg'],
    dest: '<%= dirs.theme %><%= dirs.assets %><%= dirs.img %>src/svg/',
    expand: true,
    flatten: true
  };

    if(grunt.file.isFile('./config.json')) {
        initConfig.bump = {
            pkg:{
                files: [
                    {src:'config.json',dest:'config.json'}
                ],
                options: {
                    replacements:[{
						pattern:/"jsVer":\s*"\d+.\d+.\d+"/ig,
						replacement:'"jsVer": "' + grunt.option('jsVer') + '"'
                    },{
						pattern:/"cssVer":\s*"\d+.\d+.\d+"/ig,
						replacement:'"cssVer": "' + grunt.option('cssVer') + '"'
                    }]
                }
            }
        }
    }

    if(doS3) {
        initConfig.aws = grunt.file.readJSON('aws-secret.json');
        initConfig.s3 = {
            options: {
                accessKeyId: "<%= aws.accessKeyId %>",
                secretAccessKey: "<%= aws.secretAccessKey %>",
                bucket: "<%= aws.bucket %>"
            },
            cssgz: {
                cwd:'<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>',
                src:'main.min.' + (grunt.option('cssVer')) + '.cssgz',
                dest:'<%= dirs.assets %><%= dirs.css %>',
                options:{
                    gzip:false,
                    headers:{
                        ContentType:'text/css',
                        CacheControl:31556926,
                        Expires: new Date(new Date().setYear(new Date().getFullYear() + 1)),
                        ContentEncoding:'gzip'
                    }
                }
            },
            jsgz: {
                cwd:'<%= dirs.theme %><%= dirs.assets %><%= dirs.js %>',
                src:'main-min.' + (grunt.option('jsVer')) + '.jsgz',
                dest:'<%= dirs.assets %><%= dirs.js %>',
                options:{
                    gzip:false,
                    headers:{
                        ContentType:'application/javascript',
                        CacheControl:31556926,
                        Expires: new Date(new Date().setYear(new Date().getFullYear() + 1)),
                        ContentEncoding:'gzip'
                    }
                }
            },
            sf:{
                cwd: "<%= dirs.theme %><%= dirs.assets %>font/sf",
                src: "**",
                dest: "<%= dirs.assets %>font/sf/",
                options:{
                    headers:{
                        CacheControl:31556926,
                        Expires: new Date(new Date().setYear(new Date().getFullYear() + 1))
                    }
                }
            },
            fira:{
                cwd: "<%= dirs.theme %><%= dirs.assets %>font/fira",
                src: "**",
                dest: "<%= dirs.assets %>font/fira/",
                options:{
                    headers:{
                        CacheControl:31556926,
                        Expires: new Date(new Date().setYear(new Date().getFullYear() + 1))
                    }
                }
            }
        }
    }

	grunt.initConfig(initConfig);

	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-growl');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-csslint');

  grunt.loadNpmTasks('grunt-string-replace');
  grunt.renameTask('string-replace','bump');

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-aws');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-babel');


	grunt.registerTask('default', ['growl:watch', 'watch']);
	grunt.registerTask('build', ['clean:prebuild', 'bower', 'copy', 'sass:dev', 'cssmin','babel', 'concat', 'uglify', 'growl:sass', 'clean:postbuild']);
	grunt.registerTask('expand', ['sass:dev', 'growl:sass', 'growl:expand']);
  grunt.registerTask('s3gz',['compress','s3:cssgz','s3:jsgz']);
  grunt.registerTask('jsx',['babel']);
};
