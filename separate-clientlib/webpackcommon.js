'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const SOURCE_ROOT = path.join(__dirname, '/src/main/webpack');

const resolve = {
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
  plugins: [new TSConfigPathsPlugin({ configFile: './tsconfig.json' })]
};

module.exports = {
  resolve,
  entry: {
    site: path.join(SOURCE_ROOT, '/site/main.ts'),
    dependencies: path.join(SOURCE_ROOT, '/dependencies/main.ts'),
    expenseDiary: path.join(SOURCE_ROOT, '/expense/main.ts') // Expense-specific entry
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: (chunkData) => {
      const chunkName = chunkData.chunk.name;
      if (chunkName === 'dependencies') {
        return 'clientlib-dependencies/[name].js';
      } else if (chunkName === 'expenseDiary') {
        return 'clientlib-expense/[name].js';
      } else if (chunkName === 'vendors') {
        return 'clientlib-dependencies/[name].js'; // Vendors will be placed with expense if needed
      }
      return 'clientlib-site/[name].js';
    },
    clean: true // Clean dist folder before every build
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'glob-import-loader',
            options: { resolve: '../components/expense-diary' }
          },
          {
            loader: 'ts-loader',
            options: { configFile: 'tsconfig.json' }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false } },
          {
            loader: 'postcss-loader',
            options: { postcssOptions: { plugins: [require('autoprefixer')] } }
          },
          'sass-loader',
          {
            loader: 'glob-import-loader',
            options: { resolve: '../components/expense-diary' }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-react'] }
        }]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors', // Ensure generated vendor chunk is named "vendors"
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ESLintPlugin({ extensions: ['js', 'jsx', 'ts', 'tsx'] }),
    new MiniCssExtractPlugin({
      filename: (chunkData) => {
        const chunkName = chunkData.chunk.name;
        if (chunkName === 'dependencies') {
          return 'clientlib-dependencies/[name].css';
        } else if (chunkName === 'expenseDiary' || chunkName === 'vendors') {
          return 'clientlib-expense/[name].css';
        }
        return 'clientlib-site/[name].css';
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(SOURCE_ROOT, 'resources'), to: './clientlib-site/' }
      ]
    })
  ],
  stats: {
    assetsSort: 'chunks',
    builtAt: true,
    children: false,
    chunkGroups: true,
    chunkOrigins: true,
    colors: false,
    errors: true,
    errorDetails: true,
    env: true,
    modules: false,
    performance: true,
    providedExports: false,
    source: false,
    warnings: true
  }
};



