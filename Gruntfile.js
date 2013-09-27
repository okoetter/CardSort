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
      }
    },

    clean: ['app/main.min.js']

  });

  // Lädt die Standard-Plugin-Sammlung von Grunt. Details siehe
  // https://github.com/gruntjs/grunt-contrib)
  grunt.loadNpmTasks('grunt-contrib');

  // Diese Abfolge an Tasks wird bei einem normalen Aufruf von "grunt"
  // abgearbeitet
  grunt.registerTask('default', [ 'jshint', 'jade:debug', 'stylus']);
  grunt.registerTask('nojshint', [ 'jade:debug', 'stylus']);
  grunt.registerTask('release', [ 'jshint', 'jade:release', 'stylus', 'copy', 'uglify']);

};