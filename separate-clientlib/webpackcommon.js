use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const SOURCE_ROOT = path.join(__dirname, 'src/main/webpack');

const resolve = {
    extensions: ['.js', '.ts'],
    plugins: [
        new TSConfigPathsPlugin({
            configFile: './tsconfig.json'
        })
    ]
};

module.exports = {
    resolve: resolve,
    entry: {
        site: `${SOURCE_ROOT}/site/main.ts`,
        dependencies: `${SOURCE_ROOT}/dependencies/main.ts`,
      
        custom: `${SOURCE_ROOT}/custom/main.ts` // New custom entry point
    },
    output: {
        filename: (chunkData) => {
            const chunkName = chunkData.chunk.name;
            if (chunkName === 'dependencies') return 'clientlib-dependencies/[name].js';
            if (chunkName === 'custom') return 'clientlib-custom/[name].js'; // Unified custom output
            return 'clientlib-site/[name].js';
        },
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'ts-loader' },
                    {
                        loader: 'glob-import-loader',
                        options: { resolve: resolve }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { url: false }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [require('autoprefixer')]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: [path.resolve(__dirname, 'src/main/webpack')]
                            }
                        }
                    },
                    {
                        loader: 'glob-import-loader',
                        options: { resolve: resolve }
                    }
                ]
            }
        ] 
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ESLintPlugin({ extensions: ['js', 'ts', 'tsx'] }),
        new MiniCssExtractPlugin({
            filename: (chunkData) => {
                const chunkName = chunkData.chunk.name;
                if (chunkName === 'dependencies') return 'clientlib-dependencies/[name].css';
                if (chunkName === 'custom') return ' clientlib-custom/[name].css'; // Unified custom output
                return 'clientlib-site/[name].css';
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: `${SOURCE_ROOT}/resources`, to: './clientlib-site/' }
            ]
        })
    ],
    stats: {
        assetsSort: 'chunks',
        builtAt: true,
        errors: true,
        errorDetails: true,
        warnings: true
    }
};
