const path = require('path');
const INPUT_DATE = './src/main.js';
const FINAL_FAIL = 'bundle.js';

module.exports = {
  entry: INPUT_DATE,
  output: {
    filename: FINAL_FAIL,
    path: path.resolve(__dirname, 'public'),
  },
  devtool: 'source-map',
  devServer: {
    hot: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader']
      }
    ]
  }
};
