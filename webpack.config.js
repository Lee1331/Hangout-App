const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
        // filename: '[name].[contentHash].main.js'
    },
    optimization:{
        minimizer: [new TerserPlugin()] //we can also add/require 'optimize-css-assets-webpack-plugin here as well to minify the css instead of doing it in postcss.config.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 5500
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true,
                        }
                    }
                ]
            },
            {
                test: /\.ejs$/,
                use: [
                    {
                        loader: 'ejs-compiled-loader',
                        // loader: 'ejs-loader',
                        query: {
                            variable: 'data',
                            // interpolate : '\\{\\{(.+?)\\}\\}',
                            // evaluate : '\\[\\[(.+?)\\]\\]'
                        }
                    }
                ]
            },
            // {
            //     test: /\.css$/,
            //     // use: [
            //     //     'style-loader',
            //     //     {
            //     //         // loader: 'postcss-loader',
            //     //         loader: 'css-loader',
            //     //         options: {
            //     //             ident: 'postcss',
            //     //             plugins: [
            //     //                 require('tailwindcss'),
            //     //                 require('autoprefixer'),
            //     //             ],
            //     //             importLoaders: 1 
            //     //         }
            //     //     },
            //     //     'postcss-loader'
            //     // ]
            //     use: [
                    
            //         /* 
            //         'style-loader',
            //         { loader: 'css-loader', options: { importLoaders: 1 } },
            //         */



            //         /*
            //         MiniCssExtractPlugin.loader, //3 - Extract css into files
            //         "css-loader", //2 - Turn css into commonjs
            //         */


            //         { //1 - postcss loader (runs first)
            //             loader: 'postcss-loader',
            //             options: {
            //                 ident: 'postcss',
            //                 plugins: [
            //                     require('tailwindcss'),
            //                     require('autoprefixer'),
            //                     require('cssnano')({ preset: 'default' }),
            //                     // require('@fullhuman/postcss-purgecss')({ preset: 'default' }),
            //                 ],
            //             }
            //         },
            //     ]
            // }
        ]
    },
    plugins: [
        /*
        new MiniCssExtractPlugin({
            filename: "tailwind.css",
            // chunkFilename: '[id].css',
            // chunkFilename: "main.css"
            // chunkFilename: "tailwind.css"
        }),
        */
        // new CleanWebpackPlugin(), - //this will recreate the dist folder everytime we save - we don't want to rebuilt the tailwind.css file everytime, instead we want to create it once and then serve it to the users
        new HtmlWebpackPlugin({
            title: 'Hangout-App',
            // template: "./src/views/index.ejs",
            template: '!!raw-loader!' + path.join(__dirname, 'src/views/index.ejs'),
            // filename: "./index.html",
            filename: "./index.ejs",
            minify: {
                collapseWhitespace: true
            }
        }),
        new webpack.ProvidePlugin({
            _: "ejs"
        }),
    
    ]
}