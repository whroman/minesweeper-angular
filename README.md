# [Angular Minesweeper](http://whroman.github.io/minesweeper-angular/)

A single-page Minesweeper app built using:

* [Angular](https://angularjs.org/)
* [Coffeescript](http://coffeescript.org/)
* [Sass](http://sass-lang.com/)
* [Gulp](http://gulpjs.com/)
* [Bower](http://bower.io)
  
View live [here](http://whroman.github.io/minesweeper-angular/).

##Application

### Requirements
To work on the front-end code of the application, you'll need to have the following packages installed before continuing.

* [Node.js](http://nodejs.org): Use the installer provided on the NodeJS website.
* [Gulp](http://gulpjs.com/): Run `[sudo] npm install -g gulp`
* [Bower](http://bower.io) **: Run `[sudo] npm install -g bower`
* [Ruby](https://www.ruby-lang.org/en/installation/): Follow instructions in provided link. Comes installed on Macs. 
* [Sass](http://sass-lang.com/install) *: Run `[sudo] gem install sass`. V 3.3 or higher is required (due to sourcemap support)


* Only necessary if user wants to add third-party libraries/frameworks to project

### Structure

```
minesweeper-angular
├── Resources   // Holds all front-end assets, including css, js and templates
|
└── Tasks       // Holds project tasks, including sass and coffeescript compiling, spinning up a local server and 

```

## Tasks 

### Structure

```
minesweeper-angular
└── Tasks
    ├── Gulpfile.js 
    │       // Project tasks are defined here
    │       // Loads `config` module
    │
    └── config
        ├── index.js   // Allows for `config` directory to be used as a Node module, loading `paths.js` and `options.js`
        ├── options.js // Exposes object containing predefined options for use with Gulp plugins
        └── paths.js   // Exposes object containing file paths of Resources manipulated by Gulp tasks

```
### Usage
    
* `gulp build`
    * Compiles, builds and live-reloads Sass
    * Compiles and builds Coffeescript
    * Destination of build files is defined in `Tasks/config/paths.js`
    
* `gulp` or `gulp dev`
    * Run a local dev server located at http://localhost:8888/dev.html with unminified files or http://localhost:8888 using production-ready files. This allows for development involving HTTP and AJAX requests.
    * Watches all \*.scss and \*.coffee files, automatically compiling and building the resources when a change is detected
    

## Development

### Getting Started

It is imperative to have the default `gulp` (or `gulp dev`) task running while developing. The dev server is located at `http://localhost:8888`.

### Structure
```
minesweeper-angular
└── Resources
    ├── bower_components // Contains all third-party libraries
    ├── coffee        
    │   ├── app.js      // Main Angular file. Ties together routes, templates and controllers 
    │   ├── collections // Used by controllers to operate on collections of data/models
    │   ├── models      // Used by controllers and collections to operate on individual model objects
    │   └── controllers // Exposes logic to views
    │
    ├── js // Compiled 1:1 from `coffee` dir
    │
    ├── templates  //  Contains Handlebars templates
    ├── build      // Contains `built` versions of SCSS and Coffeescript files, along with sourcemaps
    ├── images     // Nothing special   
    └── scss
        └── app.scss    // Only scss file that is compiled. Contains `@import`s for the rest of the scss 
```

### Adding New JS Libraries

1. Add lib to project using `bower` in the `Tasks` directory.
2. The lib will appear in `[root]/Resources/bower_components/....`
3. Declare the path to the lib file in `[root]/Tasks/config/paths.js` as an Array item in `path.js.libs`. The files will be concat'd in listed order.


### Adding New Coffeescript Files

1. Coffeescript files are compiled to the `Resources/scripts/js` directory before being concat'd and minified, so you will need to list the path to the compiled `.js` version of your Coffeescript file.
2. Declare the path to the lib file in `[root]/Tasks/config/paths.js` as an Array item in `path.js.src`. The files will be concat'd in listed order.
    

### Adding New SCSS Files

* Include new stylesheets in `/Resources/scss/app.scss` using `@import "path/to/file.scss"`