module.exports = function(grunt) {

  // build config command-line keys
  var configKey = grunt.option('config') || 'default';

  // files and settings derived from build config
  var lessConfigFile = "config-" + configKey + ".less";
  var jsConfigFile = "config-" + configKey + ".js";

  // FIXME: configuration repeated below in the cdndeps key; the dependency js files should be obtained directly from the key below
  var jsDependencies = require("grunt-cdndeps")({
    production: false,
    src: "package.json",
    dest: "build/dependencies"
  });

  grunt.initConfig({

    buildOptions: {
      buildPath: "build",
      distPath: "dist"
    },

    // compiles LESS files
    less: {
      compile: {
        options: {
          strictMath: true,
          imports: {
            less: [lessConfigFile]
          }
        },
        files: [
          {
            expand: true,
            cwd: 'app/less',
            src: ['base.less', 'widgets/*.less'],
            dest: '<%= buildOptions.buildPath %>/less/',
            ext: '.css'
          }
        ]
      }
    },

    // concatenates and minifies CSS files
    cssmin: {
      combine: {
        files: {
          "<%= buildOptions.distPath %>/application.min.css": [
            "app/css/font_awesome.css", "<%= buildOptions.buildPath %>/less/base.css",
            "app/css/widgets/*.css", "<%= buildOptions.buildPath %>/less/widgets/*.css"]
        }
      }
    },

    // downloads the runtime JavaScript dependencies of the project
    cdndeps: {
      options: {
        src: "package.json",
        dest: "<%= buildOptions.buildPath %>/dependencies"
      }
    },

    // finds Handlebars templates and precompiles them into functions
    emberTemplates: {
      options: {
        templateName: function(sourceFile) {
          return sourceFile.replace(/app\/templates\//, '');
        }
      },
      "<%= buildOptions.buildPath %>/templates/templates.js": ["app/templates/**/*.hbs"]
    },

    // concatenates JavaScript code into one file
    neuter: {
      options: {
        template: "{%= src %}",
        includeSourceMap: true,
        sourceRoot: ".."
      },
      "<%= buildOptions.buildPath %>/application.js": jsDependencies.concat([
        "app/" + jsConfigFile,
        "app/app.js",
        "<%= buildOptions.buildPath %>/templates/templates.js"])
    },

    // minifies the JavaScript code
    uglify: {
      options: {
        sourceMap: true,
        sourceMapIn: "<%= buildOptions.buildPath %>/application.js.map",
        sourceMapName: "<%= buildOptions.distPath %>/application.min.js.map",
        mangle: { except: ["$super"] }
      },
      "<%= buildOptions.distPath %>/application.min.js": "<%= buildOptions.buildPath %>/application.js"
    },

    // watches files for changes
    watch: {
      build_code: {
        files: ['package.json'],
        tasks: ['cdndeps', 'emberTemplates', 'neuter', 'uglify']
      },
      application_code: {
        files: ['app/**/*.js'],
        tasks: ['neuter', 'uglify']
      },
      css_stylesheets: {
        files: ['app/css/**/*.css'],
        tasks: ['cssmin']
      },
      less_stylesheets: {
        files: ['app/less/**/*.less'],
        tasks: ['less', 'cssmin']
      },
      handlebars_templates: {
        files: ['app/templates/**/*.hbs'],
        tasks: ['emberTemplates', 'neuter', 'uglify']
      }
    }
  });

  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-cdndeps');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['less', 'cssmin', 'cdndeps', 'emberTemplates', 'neuter', 'uglify']);
  grunt.registerTask('default', ['build', 'watch']);
};
