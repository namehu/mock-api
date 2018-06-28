const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function _externals() {
  let manifest = require('../package.json');
  let dependencies = manifest.dependencies;
  let externals = {};
  for (let p in dependencies) {
    externals[p] = 'commonjs ' + p;
  }
  return externals;
}

const webpackConfig = merge(baseConfig, {
   mode: 'production',
   externals: _externals(),
   plugins: [
      // new UglifyJsPlugin(),
   ]
})

module.exports = webpackConfig;