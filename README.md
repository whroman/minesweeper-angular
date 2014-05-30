# Single-Page Minesweeper
===

A single-page Minesweeper app built using:

  * [Angular](https://angularjs.org/)
  * [Coffeescript](http://coffeescript.org/)
  * [Sass](http://sass-lang.com/)
  * [Gulp](http://gulpjs.com/)
  * [Bower](http://bower.io)
  
View live at: http://whroman.github.io/minesweeper-angular/

##Application

### Requirements
To work on the front-end code of the application, you'll need to have the following packages installed before continuing.

* [Node.js](http://nodejs.org): Use the installer provided on the NodeJS website.
* [Gulp](http://gulpjs.com/): Run `[sudo] npm install -g gulp`
* [Bower](http://bower.io) **: Run `[sudo] npm install -g bower`
* [Ruby](https://www.ruby-lang.org/en/installation/): Follow instructions in provided link. Should come pre-installed on Macs. 
* [Sass](http://sass-lang.com/install) ***: Run `[sudo] gem install sass`. V 3.3 or higher is required (due to sourcemap support)


** Only necessary if user wants to add third-party libraries/frameworks to project

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
    * Watches all \*.scss and \*.coffee files, automatically building those resources when a change is detected
    

## Development

### Getting Started

It is imperative to have the default `gulp` (or `gulp dev`) task running while developing.

* `http://localhost:8888/Pages/prod/home.html` will serve a single, built JS file
* `http://localhost:8888/Pages/dev/home.html` will serve individual and unminified JS files
* Both `index` and `dev` will serve a single built css file with a sass sourcemap
* Gulp doesn't handle sourcemaps very well across plugins. [This is a known issue](https://github.com/gulpjs/gulp/issues/356), so storing JS and Coffee in separate places will do for now.

### Structure
```
minesweeper-angular
└── Resources
    ├── bower_components // Contains all third-party libraries and frameworks
    ├── coffee        
    │   ├── app.js      // Main Angular file. Ties together routes, templates and controllers 
    │   ├── collections // Used by controllers to operate on collections of data/models
    │   ├── models      // Used by controllers and collections to operate on individual model objects
    │   └── controllers // Exposes logic to views
    │
    ├── js // Compiled 1:1 from `coffee` dir
    │
    ├── templates  //  Contains Handlebars templates
    ├── build      // Contains `build` files of JS and CSS and SCSS sourcemap
    ├── images     // Nothing special   
    └── scss
        └── app.scss    // Only scss file that is compiled. Contains `@import`s for the rest of the scss 
```


### Adding New Javascript Files

Rather than declaring new files in the html, new files are declared within `[root]/Tasks/config/paths.js`...

* Declare new js bower files in `path.js.lib`.
* Declare custom js files in `path.js.src`.
* The files will be concatenated in the order that they are listed.
    
`gulp` will inject these files into `dev.html` and build these files for use with `index.html`

### Adding New SCSS Files

* Include new stylesheets in `/Resources/scss/app.scss` using `@import "path/to/file.scss"`