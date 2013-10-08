// Diese Datei beschreibt den Build-Prozess der App. Das Programm "grunt"
// liest diese Datei ein und kompiliert unsere App entsprechend.

module.exports = function(grunt) {

  'strict mode';

  // Das an die Funktion grunt.initConfig() übergebene Objekt regelt den
  // Buildprozess. Details unter http://gruntjs.com/
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // JSHint kontrolliert JavaScript-Dateien auf guten Stil. Im Detail kann man
    // einiges umkonfigurieren, siehe http://www.jshint.com/ und
    // https://github.com/gruntjs/grunt-contrib-jshint
    // Allerdings sind die Standardwerte schon ganz sinnvoll :)
    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js']
    },

    // Jade erzeugt HTML-Dateien aus einer vereinfachten Syntax. Für Details siehe
    // http://jade-lang.com/reference/
    jade: {
      debug: {
        options: {
          data: {
            siteTitle: 'CardSort'
          },
          pretty: true
        },
        files: (function() {
          var files = {
            //'app/fragebogen.html': 'src/fragebogen.jade',
            //'app/ausgabe.html': 'src/ausgabe.jade'
          };
          var pattern = 'src/**/*.jade';
          var jadeFiles = grunt.file.expand(pattern);
          jadeFiles.forEach(function(file){
            var output = file.replace('.jade', '.html');
            files[output] = file;
          });
          return files;
        })()
      },
      release: {
        options: {
          data: {
            siteTitle: 'CardSort'
          },
          pretty: false
        },
        files: (function() {
          var files = {
            //'app/fragebogen.html': 'src/fragebogen.jade',
            //'app/ausgabe.html': 'src/ausgabe.jade'
          };
          var pattern = 'src/**/*.jade';
          var jadeFiles = grunt.file.expand(pattern);
          jadeFiles.forEach(function(file){
            var output = file.replace('.jade', '.html');
            files[output] = file;
          });
          return files;
        })()
      }
    },

    stylus: {
      compile: {
        options: {
          paths: [require('nib').path]
        },
        files: (function() {
          var files = {};
          var pattern = 'src/**/*.styl';
          var stylusFiles = grunt.file.expand(pattern);
          stylusFiles.forEach(function(file){
            var output = file.replace('.styl', '.css');
            files[output] = file;
          });
          return files;
        })()
      }
    },

    concat: {
      options: {
        separator: '',
      },
      css: {
        src: ['src/**/*.css'],
        dest: 'app/CardSort.css'
      },
      js: {
        src: ['src/**/*.js'],
        dest: 'app/main.min.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'app/CardSort.js': ['src/CardSort.js']
        }
      },
      confirmit: {
        files: {
          'app/CardSort-Libs.min.js': [
            'bower_components/jquery/jquery.min.js',
            'bower_components/jquery-ui/ui/jquery.ui.core.js',
            'bower_components/jquery-ui/ui/jquery.ui.widget.js',
            'bower_components/jquery-ui/ui/jquery.ui.mouse.js',
            'bower_components/jquery-ui/ui/jquery.ui.draggable.js',
            'bower_components/jquery-ui/ui/jquery.ui.droppable.js',
            'bower_components/jqueryui-touch-punch/jquery.ui.touch-punch.min.js'
          ],
          'app/CardSort.min.js': ['app/CardSort.js']
        }
      }
    },

    copy: {
      dist: {
        files: [
          {
            src: 'src/**/*.css' ,
            dest: 'app/',
            expand: true,
            flatten: true,
            filter: 'isFile'
          },
          {
            src: 'src/**/*.html' ,
            dest: 'app/',
            expand: true,
            flatten: true,
            filter: 'isFile'
          }
        ]
      },
      confirmit: {
        files: [
          {
            src: 'src/CardSort.html' ,
            dest: 'app/',
            expand: true,
            flatten: true,
            filter: 'isFile'
          },
          {
            src: 'src/CardSort.css' ,
            dest: 'app/',
            expand: true,
            flatten: true,
            filter: 'isFile'
          },
          {
            src: 'src/CardSort.js' ,
            dest: 'app/',
            expand: true,
            flatten: true,
            filter: 'isFile'
          }
        ]
      }
    },

    clean: {
      dist: ['app/main.min.js', 'app/fieldset.html'],
      output: ['app/*'],
      confirmit: ['app/CardSort.js']
    },

    "regex-replace": {
        confirmit_html: { //specify a target with any name
            src: ['app/CardSort.html'],
            actions: [
              {
                  name: 'clean head',
                  search: '^.+?<div',
                  replace: '<div',
                  flags: ''
              },
              {
                  name: 'clean fieldset',
                  search: '<fieldset[\\s\\S]*?$',
                  replace: '',
                  flags: ''
              },
              {
                  name: 'add script tag',
                  search: '([\\s\\S]*?)$',
                  replace: '$1\n\n<script type="text/javascript" src="CardSort-Libs.min.js"></script>\n<script type="text/javascript" src="CardSort.min.js"></script>',
                  flags: ''
              },

            ]
        },
        confirmit_css: {
            src: ['app/CardSort.css'],
            actions: [
              {
                  name: 'clean body from css',
                  search: '^body.+?\\n',
                  replace: '',
                  flags: 'i'
              }
            ]
        },
        confirmit_js: {
            src: ['app/CardSort.js'],
            actions: [
              {
                  name: 'replace ^ for Confirmit',
                  search: '\\^=',
                  replace: '^String.fromCharCode(94)^=',
                  flags: 'g'
              }
            ]
        }
    }
  });

  // Lädt die Standard-Plugin-Sammlung von Grunt. Details siehe
  // https://github.com/gruntjs/grunt-contrib)
  grunt.loadNpmTasks('grunt-contrib');

  //Grunt plugin to search and replace text content of files based on regular expression patterns
  grunt.loadNpmTasks('grunt-regex-replace');

  // Diese Abfolge an Tasks wird bei einem normalen Aufruf von "grunt"
  // abgearbeitet
  grunt.registerTask('default', [ 'jshint', 'jade:debug', 'stylus']);
  grunt.registerTask('nojshint', [ 'jade:debug', 'stylus']);
  grunt.registerTask('release', [ 'jshint', 'jade:release', 'stylus', 'copy', 'uglify']);

  grunt.registerTask('confirmit', [
                                    'jshint',
                                    'clean:output',
                                    'jade:release',
                                    'stylus',
                                    //'concat:confirmit',
                                    'copy:confirmit',
                                    'regex-replace:confirmit_html',
                                    'regex-replace:confirmit_css',
                                    //'regex-replace:confirmit_js',
                                    'uglify:confirmit'
                                    //'clean:confirmit'
                                  ]
                    );

};