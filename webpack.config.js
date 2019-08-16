const HtmlWebpackPlugin = require('html-webpack-plugin')

// const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require('path');
module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
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
                test: /\.css$/,
                // use: [
                //     'style-loader',
                //     {
                //         // loader: 'postcss-loader',
                //         loader: 'css-loader',
                //         options: {
                //             ident: 'postcss',
                //             plugins: [
                //                 require('tailwindcss'),
                //                 require('autoprefixer'),
                //             ],
                //             importLoaders: 1 
                //         }
                //     },
                //     'postcss-loader'
                // ]
                use: [
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('tailwindcss'),
                                require('autoprefixer'),
                                require('cssnano')({ preset: 'default' }),
                                // require('@fullhuman/postcss-purgecss')({ preset: 'default' }),
                            ],
                        }
                    },
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
}