module.exports = {
  entry: './app/src/main.js',
  output: {
    path: './app/static/javascripts',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$|\.jsx$/,
      exclude: /(node_modules|venv)/,
      loader: 'babel',
      query: {
        presets: [ 'es2015', 'react', 'stage-0' ]
      }
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|venv)/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|venv)/,
        loaders: ["style", "css"]
      },
      { test: /\.png$/,
        exclude: /(node_modules|venv)/,
        loader: "url-loader?mimetype=image/png"
      },
      {
        test: /\.less?$/,
        exclude: /(node_modules|venv)/,
        loaders: ["style", "css", "less"]
      }
  ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
