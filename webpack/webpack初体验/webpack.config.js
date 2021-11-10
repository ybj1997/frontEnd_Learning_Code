const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bulid.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            //打包css
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // //打包less
            // {
            //     test: /\.less$/,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         'less-loader'
            //     ]
            // },
            //打包css中的url图片
            {
                test:/\.(png|jpg|gif)$/,
                loader:'url-loader',
                options: {
                    limit:8*1024,
                    esModule:false
                }
            },
            //打包html中的url图片
            {
                test: /\.html$/,
                loader:'html-withimg-loader'
            },
            { 
                exclude:/\.(css|js|html|jpg)$/,
                loader:'file-loader'
            }
        ]
    },
    //打包html文件
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    mode:'development'
}