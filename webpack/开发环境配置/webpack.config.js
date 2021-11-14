const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');
module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'build.js',
        path:resolve(__dirname, 'build')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test:/\.(png|jpg|gif)$/,
                loader:'url-loader',
                options:{
                    limit: 8*1024,
                    name:'[hash:5].[ext]',
                    esModule:false
                }
            },
            {
                test:/\.html$/,
                loader:'html-withimg-loader'
            },
            {
                exclude:/\.(html|css|less|png|jpg|gif)/,
                loader:'file-loader'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    devServer: {
        static:resolve(__dirname,'build'),//编译文件夹
        compress:true,
        open: true,
        port:3000
    }
}