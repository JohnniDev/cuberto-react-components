const path = require('path');

const env = process.env.NODE_ENV;

module.exports = {
  entry: './src/index.js',
  mode: env,
  resolve: {
    alias: {
      'react': path.resolve('./example/node_modules/react'),
      'react-dom': path.resolve(__dirname, './example/node_modules/react-dom'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.js[x]?$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '',
    filename: 'build.js',
    libraryTarget: 'umd',
  },
  watch: env === 'development',
  devtool: env === 'development' ? 'eval-source-map' : false,
};
