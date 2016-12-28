#!/usr/bin/env node

const path = require('path');
const webpack = require('webpack');

const webpackConfig = {
  context: path.resolve(__dirname, '..'),
  entry: './sw.js',
  output: {
    path: path.resolve(process.cwd(), 'public'),
    filename: 'sw.js'
  },
  resolve: {
    alias: {
      'mockit.config.js': path.resolve(process.cwd(), 'mockit.config.js')
    }
  }
};

webpack(webpackConfig, (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings)
  }
  
  console.log('Mock it!');
});
