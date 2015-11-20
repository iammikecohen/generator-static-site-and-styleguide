'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fantabulous ' + chalk.red('StaticSiteWithAStyleguide') + ' generator!'
    ));

    // var prompts = [{
    //   type: 'confirm',
    //   name: 'someOption',
    //   message: 'Would you like to enable this option?',
    //   default: true
    // }];
    var prompts = [{
        name: 'appName',
        message: 'What is your app\'s name ?'
    },{
        type: 'confirm',
        name: 'addDemoSection',
        message: 'Would you like to generate a demo site? (highly recommended)',
        default: true
    }];

    this.prompt(prompts, function (props) {
      // To access props later use this.props.someOption;
      this.appName = props.appName;
      this.addDemoSection = props.addDemoSection;

      done();
    }.bind(this));

  },

  scaffoldFolders: function(){
    this.mkdir("app");
    this.mkdir("app/styles");
    this.mkdir("app/styleguide");
    this.mkdir("src");
    this.mkdir("src/styles");
    this.mkdir("src/styles/sass");
    this.mkdir("src/styles/sass/00_global");
    this.mkdir("src/styles/sass/01_base");
    this.mkdir("src/styles/sass/02_pieces");
    this.mkdir("src/styles/sass/03_modules");
    this.mkdir("src/styles/sass/04_layouts");
    this.mkdir("src/styles/sass/05_pages");
    this.mkdir("src/templates");
    this.mkdir("src/templates/master-pages");
    this.mkdir("src/templates/modules");
    this.mkdir("src/templates/layouts");
  },
  copyMainFiles: function(){
    this.copy("_gruntfile.js", "Gruntfile.js");
    console.log('created gruntfile');
    this.copy("_package.json", "package.json");
    // this.copy("html/_footer.swig", "src/templates/layouts/footer.swig");
    // this.copy("html/modules/_post.swig", "src/templates/modules/post.swig");
    // this.copy("html/modules/_callout.swig", "src/templates/modules/callout.swig");
    // this.copy("html/_template-default.swig", "src/templates/master-pages/default.swig");
    // this.copy("html/_homepage.swig", "src/templates/index.swig");
    // this.copy("css/modules/_post.scss", "src/styles/post.scss");    
    // this.copy("css/modules/_callout.scss", "src/styles/callout.scss");    
    // this.copy("css/modules/_navigation.scss", "src/styles/navigation.scss");    
 
    var context = { 
        site_name: this.appName 
    };
    // this.template("html/_header.swig", "src/templates/layouts/header.swig", context);
  },
  // writing: {
  //   app: function () {
  //     this.fs.copy(
  //       this.templatePath('_package.json'),
  //       this.destinationPath('package.json')
  //     );
  //     this.fs.copy(
  //       this.templatePath('_bower.json'),
  //       this.destinationPath('bower.json')
  //     );
  //   },

  //   projectfiles: function () {
  //     this.fs.copy(
  //       this.templatePath('editorconfig'),
  //       this.destinationPath('.editorconfig')
  //     );
  //     this.fs.copy(
  //       this.templatePath('jshintrc'),
  //       this.destinationPath('.jshintrc')
  //     );
  //   }
  // },

  install: function () {
    this.installDependencies();
  },
  templates: function() {
    this.composeWith('h5bp', {}, {
    local: require.resolve('generator-h5bp')
  });
    this.composeWith('styleguide', {}, {
      local: require.resolve('generator-styleguide')
    });
    this.composeWith('assemble-swig', {}, {
      local: require.resolve('generator-assemble-swig')
    });
  }
  // runNpm: function(){
  //   var done = this.async();
  //   this.npmInstall("", function(){
  //       console.log("\nEverything Setup !!!\n");
  //       done();
  //   });
  // }
});
