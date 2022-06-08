const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const envMapConfig = require('./envMapConfig.js'); // 环境配置map文件
const alias = require('./alias')(envMapConfig[process.env.ENV_LWD]);
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[name].[hash:8].js',
    path: path.resolve(__dirname, '..', 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // loader: 'babel-loader', // 用babel-loader处理
        use: {
            loader: 'babel-loader',
            // options: {
            //   "presets": ['es2015']
            // }
        },
        // enforce: "pre",                 //提前加载使用
        // use: {
        //     loader: "eslint-loader"     //使用eslint-loader解析
        // }
      },
      {
        test: /\.(css|less)$/,
        exclude: /\.module\.(css|less)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                sourceMap: true,
                javascriptEnabled: true,
                modifyVars: {
                  'primary-color': '#FF704F',
                  'link-color': '#FF704F',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.module\.(css|less)$/,
        exclude: /node_modules|antd\.css/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                sourceMap: true,
                javascriptEnabled: true,
                modifyVars: {
                  'primary-color': '#FF704F',
                  'link-color': '#FF704F',
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: alias,
  },
  plugins: [
    new HtmlWebpackPlugin({ title: '图零科技', template: 'public/index.html' }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new WebpackBar(),
  ],
};
