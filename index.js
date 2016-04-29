var path = require('path');

module.exports = CorrectTheme;

function CorrectTheme (options) {
  options = options || {};
  options.base = path.resolve(options.base || '.');
  if (!(this instanceof CorrectTheme)) {
    return new CorrectTheme(options);
  }
  return {
    install: function (less, pluginManager) {
      var ThemeRewriter = getThemeRewriter(less);

      pluginManager.addFileManager(new ThemeRewriter(options));
    }
  };
}

function getThemeRewriter (less) {
  function ThemeRewriter (options) {
    this.options = options;
  }

  ThemeRewriter.prototype = new less.FileManager();
  ThemeRewriter.prototype.supports = function (filename, currentDirectory, options, environment) {
    return path.basename(filename) === 'theme.config';
  };
  ThemeRewriter.prototype.loadFile = function (filename, currentDirectory, options, environment) {
    filename = path.resolve(this.options.base + '/' + path.basename(filename));
    return less.FileManager.prototype.loadFile.call(this, filename, '', options, environment);
  };
  ThemeRewriter.prototype.tryAppendExtension = function (path) {
    return path;
  };
  ThemeRewriter.prototype.tryAppendLessExtension = function (path) {
    return path;
  };

  return ThemeRewriter;
}
