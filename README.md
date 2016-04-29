# Less Plugin Semantic Theme
#### Change the directory semantic ui looks for your theme.
This is intended to be used in combination with with [less-plugin-npm-import](https://www.npmjs.com/package/less-plugin-npm-import) and [semantic-ui-less](https://www.npmjs.com/package/semantic-ui-less) as a replacement for the broken [less-plugin-semantic-ui](https://www.npmjs.com/package/less-plugin-semantic-ui).

## Install

`npm i --save-dev less-plugin-semantic-theme`

## Usage

```js
var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var NpmImport = require('less-plugin-npm-import');
var CorrectTheme = require('less-plugin-semantic-theme');

gulp.task('less', function () {
  gulp.src('css/style.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      plugins: [
        CorrectTheme({ base: './css' }),
        new NpmImport()
      ]
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/'));
});
```

You can now store your theme.config inside of `css`, then in css/style.less you can do...

```less
@import "npm://semantic-ui-less/semantic.less";
```

## Contributing
Please figure out how to write test cases for this, I wasn't sure where to start.

# License
MIT