const HtmlWebpackPlugin = require('html-webpack-plugin')

// const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
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