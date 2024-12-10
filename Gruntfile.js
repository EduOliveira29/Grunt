module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files:{
                    "dev/styles/main.css": "src/styles/main.less"
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'], 
                tasks: ['less:development']
                /* o ** serve para acesar qualquer pasta, e * qualquer arquivo  */
            },
            html: {
                files: [ 'src/index.html'],
                tasks: [ 'replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/script/main.js'
                        }
                    ]
                },
                files: [
                    {
                    expand: true,
                    flatten: true,
                    src: ['/src/index.html'],
                    dest: 'dev/'
                }
            ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../script/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                    expand: true,
                    flatten: true,
                    src: ['prebuild/index.html'],
                    dest: 'dist/'
                }
            ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        clean: [prebuild],
        uglify: {
            target: { 
                files: { 
                    'dist/script/main.min.js': 'src/script/main.js'
        }
    }
    }
        /*
        sass: {
            dist: {
                options:{
                    style: 'compressed'
                },
                files:{
                    'main2.css': 'main.scss'
                }
            }
        },
        concurrent: {
            targe: ['olaGrunt', 'less', 'sass']
        }*/
    });

grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-replace');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-uglify');
/*grunt.loadNpmTasks('grunt-contrib-sass');*/

grunt.registerTask('default', ['watch']);
grunt.registerTask('build', ['less:production','htmlmin:dist', 'replace:dist', 'clean', 'uglify']);

};
