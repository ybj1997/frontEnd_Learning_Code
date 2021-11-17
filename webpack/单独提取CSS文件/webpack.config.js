const {resolve} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output:{
        filename: 'build.js',
        path:resolve(__dirname, 'build')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'css/index.css'
        })
    ],
    mode:'development'
}