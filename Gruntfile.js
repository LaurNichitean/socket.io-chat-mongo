/**
 * Created by laurentiu on 28.01.2015.
 */
module.exports = function (grunt) {
    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        express: {
            dev: {
                options: {
                    script: 'bin/www'
                }
            }
        },
        watch: {
            options: {
                livereload: {
                    port: 35729
                }
            },
            express: {
                files: ['public/javascripts/**/*.js', 'public/stylesheets/*.css', 'views/**/*.jade', 'routes/*.js', 'Gruntfile.js', 'app.js'],
                //tasks: ['express:dev'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }

        },
        open: {
            all: {
                path: 'http://localhost:3000/'
            }
        }
        //pkg: grunt.file.readJSON('package.json'),
        //concat: {
        //    cssConcat: {
        //        options: {
        //            separator: ' '
        //        },
        //        files: {
        //            src: ['public/stylesheets/*.css'],
        //            dest: 'public/dist/<%= pkg.name %>.css'
        //        }
        //    },
        //    jsConcat: {
        //        options: {
        //            // define a string to put between each file in the concatenated output
        //            separator: ';'
        //        },
        //        files: {
        //            // the files to concatenate
        //            src: ['public/javascripts/*.js'],
        //            // the location of the resulting JS file
        //            dest: 'public/dist/<%= pkg.name %>.js'
        //        }
        //    }
        //},
        //uglify: {
        //    options: {
        //        // the banner is inserted at the top of the output
        //        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        //    },
        //    dist: {
        //        files: {
        //            'public/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        //        }
        //    }
        //},
        //jshint: {
        //    // define the files to lint
        //    files: ['Gruntfile.js', 'public/**/*.js'],
        //    // configure JSHint
        //    options: {
        //        // more options to override JSHint defaults
        //        globals: {
        //            jQuery: true,
        //            console: true,
        //            module: true
        //        }
        //    }
        //},
        //
        //less: {
        //    paths: ['public/stylesheetss']
        //}
    });

    grunt.registerTask('serve', ['express', 'watch']);
    grunt.registerTask('serve:open', ['express', 'open', 'watch']);

    // this would be run by typing "grunt test" on the command line
    grunt.registerTask('test', ['jshint']);

    // this default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'watch']);
};