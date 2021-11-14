const { resolve } = require('path');
const  HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    //dev-Server开发服务器;启动指令webpack-dev-server;npm本地启动指令为npx
    devServer: {
        static: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true
    }
}