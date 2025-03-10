'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const SOURCE_ROOT = __dirname + '/src/main/webpack';

const resolve = {
    extensions: ['.js','jsx','.ts', '.tsx'],
    plugins: [new TSConfigPathsPlugin({
        configFile: './tsconfig.json'
    })]
};

module.exports = {
    resolve: resolve,
    entry: {
        site: SOURCE_ROOT + '/site/main.ts',
		dependencies: SOURCE_ROOT + '/dependencies/main.ts'
        admin: SOURCE_ROOT + '/admin/main.ts' //mugzz
    },
    output: {
		/* filename: (chunkData) => {
            return chunkData.chunk.name === 'dependencies' ? 'clientlib-dependencies/[name].js' : 'clientlib-site/[name].js';
        }, */
		filename: (chunkData) => {
			const chunkName = chunkData.chunk.name;
			if (chunkName === 'dependencies') {
				return 'clientlib-dependencies/[name].js';
			}
     

            //mugzz
            if (chunkName === 'admin') {
                return 'clientlib-admin/[name].js'; 
            }
            //......x....x......




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
                    {
                        loader: 'ts-loader'
                    },
                    {
                        loader: 'glob-import-loader',
                        options: {
                            resolve: resolve
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins() {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                    },
                    {
                        loader: 'glob-import-loader',
                        options: {
                            resolve: resolve
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-react"],
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ESLintPlugin({
            extensions: ['js','jsx', 'ts', 'tsx']
        }),
        /* new MiniCssExtractPlugin({
            filename: 'clientlib-[name]/[name].css'
        }), */
		new MiniCssExtractPlugin({
			filename: (chunkData) => {
				const chunkName = chunkData.chunk.name;
				
				if (chunkName === 'dependencies') {
					return 'clientlib-dependencies/[name].css';
				}
				
                
                // mugzz
                if (chunkName === 'admin') {
                    return 'clientlib-admin/[name].css';
                }
                //............x.....x.....




				return 'clientlib-site/[name].css';
			}
		}),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, SOURCE_ROOT + '/resources'), to: './clientlib-site/' }
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
