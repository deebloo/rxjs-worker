var webpack = require('webpack');

var env = process.env.NODE_ENV;

var output = {
  libraryTarget: 'var',
  library: 'RxWorker',
  filename: 'build/bundles/bundle.js'
};

var plugins = [];

if (env === 'prod' || env === 'production') {
  output.filename = 'build/bundles/bundle.min.js'

  plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    mangle: true
  }));
}

module.exports = {
  entry: './src',
  output: output,
  externals: {
    'rxjs/Observable': 'rxjs/Observable',
    'rxjs/Subject': 'rxjs/Subject'
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: /node_modules/ }
    ]
  },
  plugins: plugins
}