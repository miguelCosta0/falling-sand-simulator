// const path = require('path');
import path from 'path';

// module.exports = {
export default {
  mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.([cm]?ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            }
          }
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.mts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(import.meta.dirname, 'public', 'js'),   },
  devtool: 'source-map',
};
