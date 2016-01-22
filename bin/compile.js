require('babel-register')({
  presets: ['es2015', 'react', 'stage-3', 'stage-2', 'stage-1', 'stage-0'],
  plugins: ['add-module-exports']
});
var webpack = require('webpack');
var webpackConfig = require('./../webpack.config');

const compiler = webpack(webpackConfig);
compiler.run((error, stats) => {
  if (error) {
    throw error;
  }
  var jsonStats = stats.toJson();
  if (jsonStats.errors.length > 0) {
    console.log(jsonStats.errors);
  }
  if (jsonStats.warnings.length > 0) {
    console.log(jsonStats.warnings);
  }
});
